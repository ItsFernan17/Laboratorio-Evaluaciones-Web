import { create } from 'zustand'

export const userStore = create ((set) => ({
    isPressed: false,
    setIsPressed: (isPressed) => set({ isPressed })
}))