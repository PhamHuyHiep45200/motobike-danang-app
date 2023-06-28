import { CreateContext } from "@/context/ContextProviderGlobal";
import { getChatByUser } from "@/service/message";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

function Chat() {
  const { user } = useContext(CreateContext);
  const [form] = Form.useForm();
  const router = useRouter();
  const ref = useRef();
  const [mes, setMes] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on("chat", (data) => {
      // Nhận tin nhắn mới từ server
      if (
        localStorage.getItem("userId") === data.idPersonSend.toString() ||
        localStorage.getItem("userId") === data.idPersonRecipient.toString()
      ) {
        setMes((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      newSocket.disconnect(); // Ngắt kết nối khi component bị hủy
    };
  }, []);

  const handleSendMessage = (e) => {
    socket.emit("sendChat", {
      idPersonSend: user.id,
      message: e.message,
    }); // Gửi tin nhắn lên server
    form.resetFields();
  };

  useEffect(() => {
    if (!user) {
      router.push(`/login?path=chat`);
    } else {
      getAllMess();
    }
  }, []);
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [mes]);
  const getAllMess = async () => {
    const res = await getChatByUser({
      idPersonSend: localStorage.getItem("userId"),
    });
    if (res.data && res.data.status === 200) {
      setMes(res.data.data);
    }
  };
  return (
    <div className="mt-[60px] px-5">
      <h3 className="font-medium">Chat với admin</h3>
      <div
        className="min-h-[76vh] max-h-[76vh] overflow-y-auto bg-[#eaeaea] rounded-[4px]"
        ref={ref}
      >
        <div className="min-h-[76vh] flex flex-col justify-end">
          {mes.length > 0 &&
            mes.map((e, i) => {
              const checkSendUser =
                localStorage.getItem("userId") === e.idPersonSend.toString();
              return (
                <div
                  key={e.id}
                  style={{
                    justifyContent: checkSendUser ? "end" : "start",
                  }}
                  className="mb-[10px] flex "
                >
                  <span
                    style={{
                      background: checkSendUser ? "#07c2b2" : "white",
                      color: checkSendUser ? "white" : "black",
                    }}
                    className="px-[10px] py-[5px] mr-[10px] ml-[10px] rounded-[4px] text-[16px] block max-w-[250px]"
                  >
                    {e.message}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="fixed bottom-0 right-0 left-0 h-[60px] px-5">
        <Form onFinish={handleSendMessage} form={form}>
          <div className="flex items-center space-x-[5px]">
            <Form.Item name="message" noStyle>
              <Input placeholder="nhập tin nhắn ... " />
            </Form.Item>
            <Button
              htmlType="submit"
              className="flex items-center justify-center"
            >
              <SendOutlined />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Chat;
