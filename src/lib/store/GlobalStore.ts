import { create } from 'zustand'

type TOrderBy = "asc" | "desc"

export type TGlobalStoreType = {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
    numOfCustomersToShow: number
    setNumOfCustomersToShow: (numOfCustomersToShow: number) => void
    sort: string[]
    setSort: (sort: string[]) => void
    order: TOrderBy
    setOrder: (order: TOrderBy) => void
}

const useGlobalStore = create<TGlobalStoreType>((set) => ({
    isLoggedIn: !!localStorage.getItem('token'),
    setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),

    numOfCustomersToShow: 10,
    setNumOfCustomersToShow: (numOfCustomersToShow: number) => set({ numOfCustomersToShow }),

    sort: [],
    setSort: (sort: string[]) => set({ sort }),

    order: 'asc',
    setOrder: (order: TOrderBy) => set({ order }),
}))

export default useGlobalStore