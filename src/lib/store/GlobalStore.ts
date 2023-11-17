import { create } from 'zustand'

export type TGlobalStoreType = {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

const useGlobalStore = create<TGlobalStoreType>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
}))

export default useGlobalStore