import request from ".";

export async function getCategory() {
  return request(`/category`, {
    method: "GET",
  });
}