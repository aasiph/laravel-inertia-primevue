import { computed, onMounted, reactive, ref } from "vue";

type Appearance = "light" | "dark" | "system";

const appearance = ref<Appearance>("system");

const layoutConfig = reactive({
    preset: "Aura",
    primary: "emerald",
    surface: null,
    darkTheme: false,
    menuMode: "static"
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    activeMenuItem: null
});


const executeThemeToggle = (isDark: boolean) => {
    layoutConfig.darkTheme = isDark;
    document.documentElement.classList.toggle("dark", isDark);
};

function updateTheme(value: Appearance) {
    if (typeof window === "undefined") {
        return;
    }
    let is_dark = false;

    if (value === "system") {
        const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        const systemTheme = mediaQueryList.matches ? "dark" : "light";
        is_dark = systemTheme === "dark";
    } else {
        is_dark = value === "dark";
    }
    if (!document.startViewTransition) {
        executeThemeToggle(is_dark);
        return;
    }
    document.startViewTransition(() => executeThemeToggle(is_dark));
}

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === "undefined") {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const mediaQuery = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return window.matchMedia("(prefers-color-scheme: dark)");
};

const getStoredAppearance = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("appearance") as Appearance | null;
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();

    updateTheme(currentAppearance || "system");
};

export function initializeTheme() {
    if (typeof window === "undefined") {
        return;
    }

    const savedAppearance = getStoredAppearance();
    updateTheme(savedAppearance || "system");

    // Set up system theme change listener...
    mediaQuery()?.addEventListener("change", handleSystemThemeChange);
}

export function useAppearance() {

    onMounted(() => {
        const savedAppearance = localStorage.getItem("appearance") as Appearance | null;

        if (savedAppearance) {
            appearance.value = savedAppearance;
        }
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;
        localStorage.setItem("appearance", value);
        setCookie("appearance", value);
        updateTheme(value);
    }

    // const setActiveMenuItem = (item) => {
    //     layoutState.activeMenuItem = item.value || item;
    // };

    const toggleMenu = () => {
        if (layoutConfig.menuMode === "overlay") {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isDarkMode = computed(() => layoutConfig.darkTheme);
    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);
    const getPrimary = computed(() => layoutConfig.primary);
    const getSurface = computed(() => layoutConfig.surface);

    return {
        appearance,
        updateAppearance,
        isDarkMode,
        layoutConfig,
        layoutState,
        toggleMenu,
        isSidebarActive,
        getPrimary,
        getSurface
        // setActiveMenuItem,
    };
}
