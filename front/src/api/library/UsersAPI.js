import axiosUser from "../apiUsers";
import swal from "sweetalert";

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
    .post("/", JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Registracija sekminga, dabar galite prisijungti",
        icon: "success",
        button: "Puiku",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Nepavyko", "Duomenys blogai suvesti, galimai rašybos klaida!", "error");
    });
}
// find email
export async function getUserEmailFront(email) {
  const res = await axiosUser.get(`/email?email=${email}`);
  //console.log(res);
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
