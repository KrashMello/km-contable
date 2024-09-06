export type State = {
  accounts: {
    id: string;
    name: string;
    accountType: { name: string };
  }[];
  accountsAmount: { account: string; amount: number }[];
  accountType: {
    id: string;
    name: string;
  }[];
  currency: {
    id: string;
    name: string;
  }[];
};

export type Action = {
  getAccount: () => void;
  getCurrency: () => void;
  getAccountType: () => void;
  getAllAccountAmount: () => void;
  createAccount: (data: {
    name: string;
    accountType: string;
    currencyType: string;
  }) => promise<[number, any]>;
};
