import axiosUser from "../apiUsers";
import swal from "sweetalert";

export async function getAllUsersData() {
  const res = await axiosUser.get("/");
  return res;
}

export async function createUser(data) {
  const res = await axiosUser.post("/register", JSON.stringify(data));
  return res;
}
// delete user
export async function deleteUserById(id) {
  const res = await axiosUser.get(`/deleteUser/${id}`).then((result) => {
    swal({
      text: "Ištrinta!",
      icon: "success",
      button: "Gerai",
      timer: 2000,
    });
  });
  return res;
}

// find user By email
export async function getUsersByEmail(email) {
  const res = await axiosUser.post(`/userByEmail`, JSON.stringify(email));
  return res;
}
// find email
export async function getEmail(email) {
  const res = await axiosUser.get(`/email?email=${email}`);

  return res.data.data.users;
}

// update user by id
export async function updateUserById(data) {
  const res = await axiosUser.patch(`/updateUser`, JSON.stringify(data)).then((result) => {
    swal({
      text: "Vartotojas redaguotas",
      icon: "success",
      button: "Gerai",
      timer: 2000,
    });
  });

  return res;
}

export async function getUserById(id) {
  const res = await axiosUser.get(`/${id}`);
  return res;
}
// INCOME

export async function findIncomeDataAndUpdate(data, id, subID) {
  const response = await axiosUser
    .patch(`/${id}/inc/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  swal({
    title: "Puiku!",
    text: "Klaida ištaisyta!",
    icon: "success",
    button: "Gerai",
    timer: 2000,
  });

  return response;
}

export async function findIncomeAndDelete(id, subID) {
  const response = await axiosUser.patch(`/${id}/inc/dlt/${subID}`);
  return response;
}

export async function createUserIncome(id, data) {
  let resultUser;
  const response = await axiosUser
    .patch(`/${id}/inc/`, JSON.stringify(data))
    .then((result) => {
      resultUser = result.data.data.user;

      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return resultUser;
}

export async function getUserIncomeByMonth(id) {
  const res = await axiosUser.get(`/${id}/inc`);
  return res;
}

export async function getAllUserIncomeByMonth(id) {
  const res = await axiosUser.get(`/${id}/inc/all`);
  return res;
}

// EXPENSES

export async function findExpensesDataAndUpdate(data, id, subID) {
  const response = await axiosUser
    .patch(`/${id}/exp/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return response;
}

export async function findExpensesAndDelete(id, subID) {
  const response = await axiosUser.patch(`/${id}/exp/dlt/${subID}`);
  return response;
}

export async function createUserExpense(id, data) {
  const response = await axiosUser
    .patch(`/${id}/exp/`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return response;
}

export async function loginUser(data) {
  const res = await axiosUser.post(`/login?email=${data.email}&password=${data.password}`, JSON.stringify(data));
  return res;
}

export async function getUserExpensesByMonth(id) {
  const res = await axiosUser.get(`/${id}/exp`);
  return res;
}

export async function getUserExpensesThisMonth(id) {
  const res = await axiosUser.get(`/${id}/exp/thismonth`);
  return res;
}

export async function getAllUserExpensesByMonth(id) {
  const res = await axiosUser.get(`/${id}/exp/all`);
  return res;
}

// LIMITS

export async function getAllUserLimits(id) {
  const res = await axiosUser.get(`/${id}/limits`);
  return res;
}

export async function createUserLimits(id, data) {
  const response = await axiosUser
    .patch(`/${id}/limits/`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return response;
}

export async function findLimitAndUpdate(data, id, subID) {
  const response = await axiosUser
    .patch(`/${id}/limits/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Atnaujinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return response;
}

export async function findLimitAndDelete(id, subID) {
  const response = await axiosUser
    .patch(`/${id}/limits/dlt/${subID}`)
    .then((result) => {
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });
}
