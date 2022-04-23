import axiosUser from "../apiUsers";

export async function getAllUsersData() {
  const res = await axiosUser.get("/");
  return res;
}

export async function createUserData(data) {
  const response = await axiosUser.post("/", JSON.stringify(data));
  return response;
}

export async function findIncomeDataAndUpdate(data, id, subID) {
  // console.log(data);
  // console.log(id);
  // console.log(subID);
  const response = await axiosUser.patch(
    `/${id}/inc/${subID}`,
    JSON.stringify(data)
  );
  return response;
}

export async function findExpensesDataAndUpdate(data, id, subID) {
  // console.log(data);
  // console.log(id);
  // console.log(subID);
  const response = await axiosUser.patch(
    `/${id}/exp/${subID}`,
    JSON.stringify(data)
  );
  return response;
}
