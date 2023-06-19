import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Chat() {
  const socket = io("http://localhost:5000");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("chat", (message) => {
      // Xử lý tin nhắn từ server
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      // Đóng kết nối Socket.IO
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    console.log(e)
    socket.emit("send-chat", e);
  };
  return <div className="mt-[60px]">
    {
      messages.length && messages.map((e)=>{
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
