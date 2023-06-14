import { Collapse, Image, QRCode, Tag } from "antd";
import moment from "moment";
import React, { useMemo } from "react";

function CollapsedBase({ data }) {
  const getStatus = () => {
    switch (data.statusOrder) {
      case "INPROGRESS":
        return (
          <Tag color="orange" className="font-bold">
            Đang Giao Xe
          </Tag>
        );

      case "PAID":
        return (
          <Tag color="purple" className="font-bold">
            Đã Nhận Xe
          </Tag>
        );

      case "RECEIVED":
        return (
          <Tag color="green" className="font-bold">
            Đã Trả Xe
          </Tag>
        );

      default:
        return (
          <Tag color="magenta" className="font-bold">
            Đã Huỷ Thuê Xe
          </Tag>
        );
    }
  };
  const items = useMemo(() => {
    return [
      {
        key: 1,
        label: (
          <div>
            <span className="font-medium block">Trạng thái: {getStatus()}</span>
            <div className="text-[#888] text-[12px] my-[5px] flex">
              <span>Thời gian:</span>
              <span className="ml-[4px] block">
                {moment(data.createdAt).fromNow()}
              </span>
            </div>
            <div className="w-[150px] h-[100px] rounded-[4px] overflow-hidden">
              <Image
                width={150}
                height={100}
                alt=""
                src={`${process.env.NEXT_PUBLIC_URL_IMAGE}${
                  JSON.parse(data.motoOrder.listThumbnail)[0]
                }`}
              />
            </div>
          </div>
        ),
        children: (
          <div>
            <QRCode value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          </div>
        ),
      },
    ];
  }, [data]);
  console.log(data);
  return (
    <Collapse
      expandIconPosition="right"
      className="w-full border-none"
      style={{ boxShadow: "0 0 3px 3px #eaeaea" }}
      items={items}
    />
  );
}

export default CollapsedBase;
