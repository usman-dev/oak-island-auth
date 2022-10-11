import { ComponentType, useEffect, useState } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

let token: any = null;
const Authenticated = (Component: ComponentType) => (props: any) => {
  const [token1, setToken] = useState(token);

  useEffect(() => {
    token = localStorage.getItem('token');

    if (!token) {
      Router.push('/login');
    }
    setToken(token);
  }, []);
  return <>{token1 && <Component {...props} />}</>;
};

export default Authenticated;
