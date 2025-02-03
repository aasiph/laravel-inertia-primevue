import {App} from 'vue';
import {useDark} from '@vueuse/core';

export default {
    install: (app: App) => {
        app.config.globalProperties.isDark = useDark();
    },
};
