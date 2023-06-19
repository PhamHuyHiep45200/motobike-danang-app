import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import CardShowMoto from "./CardShowMoto";

function HomePages({ banner, category, motoNew, motoStar, motoRent }) {
  return (
    <div>
      <Banner banner={banner} />
      <div className="px-5 py-10">
        <Category category={category} />
        {motoStar && motoStar.length ? (
          <div className="mt-5">
            <CardShowMoto
              type="star"
              title="Đánh giá cao nhất"
              moto={motoStar}
            />
          </div>
        ) : (
          <div></div>
        )}
        {motoRent && motoRent.length ? (
          <div className="mt-5">
            <CardShowMoto
              type="rent"
              title="Nhiều lượt thuê nhất"
              moto={motoRent}
            />
          </div>
        ) : (
          <div></div>
        )}
        {motoNew && motoNew.length ? (
          <div className="mt-5">
            <CardShowMoto type="view" title="Xe mới nhất" moto={motoNew} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default HomePages;
