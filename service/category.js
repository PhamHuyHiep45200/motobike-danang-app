import request from ".";

export async function getCategory(params) {
  return request(`/category`, {
    method: "GET",
    params
  });
}