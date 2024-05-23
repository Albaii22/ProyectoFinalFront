import axios from "axios";

const USERS_API_URL = "http://localhost:8082/auth";

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

  const request: RequestInfo = `${USERS_API_URL}/register`;
  console.log(request);
  const response = await fetch(request, getInitRequest("POST", user));
  const json: UserJsonResponse = await response.json();

  cookieUsuario.codigoSalida = response.status;
  if (json != null) {
    cookieUsuario.username = json.name;
  }

  console.log(cookieUsuario);

  return cookieUsuario;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<number> => {
  try {
    const response = await axios.post(`${USERS_API_URL}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      console.log(response.data);
      return 200;
    } else {
      return response.status;
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    return 500; // Or any appropriate error code
  }
};
