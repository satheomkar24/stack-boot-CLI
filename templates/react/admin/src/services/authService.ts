import type { NavigateFunction } from "react-router-dom";
import { resetAuth } from "../store/authSlice";
import { apiService } from "./apiService";
import type { AppDispatch } from "../store";
import type {
  IAuthResponse,
  IForgotPassword,
  ILogin,
  IRegisterPayload,
  IResetPasswordPayload,
} from "../types/auth";
import type { IGenericResponse } from "../types/common";

class AuthService {
  private navigate!: NavigateFunction;
  private dispatch!: AppDispatch;

  init(navigate: NavigateFunction, dispatch: AppDispatch) {
    this.navigate = navigate;
    this.dispatch = dispatch;
  }

  private base = "/auth/admin";

  async register(data: IRegisterPayload) {
    return await apiService.post<IGenericResponse>(
      this.base + "/register",
      data,
    );
  }

  async login(data: ILogin) {
    return await apiService.post<IAuthResponse>(this.base + "/login", data);
  }

  async forgotPassword(data: IForgotPassword) {
    return await apiService.post<IGenericResponse>(
      this.base + "/forgot-password",
      data,
    );
  }

  async resetPassword(body: IResetPasswordPayload) {
    return await apiService.post<IGenericResponse>(
      this.base + "/reset-password",
      body,
    );
  }

  async activateAccount(token: string) {
    return await apiService.post<IGenericResponse>(
      `${this.base}/activate?token=${token}`,
    );
  }

  async resendActivation(email: string) {
    return await apiService.post<IGenericResponse>(
      this.base + "/resend-activation",
      { email },
    );
  }

  logout() {
    this.dispatch(resetAuth());
    this.navigate("/auth/login", { replace: true });
  }
}

export const authService = new AuthService();
