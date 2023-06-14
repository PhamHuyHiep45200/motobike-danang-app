import Order from "@/components/pages/order";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { getOrderById } from "@/service/order";
import React, { useContext, useEffect, useState } from "react";

function OrderPage() {
  const { errorNoti, loadingStart, loadingEnd } = useContext(CreateContext);
  const [order, setOrder] = useState([]);

  const getOrderDat5a = async () => {
    loadingStart();
    const id = localStorage.getItem('userId');
    const res = await getOrderById(id);
    if (res.data.status === 200) {
      setOrder(res.data.data);
      loadingEnd();
    } else {
      errorNoti("đã có lỗi xảy ra");
      loadingEnd();
    }
  };
  useEffect(()=>{
    getOrderDat5a()
  },[])
  return (
    <div className="mt-[80px]">
      <Order order={order}/>
    </div>
  );
}

export default OrderPage;
