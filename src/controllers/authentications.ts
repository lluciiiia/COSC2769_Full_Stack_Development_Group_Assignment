export const registerUser = async (userData: {
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // Ensure the session cookie is included
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
};

export const logout = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    return { message: "Logout successful" };
  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
};

export const fetchedSession = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/session",
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetched session");
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error("Network error");
  }
};
