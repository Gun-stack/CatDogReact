import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';




const WebSocketComponent = () => {

  const [notification, setNotification] = useState('');
  const user = useSelector(state => state.user); // Redux 상태에서 로그인된 사용자 정보를 가져옴


  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8090/ws');


    socket.onopen = () => {
      console.log('WebSocket 연결이 열렸습니다.');

      if (user) {
        socket.send(JSON.stringify({ type: 'login', user }));  
      }
    };

    // 메시지를 수신했을 때
    socket.onmessage = (event) => {
      console.log('WebSocket에서 메시지 수신1:', event);
      
      const receivedNotification = event.data;
    
      setNotification(receivedNotification);
    };

    // 연결이 닫혔을 때
    socket.onclose = (event) => { 
      console.log('WebSocket 연결이 닫혔습니다.', event);
    };

    // 컴포넌트가 언마운트될 때 WebSocket 연결을 닫음
    return () => {
      socket.close();
    };
  }, [user]);

  return (
    <div>
      {notification && (
        <div>
          <p>새로운 알림:</p>
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default WebSocketComponent;
