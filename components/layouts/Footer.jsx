import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#eaeaea] mt-5 px-5 py-5">
      <Row gutter={30}>
        <Col span={12}>
          <span className="text-[#111] font-medium text-[14px]">Liên hệ: </span>
          <div className="flex flex-col space-x-[5px] items-start space-y[5px]">
            <span className="flex text-[11px] items-center my-[4px] font-bold ml-[5px] text-[#555]">
              <HomeOutlined className="mr-[4px]"/>
              80 Cao Bá Quát
            </span>
            <span className="flex text-[11px] items-center my-[4px] font-bold ml-[10px] text-[#555]">
              <PhoneOutlined />
              .09748265428
            </span>
            <span className="flex items-center my-[4px] text-[11px] space-x-[6px] font-bold ml-[10px] text-[#555]">
              <MailOutlined />
              <span>NghiaPhan@gmail.com</span>
            </span>
          </div>
        </Col>
        <Col span={12}>
          <span className="text-[#111] font-medium text-[14px]">Liên kết: </span>
          <div className="flex flex-col space-x-[5px] items-start space-y[5px]">
            <span className="my-[3px] underline underline-offset-2 flex relative after:absolute after:content-[''] after:left-[-8px] after:top-[50%] after:translate-y-[-50%] after:w-[4px] after:h-[4px] after:bg-[#777] after:rounded-full text-[11px] items-center font-bold ml-[5px] text-[#555]">
              Trang chủ
            </span>
            <span className="my-[3px] underline underline-offset-2 flex relative after:absolute after:content-[''] after:left-[-8px] after:top-[50%] after:translate-y-[-50%] after:w-[4px] after:h-[4px] after:bg-[#777] after:rounded-full text-[11px] items-center font-bold ml-[10px] text-[#555]">
              Dịch vụ
            </span>
            <span className="my-[3px] underline underline-offset-2 flex relative after:absolute after:content-[''] after:left-[-8px] after:top-[50%] after:translate-y-[-50%] after:w-[4px] after:h-[4px] after:bg-[#777] after:rounded-full items-center text-[11px] space-x-[6px] font-bold ml-[10px] text-[#555]">
              Điều khoản & Điều kiện
            </span>
            <span className="my-[3px] underline underline-offset-2 flex relative after:absolute after:content-[''] after:left-[-8px] after:top-[50%] after:translate-y-[-50%] after:w-[4px] after:h-[4px] after:bg-[#777] after:rounded-full items-center text-[11px] space-x-[6px] font-bold ml-[10px] text-[#555]">
              Chính sách bảo mật
            </span>
            <span className="my-[3px] underline underline-offset-2 flex relative after:absolute after:content-[''] after:left-[-8px] after:top-[50%] after:translate-y-[-50%] after:w-[4px] after:h-[4px] after:bg-[#777] after:rounded-full items-center text-[11px] space-x-[6px] font-bold ml-[10px] text-[#555]">
              Về chúng tôi
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
