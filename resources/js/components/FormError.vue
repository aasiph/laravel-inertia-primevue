<template>
    <small v-if="props.message" class="text-red-600">{{ props.message }}</small>
</template>
<script lang="ts" setup>
type ErrorProp = {
    message?: string | null;
};
const props = defineProps<ErrorProp>();
</script>
