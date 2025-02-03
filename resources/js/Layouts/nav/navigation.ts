export interface MenuItem {
    title: string;
    icon?: string;
    path: string;
    external?: boolean;
    badge?: string;
    roles?: string[];
    children?: MenuItem[];
}

export const NavigationLinks: MenuItem[] = [
    {
        title: "Dashboard",
        icon: "dashboard",
        path: route("dashboard")
    },
    {
        title: "Auth",
        icon: "note_stack",
        path: "pages",
        children: [
            {
                title: "Sub 1",
                path: route("pages.pageone")
            },
            {
                title: "Sub 2",
                icon: "link",
                path: route("pages.pagetwo")
            },
            {
                title: "Error",
                icon: "note_stack",
                path: "error",
                children: [
                    {
                        title: "Common",
                        icon: "link",
                        path: route("pages.error")
                    },
                    {
                        title: "400",
                        icon: "link",
                        path: route("pages.error400")
                    },
                    {
                        title: "403",
                        icon: "link",
                        path: route("pages.error403")
                    },
                    {
                        title: "404",
                        icon: "link",
                        path: route("pages.error404")
                    },
                    {
                        title: "500",
                        icon: "link",
                        path: route("pages.error500")
                    }
                ]
            }
        ]
    },
    {
        title: "Error",
        icon: "note_stack",
        path: "error",
        children: [
            {
                title: "Common",
                icon: "link",
                path: route("pages.error")
            },
            {
                title: "400",
                icon: "link",
                path: route("pages.error400")
            },
            {
                title: "403",
                icon: "link",
                path: route("pages.error403")
            },
            {
                title: "404",
                icon: "link",
                path: route("pages.error404")
            },
            {
                title: "500",
                icon: "link",
                path: route("pages.error500")
            }
        ]
    }
];
