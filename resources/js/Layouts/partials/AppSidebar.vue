<script setup lang="ts">
import { h, ref, VNode, withDirectives } from "vue";
import { NavigationLinks, MenuItem } from "@/Layouts/nav/navigation";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import { Link } from "@inertiajs/vue3";
import { useAppearance } from "@/composables/useAppearance";

const { toggleMenu, layoutState } = useAppearance();
const navlinks: MenuItem[] = NavigationLinks;

const sidebar = ref(null);

function menuToggle(): void {
    if (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)
        toggleMenu();
}

function toggleChevron(e: Event) {
    const el: HTMLElement = e.currentTarget as HTMLElement;
    el.children[2].classList.toggle("rotateChev");
}

function makeMenu(menu: MenuItem[], level: number): VNode {
    const ulClass =
        level == 0
            ? "list-none p-0 m-0 overflow-hidden"
            : "list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all duration-400 ease-in-out";
    return h(
        "ul",
        { class: ulClass },
        menu.map((item: MenuItem) => makeMenuItem(item, item.path, level))
    );
}

function makeMenuItem(menu: MenuItem, path: string, level: number) {
    // const style = level > 0 ? { paddingLeft: `${16 + level * 20}px` } : {};
    // const menulevel = level > 0 ? 'submenu' : 'mainmenu';

    const menuitemClass =
        "flex gap-2 items-center cursor-pointer p-2 rounded-md dark:text-surface-300 text-surface-700 hover:bg-surface-200 dark:hover:bg-surface-800";

    const elprops = {
        href: path,
        class: menuitemClass
        // style,
    };

    if (menu.external === true) {
        Object.assign(elprops, {
            target: "_blank"
        });
    }

    const child: VNode[] = [];
    if (menu.icon) {
        child.push(h("span", { class: "material-symbols-outlined zerofill" }, menu.icon));
    } else {
        child.push(h("span", { class: "material-symbols-outlined zerofill" }, "chevron_right"));
    }
    child.push(h("span", { class: "font-medium", innerHTML: menu.title }));

    if (menu.children) {
        const itemlink = () =>
            withDirectives(
                h(
                    "a",
                    {
                        class: menuitemClass,
                        onClick: (e) => toggleChevron(e)
                    },
                    [
                        ...child,
                        h("span", { class: "material-symbols-outlined zerofill ml-auto" }, "keyboard_arrow_right")
                    ]
                ),
                [
                    [Ripple],
                    [
                        StyleClass,
                        {
                            selector: "@next",
                            enterFromClass: "hidden",
                            enterActiveClass: "slidedown",
                            leaveToClass: "hidden",
                            leaveActiveClass: "slideup"
                        }
                    ]
                ]
            );
        return h("li", [h(itemlink), makeMenu(menu.children, level + 1)]);
    } else {
        const itemlink = () => withDirectives(h(Link, elprops, () => child), [[Ripple]]);
        return h("li", { onClick: () => menuToggle() }, h(itemlink));
    }
}

const sbroot = () =>
    h(
        "aside",
        {
            ref: sidebar,
            class: [
                "layout-sidebar fixed flex flex-col left-0 top-[4rem] z-999 w-[20rem] h-full overflow-y-auto border-r dark:border-r-surface-800 border-t dark:border-t-surface-800 bg-surface-50 dark:bg-surface-900 transition-all duration-500 ease-in-out"
            ]
        },
        makeMenu(navlinks, 0)
    );
</script>
<style lang="postcss">
@keyframes slidedown {
    0% {
        max-height: 0;
    }
    100% {
        max-height: 1000px;
    }
}

@keyframes slideup {
    0% {
        max-height: 1000px;
    }
    100% {
        max-height: 0;
    }
}

.rotateChev {
    transform: rotate(90deg);
}

.slidedown {
    animation: slidedown 0.3s ease-in-out;
}

.slideup {
    animation: slideup 0.3s cubic-bezier(0, 1, 0, 1);
}

.layout-ripple-disabled [data-pc-name='ripple'] {
    display: none !important;
}
</style>
<template>
    <sbroot />
</template>
