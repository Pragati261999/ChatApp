import { create } from "zustand";

export const useThemeStore = create((set) => {
  const initialTheme = localStorage.getItem("togetia-theme") || "coffee";
  console.log("Initial theme:", initialTheme);
  
  return {
    theme: initialTheme,
    setTheme: (theme) => {
      localStorage.setItem("togetia-theme", theme);
      set({ theme });
    },
  };
});