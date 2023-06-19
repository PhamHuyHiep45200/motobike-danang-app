import Detail from "@/components/pages/detail";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { getMotoById } from "@/service/moto";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function DetailPages() {
  const { errorNoti, loadingStart, loadingEnd } = useContext(CreateContext);
  const router = useRouter();
  const [detail, setDetail] = useState({});

  const getMotoByIdData = async () => {
    loadingStart();
    const id = router.query.id
    if(id){
      const res = await getMotoById(id);
      if (res.data && res.data.status===200) {
        setDetail(res.data.data);
        loadingEnd();
      } else {
        errorNoti("Đã có lỗi xảy ra");
        loadingEnd();
      }
    }
  };
  useEffect(() => {
    getMotoByIdData();
  }, [router]);

  return <Detail detail={detail} />;
}
