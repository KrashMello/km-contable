import { getCookie } from "cookies-next";
import { create } from "zustand";
import { Action, State } from "./type";

export const categoryStore = create<State & Action>((set, get) => ({
  categories: [],
  getCategories: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/?transactionType=2`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ categories: result });
  },
}));
