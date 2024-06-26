import { useContext, useState } from 'react';
import { IUsersModificationResponse, User } from '../types/userTypes';
import { UserContext } from '../context/userContext';

export const Edit: React.FC = () => {

  const userContext = useContext(UserContext);

  const [dbOperationResult, setDbOperationResult] = useState<string | null>(null);

  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    dob: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const onSuccessfulEdit = (editUserSucess: IUsersModificationResponse) => {
    setDbOperationResult(`User ${editUserSucess.userName} edited successfully.`);
  }

  const onFailedEdit = (editUserFailed: IUsersModificationResponse) => {
    setDbOperationResult(`Error adding user: ${editUserFailed.message}`);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDbOperationResult(null);
    userContext?.editUser(userData, onSuccessfulEdit, onFailedEdit);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
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
        <button type="submit" className="form-button">Edit User</button>
      </div>
      <div className="operationInformation">{dbOperationResult}</div>
    </form>
  );
}