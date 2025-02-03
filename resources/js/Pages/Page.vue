<script setup lang="ts">
const currentroute = route().current();
</script>
<template>
    <div class="flex justify-center items-center w-full h-full">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-400 leading-tight">Current route is
            {{ currentroute }}</h2>
    </div>
</template>
