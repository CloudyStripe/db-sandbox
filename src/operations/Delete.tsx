import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { IUsersModificationResponse } from '../types/userTypes';

export const Delete: React.FC = () => {

  const userContext = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [dbOperationResult, setDbOperationResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onSuccessfulDelete = (deleteUserSuccess: IUsersModificationResponse) => {
    const user = deleteUserSuccess.userName;

    setDbOperationResult(`User ${user} deleted successfully.`);
  }

  const onFailedDelete = (deleteUserFailure: IUsersModificationResponse) => {
    setDbOperationResult(`Error retrieving user: ${deleteUserFailure.message}`);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDbOperationResult(null);
    userContext?.deleteUser(email, onSuccessfulDelete, onFailedDelete);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-input"
            value={email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-button">Delete User</button>
      </div>
      <div className="operationInformation">{dbOperationResult}</div>
    </form>
  );
}
