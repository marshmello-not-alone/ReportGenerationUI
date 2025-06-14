let isAuthenticated = false;

export function useAuth() {
  return {
    isAuthenticated: () => isAuthenticated,
    login: () => {
      isAuthenticated = true;
    },
    logout: () => {
      isAuthenticated = false;
    },
  };
}
