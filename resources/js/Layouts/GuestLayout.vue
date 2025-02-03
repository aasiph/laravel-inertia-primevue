<script setup lang="ts">
import ApplicationLogo from "@/components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import AppFooter from "@/Layouts/partials/AppFooter.vue";
</script>

<template>
    <div class="flex flex-col min-h-dvh bg-surface-100 dark:bg-surface-950">
        <Toast />
        <header
            class="fixed top-0 left-0 right-0 h-[4rem] z-99 flex w-full bg-surface-50 dark:bg-surface-900 shadow-sm dark:shadow-surface-800">
            <div class="flex flex-grow items-center justify-between py-4 px-4">
                <div class="flex items-center gap-2">
                    <Link :href="route('home')">
                        <ApplicationLogo class="w-8 h-8" />
                    </Link>
                </div>
                <div class="grow"></div>
                <div class="flex items-center text-xs font-thin">
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
        <div class="flex flex-col justify-between min-h-dvh pt-[5rem] px-4 md:px-[2rem]">
            <main class="flex-1 flex items-center justify-center pb-[2rem]">
                <slot />
            </main>
            <AppFooter />
        </div>
    </div>
</template>
