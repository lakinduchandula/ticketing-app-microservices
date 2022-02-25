import { useState } from 'react'; // this is for keep track what user-input using inputs in form
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async event => {
    event.preventDefault(); // to prevent form it-self try submit to the browser

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err.response.data);
      setErrors(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="container">
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        {errors.length > 0 && ( // if there is errors in errors array then this div will show
          <div className="alert alert-danger mt-2">
            <h4>Ooops...</h4>
            <ul className="my-0">
              {errors.map(error => {
                return <li key={error.message}>{error.message}</li>;
              })}
            </ul>
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-2">
          Sign Up
        </button>
      </div>
    </form>
  );
};
