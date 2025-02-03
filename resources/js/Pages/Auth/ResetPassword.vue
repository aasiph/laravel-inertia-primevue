<script setup lang="ts">
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, useForm } from "@inertiajs/vue3";

defineOptions({
    layout: GuestLayout
});

const props = defineProps<{
    email: string;
    token: string;
}>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: "",
    password_confirmation: ""
});

const submit = () => {
    form.post(route("password.store"), {
        onFinish: () => {
            form.reset("password", "password_confirmation");
        }
    });
};
</script>

<template>
    <Head title="Reset Password" />
    <div
        class="w-full md:max-w-md px-6 py-4 bg-surface-50 dark:bg-surface-900 border dark:border-surface-800 shadow-md rounded-lg">
        <form @submit.prevent="submit" class="mt-1 space-y-4">
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="email">Email</label>
                <InputText
                    id="email"
                    type="email"
                    v-model="form.email"
                    :class="form.errors.email ? '!border-red-300' : ''" />
                <FormError :message="form.errors.email" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="password">Password</label>
                <InputText
                    id="password"
                    type="password"
                    v-model="form.password"
                    :class="form.errors.password ? '!border-red-300' : ''" />
                <FormError :message="form.errors.password" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="password_confirmation">Confirm Password</label>
                <InputText
                    id="password_confirmation"
                    type="password"
                    v-model="form.password_confirmation"
                    :class="form.errors.password_confirmation ? '!border-red-300' : ''" />
                <FormError :message="form.errors.password_confirmation" />
            </div>

            <div class="flex items-center justify-end">
                <Button
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    label="Reset Password"
                    size="small"
                    type="submit" />
            </div>
        </form>
    </div>
</template>
