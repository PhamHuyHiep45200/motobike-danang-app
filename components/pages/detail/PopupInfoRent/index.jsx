import { createOrder } from "@/service/order";
import { FormatNumber } from "@/utils/FormatNumber";
import { DatePicker, Input, Modal, Select, TimePicker } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const { TextArea } = Input;

function PopupInfoRent({
  open,
  handleClose,
  data,
  user,
  errorNoti,
  successNoti,
}) {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const [valueOption, setValueOption] = useState("1");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [address, setAddress] = useState("");
  const [giveCarAddress, setGiveCarAddress] = useState("");

  const handleConfirmOrder = async () => {
    if (date && time && address) {
      const dataOrder = {
        rentalStartDate: moment(`${date} ${time}`).toISOString(),
        numberDateRental: Number(valueOption),
        receivingAddress: address,
        giveCarAddress: giveCarAddress,
        depositPrice: (Number(valueOption) * data.rentCost * data.deposit) / 100,
        allMoney: Number(valueOption) * data.rentCost,
        idMoto: data.id,
        idCard: idCard,
        idUserReceiver: user.id,
      };
      const res = await createOrder(dataOrder);
      if (res.data && res.data.status === 200) {
        successNoti(
          "Đặt thuê xe thành công! Vui lòng vào lịch sử Order để xe, thông tin chi tiết"
        );
        delete dataOrder.giveCarAddress
        delete dataOrder.depositPrice
        socket.emit("createOrder", dataOrder);
        handleClose();
        router.push("/order");
      } else {
        errorNoti("Đã có lỗi hệ thống");
      }
    } else {
      errorNoti("Vui lòng nhập đầy đủ thông tin");
    }
  };
  const changeDatePicker = (date, dateString) => {
    if (dateString) {
      setDate(dateString);
    } else {
      setDate();
    }
  };
  const changeTimePicker = (time, timeString) => {
    if (timeString) {
      setTime(timeString);
    } else {
      setTime();
    }
  };

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on("message", (data) => {
      // Nhận tin nhắn mới từ server
    });

    return () => {
      newSocket.disconnect(); // Ngắt kết nối khi component bị hủy
    };
  }, []);

  return (
    <Modal
      title="Thông tin đặt xe"
      open={open}
      onCancel={handleClose}
      footer={false}
    >
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">Họ Và Tên:</span>
        <span className="text-[#888] font-bold">{user?.name}</span>
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">Email:</span>
        <span className="text-[#888] font-bold">{user?.email}</span>
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">
          Số điện thoại:
        </span>
        <span className="text-[#888] font-bold">{user?.phone}</span>
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">
          Căn Cước Công Dân:
        </span>
        <Input
          value={idCard}
          onChange={(e) => setIdCard(e.target.value)}
          size="large"
        />
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">
          Giá thuê 1 ngày:
        </span>
        <span className="text-[#888] font-bold">
          {FormatNumber(data.rentCost)} đ
        </span>
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">
          Ngày nhận xe:
        </span>
        <DatePicker
          bordered={false}
          onChange={changeDatePicker}
          placeholder="Ngày nhận xe"
        />
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">Giờ nhận xe:</span>
        <TimePicker
          bordered={false}
          onChange={changeTimePicker}
          placeholder="Giờ nhận xe"
        />
      </div>
      <div className="flex items-center text-primary font-medium mr-[10px]">
        <span className="mr-[10px]">Thời gian thuê:</span>
        <Select
          bordered={false}
          value={valueOption}
          style={{ width: "150px" }}
          onChange={(e) => setValueOption(e)}
          options={[
            { value: "1", label: "1 Ngày" },
            { value: "2", label: "2 Ngày" },
            { value: "3", label: "3 Ngày" },
            { value: "4", label: "4 Ngày" },
            { value: "5", label: "5 Ngày" },
            { value: "6", label: "6 Ngày" },
            { value: "7", label: "1 Tuần" },
            { value: "14", label: "2 Tuần" },
            { value: "30", label: "1 Tháng" },
          ]}
        />
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">Tổng giá:</span>
        <span className="text-primary font-bold text-[18px]">
          {FormatNumber(Number(valueOption) * data.rentCost)} đ
        </span>
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">Số tiền cọc:</span>
        <span className="text-primary font-bold text-[18px]">
          {FormatNumber(
            (Number(valueOption) * data.rentCost * data.deposit) / 100
          )}{" "}
          đ ({data.deposit}%)
        </span>
      </div>
      <div className="flex items-center my-[5px]">
        <span className="text-primary font-medium mr-[10px]">
          Số tiền trả khi giao xe:
        </span>
        <span className="text-primary font-bold text-[18px]">
          {FormatNumber(
            Number(valueOption) * data.rentCost -
              (Number(valueOption) * data.rentCost * data.deposit) / 100
          )}{" "}
          đ
        </span>
      </div>
      <div className="my-[5px]">
        <span className="text-[#ff8000] block font-medium mr-[10px]">
          Địa chỉ nhận xe:
        </span>
        <TextArea
          rows={3}
          placeholder="Địa chỉ nhận xe"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="my-[5px]">
        <span className="text-[#ff8000] block font-medium mr-[10px]">
          Địa chỉ trả xe:
        </span>
        <TextArea
          rows={3}
          placeholder="Địa chỉ trả xe"
          value={giveCarAddress}
          onChange={(e) => setGiveCarAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center h-[45px] mt-5">
        <div
          className="font-medium flex flex-[1] items-center justify-center h-full rounded-[5px] text-[#000] border-primary border-[1px]"
          onClick={handleClose}
        >
          Huỷ
        </div>
        <div
          className="bg-primary text-[white] font-medium flex flex-[2] items-center justify-center h-full ml-[10px] rounded-[5px]"
          onClick={handleConfirmOrder}
        >
          Xác Nhận Thông Tin
        </div>
      </div>
    </Modal>
  );
}

export default PopupInfoRent;
