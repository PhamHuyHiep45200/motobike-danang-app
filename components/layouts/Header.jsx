import { CreateContext } from "@/context/ContextProviderGlobal";
import { listHeader } from "@/data/header";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Drawer, Image } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ModalCheckLogin from "./ModalCheckLogin";
import { useRouter } from "next/router";

function Header() {
  const { user } = useContext(CreateContext);
  const router = useRouter();
  const [position, setPosition] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openCheckLogin, setOpenCheckLogin] = useState(false);
  const closeModal = () => {
    setOpenCheckLogin(false);
  };
  const showDrawer = () => {
    if (localStorage.getItem("userId")) {
      setOpen(true);
    } else {
      setOpenCheckLogin(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  const redirect = (path) => {
    if (path === "/login") {
      localStorage.clear();
    }
    router.push(path);
    onClose();
  };
  const handleSearch = () => {
    if (search) {
      router.push(`/search?name=${search}`);
      setSearch('')
    }
  };

  useEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div
      className="flex items-center justify-between fixed top-0 right-0 left-0 px-5 z-[1]"
      style={{
        height: "var(--header)",
        backgroundColor:
          position < 30 && router.pathname === "/"
            ? `rgba(0,0,0,0)`
            : `rgba(0,0,0,0.5)`,
        transition: "all 0.3s ease",
      }}
    >
      <div className="flex items-center space-x-[10px]">
        <div>
          <div className="h-[70px] flex items-center">
            <div className="flex items-center bg-[#fff] h-[35px] rounded-[15px] overflow-hidden">
              <input
                placeholder="Tìm kiếm xe"
                value={search}
                className="border-none outline-none pl-[15px]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="w-[40px] flex flex-1 justify-center items-center opacity-[5]">
                <SearchOutlined
                  className="text-[18px] text-primary"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/image/icons8-map-64.png"
          alt=""
          width={30}
          height={30}
          preview={false}
          className="cursor-pointer"
          onClick={() => redirect("/info-company")}
        />
      </div>
      <div
        className="w-[30px] h-[30px] rounded-full overflow-hidden border-[2px] border-primary flex items-center justify-center cursor-pointer"
        onClick={showDrawer}
      >
        <UserOutlined className="!text-primary" />
      </div>
      <Drawer placement="right" width="90%" open={open} onClose={onClose}>
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            {listHeader.map((e) => {
              return (
                <div
                  key={e.path}
                  onClick={() => redirect(e.path)}
                  className="flex items-center space-x-[20px] h-[60px] border-b-[1px] border-[#eaeaea] cursor-pointer"
                >
                  <div className="text-primary flex items-center text-[20px]">
                    {e.icon}
                  </div>
                  <span className="text-[16px]">{e.name}</span>
                </div>
              );
            })}
          </div>
          <span className="font-medium text-center text-[14px] text-[#ccc]">
            @Motoby xin chào {user?.name || "bạn"}
          </span>
        </div>
      </Drawer>
      <ModalCheckLogin open={openCheckLogin} closeModal={closeModal} />
    </div>
  );
}

export default Header;
