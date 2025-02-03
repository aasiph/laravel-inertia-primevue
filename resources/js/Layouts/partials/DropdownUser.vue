<script setup lang="ts">
import {router} from '@inertiajs/vue3';
import {ref} from 'vue';
import  { getInitials } from '@/helpers'

const menu = ref();
const items = ref([
    {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
            router.get(route('profile.edit'));
        },
    },
    {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
            router.post(route('logout'));
        },
    },
]);

const toggle = (event: any) => {
    menu.value.toggle(event);
};
</script>

<template>
    <div>
        <Button
            text
            type="button"
            :label="getInitials($page.props.auth.user.name)"
            icon="pi pi-angle-down"
            iconPos="right"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"/>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
    </div>
</template>
