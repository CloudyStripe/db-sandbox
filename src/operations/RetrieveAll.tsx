import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { RetrieveUsersDbResponse, User } from '../types/userTypes';

export const RetrieveAll: React.FC = () => {

  const userContext = useContext(UserContext);

  const [users, setUsers] = useState<User[]>([]);
  const [dbOperationError, setDbOperationError] = useState<string | null>(null);

  const onSuccessfulRetrieve = (retrieveUserSuccess: RetrieveUsersDbResponse) => {
    const users = retrieveUserSuccess.users || [];
    if (users.length > 0) {
      setUsers(users);
      setDbOperationError(null);
    }
    if (users.length === 0) {
      setDbOperationError('No users found.');
    }
  }

  const onFailedRetrieve = (retrieveUserFailure: RetrieveUsersDbResponse) => {
    setDbOperationError(`Error retrieving user: ${retrieveUserFailure.message}`);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDbOperationError(null); 
    userContext?.getAllUsers(onSuccessfulRetrieve, onFailedRetrieve);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-fields">
        <button type="submit" className="form-button">Retrieve All Users</button>
      </div>
      <div className="operationInformation">
        {dbOperationError && <div className="error-message">{dbOperationError}</div>}
        {users.length > 0 && users.map(user => {
          return (
            <div className="user">
              <div>Username: {user.username}</div>
              <div>Email: {user.email}</div>
              <div>DOB: {user.dob}</div>
              <div>Street: {user.street}</div>
              <div>City: {user.city}</div>
              <div>State: {user.state}</div>
              <div>Zip: {user.zip}</div>
            </div>
          )
        })}
      </div>
    </form>
  );
}
