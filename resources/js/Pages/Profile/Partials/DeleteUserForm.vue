<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";
import { nextTick, ref } from "vue";

const confirmingUserDeletion = ref(false);
const passwordInput = ref();

const form = useForm({
    password: ""
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
    nextTick(() => passwordInput.value?.$el.focus());
};

const deleteUser = () => {
    form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.$el.focus(),
        onFinish: () => {
            form.reset();
        }
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    form.reset();
};
</script>
<style lang="postcss"></style>
<template>
    <section class="space-y-4">
        <header>
            <h2 class="text-lg font-medium">Delete Account</h2>
            <p class="mt-1 text-xs text-gray-500">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </p>
        </header>
        <Dialog
            v-model:visible="confirmingUserDeletion"
            modal
            :pt="{ mask: { style: 'backdrop-filter: blur(2px)' } }"
            class="max-w-[90%] lg:max-w-[60%]"
            @after-hide="
                form.reset();
                form.clearErrors();
            ">
            <template #container="{ closeCallback }">
                <div class="flex flex-col items-center p-5 bg-surface-100 dark:bg-surface-800 rounded-md">
                    <div
                        class="rounded-full bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[4rem]">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-4"
                    >Are you sure you want to delete your account?</span
                    >
                    <p class="mb-0">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>
                    <div class="flex flex-col gap-1">
                        <label class="labelclass" for="password">Password</label>
                        <InputText
                            id="password"
                            ref="passwordInput"
                            type="password"
                            v-model="form.password"
                            :class="form.errors.password ? '!border-red-300' : ''" />
                        <FormError :message="form.errors.password" />
                    </div>
                    <div class="flex items-center gap-2 mt-4">
                        <Button label="Cancel" @click="closeCallback"></Button>
                        <Button label="Delete Account" severity="danger" @click="deleteUser"></Button>
                    </div>
                </div>
            </template>
        </Dialog>
        <Button label="Delete Account" severity="danger" @click="confirmUserDeletion"></Button>
    </section>
</template>
