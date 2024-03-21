import { useEffect, useState } from 'react';
import { UserContext } from './database/userContext';
import { User } from './types/userTypes';
import './App.css';

export const App: React.FC = () => {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    dob: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [userContext, setUserContext] = useState<UserContext | null>(null);

  useEffect(() => {
    const db = new UserContext();
    db.init();
    setUserContext(db);
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userContext?.addUser(userData);
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob" className="form-label">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="form-input"
            value={userData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street" className="form-label">Street Address:</label>
          <input
            type="text"
            id="street"
            name="street"
            className="form-input"
            value={userData.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className="form-label">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-input"
            value={userData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state" className="form-label">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            className="form-input"
            value={userData.state}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip" className="form-label">Zip Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            className="form-input"
            value={userData.zip}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </div>
    </form>
  );
}

export default App;