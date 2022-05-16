import axiosCategories from "../apiCategories";

export async function getAllExpCategories() {
  const res = await axiosCategories.get("/expcategories");
  return res;
}

export async function getExpCategoryById(id) {
  const res = await axiosCategories.get(`/expcategories/${id}`);
  return res;
}

export async function updateExpCategory(id, data) {
  let resultCategories;
  const response = await axiosCategories
    .patch(`/expcategories/${id}/`, JSON.stringify(data))
    .then((result) => {
      resultCategories = result.data.data.categories;
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return resultCategories;
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
  const response = await axiosCategories
    .patch(`/expcategories/${id}`)
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
