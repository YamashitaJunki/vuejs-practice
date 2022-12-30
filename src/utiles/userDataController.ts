import { getUserDataList } from '@/utiles/getUserDataList';

type UserDataControllerOut = Array<Array<string>>;

export const userDataController = async (): Promise<UserDataControllerOut> => {
  const userData = await getUserDataList();
  const reducedDataList = userData.filter((user) => {
    return Number(user.id) < 10;
  });
  const userDataList = reducedDataList.map((user) => {
    const list = [user['id'], user['title']];
    return list;
  });
  return userDataList;
};
