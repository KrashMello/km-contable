import { getCookie } from "cookies-next";
import { create } from "zustand";
import { Action, State } from "./type";

export const categoryStore = create<State & Action>((set, get) => ({
  categories: [],
  categoriesDebits: [],
  categoriesTypes: [],
  accountsTypes: [],
  currencyTypes: [],
  accounts: [],
  createCategory: async (data) => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category`,
      {
        method: "POST",
        headers: {
          "x-access-id": String(getCookie("auth")),
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const status = await result.status;
    result = await result.json();
    get().getCategories();
    get().getAccounts();
    return [status, result];
  },
  getAccounts: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/?transactionType=1`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ accounts: result });
  },
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
  getCategoriesDebits: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/?transactionType=1`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ categoriesDebits: result });
  },
  getCategoriesTypes: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/transactionType`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ categoriesTypes: result });
  },
  getAccountsTypes: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/account`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ accountsTypes: result });
  },
  getCurrencyTypes: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/currency`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ currencyTypes: result });
  },
}));
