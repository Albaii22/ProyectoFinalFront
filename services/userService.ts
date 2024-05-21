const USERS_API_URL = "http://172.16.102.56:8888/users";
const REGISTER_PATH = "/register";
const LOGIN_PATH = "/login";

type UserJsonResponse = {
  id: number;
  name: string;
  email: string;
  hashedPwd: string;
};

type CookieUserJson = {
  username: string;
  codigoSalida: number;
};

const getInitRequest = (httpVerb: string, body: {}): RequestInit => {
  const init: RequestInit = {
    method: httpVerb,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return init;
};

export const registerUser = async (user: {}): Promise<CookieUserJson> => {
  let cookieUsuario = {
    username: "",
    codigoSalida: 0,
  };

  const request: RequestInfo = `${USERS_API_URL}${REGISTER_PATH}`;
  const response = await fetch(request, getInitRequest("POST", user));
  const json: UserJsonResponse = await response.json();

  cookieUsuario.codigoSalida = response.status;
  if (json != null) {
    cookieUsuario.username = json.name;
  }

  return cookieUsuario;
};

export const LoginUser = async (user: {}): Promise<number> => {
  const request: RequestInfo = `${USERS_API_URL}${LOGIN_PATH}`;
  const response = await fetch(request, getInitRequest("POST", user));
  const json: UserJsonResponse = await response.json();

  return response.status;
};
