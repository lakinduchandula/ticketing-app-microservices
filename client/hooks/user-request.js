import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      // this will only run when response is sucess
      if (onSuccess) {
        onSuccess(response.data); // callback func
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger mt-2">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map(error => {
              return <li key={error.message}>{error.message}</li>;
            })}
          </ul>
        </div>
      );
      // thorw error at this line will be logged in console in the browser
      // throw err;
    }
  };

  return { doRequest, errors };
};
