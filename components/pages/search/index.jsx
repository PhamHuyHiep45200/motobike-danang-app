import { FileSearchOutlined } from "@ant-design/icons";
import { Card, Image, Rate } from "antd";
import { useRouter } from "next/router";
import React from "react";

function Search({ data }) {
  const router = useRouter();
  const redirectDetail = (id) => {
    router.push(`/detail/${id}`);
  };
  return (
    <div className="mt-[70px] px-5 mb-[100px]">
      <div className="h-[35px] border-b flex items-center text-[#000] text-[16px]">
        <FileSearchOutlined className="text-primary text-[20px]" />{" "}
        <span className="text-primary font-bold text-[20px] ml-[5px]">
          {data.length}
        </span>
      </div>
      <div className="flex flex-col items-center space-y-[20px] mt-10">
        {data.map((e) => {
          return (
            <Card
              key={e}
              title={false}
              bodyStyle={{
                padding: 0,
                height: "280px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
              bordered={false}
              style={{ width: 300, boxShadow: "0 0 5px 3px #eaeaea" }}
            >
              <Image
                alt=""
                src={`${process.env.NEXT_PUBLIC_URL_APP_IMAGE}${
                  JSON.parse(e.listThumbnail)[0]
                }`}
                wrapperStyle={{ width: "100%" }}
                className="!h-[180px]"
              />
              <div className="px-5 py-[10px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-[12px] ml-[6px] text-primary underline underline-offset-2 font-medium">
                      Lượt thuê {e?.Order?.length ?? 0}
                    </span>
                  </div>
                  <Rate
                    value={
                      (e?.starMoto ??
                        (e?.Order.reduce((a, b) => a + (b.star ?? 0),0)))/e?.Order?.length
                    }
                  />
                </div>
                <span
                  className="textNameMoto font-bold text-[14px] text-[black]"
                  onClick={() => redirectDetail(e.id)}
                >
                  {e.name}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
