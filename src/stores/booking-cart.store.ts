'use client';

import { create } from 'zustand';
import { BookingSlot } from '@/types';

interface CartItem extends BookingSlot {
  courtName: string;
  pricePerHour: number;
}

interface BookingCartState {
  items: CartItem[];
  totalAmount: number;
}

interface BookingCartActions {
  addItem: (item: CartItem) => void;
  removeItem: (courtId: string, date: string, startTime: string) => void;
  clearCart: () => void;
  isInCart: (courtId: string, date: string, startTime: string) => boolean;
}

export const useBookingCartStore = create<BookingCartState & BookingCartActions>()(
  (set, get) => ({
    items: [],
    totalAmount: 0,

    addItem: (item) =>
      set((state) => {
        const exists = state.items.some(
          (i) =>
            i.courtId === item.courtId &&
            i.date === item.date &&
            i.startTime === item.startTime,
        );
        if (exists) return state;

        const newItems = [...state.items, item];
        return {
          items: newItems,
          totalAmount: newItems.reduce((sum, i) => sum + i.pricePerHour, 0),
        };
      }),

    removeItem: (courtId, date, startTime) =>
      set((state) => {
        const newItems = state.items.filter(
          (i) =>
            !(i.courtId === courtId && i.date === date && i.startTime === startTime),
        );
        return {
          items: newItems,
          totalAmount: newItems.reduce((sum, i) => sum + i.pricePerHour, 0),
        };
      }),

    clearCart: () => set({ items: [], totalAmount: 0 }),

    isInCart: (courtId, date, startTime) =>
      get().items.some(
        (i) =>
          i.courtId === courtId && i.date === date && i.startTime === startTime,
      ),
  }),
);
