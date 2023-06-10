import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import CardShowMoto from "./CardShowMoto";
import { RadarChartOutlined } from "@ant-design/icons";

function HomePages() {
  return (
    <div>
      <Banner />
      <div className="px-5 py-10">
        <Category />
        <div className="mt-5">
          <CardShowMoto type="star" title="Đánh giá cao nhất" />
        </div>
        <div className="mt-5">
          <CardShowMoto type="rent" title="Nhiều lượt thuê nhất" />
        </div>
        <div className="mt-5">
          <CardShowMoto type="view" title="Nhiều lượt xem nhất" />
        </div>
      </div>
    </div>
  );
}

export default HomePages;
