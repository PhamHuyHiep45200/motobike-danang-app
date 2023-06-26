import { CreateContext } from "@/context/ContextProviderGlobal";
import { rateMoto } from "@/service/moto";
import { CommentOutlined, StarFilled } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Image,
  Input,
  Modal,
  QRCode,
  Rate,
  Tag,
} from "antd";
import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
const { TextArea } = Input;
function CollapsedBase({ data, refreshData }) {
  const { errorNoti, successNoti } = useContext(CreateContext);
  const [open, setOpen] = useState(false);
  const [checkComment, setCheckComment] = useState(true);

  const getStatusConfirm = () => {
    switch (data.statusOrder) {
      case "INPROGRESS":
        return "RECEIVED";
      case "RECEIVED":
        return "PAID";
      default:
        return 0;
    }
  };
  const getStatus = () => {
    switch (data.statusOrder) {
      case "INPROGRESS":
        return (
          <Tag color="orange" className="font-bold">
            Đang Giao Xe
          </Tag>
        );
      case "RECEIVED":
        return (
          <Tag color="purple" className="font-bold">
            Đã Nhận Xe
          </Tag>
        );
      case "PAID":
        return (
          <Tag color="green" className="font-bold">
            Đã Trả Xe
          </Tag>
        );
      default:
        return (
          <Tag color="magenta" className="font-bold">
            Đã Huỷ Thuê Xe
          </Tag>
        );
    }
  };
  const submitRate = async (e) => {
    try {
      const response = await rateMoto(data.id, e);
      console.log(data,e)
      if (response.data && response.data.status === 200) {
        setOpen(false);
        setCheckComment(true);
        successNoti("Đánh giá thành công");
        refreshData();
      } else {
        errorNoti(response.data.message);
      }
    } catch (error) {
      errorNoti('Đã có lỗi xảy ra');
    }
  };
  const items = useMemo(() => {
    return [
      {
        key: 1,
        label: (
          <div>
            <span className="font-medium block">Trạng thái: {getStatus()}</span>
            <div className="text-[#888] text-[12px] my-[5px] flex">
              <span>Thời gian:</span>
              <span className="ml-[4px] block">
                {moment(data.createdAt).fromNow()}
              </span>
            </div>
            <div className="w-[150px] h-[100px] rounded-[4px] overflow-hidden">
              <Image
                width={150}
                height={100}
                alt=""
                src={`${process.env.NEXT_PUBLIC_URL_APP_IMAGE}${
                  JSON.parse(data.motoOrder.listThumbnail)[0]
                }`}
              />
            </div>
          </div>
        ),
        children: (
          <div>
            {(data.statusOrder === "INPROGRESS" ||
              data.statusOrder === "RECEIVED") && (
              <QRCode
                value={`${process.env.NEXT_PUBLIC_URL_APP}order-confirm?id=${
                  data.id
                }&&status=${getStatusConfirm()}`}
              />
            )}
            {data.statusOrder === "PAID" && !checkComment && (
              <Button
                className="flex items-center font-medium text-[12px] border-primary text-primary"
                onClick={() => setOpen(true)}
              >
                {" "}
                <span>Đánh giá</span>{" "}
                <CommentOutlined className="text-primary text-[15px]" />
              </Button>
            )}
            {data.statusOrder === "PAID" && checkComment && (
              <div>
                <span className="text-[14px] font-medium flex items-center">
                  Đánh giá <span className="text-[#d4aa40] font-bold ml-[5px] ">{data.star}</span>
                  <StarFilled className="text-[#ffca45]" />
                </span>
                <p className="text-[#666]">{data.comment}</p>
              </div>
            )}
          </div>
        ),
      },
    ];
  }, [checkComment, data]);
  useEffect(() => {
    if (data.star === 0) {
      setCheckComment(false);
    }
  }, [data]);
  return (
    <React.Fragment>
      <Collapse
        expandIconPosition="right"
        className="w-full border-none"
        style={{ boxShadow: "0 0 3px 3px #eaeaea" }}
        items={items}
      />
      <Modal
        title={false}
        footer={false}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div className="text-primary font-bold text-[16px] mb-5">
          Đánh Giá Xe
        </div>
        <Form onFinish={submitRate}>
          <Form.Item
            name="star"
            rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Button htmlType="submit">Đánh Giá</Button>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default CollapsedBase;
