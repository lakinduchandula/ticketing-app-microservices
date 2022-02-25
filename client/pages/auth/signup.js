import { useState } from 'react'; // this is for keep track what user-input using inputs in form

import useRequest from '../../hooks/user-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
  });

  const onSubmit = async event => {
    event.preventDefault(); // to prevent form it-self try submit to the browser

    doRequest();
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
        {
          errors /* no need to check wether errors have or not because initialy it equlas to null */
        }
        <button type="submit" className="btn btn-primary mt-2">
          Sign Up
        </button>
      </div>
    </form>
  );
};
