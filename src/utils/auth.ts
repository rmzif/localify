// utils/auth.ts

import { loginUser } from '@/client/api';

// logs in user
export const handleLogin = async (userName: string, password: string) => {
  try {
    if (!userName || !password) {
      throw new Error('Username and password are required.');
    }

    const response = await loginUser({ userName, password });

    // Check if the response contains a token and userData
    if (response && response.message === 'Logged in successfully' && response.userData) {
      const token = response.token;
      const user = response.userData;

      // Handle the token, e.g., store it in local storage or a state management system
      localStorage.setItem('token', token);

      // Store the userData in localStorage
      localStorage.setItem('userData', JSON.stringify(user));
      console.log(token)

      return user;
    } else {
      // Handle login error
      throw new Error('Invalid login response');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const handleLogout = () => {
  // Remove the token from localStorage
  localStorage.removeItem('token');
  // Clear the user data from localStorage
  localStorage.removeItem('userData');
};
