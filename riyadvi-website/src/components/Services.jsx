import { Link } from "react-router-dom";
import services from "../data/servicesDetails.json";

export default function Services() {
  return (
    <section className="py-12 container mx-auto text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-10">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Link
            key={s.id}
            to={`/services/${s.slug}`}
            className="bg-gray-900 p-6 rounded-xl shadow hover:scale-105 transition block"
          >
            <h3 className="text-lg sm:text-xl font-semibold">{s.title}</h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base line-clamp-3">
              {s.solution}
            </p>
            <span className="inline-block mt-4 text-amber-400 font-semibold">
              Learn More →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
