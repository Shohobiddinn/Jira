import { useQuery } from '@tanstack/vue-query';
import { Query } from 'appwrite';
import { COLLECTION_DEALS, DB_ID } from '~/constants';
import { DATABASE } from '~/libs/appwrite';
import { useAuthStore } from '~/store/auth.store';
export const useStatusQuery = () => {
    const { currentUser } = useAuthStore();
    return useQuery({
        queryKey: ['deals'],
        queryFn: () =>
            DATABASE.listDocuments(DB_ID, COLLECTION_DEALS, [Query.equal('userId', currentUser.id)]),
        select: (data) => console.log(data),
    })
}