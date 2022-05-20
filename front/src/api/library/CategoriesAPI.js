import axiosCategories from "../apiCategories";
import swal from "sweetalert";

export async function getAllExpCategories() {
  const res = await axiosCategories.get("/expcategories");
  return res;
}

export async function getExpCategoryById(id) {
  const res = await axiosCategories.get(`/expcategories/${id}`);
  return res;
}

export async function updateExpCategory(id, data) {
  const response = await axiosCategories
    .patch(`/expcategories/${id}`, JSON.stringify(data))
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

export async function createExpCategory(data) {
  const res = await axiosCategories
    .post("/expcategories", JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(res);
}

export async function deleteExpCategory(id) {
  const res = await axiosCategories
    .get(`/expcategories/dlt/${id}`)
    .then((result) => {
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    });
  return res;
}
