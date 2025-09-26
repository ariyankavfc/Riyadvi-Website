const reasons = [
  { icon: "⭐", text: "Since 2021" },
  { icon: "💼", text: "Business Health Checkup" },
  { icon: "🔗", text: "End-to-End Solutions" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 bg-gray-800 text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-8">
        Why Choose Us
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        {reasons.map((r, i) => (
          <div
            key={i}
            className="p-6 bg-black rounded-xl shadow w-full sm:w-64"
          >
            <span className="text-3xl">{r.icon}</span>
            <p className="mt-2 text-sm sm:text-base">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
