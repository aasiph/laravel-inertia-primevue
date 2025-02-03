<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';

const { updateAppearance, appearance } = useAppearance();
</script>

<template>
    <div class="flex-col justify-start items-start gap-2 inline-flex pr-4">
        <span class="text-xs font-medium">Appearance</span>
        <div class="flex gap-0.5">
            <Button label="Light" :severity="appearance == 'light' ? 'primary' : 'secondary'" size="small" icon="pi pi-sun" @click="updateAppearance('light')" :pt:root="'!px-2'" />
            <Button label="Dark" :severity="appearance == 'dark' ? 'primary' : 'secondary'" size="small" icon="pi pi-moon" @click="updateAppearance('dark')" :pt:root="'!px-2'" />
            <Button label="System" :severity="appearance == 'system' ? 'primary' : 'secondary'" size="small" icon="pi pi-desktop" @click="updateAppearance('system')" :pt:root="'!px-2'" />
        </div>
    </div>
</template>
