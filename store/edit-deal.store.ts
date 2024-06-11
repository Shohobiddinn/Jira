import type { IDeal } from "~/types";

const initialState: { deal: IDeal | null, isOpen: boolean } = {
    deal: null,
    isOpen: false
};

export const useEditDealStore = defineStore('edit-deal', {
    state: () => initialState,

    actions: {
        set(deal: IDeal) {
            this.$patch({ deal, isOpen: true })
            
        },
        clear() {
            this.$patch(initialState)
        },
        toggle(isOpen: boolean) {
            this.isOpen = !this.isOpen
        },
    }
})