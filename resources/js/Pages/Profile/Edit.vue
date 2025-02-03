<script setup lang="ts">
import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm.vue";
import { Head } from "@inertiajs/vue3";

defineProps<{
    mustVerifyEmail?: boolean;
    status?: string;
}>();
</script>

<template>
    <Head title="Profile" />
    <div class="p-4 bg-surface-50 dark:bg-surface-800 border dark:border-surface-700 shadow-md rounded-lg space-y-4">
        <div class="p-4 sm:p-8 bg-surface-100 dark:bg-surface-900 shadow sm:rounded-lg">
            <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" class="max-w-xl" />
        </div>

        <div class="p-4 sm:p-8 bg-surface-100 dark:bg-surface-900 shadow sm:rounded-lg">
            <UpdatePasswordForm class="max-w-xl" />
        </div>
        <div class="p-4 sm:p-8 bg-surface-100 dark:bg-surface-900 shadow sm:rounded-lg">
            <DeleteUserForm class="max-w-xl" />
        </div>
    </div>
</template>
