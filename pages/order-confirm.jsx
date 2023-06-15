import { updateOrderById } from "@/service/order";
import { Result } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function OrderConfirm() {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query) {
      confirmStatusOrder(router.query.id, router.query.status);
    }
  }, [router.query]);
  const confirmStatusOrder = async (id, status) => {
    setLoading(true);
    try {
      const res = await updateOrderById(id, {
        statusOrder: status,
      });

      if (res.data.status === 200) {
        setLoading(true);
        setCheck(true);
      }
    } catch (error) {
      setLoading(true);
      setCheck(false);
    }
  };
  return (
    <div className="mt-20">
      <Result
        status={check ? "success" : "warning"}
        title={check ? "Xác nhận thành công" : "Xác nhận thất bại"}
        subTitle={
          check
            ? "Xác nhận đơn hàng thành công. Vui long vào lịch sử thuê xe để xác nhận!."
            : ""
        }
      />
    </div>
  );
}

export default OrderConfirm;
