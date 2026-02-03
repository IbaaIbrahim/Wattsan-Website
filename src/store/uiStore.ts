import { createStore } from 'zustand-x'

export type TUIStore = {
    isMenuSidebarOpen: boolean
    isCatalogSidebarOpen: boolean
}

export const uiStore = createStore('ui')<TUIStore>({
    isMenuSidebarOpen: false,
    isCatalogSidebarOpen: false
}).extendActions((set, get) => ({
    toggleMenuSidebar: (open?: boolean) => {
        set.isMenuSidebarOpen(open ?? !get.isMenuSidebarOpen())
    },
    toggleCatalogSidebar: (open?: boolean) => {
        set.isCatalogSidebarOpen(open ?? !get.isCatalogSidebarOpen())
    }
}))
