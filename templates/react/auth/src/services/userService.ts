import type { IUserAuth } from "../types/auth";
import type { IUser, IUserPayload } from "../types/user";
import { apiService } from "./apiService";

class UserService {
  private base = "/users";

  async getData(id: string) {
    return await apiService.get<IUser>(`${this.base}/${id}`);
  }
  async update(id: string, data: IUserPayload) {
    return await apiService.put<IUserAuth>(`${this.base}/${id}`, data);
  }
  async uploadImage(id: string, image: File) {
    const formData = new FormData();
    formData.append("image", image);
    return await apiService.put<{ url: string }>(
      `${`${this.base}/${id}`}/image`,
      formData,
    );
  }

  async delete(id: string) {
    return await apiService.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
export const userService = new UserService();
