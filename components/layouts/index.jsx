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
      <div className="min-h-[100vh] flex flex-col justify-between">
        {children}
        {checkFooter && <Footer />}
      </div>
    </div>
  );
}

export default Layout;
