import { getCookie } from "cookies-next";
import { create } from "zustand";
import { Action, State } from "./type";

export const accountStore = create<State & Action>((set, get) => ({
  accounts: [],
  accountType: [],
  currency: [],
  accountsAmount: [],
  getCurrency: async () => {
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
    set({ currency: result });
  },
  getAccountType: async () => {
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
    set({ accountType: result });
  },
  getAccount: async () => {
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
  getAllAccountAmount: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/getAllMountsIncomes`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ accountsAmount: result });
  },
  createAccount: async (data) => {
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
    get().getAccount();
    return [status, result];
  },
}));
