<script setup lang="ts">
import { computed } from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

defineOptions({
    layout: GuestLayout
});

const props = defineProps<{
    status?: string;
}>();

const form = useForm({});

const submit = () => {
    form.post(route("verification.send"));
};

const verificationLinkSent = computed(() => props.status === "verification-link-sent");
</script>

<template>
    <Head title="Email Verification" />
    <div
        class="w-full md:max-w-md px-6 py-4 bg-surface-50 dark:bg-surface-900 border dark:border-surface-800 shadow-md rounded-lg">
        <div class="mb-4 text-xs">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
            we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        <div class="mb-4 font-medium text-xs text-green-600" v-if="verificationLinkSent">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <Button
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    label="Resend Verification Email"
                    size="small"
                    type="submit" />
                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="underline text-xs rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Log Out
                </Link>
            </div>
        </form>
    </div>
</template>
