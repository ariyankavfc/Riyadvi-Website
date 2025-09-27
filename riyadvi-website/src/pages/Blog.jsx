import { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    apiGet("/api/blog")
      .then((data) => {
        if (!ignore) {
          // ✅ remove duplicates by unique id
          const uniquePosts = Array.from(
            new Map(data.map((p) => [p.id, p])).values()
          );
          setPosts(uniquePosts);

          const cats = Array.from(
            new Set(uniquePosts.map((p) => p.category).filter(Boolean))
          );
          setCategories(["All", ...cats]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    return () => { ignore = true; };
  }, []);

  const filtered =
    selected === "All" ? posts : posts.filter((p) => p.category === selected);

  if (loading) return <div className="p-6">Loading posts…</div>;

  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6">Blog</h1>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium ${
              selected === c
                ? "bg-amber-400 text-black"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filtered.length === 0 ? (
        <p className="text-gray-400">No posts.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="bg-gray-900 p-6 rounded-xl shadow text-left"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="rounded-lg mb-4 w-full object-cover h-40 sm:h-48"
                />
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-amber-400">
                {p.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                {p.excerpt}
              </p>
              <div className="mt-2 text-xs sm:text-sm text-gray-500">
                Category: {p.category}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
