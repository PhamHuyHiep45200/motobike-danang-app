import React, { useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  const checkFooter = useMemo(() => {
    switch (router.pathname) {
      case "/chat":
        return false;
      case "/info-company":
        return false;
      default:
        return true;
    }
  }, [router]);
  return (
    <div>
      <Header />
      <div className="mb-[100px]">{children}</div>
      {checkFooter && <Footer />}
    </div>
  );
}

export default Layout;
