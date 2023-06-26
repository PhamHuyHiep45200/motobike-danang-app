import { Carousel, Image } from "antd";
import React from "react";
import { useRouter } from "next/router";

function Banner({banner}) {
  const router = useRouter();
  const handleRedirectLink = (link) => {
    router.push(link);
  };
  return (
    <Carousel draggable autoplay dots={false}>
      {banner.map((e) => (
        <div key={e.id} onClick={()=>handleRedirectLink(e.link)} className="w-full h-[250px]">
          <Image alt="" src={`${process.env.NEXT_PUBLIC_URL_APP_IMAGE}${e.thumbnail}`} height={250} width='100%' preview={false}/>
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
