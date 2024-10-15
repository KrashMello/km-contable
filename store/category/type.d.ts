export type State = {
  categories: {
    id: string;
    name: string;
    account: { name: string };
  }[];
  accounts: {
    id: string;
    name: string;
    account: { name: string };
  }[];
  categoriesDebits: {
    id: string;
    name: string;
    account: { name: string };
  }[];
  categoriesTypes: {
    id: string;
    name: string;
  }[];
  accountsTypes: {
    id: string;
    name: string;
  }[];
  currencyTypes: {
    id: string;
    name: string;
    abbreviation: string;
  }[];
};

export type Action = {
  getCategories: () => void;
  getCategoriesDebits: () => void;
  getCategoriesTypes: () => void;
  getAccountsTypes: () => void;
  getCurrencyTypes: () => void;
  getAccounts: () => void;
  createCategory: (data: {
    name: string;
    accountId: string;
    currencyId: string;
    transaction_typeId: string;
  }) => promise<[number, any]>;
};
