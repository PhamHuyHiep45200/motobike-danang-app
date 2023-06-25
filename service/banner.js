import request from ".";

export async function getBanner() {
  return request(`/banner`, {
    method: "GET",
  });
}