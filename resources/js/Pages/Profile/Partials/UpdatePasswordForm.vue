<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";

const passwordInput = ref<HTMLInputElement | null>(null);
const currentPasswordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
});

const updatePassword = () => {
    form.put(route("password.update"), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
        },
        onError: () => {
            if (form.errors.password) {
                form.reset("password", "password_confirmation");
                passwordInput.value?.focus();
            }
            if (form.errors.current_password) {
                form.reset("current_password");
                currentPasswordInput.value?.focus();
            }
        }
    });
};
</script>
<style lang="postcss"></style>
<template>
    <section>
        <header>
            <h2 class="text-lg font-medium">Update Password</h2>
            <p class="mt-1 text-xs text-gray-500">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-1 space-y-4">
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="current_password">Current Password</label>
                <InputText
                    id="current_password"
                    type="password"
                    v-model="form.current_password"
                    :class="form.errors.current_password ? '!border-red-300' : ''" />
                <FormError :message="form.errors.current_password" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="password">New Password</label>
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
            <div class="flex items-center gap-2">
                <Button
                    label="Save"
                    type="submit"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing || !form.isDirty"
                    size="small" />
                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0">
                    <p v-if="form.recentlySuccessful" class="text-xs text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>
