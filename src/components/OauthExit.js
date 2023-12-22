

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';


const OauthExit = ()=> {

  const { exit } = useParams();
  
  const navigate =useNavigate();

  useEffect(()=>{
    navigate('/userlogin', { state: exit});
  }, []);
  

  
}

export default OauthExit;