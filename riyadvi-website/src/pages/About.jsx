import { useEffect, useState } from "react";
import { apiGet, uploadUrlFromPath } from "../api";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    apiGet("/about").then(setAbout).catch(console.error);
  }, []);

  if (!about) return <div className="p-6 text-gray-400">About info not available.</div>;

  const awards = JSON.parse(about.awards || "[]");
  const team = JSON.parse(about.team || "[]");

  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-10">About Us</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-3">Our Story</h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">{about.story}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-900 p-6 rounded-xl shadow text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-3">Vision</h2>
          <p className="text-gray-300 text-sm sm:text-base">{about.vision}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-3">Mission</h2>
          <p className="text-gray-300 text-sm sm:text-base">{about.mission}</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Awards & Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {awards.map((award, i) => (
            <div key={i} className="bg-gray-900 p-6 rounded-xl shadow text-left">
              <h3 className="text-lg font-semibold text-amber-400">{award.title} ({award.year})</h3>
              <p className="text-gray-300 mt-2">{award.description}</p>
            </div>
          ))}
        </div>
      </div>

      {team && team.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map((m,i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl shadow text-center">
                <img src={m.image} alt={m.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h3 className="text-lg font-semibold text-amber-400">{m.name}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
