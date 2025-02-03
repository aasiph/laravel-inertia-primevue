<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import DropdownUser from "./DropdownUser.vue";
import ApplicationLogo from "@/components/ApplicationLogo.vue";
import { useAppearance } from "@/composables/useAppearance";

const { toggleMenu } = useAppearance();
</script>

<template>
    <header
        class="fixed top-0 left-0 right-0 h-[4rem] z-99 flex w-full bg-surface-50 dark:bg-surface-900 shadow-sm dark:shadow-surface-800">
        <div class="flex flex-grow items-center justify-between py-4 px-4">
            <div class="flex items-center gap-2">
                <Button id="toggleMenuButton" text icon="pi pi-bars" @click="toggleMenu" />
                <Link :href="route('home')" class="inline-flex">
                    <ApplicationLogo class="text-xl w-8 h-8" />
                    <span class="text-2xl ml-2">LIPT</span>
                </Link>
            </div>
            <div class="grow"></div>
            <div class="flex items-center">
                <ThemeSwitcher />
                <DropdownUser />
            </div>
        </div>
    </header>
</template>
