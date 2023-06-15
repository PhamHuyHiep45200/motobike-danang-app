import request from ".";

export async function createOrder(data) {
  return request(`/order`, {
    method: "POST",
    data,
  });
}
export async function getOrderById(id) {
  return request(`/order/${id}`, {
    method: "GET",
  });
}
export async function updateOrderById(id, data) {
  return request(`/order/${id}`, {
    method: "PUT",
    data,
  });
}
