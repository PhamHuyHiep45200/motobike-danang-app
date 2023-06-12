import { Collapse, QRCode, Tag } from "antd";
import moment from "moment";
import React, { useMemo } from "react";

function Order({order}) {
  const items = useMemo(() => {
    return [
      {
        key: 1,
        label: (
          <div>
            <span className="font-medium block">
              Trạng thái:{" "}
              <Tag color="green" className="text-[14px]">
                Chờ nhận xe
              </Tag>
            </span>
            <div className="text-[#888] text-[12px] flex">
              <span>Thời gian:</span>
              <span className="ml-[4px]">{moment().fromNow()}</span>
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
  }, []);
  return (
    <div className="flex flex-col items-center space-y-[20px] px-5">
      <div className="text-[18px] font-bold text-primary">Lịch sử Thuê Xe</div>
      {order.map((e) => {
        return (
          <Collapse
            expandIconPosition="right"
            className="w-full border-none"
            style={{ boxShadow: "0 0 3px 3px #eaeaea" }}
            items={items}
            key={e}
          />
        );
      })}
    </div>
  );
}

export default Order;
