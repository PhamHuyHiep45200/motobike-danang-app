import request from ".";

export async function getChatByUser(params) {
  return request(`/chat`, {
    method: "GET",
    params
  });
}