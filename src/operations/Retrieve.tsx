import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { RetrieveUserDbResponse } from '../types/userTypes';

export const Retrieve: React.FC = () => {

  const userContext = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [dbOperationResult, setDbOperationResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onSuccessfulRetrieve = (retrieveUserSucess: RetrieveUserDbResponse) => {
    const user = retrieveUserSucess.user;

    if(user){
      setDbOperationResult(
        `User Information:\n` +
        `Username: ${user.username}\n` +
        `Email: ${user.email}\n` +
        `Date of Birth: ${user.dob}\n` +
        `Address:\n` +
        `Street: ${user.street}\n` +
        `City: ${user.city}\n` +
        `State: ${user.state}\n` +
        `Zip: ${user.zip}`
      );
    }

    if(!user){
      setDbOperationResult(retrieveUserSucess.message);
    }
  }

  const onFailedRetrieve = (retrieveUserFailure: RetrieveUserDbResponse) => {
    setDbOperationResult(`Error retrieving user: ${retrieveUserFailure.message}`);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setDbOperationResult(null);
    userContext?.getUser(email, onSuccessfulRetrieve, onFailedRetrieve);
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
        <button type="submit" className="form-button">Retrieve User</button>
      </div>
      <div className="operationInformation">{dbOperationResult}</div>
    </form>
  );
}
