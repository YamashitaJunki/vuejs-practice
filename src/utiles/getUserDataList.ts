type GetUserDataListOut = Array<{
  userId: string;
  id: string;
  title: string;
  completed: string;
}>;

export const getUserDataList = async (): Promise<GetUserDataListOut> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!res) {
    throw new Error('fetchの結果が空です');
  }
  if (res.status !== 200) {
    throw new Error('fetchに失敗しました');
  }
  const json = await res.json();
  return json;
};
