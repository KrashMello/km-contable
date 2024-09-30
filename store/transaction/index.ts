import { getCookie } from "cookies-next";
import { create } from "zustand";

export const transactionStore = create<State & Action>((set, get) => ({
  expenses: [],
  incomes: [],
  types: [],
  allExpensesTypes: [],
  getExpenses: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/getAllExpenses`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ expenses: result });
  },
  getIncomes: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/getAllIncomes`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ incomes: result });
  },
  getAllAmountExpenses: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/getAllAmountExpenses`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ allExpensesTypes: result });
  },
  getType: async () => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/types`,
      {
        method: "GET",
        headers: {
          "x-access-id": String(getCookie("auth")),
        },
      },
    );
    result = await result.json();
    set({ types: result });
  },
  createTransaction: async (data) => {
    let result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
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
    if (status === 200) {
      get().getIncomes();
      get().getExpenses();
    }
    return [status, result];
  },
}));
