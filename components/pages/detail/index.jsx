import { StarFilled } from "@ant-design/icons";
import { Image, Rate } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import PopupInfoRent from "./PopupInfoRent";
import moment from "moment";
import { CreateContext } from "@/context/ContextProviderGlobal";

function Detail({ detail }) {
  const { user, errorNoti, successNoti } = useContext(CreateContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCheckRent = () => {
    if (!localStorage.getItem("userId")) {
      router.push(`/login?back=${router.asPath}`);
    } else {
      handleOpen();
    }
  };
  const image = useMemo(() => {
    if (detail.listThumbnail) {
      return JSON.parse(detail.listThumbnail)[0];
    }
    return "";
  }, [detail]);
  return (
    <div className="mt-[50px]">
      <Image
        src={`${process.env.NEXT_PUBLIC_URL_IMAGE}${image}`}
        height={300}
        width="100%"
        alt=""
      />
      <div className="px-5 mt-5">
        <span className="text-[18px] font-bold">{detail.name}</span>
        <div>
          <span className="flex items-center mb-[4px]">
            4.5 <StarFilled className="text-[#ffb043] mr-[4px]" /> /
            <span className="ml-[5px] text-[#333]">20 đánh giá</span>
          </span>
          <span className="text-[#333]">
            Số lượng xe có sẵn : {detail.quantity}
          </span>
          <div
            className="flex items-center mt-5 h-[45px] justify-center text-[white] font-medium text-[14px] bg-primary flex-1 rounded-[4px]"
            onClick={handleCheckRent}
          >
            Thuê Xe
          </div>
          <span className="block mt-5 font-medium text-[18px] text-[#666]">
            Thông tin về xe
          </span>
          <div className="bg-[#f4f4f4] p-[10px]">
            <div className="my-[5px]">
              <span className="font-medium text-[12px] text-[#777]">
                Nhà sản xuất :{" "}
              </span>
              <span className="text-[12px] text-[#888]">{detail.producer}</span>
            </div>
            <div className="my-[5px]">
              <span className="font-medium text-[12px] text-[#777]">
                Năm sản xuất :{" "}
              </span>
              <span className="text-[12px] text-[#888]">
                {moment(detail.yearOfManufacture).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="my-[5px]">
              <span className="font-medium text-[12px] text-[#777]">
                Màu sắc :{" "}
              </span>
              <span className="text-[12px] text-[#888]">{detail.color}</span>
            </div>
            <div className="my-[5px]">
              <span className="font-medium text-[12px] text-[#777]">
                Giấy phép :{" "}
              </span>
              <span className="text-[12px] text-[#888]">
                {detail.licensePates}
              </span>
            </div>
            <span className="text-[12px] text-[#888]">
              {detail.description}
            </span>
          </div>
        </div>
      </div>
      <PopupInfoRent
        open={open}
        handleClose={handleClose}
        data={detail}
        user={user}
        errorNoti={errorNoti}
        successNoti={successNoti}
      />
    </div>
  );
}

export default Detail;
