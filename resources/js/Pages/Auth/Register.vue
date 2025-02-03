<script setup lang="ts">
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

defineOptions({
    layout: GuestLayout
});

const form = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
});

const submit = () => {
    form.post(route("register"), {
        onFinish: () => {
            form.reset("password", "password_confirmation");
        }
    });
};
</script>
<style lang="postcss"></style>
<template>
    <Head title="Register" />
    <div
        class="w-full md:max-w-md px-6 py-4 bg-surface-50 dark:bg-surface-900 border dark:border-surface-800 shadow-md rounded-lg">
        <form @submit.prevent="submit" class="mt-1 space-y-4">
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="name">Name</label>
                <InputText
                    id="name"
                    type="text"
                    autofocus
                    v-model="form.name"
                    :class="form.errors.name ? '!border-red-300' : ''" />
                <FormError :message="form.errors.name" />
            </div>
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

            <div class="flex items-center justify-end gap-2">
                <Link
                    :href="route('login')"
                    class="underline text-xs rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Already registered?
                </Link>
                <Button
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    label="Register"
                    size="small"
                    type="submit" />
            </div>
        </form>
    </div>
</template>
