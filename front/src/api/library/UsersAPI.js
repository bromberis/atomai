import axiosUser from "../apiUsers";
import swal from "sweetalert";
//import { setUser } from "../../components/context/UserContext";

export async function getAllUsersData() {
  const res = await axiosUser.get("/");
  return res;
}

// export async function createUser(data) {
//   const response = await axiosUser
//     .post("/", JSON.stringify(data))
//     .then((result) => {
//       console.log("Success:", result);
//       swal({
//         text: "Registracija sekminga, dabar galite prisijungti",
//         icon: "success",
//         button: "Gerai",
//         timer: 1000,
//       });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       swal({
//         text: "Toks el. pastas jau egzistuoja",
//         icon: "error",
//         button: "Gerai",
//         timer: 5000,
//       });
//     });
// }
export async function createUser(data) {
  const res = await axiosUser
    .post("/register", JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Registracija sekminga, dabar galite prisijungti",
        icon: "success",
        button: "Puiku",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal({
        text: "Toks vartotojas jau egzistuoja",
        icon: "error",
        button: "Gerai",
        timer: 5000,
      });
    });
  console.log(res);
}

// find user By email
export async function getUsersByEmail(email) {
  console.log(email);
  const res = await axiosUser.post(`/userByEmail`, JSON.stringify(email));
  return res;
}
// find email
export async function getEmail(email) {
  const res = await axiosUser.get(`/email?email=${email}`);
  //console.log(res);

  return res.data.data.users;
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
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
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
  const response = await axiosUser
    .patch(`/${id}/inc/dlt/${subID}`)
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });
}

export async function createUserIncome(id, data) {
  let resultUser;
  const response = await axiosUser
    .patch(`/${id}/inc/`, JSON.stringify(data))
    .then((result) => {
      resultUser = result.data.data.user;
      console.log("Success:", result);
      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
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
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
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
  const response = await axiosUser
    .patch(`/${id}/exp/dlt/${subID}`)
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
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
        button: "Gerai",
        icon: "success",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
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
  // console.log(data);
  let response;
  const res = await axiosUser
    .post(
      `/login?email=${data.email}&password=${data.password}`,
      JSON.stringify(data)
    )
    .then((result) => {
      response = result;
      // console.log("Success:", result.data.user);
      // setUser(result.data.data.user);
      swal({
        text: "Pavyko prisijungti!",
        icon: "success",
        button: "Puiku",
        timer: 5000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal({
        text: "Duomenys blogai suvesti, galimai rašybos klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  // console.log(`here`, response);
  return response;
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
  console.log(id);
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
      // console.error("Error:", error);
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
      console.log("Success:", result);
      swal({
        text: "Atnaujinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
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
      // console.error("Error:", error);
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });
}
