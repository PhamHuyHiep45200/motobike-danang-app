import { FormatNumber } from "@/utils/FormatNumber";
import { EyeOutlined, SketchOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Carousel, Col, Image, Rate, Row } from "antd";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

function ListMoto({ type, moto }) {
  const router = useRouter();
  const handleRedirect = (id) => {
    router.push(`/detail/${id}`);
  };
  return (
    <Row gutter={[10, 15]}>
      {moto.map((e) => (
        <Col span={12} key={e} onClick={() => handleRedirect(e.id)}>
          <div className="w-full">
            <div className="flex justify-center m-auto items-center">
              <Card
                title={false}
                bodyStyle={{
                  padding: 0,
                  height: "160px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
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
                  preview={false}
                  className="!h-[100px]"
                />
                <div className="px-[5px] py-[5px]">
                  <div className="flex justify-between items-center">
                    <div className="text-[12px] font-bold text-[red]">
                      {FormatNumber(e?.rentCost)}đ
                    </div>
                    {type === "star" && <Rate value={e.starMoto ?? 0} />}
                    {type === "rent" && (
                      <span className="text-primary font-bold text-[12px]">
                        lượt thuê: {e?.Order?.length}
                      </span>
                    )}
                  </div>
                  <span className="textNameMoto font-bold text-[13px] truncate text-[black]">
                    {e.name}
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default ListMoto;
