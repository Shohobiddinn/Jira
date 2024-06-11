import { useMutation } from "@tanstack/vue-query"
import { COLLECTION_DEALS, DB_ID } from "~/constants"
import { DATABASE } from "~/libs/appwrite"

export const useDelete = (refetch: Function) => {
    const toast = useToast()
    const { isPending, mutate } = useMutation({
        mutationKey: ['delete-deals'],
        mutationFn: (id: string) => DATABASE.deleteDocument(DB_ID, COLLECTION_DEALS, id),
        onSuccess: () => {
            toast.add({
                title: 'Success',
                description: 'Deal deleted successfully',
            })
            refetch()
        },
        onError: (err: any) => {
            toast.add({
                title: 'Error',
                description: err.message,
            })
        }
    })
    return { deleteDeal: mutate, isDeleting: isPending }
}