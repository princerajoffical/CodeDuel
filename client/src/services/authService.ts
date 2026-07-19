import api from "./api";
import type {
  LoginData,
  RegisterData,
  AuthResponse,
} from "../types/auth";

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};