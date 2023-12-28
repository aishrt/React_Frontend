import axios from "axios";
import { AuthUser } from "./types";
import { API_URL } from "../../config";

export const getUser = (): Promise<AuthUser> => {
  return axios.get(`${API_URL}/auth/me`);
};
