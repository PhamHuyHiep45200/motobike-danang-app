import request from ".";

export async function createOrder(data) {
  return request(`/order`, {
    method: "POST",
    data
  });
}