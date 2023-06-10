import { Carousel, Image } from "antd";
import React from "react";
import { useRouter } from "next/router";

function Category() {
  const router = useRouter();
  //   const handleRedirectLink = (link) => {
  //     router.push(link);
  //   };
  return (
    <div className="border-b-[2px] border-t-[2px] relative border-[#ff8c27]">
      <span className="absolute bottom-[80%] left-[50%] translate-x-[-50%] text-[22px] font-bold text-primary font-serif">
        HÃNG XE
      </span>
      <Carousel draggable dots={false} slidesPerRow={4}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
          <div key={e} className="w-[50px] h-[50px]">
            <div className="w-full h-full flex justify-center items-center">
              <Image
                alt="os"
                src="/image/category-honda.png"
                height={40}
                width={40}
                preview={false}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Category;
