import axiosLogs from "../apiLogs";

export async function createNewLog(log) {
  const res = await axiosLogs.post("/logs", JSON.stringify(log));
  return res;
}

export async function registerNewUser(id) {
  const res = await axiosLogs.get(`/logs/${id}`);
  return res;
}
