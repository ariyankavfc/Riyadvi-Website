import { useEffect, useState } from "react";
import { apiGet, uploadUrlFromPath } from "../api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    apiGet("/api/testimonials")
      .then((data) => {
        // ✅ Deduplicate by name+quote combo
        const unique = Array.from(
          new Map(data.map((t) => [`${t.name}-${t.quote}`, t])).values()
        );
        setTestimonials(unique);
      })
      .catch(console.error);
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="py-12 bg-gray-800 text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-8">
        Testimonials
      </h2>
      <div className="flex gap-6 overflow-x-auto justify-center px-2 sm:px-4 snap-x">
        {testimonials.map((t) => (
          <div
            key={`${t.id}-${t.name}`}
            className="bg-black p-6 rounded-xl shadow min-w-[250px] sm:min-w-[300px] snap-center"
          >
            <img
              src={
                t.photo &&
                (t.photo.startsWith("http")
                  ? t.photo
                  : uploadUrlFromPath(t.photo))
              }
              alt={t.name}
              className="mx-auto rounded-full mb-4 w-16 h-16"
            />
            <p className="italic text-sm sm:text-base">"{t.quote}"</p>
            <h4 className="mt-2 font-semibold">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
