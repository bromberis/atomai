import axiosUser from "../apiUsers";
import swal from "sweetalert";

export async function getAllUsersData() {
  const res = await axiosUser.get("/");
  return res;
}

export async function createUserData(data) {
  const response = await axiosUser.post("/", JSON.stringify(data));
  return response;
}

// income

export async function findIncomeDataAndUpdate(data, id, subID) {
  // console.log(data);
  // console.log(id);
  // console.log(subID);
  const response = await axiosUser
    .patch(`/${id}/inc/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
  swal("Puiku!", "Klaida ištaisyta!", "success");
  return response;
}

export async function findIncomeAndDelete(id, subID) {
  const response = await axiosUser
    .patch(`/${id}/inc/dlt/${subID}`)
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Ištrinta!",
        icon: "success",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
}

//expenses

export async function findExpensesDataAndUpdate(data, id, subID) {
  // console.log(data);
  // console.log(id);
  // console.log(subID);
  const response = await axiosUser
    .patch(`/${id}/exp/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
  return response;
}

export async function findExpensesAndDelete(id, subID) {
  const response = await axiosUser
    .patch(`/${id}/exp/dlt/${subID}`)
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Ištrinta!",
        icon: "success",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
}
