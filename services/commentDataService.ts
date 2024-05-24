// commentsService.js
import axios from 'axios';

// Configuración de axios
const api = axios.create({
    baseURL: 'http://tu-backend-url/api', // Reemplaza con la URL de tu backend
});

// Funciones de servicio
export const getAllComentarios = async () => {
    try {
        const response = await api.get('/comments');
        return response.data;
    } catch (error) {
        console.error('Error fetching comments', error);
        throw error;
    }
};

export const getComentarioById = async (id: number) => {
    try {
        const response = await api.get(`/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comment by ID', error);
        throw error;
    }
};

export const createComentario = async (commentsDTO: any, userId: any) => {
    try {
        const response = await api.post('/comments', { ...commentsDTO, userId });
        return response.data;
    } catch (error) {
        console.error('Error creating comment', error);
        throw error;
    }
};

export const updateComentario = async (id: any, commentsDTO: any) => {
    try {
        const response = await api.put(`/comments/${id}`, commentsDTO);
        return response.data;
    } catch (error) {
        console.error('Error updating comment', error);
        throw error;
    }
};

export const deleteComentario = async (id: any) => {
    try {
        await api.delete(`/comments/${id}`);
    } catch (error) {
        console.error('Error deleting comment', error);
        throw error;
    }
};
