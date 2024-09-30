type State = {
  expenses: {
    id: string;
    date_entry: string;
    category: { currency: { abbreviation: string } };
    amount: string;
    description: string;
  }[];
  incomes: {
    id: string;
    date_entry: string;
    account: { currency: { abbreviation: string } };
    amount: string;
    description: string;
  }[];
  allExpensesTypes: {
    total_amount: string;
    name: string;
  }[];
  types: {
    id: string;
    name: string;
  }[];
};

type Action = {
  getExpenses: () => void;
  getIncomes: () => void;
  getAllAmountExpenses: () => void;
  getType: () => void;
  createTransaction: (data: {
    description: string;
    amount: string;
    accountId: string;
    typeId: sting;
    dateEntry: string | Date;
  }) => promise<[number, any]>;
};
