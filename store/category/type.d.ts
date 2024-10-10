export type State = {
  categories: {
    id: string;
    name: string;
    accountType: { name: string };
  }[];
};

export type Action = {
  getCategories: () => void;
};
