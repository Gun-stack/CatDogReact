import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setToken, loginStore } from '../actions';
import {url} from'../config';



const Oauth = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const authentication = useSelector((state) => state.token);
  const to = token; // 실제 토큰 값으로 대체

  const axiosConfig = {
    headers: {
      'Authorization': to
    }
  };


  useEffect(() => {
    // console.log("token:"+token);
    dispatch(setToken(token));
    axios.get(`http://localhost:8090/user`, axiosConfig)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        dispatch({ type: "SET_USER", payload: res.data })
        dispatch(loginStore())
      })
    navigate("/main");
  }, [])
}

export default Oauth;