import request from ".";

export async function getMoto(params) {
  return request(`/moto/search`, {
    method: "GET",
    params
  });
}

export async function getMotoById(id) {
    return request(`/moto/${id}`, {
      method: "GET"
    });
  }

export async function getMotoStar(id) {
  return request(`/moto/get-star/order`, {
    method: "GET"
  });
}

export async function getMotoRent(id) {
  return request(`/moto/get-paids/order`, {
    method: "GET"
  });
}

export async function getMotoNew(id) {
  return request(`/moto/get-moto-new/home`, {
    method: "GET"
  });
}
export async function createMoto(data) {
  return request(`/moto`, {
    method: "POST",
    data
  });
}
export async function rateMoto(id,data) {
  return request(`/moto/rate/${id}`, {
    method: "PUT",
    data
  });
}