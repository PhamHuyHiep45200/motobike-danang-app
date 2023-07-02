import { Collapse, QRCode, Tag } from "antd";
import moment from "moment";
import React from "react";
import CollapsedBase from "./CollapsedBase";

function Order({order, refreshData}) {
  return (
    <div className="flex flex-col items-center space-y-[20px] px-5">
      <div className="text-[18px] font-bold text-primary">Lịch sử Thuê Xe</div>
      {order?.length>0?order.map((e) => {
        return <CollapsedBase key={e.id} data={e} refreshData={refreshData}/>;
      }):(
        <div className="mt-[30px] text-center font-bold text-[14px] text-[#888]">Bạn chưa thuê xe nào!</div>
      )}
    </div>
  );
}

export default Order;
