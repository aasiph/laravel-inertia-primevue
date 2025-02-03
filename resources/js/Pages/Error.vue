<script setup lang="ts">
import { computed } from "vue";
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import Error400 from "@/icons/400.svg";
import Error403 from "@/icons/403.svg";
import Error404 from "@/icons/404.svg";
import Error500 from "@/icons/500.svg";
import ErrorCommon from "@/icons/error.svg";

defineOptions({ layout: "" });
const props = defineProps<{
    status: number;
}>();

const title = computed(() => {
    return {
        400: "Bad Request",
        403: "Forbidden",
        404: "Page Not Found",
        500: "Server Error",
        503: "Service Unavailable"
    }[props.status] || "Error";
});

const description = computed(() => {
    return {
        400: "Oops, server cannot understand the request sent by your browser or client",
        403: "Sorry, you are forbidden from accessing this page.",
        404: "Sorry, the page you are looking for could not be found.",
        500: "Whoops, something went wrong on our servers.",
        503: "Sorry, we are doing some maintenance. Please check back soon."
    }[props.status] || "Whoops, something went wrong with the request.";
});

const gradient = computed(() => {
    return {
        400: "bg-linear-to-b from-blue-400 from-10% to-(--p-primary-contrast-color) to-30%",
        403: "bg-linear-to-b from-green-400 from-10% to-(--p-primary-contrast-color) to-30%",
        404: "bg-linear-to-b from-red-400 from-10% to-(--p-primary-contrast-color) to-30%",
        500: "bg-linear-to-b from-amber-400 from-10% to-(--p-primary-contrast-color) to-30%"
    }[props.status] || "bg-linear-to-b from-red-400 from-10% to-(--p-primary-contrast-color) to-30%";
});

const textColor = computed(() => {
    return {
        400: "text-blue-400",
        403: "text-green-400",
        404: "text-red-400",
        500: "text-amber-400"
    }[props.status] || "text-red-400";
});

const bgButtonClass = computed(() => {
    return {
        400: "bg-blue-400 focus:bg-blue-500 hover:bg-blue-500 active:bg-blue-500",
        403: "bg-green-400 focus:bg-green-500 hover:bg-green-500 active:bg-green-500",
        404: "bg-red-400 focus:bg-red-500 hover:bg-red-500 active:bg-red-500",
        500: "bg-amber-400 focus:bg-amber-500 hover:bg-amber-500 active:bg-amber-500"
    }[props.status] || "bg-red-400 focus:bg-red-500 hover:bg-red-500 active:bg-red-500";
});

const errorImage = computed(() => {
    return {
        400: Error400,
        403: Error403,
        404: Error404,
        500: Error500
    }[props.status] || ErrorCommon;
});
const goback = () => {
    window.history.back();
};
</script>
<template>
    <FloatingConfigurator />
    <div class="flex flex-col min-h-dvh justify-center items-center p-[2rem] bg-surface-100 dark:bg-surface-950">
        <div :class="gradient"
             style="border-radius: 56px; padding: 0.3rem;">
            <div class="w-full bg-surface-0 dark:bg-surface-900 py-10 px-8 sm:px-20 flex flex-col items-center gap-4"
                 style="border-radius: 53px">
                <span class="font-bold text-3xl" :class="textColor">{{ props.status }}</span>
                <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl">{{ title }}</h1>
                <div class="text-surface-600 dark:text-surface-200 mb-4">{{ description }}</div>
                <div class="w-full flex items-center">
                    <img :src="errorImage" />
                </div>
                <button
                    :class="bgButtonClass"
                    class="rounded-md py-2 px-4 border border-transparent text-center text-sm font-bold transition-all shadow-md hover:shadow-lg focus:shadow-none"
                    type="button" @click="goback()">
                    Go Back
                </button>
            </div>
        </div>
    </div>
</template>
