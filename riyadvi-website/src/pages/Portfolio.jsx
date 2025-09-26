import { Link } from "react-router-dom";
import portfolio from "../data/portfolio.json";

export default function PortfolioPage() {
  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-8">
        Our Work
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((p) => (
          <Link
            key={p.id}
            to={`/portfolio/${p.slug}`}
            className="bg-gray-900 p-6 rounded-xl shadow hover:scale-105 transition block text-left"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-amber-400">
              {p.title}
            </h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base line-clamp-3">
              {p.problem}
            </p>
            <span className="inline-block mt-4 text-amber-400 font-semibold">
              View Case Study →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
