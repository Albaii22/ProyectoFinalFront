import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api/publications",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createPublication = async (
  userId: number,
  publicationDTO: PublicationsDTO
): Promise<PublicationsDTO> => {
  try {
    const response = await api.post<PublicationsDTO>(
      `/${userId}`,
      publicationDTO
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error creating publication for user with ID ${userId}:`,
      error
    );
    throw error;
  }
};

export const getAllPublications = async (): Promise<PublicationsDTO[]> => {
  try {
    const response = await api.get<PublicationsDTO[]>("");
    console.log(response);

    const publications = response.data;
    console.log(publications);

    return publications;
  } catch (error) {
    console.error("Error fetching all publications:", error);
    throw error;
  }
};

export const getPublicationById = async (
  id: number
): Promise<PublicationsDTO> => {
  try {
    const response = await api.get<PublicationsDTO>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching publication with ID ${id}:`, error);
    throw error;
  }
};

export const updatePublication = async (
  id: number,
  publicationDTO: PublicationsDTO
): Promise<PublicationsDTO> => {
  try {
    const response = await api.put<PublicationsDTO>(`/${id}`, publicationDTO);
    return response.data;
  } catch (error) {
    console.error(`Error updating publication with ID ${id}:`, error);
    throw error;
  }
};

export const deletePublication = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting publication with ID ${id}:`, error);
    throw error;
  }
};

export const getPublicationsByUserId = async (
  userId: number
): Promise<PublicationsDTO[]> => {
  try {
    const response = await api.get<PublicationsDTO[]>(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching publications for user with ID ${userId}:`,
      error
    );
    throw error;
  }
};
