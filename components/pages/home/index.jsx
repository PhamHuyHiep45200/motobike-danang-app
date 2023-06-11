import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import CardShowMoto from "./CardShowMoto";

function HomePages({banner,category,moto}) {
  return (
    <div>
      <Banner banner={banner}/>
      <div className="px-5 py-10">
        <Category category={category}/>
        <div className="mt-5">
          <CardShowMoto type="star" title="Đánh giá cao nhất" moto={moto}/>
        </div>
        <div className="mt-5">
          <CardShowMoto type="rent" title="Nhiều lượt thuê nhất" moto={moto}/>
        </div>
        <div className="mt-5">
          <CardShowMoto type="view" title="Nhiều lượt xem nhất" moto={moto}/>
        </div>
      </div>
    </div>
  );
}

export default HomePages;
