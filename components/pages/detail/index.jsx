import { StarFilled } from "@ant-design/icons";
import { Avatar, Carousel, Col, Image, Rate, Row } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import PopupInfoRent from "./PopupInfoRent";
import moment from "moment";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { FormatNumber } from "@/utils/FormatNumber";

function Detail({ detail }) {
  const { user, errorNoti, successNoti } = useContext(CreateContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCheckRent = () => {
    if (!localStorage.getItem("userId")) {
      router.push(`/login?path=${router.asPath}`);
    } else {
      handleOpen();
    }
  };
  const image = useMemo(() => {
    if (detail.listThumbnail) {
      return JSON.parse(detail.listThumbnail)[images];
    }
    return "";
  }, [detail, images]);
  return (
    <div className="mt-[70px]">
      <Image
        src={`${process.env.NEXT_PUBLIC_URL_APP_IMAGE}${image}`}
        height={300}
        width="100%"
        alt=""
      />
      <div className="mx-[10px]">
        <Row gutter={10} className="mt-[10px]">
          {detail.listThumbnail &&
            JSON.parse(detail.listThumbnail).map((e, i) => {
              return (
                <Col
                  span={6}
                  key={i}
                  onClick={() => setImages(i)}
                  className="flex items-center justify-center"
                  style={{
                    border: images === i ? "2px solid red" : "",
                  }}
                >
                  <Image
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_URL_APP_IMAGE}${e}`}
                    preview={false}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
      <div className="px-5 mt-5">
        <span className="text-[18px] font-bold">{detail.name}</span>
        <div>
          <span className="flex items-center mb-[4px]">
            {detail.starMoto ?? 0}{" "}
            <StarFilled className="text-[#ffb043] mr-[4px]" /> /
            <span className="ml-[5px] text-[#333]">
              {detail?.rate?.length ?? 0} đánh giá
            </span>
          </span>
          <span className="text-[16px] font-bold text-primary block">{FormatNumber(detail?.rentCost)}đ / 1 ngày</span>
          <span className="text-[#333]">
            Số lượng xe có sẵn : {detail.quantityMoto}
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
      <div className="px-5 my-5">
        <div className="bg-[#eaeaea] rounded-[4px] px-[10px] py-[5px] font-semibold text-[18px] text-[#555]">
          ĐÁNH GIÁ XE
        </div>
        <div className="flex flex-col mt-[10px]">
          {detail?.rate?.length>0?detail?.rate?.map((e) => (
            <div key={e.id} className="flex mt-[10px]">
              <div>
                <Avatar>{e?.UserReceiverOrder?.name?.[0]}</Avatar>
              </div>
              <div className="ml-[8px]">
                <div className="flex items-center leading-[1]">
                  <span className="text-[16px] font-bold text-[#444]] mr-[10px]">
                    {e?.UserReceiverOrder?.name}
                  </span>
                  <Rate value={e.star} />
                </div>
                <span className="text-[#555]">{e.comment}</span>
              </div>
            </div>
          )):(
            <div className="my-[10px] text-center font-bold text-[14px] text-[#888]">Chưa có đánh giá</div>
          )}
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
