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

// INCOME

export async function findIncomeDataAndUpdate(data, id, subID) {
  const response = await axiosUser
    .patch(`/${id}/inc/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });

  swal({
    title: "Puiku!",
    text: "Klaida ištaisyta!",
    icon: "success",
    button: "Gerai",
    timer: 500,
  });

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
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
}

export async function createUserIncome(id, data) {
  console.log(data);
  console.log(id);
  const response = await axiosUser
    .patch(`/${id}/inc/`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Įrašas išsaugotas!",

        icon: "success",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });

  return response;
}

export async function getUserIncomeByMonth(id) {
  const res = await axiosUser.get(`/${id}/inc`);
  return res;
}

// EXPENSES

export async function findExpensesDataAndUpdate(data, id, subID) {
  const response = await axiosUser
    .patch(`/${id}/exp/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 500,
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
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
}

export async function createUserExpense(id, data) {
  console.log(id);
  console.log(data);
  const response = await axiosUser
    .patch(`/${id}/exp/`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Įrašas išsaugotas!",

        icon: "success",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });

  return response;
}
export async function getUserExpensesByMonth(id) {
  const res = await axiosUser.get(`/${id}/exp`);
  return res;
}
