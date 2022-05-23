import axiosLogs from "../apiLogs";

export async function createNewLog(log) {
  const res = await axiosLogs.post(`/newLog/`, JSON.stringify(log));
  return res;
}
export async function getAllLogs() {
  const res = await axiosLogs.get(`/allLogs/`);
  return res;
}
