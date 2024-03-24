import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';

export const Retrieve: React.FC = () => {

  const userContext = useContext(UserContext);

  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userContext?.getUser(email);
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
    </form>
  );
}
