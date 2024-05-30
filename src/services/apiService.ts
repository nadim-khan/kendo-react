// src/services/apiService.ts

import apiClient from "./apiClient";


interface PostData {
  id: number;
  title: string;
  body:string;
}

interface UserData {
  id: number;
  name: string;
  email:string;
  gender: string;
  status:string;
}
interface CommentsData {
  id: number,
        post_id: number,
        name: string,
        email: string,
        body: string
}

interface CreateDataRequest {
  name: string;
}

const apiService = {
  getAllUsersList: async (pageNumber,pageSize): Promise<UserData[]> => {
    const response = await apiClient.get<UserData[]>(`/users?page=${pageNumber}&per_page=${pageSize}`);
    return response.data;
  },

  getPostByUserData: async (id): Promise<PostData[]> => {
    const response = await apiClient.get<PostData[]>(`/users/${id}/posts`);
    return response.data;
  },

  getCommentsById: async (id: number): Promise<CommentsData[]> => {
    const response = await apiClient.get<CommentsData[]>(`/posts/${id}/comments`);
    return response.data;
  },
};

export default apiService;
