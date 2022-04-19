import axiosUser from "../apiUsers";

export async function getAllUsersData() {
  const res = await axiosUser.get("/");
  return res;
}

export async function createUserData(data) {
  const response = await axiosUser.post("/", JSON.stringify(data));
  return response;
}
