import { create } from 'zustand'

export type TGlobalStoreType = {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
    numOfCustomersToShow: number
    setNumOfCustomersToShow: (numOfCustomersToShow: number) => void
}

const useGlobalStore = create<TGlobalStoreType>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),

    numOfCustomersToShow: 10,
    setNumOfCustomersToShow: (numOfCustomersToShow: number) => set({ numOfCustomersToShow }),
}))

export default useGlobalStore