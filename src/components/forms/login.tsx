import React, { useState } from 'react';
import { handleLogin } from '../../utils/auth';

interface LoginFormProps {
  onLoginSuccess: (userData: UserData) => void;
}

interface UserData {
  username: string;
  // Add other user data properties as needed
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the login API or authentication function
      const userData = await handleLogin(username, password);

      // Call the onLoginSuccess callback with the user data
      onLoginSuccess(userData);
    

      // Clear the input fields
      setUsername('');
      setPassword('');
    } catch (error) {
      // Handle login error, e.g., display an error message to the user
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            id="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
