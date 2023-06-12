import request from ".";

export async function createOrder(data) {
  return request(`/order`, {
    method: "POST",
    data
  });
}
export async function getOrderById() {
  return request(`/order`, {
    method: "GET",
  });
}