import { Carousel, Image } from "antd";
import React from "react";
import { useRouter } from "next/router";

function Category({category}) {
  const router = useRouter();
    const handleRedirectLink = (id) => {
      router.push(`/search?category=${id}`);
    };
  return (
    <div className="border-b-[2px] border-t-[2px] relative border-[#ff8c27]">
      <span className="absolute bottom-[90%] left-[50%] translate-x-[-50%] text-[22px] font-bold text-primary font-serif">
        HÃNG XE
      </span>
      <Carousel draggable dots={false} slidesPerRow={4}>
        {category.map((e) => (
          <div key={e.id} className="w-[50px] h-[50px]">
            <div className="w-full h-full flex justify-center items-center" onClick={()=>handleRedirectLink(e.id)}>
              <Image
                alt="os"
                src={`${process.env.NEXT_PUBLIC_URR_BASE}${e.thumnail}`}
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
