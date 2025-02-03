<script setup lang="ts">
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, useForm } from "@inertiajs/vue3";

defineOptions({
    layout: GuestLayout
});

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: ""
});

const submit = () => {
    form.post(route("password.email"));
};
</script>
<style lang="postcss"></style>
<template>
    <Head title="Forgot Password" />
    <div
        class="w-full md:max-w-md px-6 py-4 bg-surface-50 dark:bg-surface-900 border dark:border-surface-800 shadow-md rounded-lg">
        <div class="mb-4 text-xs text-gray-500">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
        </div>
        <div v-if="status" class="mb-4 font-medium text-xs text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="mt-1 space-y-4">
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="email">Email</label>
                <InputText
                    id="email"
                    type="email"
                    autofocus
                    v-model="form.email"
                    :class="form.errors.email ? '!border-red-300' : ''" />
                <FormError :message="form.errors.email" />
            </div>
            <div class="flex items-center justify-end">
                <Button
                    class="w-full"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    label="Email Password Reset Link"
                    size="small"
                    type="submit" />
            </div>
        </form>
    </div>
</template>
