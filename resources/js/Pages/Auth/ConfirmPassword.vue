<script setup lang="ts">
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, useForm } from "@inertiajs/vue3";

defineOptions({
    layout: GuestLayout
});

const form = useForm({
    password: ""
});

const submit = () => {
    form.post(route("password.confirm"), {
        onFinish: () => {
            form.reset();
        }
    });
};
</script>

<template>
    <Head title="Confirm Password" />
    <div
        class="w-full md:max-w-md px-6 py-4 bg-surface-50 dark:bg-surface-900 border dark:border-surface-800 shadow-md rounded-lg">
        <div class="mb-4 text-xs">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <form @submit.prevent="submit" class="mt-1 space-y-4">
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="password">Password</label>
                <InputText
                    id="password"
                    type="password"
                    v-model="form.password"
                    :class="form.errors.password ? '!border-red-300' : ''" />
                <FormError :message="form.errors.password" />
            </div>
            <div class="flex justify-end mt-4">
                <Button
                    class="w-full"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    label="Confirm"
                    size="small"
                    type="submit" />
            </div>
        </form>
    </div>
</template>
