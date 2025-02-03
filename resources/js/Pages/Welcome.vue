<script setup lang="ts">
import {Head, Link} from "@inertiajs/vue3";
import ApplicationLogo from "@/components/ApplicationLogo.vue";

defineOptions({
    layout: "",
});

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
});
</script>
<style>
</style>
<template>
    <Head title="Welcome"/>
    <div class="flex flex-col h-screen items-center p-4">
        <header class="flex flex-col justify-center items-center">
            <ApplicationLogo alt="Logo" class="mb-8 h-40"/>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 mb-4">
                Laravel Inertiajs Primevue.
            </h1>
            <p class="text-center text-gray-500 text-lg md:text-xl lg:text-2xl mb-8">
                A starter template based on Laravel Inertiajs and Primevue!
            </p>
        </header>
        <main class="grow">
            <div v-if="canLogin" class="flex w-full justify-center gap-2">
                <Link as="button" v-if="$page.props.auth.user" :href="route('dashboard')"
                      class="text-4xl font-semibold bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:text-gray-900">
                    Admin
                    Dashboard
                </Link>

                <template v-else>
                    <Link as="button" :href="route('login')"
                          class="text-4xl font-semibold bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:text-gray-900">
                        Admin Login
                    </Link>

                    <Link as="button" v-if="canRegister" :href="route('register')"
                          class="text-4xl font-semibold bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:text-gray-900">
                        Register
                    </Link>
                </template>
            </div>
        </main>
        <footer class="flex justify-center gap-2 py-1 text-xs text-gray-500">
            <span>Copyrights - {{ new Date().getFullYear() }}</span>
            <span>Made With <span class="text-red-600">♥</span> aasiph.</span>
        </footer>
    </div>
</template>
