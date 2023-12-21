

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';


const OauthJoin = ()=> {

  const { userinfo } = useParams();
  
  const navigate =useNavigate();

  useEffect(()=>{
    navigate('/userjoin', { state: userinfo});
  }, []);
  

  
}

export default OauthJoin;