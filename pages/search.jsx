import React, { useEffect, useState } from "react";
import Search from "@/components/pages/search";
import { getCategoryById } from "@/service/category";
import { useRouter } from "next/router";
import { getMoto } from "@/service/moto";

function SearchPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const searchCategory = async (id) => {
    try {
      const res = await getCategoryById(id);
      if (res.data && res.data.data) {
        setData(res.data.data.Moto);
      } else {
      }
    } catch (error) {}
  };
  const searchName = async (name)=>{
    console.log(name)
    try {
      const res = await getMoto({name});
      if (res.data && res.data.data) {
        setData(res.data.data);
      } else {
      }
    } catch (error) {}
  }
  useEffect(() => {
    if (router.query && Object.keys(router.query)[0]) {
      switch (Object.keys(router.query)[0]) {
        case "category":
          searchCategory(router.query.category);
          break;
        case "name":
          searchName(router.query.name);
          break;
        default:
          break;
      }
    }
  }, [router.query]);
  return <Search data={data} />;
}

export default SearchPage;
