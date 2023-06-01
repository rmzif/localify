import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/forms/login';
import { handleLogout } from '@/utils/auth';

interface UserData {
  userName: string;
  // Add other user data properties as needed
}

const LoginPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user data is stored in localStorage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      try {
        // Parse the storedUserData
        const user = JSON.parse(storedUserData);

        if (user) {
          setUserData(user);
        }
      } catch (error) {
        console.error('User data parsing error:', error);
      }
    } else {
      // Clear the user data from state if it's not present in localStorage
      setUserData(null);
    }
  }, []);

  const handleLoginSuccess = (userData: UserData) => {
    // Store the user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update the state with the user data
    setUserData(userData);
  };

 
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      {userData && (
        <div>
          <h2>User Data:</h2>
          <p>Username: {userData.userName}</p>
          {/* Display other user data properties here */}
        </div>
      )}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default LoginPage;
