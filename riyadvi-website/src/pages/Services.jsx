import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/api/services")
      .then(setServices)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-center">Loading services…</div>;
  if (!services.length) return <div className="p-6 text-center text-gray-400">No services found.</div>;

  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-8">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Link key={s.id} to={`/services/${s.slug}`} className="bg-gray-900 p-6 rounded-xl shadow hover:scale-105 transition block text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-amber-400">{s.title}</h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base line-clamp-3">{s.problem}</p>
            <span className="inline-block mt-4 text-amber-400 font-semibold">Learn More →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
