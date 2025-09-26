export default function StickyChat() {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:scale-105 transition text-sm sm:text-base"
      >
        💬 Chat
      </a>

      {/* Calendly CTA */}
      <a
        href="https://calendly.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-amber-400 text-black font-semibold rounded-full shadow hover:scale-105 transition text-sm sm:text-base"
      >
        📅 Book
      </a>
    </div>
  );
}
