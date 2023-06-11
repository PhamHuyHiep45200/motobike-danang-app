import HomePages from "@/components/pages/home";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { getBanner } from "@/service/banner";
import { getCategory } from "@/service/category";
import { createMoto, getMoto } from "@/service/moto";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { errorNoti, loadingStart, loadingEnd } = useContext(CreateContext);
  const [banner, setBanner] = useState([]);
  const [category, setCategory] = useState([]);
  const [moto, setMoto] = useState([]);
  const getBannerData = async () => {
    const res = await getBanner();
    if (res.data.status === 200) {
      setBanner(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getCategoryData = async () => {
    const res = await getCategory();
    if (res.data.status === 200) {
      setCategory(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getMotoData = async () => {
    const res = await getMoto();
    if (res.data.status === 200) {
      setMoto(res.data.data);
    } else {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const getAllData = async () => {
    loadingStart();
    try {
      await Promise.all([getBannerData(),getCategoryData(),getMotoData()]);
      loadingEnd();
    } catch (error) {
      loadingEnd();
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  const createDataMoto = async () => {
    const listImage = ['vison1.jpeg','vison2.jpeg','vison3.jpeg']
    const data = {
      name: "Honda Vision",
      producer: "Honda",
      yearOfManufacture: "2022-06-11T05:14:51.392Z",
      listThumbnail: JSON.stringify(listImage),
      color: "Trắng",
      description:
        "Trong khi đó, các mẫu xe số Honda vẫn bán với mức giá khá bình ổn, một số mẫu xe số Honda có giá bán thực tế ở một số nơi cao hơn so với giá đề xuất như Wave Alpha 110, Wave RSX, thấp hơn đề xuất từ 1- 2 triệu đồng. Trong khi đó mẫu xe Future 2022 đang bán cao hơn giá đề xuất từ 4-5 triệu đồng tại các đại lý TP.Hồ Chí Minh. Honda Vision 2022 mới nhất sở hữu vẻ ngoài bé nhỏ với khối lượng chỉ 97 kg cực nhẹ nhàng, điều này giúp xe phù hợp người Việt Nam có thể hình bé nhỏ. Bên cạnh đó, thiết kế của xe không đặc biệt hướng đến đối tượng khách hàng nào, vì vậy mà Honda Vision sẽ không hề kén khách mà dễ tiếp cận đến mọi khách hàng Honda vẫn trung thành với thiết kế nhỏ gọn, trẻ trung và thanh lịch cho phiên bản xe Vision 2022. Bởi đây chính là điểm mạnh của Honda Vision với tính thực dụng cao mang đến cho dòng xe này doanh số bán tốt nhất. Bộ sưu tập màu sắc Vision được bổ sung thêm 3 màu sắc: xanh lục, xanh lam, trắng ánh kim kết hợp hài hòa với tem xe màu vàng đồng giúp nâng thêm phần cao cấp và sang trọng cho phần thân xe.",
      licensePates: "Chủ sở hữu: Phan Mạnh Quỳnh",
      rentCost: 80000,
      quantity: 20,
      categoryId: 1,
      deleteFlg: false,
    };
    const res = await createMoto({...data});
    console.log(res)
  };
  useEffect(() => {
    getAllData();
    // createDataMoto()
  }, []);
  return (
    <main>
      <HomePages banner={banner} category={category} moto={moto}/>
    </main>
  );
}
