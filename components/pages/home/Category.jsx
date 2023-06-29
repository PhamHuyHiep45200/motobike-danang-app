import { Carousel, Image } from "antd";
import React from "react";
import { useRouter } from "next/router";

function Category({category}) {
  const router = useRouter();
    const handleRedirectLink = (id) => {
      router.push(`/search?category=${id}`);
    };
  return (
    <div className="relative">
      <Carousel draggable dots={false} slidesPerRow={3}>
        {category.map((e) => (
          <div key={e.id} className="w-[80px] h-[80px]">
            <div className="w-full h-full flex flex-col justify-center items-center" onClick={()=>handleRedirectLink(e.id)}>
              <Image
                alt="os"
                src={`${process.env.NEXT_PUBLIC_URL_APP_IMAGE}${e.thumnail}`}
                height={60}
                width={60}
                preview={false}
              />
              <span className="text-[12px] font-bold">{e?.name}</span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Category;
