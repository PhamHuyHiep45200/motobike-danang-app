import { CreateContext } from "@/context/ContextProviderGlobal";
import { updateOrderById } from "@/service/order";
import { Result } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function OrderConfirm() {
  const { user } = useContext(CreateContext);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mes,setMes]=useState('Xác nhận đơn hàng thành công. Vui long vào lịch sử thuê xe để xác nhận!.')
  const router = useRouter();
  useEffect(() => {
    if(user){
      if (router.query && router.query.id && router.query.status) {
        confirmStatusOrder(router.query.id, router.query.status);
      }
    }else{
      const path = router.asPath
      router.push(`/login?path=${path}`)
    }
  }, [router.query]);
  const confirmStatusOrder = async (id, status) => {
    setLoading(true);
    try {
      const res = await updateOrderById(id, {
        idUser: +localStorage.getItem("userId"),
        statusOrder: status,
      });

      if (res.data && res.data.status === 200) {
        setCheck(true);
        setLoading(false);
      } else {
        setMes(res?.data?.message ?? '');
        setCheck(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setCheck(false);
    }
  };
  return (
    <div className="mt-20">
      {loading ? (
        <div className="text-center">loading...</div>
      ) : (
        <Result
          status={check ? "success" : "warning"}
          title={check ? "Xác nhận thành công" : "Xác nhận thất bại"}
          subTitle={mes}
        />
      )}
    </div>
  );
}

export default OrderConfirm;
