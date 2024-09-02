export const saveReactionsToLocal = (key: string, reactions: any[]) => {
  localStorage.setItem(key, JSON.stringify(reactions));
};

export const loadReactionsFromLocal = (key: string): any[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
