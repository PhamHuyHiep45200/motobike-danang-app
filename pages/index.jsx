import Layout from "@/components/layouts";
import { Carousel } from "antd";
import { Inter } from "next/font/google";

export default function Home() {
  return (
    <main>
      <Carousel draggable autoplay dots={false}>
      <div>
        <h3 className="h-[250px] w-full bg-[green]">1</h3>
      </div>
      <div>
        <h3 className="h-[250px] w-full bg-[green]">2</h3>
      </div>
      <div>
        <h3 className="h-[250px] w-full bg-[green]">3</h3>
      </div>
      <div>
        <h3 className="h-[250px] w-full bg-[green]">4</h3>
      </div>
    </Carousel>
    </main>
  );
}
