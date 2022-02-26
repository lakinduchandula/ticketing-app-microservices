import { useState } from 'react'; // this is for keep track what user-input using inputs in form
import Router from 'next/router';
import useRequest from '../../hooks/user-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async event => {
    event.preventDefault(); // to prevent form it-self try submit to the browser

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="container">
        <h1>Sign In</h1>
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
          Sign In
        </button>
      </div>
    </form>
  );
};
