import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Chat() {
  const [mes, setMes]=useState([])
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3006/');
    setSocket(newSocket);

    newSocket.on('message', (data) => {
      // Nhận tin nhắn mới từ server
      setMes((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect(); // Ngắt kết nối khi component bị hủy
    };
  }, []);

  const handleSendMessage = (e) => {
    socket.emit('send', e.message); // Gửi tin nhắn lên server
  };

  return <div className="mt-[60px]">
    {
      mes.length && mes.map((e)=>{
        return <div key={e}>{e}</div>
      })
    }
    <Form onFinish={handleSendMessage}>
      <Form.Item name="message">
        <Input/>
      </Form.Item>
      <Button htmlType="submit">send</Button>
    </Form>
  </div>;
}

export default Chat;
