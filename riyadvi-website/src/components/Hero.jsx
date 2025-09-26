export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-black to-gray-900">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-amber-400">
        Custom Software & Digital Solutions to Grow Your Business
      </h1>
      <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl">
        Web & App Development, UI/UX Design, and Business Strategy – all tailored to your needs.
      </p>
      <a href="/contact">
      <button className="mt-6 px-6 py-3 bg-amber-400 text-black font-semibold rounded-xl shadow hover:scale-105 transition">
        Book a Free Consultation
      </button></a>
    </section>
  );
}
