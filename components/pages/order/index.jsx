import { Collapse, QRCode, Tag } from "antd";
import moment from "moment";
import React from "react";
import CollapsedBase from "./CollapsedBase";

function Order({order}) {
  return (
    <div className="flex flex-col items-center space-y-[20px] px-5">
      <div className="text-[18px] font-bold text-primary">Lịch sử Thuê Xe</div>
      {order.map((e) => {
        return <CollapsedBase key={e.id} data={e}/>;
      })}
    </div>
  );
}

export default Order;
