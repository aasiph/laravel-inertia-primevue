<script setup lang="ts">
import { Link, useForm, usePage } from "@inertiajs/vue3";

defineProps<{
    mustVerifyEmail?: Boolean;
    status?: String;
}>();

const user = usePage().props.auth.user;

const form = useForm({
    name: user.name,
    email: user.email
});
</script>
<style lang="postcss"></style>
<template>
    <section>
        <header>
            <h2 class="text-lg font-medium">Profile Information</h2>
            <p class="mt-1 text-xs text-gray-500">Update your account's profile information and email address.</p>
        </header>

        <form @submit.prevent="form.patch(route('profile.update'))" class="mt-1 space-y-4">
            <div class="flex flex-col gap-1">
                <label class="labelclass" for="name">Name</label>
                <InputText id="name" v-model="form.name" :class="form.errors.name ? '!border-red-300' : ''" />
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

            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                <p class="text-xs mt-2 text-gray-500">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="underline text-xs hover:text-gray-600 rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Click here to re-send the verification email.
                    </Link>
                </p>
                <div v-show="status === 'verification-link-sent'" class="mt-2 font-medium text-xs text-primary">
                    A new verification link has been sent to your email address.
                </div>
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
                    <p v-if="form.recentlySuccessful" class="text-xs text-gray-500">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>
