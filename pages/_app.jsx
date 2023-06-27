import Layout from "@/components/layouts";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { userGetMe } from "@/service/user";
import "@/styles/globals.css";
import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin, message } from "antd";
import moment from "moment";
import 'moment/locale/vi';
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
moment.locale('vi')
const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

export default function MyApp({ Component, pageProps }) {
  
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      getMe();
    } else {
      setUser(null);
    }
  }, [auth]);

  useEffect(()=>{
    if(localStorage.getItem("userId")){
      setAuth(true)
    }
  },[])

  useEffect(() => {
    router.events.on("routeChangeStart", loadingStart);
    router.events.on("routeChangeComplete", loadingEnd);
    router.events.on("routeChangeError", loadingEnd);

    return () => {
      router.events.off("routeChangeStart", loadingStart);
      router.events.off("routeChangeComplete", loadingEnd);
      router.events.off("routeChangeError", loadingEnd);
    };
  }, [router, router.events]);
  const loadingStart = () => {
    setLoading(true);
  };

  const loadingEnd = () => {
    setLoading(false);
  };
  const getMe = async () => {
    try {
      const response = await userGetMe(localStorage.getItem("userId"));
      if (response.data && response.data.status === 200) {
        setUser(response.data.data);
      } else {
        router.push("/");
      }
    } catch (error) {
      router.push("/");
    }
  };
  const setUserData = (data) => {
    setUser(data);
  };
  const successNoti = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const checkAuth = (value)=>{
    setAuth(value)
  }

  const errorNoti = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const data =  {
      user,
      auth,
      setUserData,
      successNoti,
      errorNoti,
      loadingStart,
      loadingEnd,
      checkAuth
    };
  
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    console.log(user)
  return (
    <CreateContext.Provider value={data}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#07c2b2",
          },
        }}
      >
        <Spin spinning={loading}  indicator={antIcon}>
          {contextHolder}
          {getLayout(<Component {...pageProps} />)}
        </Spin>
      </ConfigProvider>
    </CreateContext.Provider>
  );
}