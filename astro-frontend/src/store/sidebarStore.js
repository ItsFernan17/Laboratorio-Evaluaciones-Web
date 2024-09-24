import { create } from 'zustand'

export const sidebarStore = create ((set) => ({
    isPressed: false,
    setIsPressed: (isPressed) => set({ isPressed })
}))