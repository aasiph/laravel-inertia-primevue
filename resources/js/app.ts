import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, DefineComponent, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import FormError from '@/components/FormError.vue';

import AppState from '@/plugins/appState';
import {definePreset} from '@primeuix/themes';
import Theme from '@primeuix/themes/aura';
// import Theme from '@primeuix/themes/material';
import AppLayout from '@/Layouts/AppLayout.vue';
import ThemeSwitcher from '@/Layouts/partials/ThemeSwitcher.vue';

import { initializeTheme } from '@/composables/useAppearance';

const MyPreset = definePreset(Theme, {});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel-Inertia-Primevue';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name: string) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>("./Pages/**/*.vue")
        )
        page.default.layout ??= AppLayout
        return page
    },
    setup({el, App, props, plugin}) {
        createApp({render: () => h(App, props)})
            .component('ThemeSwitcher', ThemeSwitcher)
            .component('FormError', FormError)
            .directive('ripple', Ripple)
            .directive('styleclass', StyleClass)
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: MyPreset,
                    options: {
                        /*cssLayer: {
                            name: 'primevue',
                            order: 'theme, base, primevue',
                        },*/
                        darkModeSelector: '.dark',
                    },
                },
                ripple: true,
            })
            .use(AppState)
            .use(ToastService)
            .use(ConfirmationService)
            .use(DialogService)
            .mount(el);
        initializeTheme();
    },
    progress: {
        color: '#4B5563',
    },
});
