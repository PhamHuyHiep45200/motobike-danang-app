import request from ".";

export async function createOrder(data) {
  return request(`/order`, {
    method: "POST",
    data
  });
}
export async function getOrderById(id) {
  return request(`/order/${id}`, {
    method: "GET",
  });
}