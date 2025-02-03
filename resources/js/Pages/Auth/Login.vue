<script setup lang="ts">
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ref } from "vue";

defineOptions({
    layout: GuestLayout
});

defineProps<{
    canResetPassword?: boolean;
    status?: string;
}>();

const form = useForm({
    email: "",
    password: "",
    remember: false
});

const cb = ref(false);

const submit = () => {
    form.post(route("login"), {
        onFinish: () => {
            form.reset("password");
        }
    });
};
</script>
<style lang="postcss">
.p-password-input {
    width: 100%;
}
</style>
<template>
    <Head title="Log in" />

    <div
        class="w-full md:max-w-md px-6 py-4 bg-surface-50 dark:bg-surface-900 border dark:border-surface-800 shadow-md rounded-lg">
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
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="password">Password</label>
                <Password
                    inputId="password"
                    v-model="form.password"
                    :feedback="false"
                    toggleMask
                    :class="{ invalid: form.errors.password }"
                    :pt="{ pcInput: 'w-full' }"
                    :ptOptions="{ mergeProps: true }" />
                <FormError :message="form.errors.password" />
            </div>
            <div class="block">
                <Checkbox v-model="form.remember" inputId="remember" name="remember" :binary="true" />
                <label for="remember" class="ml-2">Remember me</label>
            </div>
            <div class="flex items-center justify-end gap-2">
                <Link
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="underline text-xs rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Forgot your password?
                </Link>
                <Button
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    label="Log in"
                    size="small"
                    type="submit" />
            </div>
        </form>
    </div>
</template>
