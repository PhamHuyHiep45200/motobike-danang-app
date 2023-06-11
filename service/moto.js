import request from ".";

export async function getMoto() {
  return request(`/moto`, {
    method: "GET"
  });
}

export async function getMotoById(id) {
    return request(`/moto/${id}`, {
      method: "GET"
    });
  }
export async function createMoto(data) {
  return request(`/moto`, {
    method: "POST",
    data
  });
}