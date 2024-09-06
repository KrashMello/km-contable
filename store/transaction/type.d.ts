type State = {
  expenses: {
    id: string;
    date_entry: string;
    account: { currency: { abbreviation: string } };
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
  types: {
    id: string;
    name: string;
  }[];
};

type Action = {
  getExpenses: () => void;
  getType: () => void;
  createTransaction: (data: {
    description: string;
    amount: string;
    accountId: string;
    typeId: sting;
    dateEntry: string | Date;
  }) => promise<[number, any]>;
};
