import { create } from "zustand";
import api from "../api/api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  
  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

   fetchMe: async () => {
    try {
      const response = await api.post("/users/me");
      set({ user: response.data.data });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null });
    }
  },
}));

export default useAuthStore;