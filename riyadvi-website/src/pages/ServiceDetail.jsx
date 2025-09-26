import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../api";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/services/${slug}`)
      .then(setService)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!service) return <div className="p-6 text-gray-400">Service not found</div>;

  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-left">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6">{service.title}</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Problem</h2>
          <p className="text-gray-300">{service.problem}</p>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Solution</h2>
          <p className="text-gray-300">{service.solution}</p>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Key Features</h2>
          <ul className="list-disc list-inside text-gray-300">
            {JSON.parse(service.features || "[]").map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Industry Use Cases</h2>
          <ul className="list-disc list-inside text-gray-300">
            {JSON.parse(service.use_cases || "[]").map((u,i) => <li key={i}>{u}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Tools & Tech Stack</h2>
          <p className="text-gray-300">{JSON.parse(service.tools || "[]").join(", ")}</p>
        </div>
      </div>
      <button className="mt-8 px-6 py-3 bg-amber-400 text-black font-semibold rounded-xl shadow hover:scale-105 transition">{service.cta || "Get a Quote"}</button>
    </section>
  );
}
