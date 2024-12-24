import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Context/UserContext';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send HTTP POST request to backend
      const response = await axios.post('http://localhost:3003/users/login', {
        username,
        password,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { token, userId } = response.data;
        // Set the token in cookies with expiration time (e.g., 1 hour)
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);  // Expiry time (1 hour from now)

        document.cookie = `jwt=${token}; expires=${expiration.toUTCString()}; path=/; Secure; HttpOnly; SameSite=None`;
        setUserId(userId);

        alert('Přihlášení proběhlo úspěšně!');
        navigate('/shopping-list'); // Redirect to shopping-list
      }
    } catch (error) {
      console.error('Chyba při přihlašování:', error);
      setError('Nesprávné uživatelské jméno nebo heslo!');
    }
  };

  return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold mb-6">Přihlášení</h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Uživatel
              </label>
              <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Zadejte uživatelské jméno"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Heslo
              </label>
              <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Zadejte heslo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
              >
                Přihlásit se
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
