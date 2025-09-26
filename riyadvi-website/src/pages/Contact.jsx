// import contactData from "../data/contactData.json";

// export default function Contact() {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In real app, integrate with EmailJS, Nodemailer API, or backend service
//     alert("Message sent successfully!");
//   };

//   return (
//     <section className="min-h-screen container mx-auto py-12 px-4 text-center">
//       {/* Heading */}
//       <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-4">
//         {contactData.heading}
//       </h1>
//       <p className="text-gray-300 mb-10 text-sm sm:text-base max-w-2xl mx-auto">
//         {contactData.description}
//       </p>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Contact Form */}
//         <div className="bg-gray-900 p-6 rounded-xl shadow text-left">
//           <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-4">
//             Contact Form
//           </h2>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder={contactData.form.fields.name}
//               required
//               className="p-3 rounded bg-black border border-gray-700 w-full text-sm sm:text-base"
//             />
//             <input
//               type="email"
//               placeholder={contactData.form.fields.email}
//               required
//               className="p-3 rounded bg-black border border-gray-700 w-full text-sm sm:text-base"
//             />
//             <textarea
//               placeholder={contactData.form.fields.message}
//               rows="4"
//               required
//               className="p-3 rounded bg-black border border-gray-700 w-full text-sm sm:text-base"
//             ></textarea>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-xl hover:scale-105 transition"
//             >
//               {contactData.form.submitText}
//             </button>
//           </form>
//         </div>

//         {/* Calendly Embed */}
//         <div className="bg-gray-900 p-6 rounded-xl shadow text-left">
//           <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-4">
//             {contactData.calendly.heading}
//           </h2>
//           <iframe
//             src={contactData.calendly.url}
//             style={{ minHeight: "600px" }}
//             className="w-full border-none rounded-lg"
//             title="Calendly"
//           ></iframe>
//         </div>
//       </div>

//       {/* Location */}
//       {contactData.location && (
//         <div className="mt-12">
//           <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-4">
//             {contactData.location.heading}
//           </h2>
//           <div className="w-full h-64 sm:h-96">
//             <iframe
//               src={contactData.location.mapEmbedUrl}
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               className="rounded-lg"
//               title="Location Map"
//             ></iframe>
//           </div>
//         </div>
//       )}

//       {/* WhatsApp Widget */}
//       <a
//         href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
//           contactData.whatsapp.message
//         )}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-5 right-5 px-4 py-3 bg-green-500 text-white font-semibold rounded-full shadow hover:scale-105 transition text-sm sm:text-base z-50"
//       >
//         💬 Chat on WhatsApp
//       </a>
//     </section>
//   );
// }


// src/pages/Contact.jsx
import { useState } from "react";
import { apiPostJson } from "../api";
import contactData from "../data/contactData.json"; // you can keep static copy for form labels, or fetch /api/about/ etc.

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiPostJson("/contact", form);
      setOk(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-4">{contactData.heading}</h1>
      <p className="text-gray-300 mb-10 text-sm sm:text-base max-w-2xl mx-auto">{contactData.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={submit} className="bg-gray-900 p-6 rounded-xl shadow text-left">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder={contactData.form.fields.name} required className="p-3 rounded bg-black border border-gray-700 w-full mb-3" />
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder={contactData.form.fields.email} type="email" required className="p-3 rounded bg-black border border-gray-700 w-full mb-3" />
          <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder={contactData.form.fields.message} rows="5" required className="p-3 rounded bg-black border border-gray-700 w-full mb-3" />
          <button disabled={loading} type="submit" className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-xl">{loading ? "Sending…" : contactData.form.submitText}</button>
          {ok === true && <p className="text-green-400 mt-3">Message sent — thank you!</p>}
          {ok === false && <p className="text-red-400 mt-3">Failed to send message.</p>}
        </form>

        {/* Calendly iframe + other contact widgets as before */}
        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-4">{contactData.calendly.heading}</h2>
          <iframe src={contactData.calendly.url} style={{minHeight:600}} className="w-full border-none rounded-lg" title="Calendly"></iframe>
        </div>
      </div>

      {/* Location */}
         {contactData.location && (
           <div className="mt-12">
             <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-4">
               {contactData.location.heading}
             </h2>
             <div className="w-full h-64 sm:h-96">
               <iframe
                 src={contactData.location.mapEmbedUrl}
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 allowFullScreen=""
                 loading="lazy"
                 className="rounded-lg"
                 title="Location Map"
               ></iframe>
             </div>
           </div>
         )}

         {/* WhatsApp Widget */}
         <a
           href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
             contactData.whatsapp.message
           )}`}
           target="_blank"
           rel="noopener noreferrer"
           className="fixed bottom-5 right-5 px-4 py-3 bg-green-500 text-white font-semibold rounded-full shadow hover:scale-105 transition text-sm sm:text-base z-50"
         >
           💬 Chat on WhatsApp
         </a>

    </section>
  );
}
