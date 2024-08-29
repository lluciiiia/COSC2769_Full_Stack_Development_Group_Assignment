// authController.ts
export const registerUser = async (userData: { email: string; password: string; name?: string }) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
  
      const data = await response.json();
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Network error');
    }
  };
  
  export const loginUser = async (userData: { email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Ensure the session cookie is included
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      const data = await response.json();
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Network error');
    }
  };
  