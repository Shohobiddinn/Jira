interface User {
    email: string;
    password: string;
    id: string;
    status: boolean;
}

const initialState : {user:User} = {
    user: {
        email: '',
        password: '',
        id: '',
        status: false
    }
}


export const useAuthStore = defineStore("auth",{
    state: ()=> initialState
})