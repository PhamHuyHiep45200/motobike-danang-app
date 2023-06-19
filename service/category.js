import request from ".";

export async function getCategory(params) {
  return request(`/category`, {
    method: "GET",
    params
  });
}
export async function getCategoryById(id) {
  return request(`/category/${id}`, {
    method: "GET",
  });
}