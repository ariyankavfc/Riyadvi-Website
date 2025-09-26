import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { apiGet } from "../api";

export default function Portfolio() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet("/portfolio").then(setItems).catch(console.error);
  }, []);

  if (!items.length) return <div className="py-12 text-center text-gray-400">No projects yet.</div>;

  return (
    <section className="py-12 container mx-auto text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-10">Portfolio</h2>
      <Swiper modules={[Pagination]} spaceBetween={20} slidesPerView={1} pagination={{ clickable: true }} breakpoints={{640:{slidesPerView:1},768:{slidesPerView:2},1024:{slidesPerView:3}}}>
        {items.map((p) => (
          <SwiperSlide key={p.id}>
            <Link to={`/portfolio/${p.slug}`} className="bg-gray-900 p-6 rounded-xl shadow text-left block">
              <h3 className="text-lg sm:text-xl font-semibold text-amber-400">{p.title}</h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">{p.problem}</p>
              <p className="text-green-400 mt-2 font-semibold text-sm sm:text-base">{p.result}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
