import axios from "axios";
import { RequestInfo } from "undici-types";

const DATA_API_URL = "http://localhost:8082";
const DATA_USER_PATH = "/api/users";
const api = axios.create({
  baseURL: "http://localhost:8082/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});
export const getAllUsuarios = async () => {
  try {
    const response = await api.get(`${DATA_API_URL}${DATA_USER_PATH}/`);
    return response.data;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

export const getUsuarioById = async (id: any) => {
  try {
    const response = await api.get(`${DATA_API_URL}${DATA_USER_PATH}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting user by ID ${id}:`, error);
    throw error;
  }
};

export const createUsuario = async (userDTO: any) => {
  try {
    const response = await api.post(
      "${DATA_API_URL}${DATA_USER_PATH}/",
      userDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUsuario = async (id: any, userDTO: any) => {
  try {
    const response = await api.put(
      `${DATA_API_URL}${DATA_USER_PATH}/${id}`,
      userDTO
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const updateAboutMe = async (id: number, aboutMe: string) => {
  try {
    const response = await api.put(
      `${DATA_API_URL}${DATA_USER_PATH}/${id}/aboutMe`,
      { aboutMe }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating aboutMe for user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUsuario = async (id: any) => {
  try {
    await api.delete(`${DATA_API_URL}${DATA_USER_PATH}/${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export const getUsuarioIdByUsername = async (
  username: string
): Promise<number> => {
  try {
    const response = await api.get(
      `${DATA_API_URL}${DATA_USER_PATH}/username/${username}/id`
    );
    console.log(response.data);

    const id = response.data;
    return id;
  } catch (error) {
    console.error(`Error getting user ID by username ${username}:`, error);
    throw error;
  }
};
export const uploadProfileImage = async (
  id: any,
  file: { name: string; uri: string }
) => {
  const formData = new FormData();
  const blob = await convertFileToBlob(file);

  formData.append("file", blob, file.name);

  try {
    const response = await api.post(
      `${DATA_API_URL}${DATA_USER_PATH}/${id}/uploadProfileImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error uploading profile image for user with ID ${id}:`,
      error
    );
    throw error;
  }
};

const convertFileToBlob = async (file: { uri: RequestInfo }) => {
  const response = await fetch(file.uri);
  const blob = await response.blob();
  return blob;
};
