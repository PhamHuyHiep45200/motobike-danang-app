import { Collapse, QRCode } from "antd";
import moment from "moment";
import React, { useMemo } from "react";

function Order() {
  const items = useMemo(() => {
    return [
      {
        key: 1,
        label: <div>
          <span className="font-medium block">Trạng thái: Chờ nhận xe</span>
          <span>{moment().fromNow()}</span>
        </div>,
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
      {[1, 2, 3, 4, 5].map((e) => {
        return <Collapse expandIconPosition="right" className="w-full border-none" style={{boxShadow: '0 0 3px 3px #eaeaea'}} items={items} key={e} />;
      })}
    </div>
  );
}

export default Order;
