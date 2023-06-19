import HomePages from "@/components/pages/home";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { getBanner } from "@/service/banner";
import { getCategory } from "@/service/category";
import {
  createMoto,
  getMoto,
  getMotoNew,
  getMotoRent,
  getMotoStar,
} from "@/service/moto";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { errorNoti, loadingStart, loadingEnd } = useContext(CreateContext);
  const [banner, setBanner] = useState([]);
  const [category, setCategory] = useState([]);
  const [motoStar, setMotoStar] = useState([]);
  const [motoRent, setMotoRent] = useState([]);
  const [motoNew, setMotoNew] = useState([]);
  const getBannerData = async () => {
    const res = await getBanner();
    if (res.data && res.data.status === 200) {
      setBanner(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getCategoryData = async () => {
    const res = await getCategory();
    if (res.data && res.data.status === 200) {
      setCategory(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getMotoNewData = async () => {
    const res = await getMotoNew();
    if (res.data && res.data.status === 200) {
      setMotoNew(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getMotoRentData = async () => {
    const res = await getMotoRent();
    if (res.data && res.data.status === 200) {
      setMotoRent(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getMotoStarData = async () => {
    const res = await getMotoStar();
    if (res.data && res.data.status === 200) {
      setMotoStar(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getAllData = async () => {
    loadingStart();
    try {
      await Promise.all([
        getBannerData(),
        getCategoryData(),
        getMotoNewData(),
        getMotoRentData(),
        getMotoStarData(),
      ]);
      loadingEnd();
    } catch (error) {
      loadingEnd();
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <main>
      <HomePages
        banner={banner}
        category={category}
        motoNew={motoNew}
        motoStar={motoStar}
        motoRent={motoRent}
      />
    </main>
  );
}
