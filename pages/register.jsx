import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { createUser } from "@/service/user";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";

function Register() {
  const { errorNoti, successNoti } = useContext(CreateContext);
  const router = useRouter();
  const redirectLogin = () => {
    router.push("/login");
  };
  const createAccount = async (e) => {
    const { confirm, ...data } = e;
    try {
      const response = await createUser(data);
      if (response.data && response.data.status === 200) {
        successNoti("Tạo tài khoản thành công");
        router.push("/login");
      } else {
        errorNoti(response.data.message);
      }
    } catch (error) {
      errorNoti(error);
    }
  };
  return (
    <div>
      <Form onFinish={createAccount}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" placeholder="Tên" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Bắt buộc email" },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <span
          className="block text-right underline underline-offset-1 text-[white] font-medium text-white"
          onClick={redirectLogin}
        >
          Đăng nhập
        </span>
        <Button
          className="w-full !bg-primary !text-[white] !mt-5"
          size="large"
          htmlType="submit"
        >
          Đăng kí
        </Button>
      </Form>
    </div>
  );
}

export default Register;

Register.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};