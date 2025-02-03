<script setup lang="ts">
import AppHeader from "./partials/AppHeader.vue";
import AppSidebar from "./partials/AppSidebar.vue";
import { computed, onUpdated, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { usePage } from "@inertiajs/vue3";
import { ConfirmContainerSlotProps } from "@/types";
import { useAppearance } from "@/composables/useAppearance.js";
import AppFooter from "@/Layouts/partials/AppFooter.vue";

const { layoutConfig, layoutState, isSidebarActive } = useAppearance();
const outsideClickListener = ref();

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const toast = useToast();
const page = usePage();

const containerClass = computed(() => {
    return {
        "layout-overlay": layoutConfig.menuMode === "overlay",
        "layout-static": layoutConfig.menuMode === "static",
        "layout-static-inactive": layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === "static",
        "layout-overlay-active": layoutState.overlayMenuActive,
        "layout-mobile-active": layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event: MouseEvent) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
            }
        };
        document.addEventListener("click", outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener("click", outsideClickListener.value);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector(".layout-sidebar")!;
    const topbarEl = document.querySelector("#toggleMenuButton")!;

    const node = event.target as HTMLElement;
    return !(sidebarEl.isSameNode(node) || sidebarEl.contains(node) || topbarEl.isSameNode(node) || topbarEl.contains(node));
}

onUpdated(() => {
    if (page.props.flash!.message) {
        toast.add({
            severity: "success",
            summary: "Success",
            detail: page.props.flash!.message,
            life: 7000
        });
    }
    if (page.props.flash!.error) {
        toast.add({
            severity: "error",
            summary: "Error",
            detail: page.props.flash!.error,
            life: 7000
        });
    }
});
</script>

<template>
    <div class="layout-wrapper min-h-dvh bg-surface-100 dark:bg-surface-950" :class="containerClass">
        <AppHeader />
        <AppSidebar />
        <div
            class="layout-main-container flex flex-col justify-between min-h-dvh pt-[5rem] px-[2rem] transition-all duration-500 ease-in-out">
            <main class="layout-main flex-auto pb-[2rem]">
                <slot />
            </main>
            <div class="layout-mask animate-fadein"></div>
            <Toast />
            <DynamicDialog />
            <ConfirmDialog group="headless" class="z-9999 max-w-[90%]">
                <template #container="{ message, acceptCallback, rejectCallback }: ConfirmContainerSlotProps">
                    <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
                        <div
                            class="rounded-full bg-primary-500 text-surface-0 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[4rem]">
                            <i class="pi pi-question text-5xl"></i>
                        </div>
                        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                        <p class="mb-0">{{ message.message }}</p>
                        <div class="flex items-center gap-2 mt-4">
                            <Button label="Yes" @click="acceptCallback"></Button>
                            <Button label="No" outlined @click="rejectCallback"></Button>
                        </div>
                    </div>
                </template>
            </ConfirmDialog>
            <AppFooter />
        </div>
    </div>
</template>
