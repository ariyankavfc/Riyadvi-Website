import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../api";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/api/portfolio/${slug}`)
      .then(setProject)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!project) return <div className="p-6 text-gray-400">Project not found</div>;

  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-left">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6">{project.title}</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Client</h2>
          <p className="text-gray-300">{project.client}</p>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Problem</h2>
          <p className="text-gray-300">{project.problem}</p>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Solution</h2>
          <p className="text-gray-300">{project.solution}</p>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Result</h2>
          <p className="text-green-400 font-semibold text-sm sm:text-base">{project.result}</p>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Tools Used</h2>
          <p className="text-gray-300">{JSON.parse(project.tools || "[]").join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
