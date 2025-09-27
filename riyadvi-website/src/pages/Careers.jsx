import { useEffect, useState } from "react";
import { apiGet, apiPostFormData } from "../api";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState(["All"]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [formState, setFormState] = useState({ name:"", email:"", phone:"", cover_letter:"", resume: null });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  useEffect(() => {
    apiGet("/api/careers").then((data) => {
      setJobs(data);
      const depts = Array.from(new Set(data.map(j => j.department).filter(Boolean)));
      setDepartments(["All", ...depts]);
    }).catch(console.error);
  }, []);

  const filtered = selectedDept==="All" ? jobs : jobs.filter(j=>j.department===selectedDept);

  function startApply(job){
    setSelectedJob(job);
    setFormState({name:"", email:"", phone:"", cover_letter:"", resume: null});
    setOk(null);
  }

  async function submitApplication(e){
    e.preventDefault();
    if(!selectedJob) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("job_id", selectedJob.id);
      fd.append("job_title", selectedJob.title);
      fd.append("name", formState.name);
      fd.append("email", formState.email);
      fd.append("phone", formState.phone);
      fd.append("cover_letter", formState.cover_letter);
      if(formState.resume) fd.append("resume", formState.resume);
      await apiPostFormData("/apply", fd);
      setOk(true);
      setSelectedJob(null);
    } catch(err) {
      console.error(err);
      setOk(false);
    } finally { setLoading(false); }
  }

  return (
    <section className="min-h-screen container mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6">Careers</h1>

      {!selectedJob && (
        <>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map(d => (
              <button key={d} onClick={()=>setSelectedDept(d)} className={`px-4 py-2 rounded-full ${selectedDept===d? "bg-amber-400 text-black":"bg-gray-800 text-gray-300"}`}>{d}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map(job => (
              <div key={job.id} className="bg-gray-900 p-6 rounded-xl shadow text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-400">{job.title}</h3>
                <p className="text-gray-400">{job.department} • {job.location} • {job.type}</p>
                <p className="text-gray-300 mt-3">{job.description}</p>
                <button onClick={()=>startApply(job)} className="mt-4 px-4 py-2 bg-amber-400 text-black rounded-xl">Apply Now</button>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedJob && (
        <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-xl shadow text-left">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">Apply for {selectedJob.title}</h2>
          <p className="text-gray-300 mb-4">{selectedJob.description}</p>

          <form onSubmit={submitApplication} className="flex flex-col gap-4">
            <input type="text" value={selectedJob.title} readOnly className="p-3 rounded bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed" />
            <input value={formState.name} onChange={e=>setFormState({...formState, name:e.target.value})} placeholder="Full name" required className="p-3 rounded bg-black border border-gray-700" />
            <input value={formState.email} onChange={e=>setFormState({...formState, email:e.target.value})} placeholder="Email" type="email" required className="p-3 rounded bg-black border border-gray-700" />
            <input value={formState.phone} onChange={e=>setFormState({...formState, phone:e.target.value})} placeholder="Phone" className="p-3 rounded bg-black border border-gray-700" />
            <textarea value={formState.cover_letter} onChange={e=>setFormState({...formState, cover_letter:e.target.value})} placeholder="Cover letter" rows="4" className="p-3 rounded bg-black border border-gray-700" />
            <input type="file" onChange={e=>setFormState({...formState, resume: e.target.files[0]})} accept=".pdf,.doc,.docx" />
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="px-6 py-3 bg-amber-400 text-black rounded-xl">{loading ? "Applying…" : "Submit Application"}</button>
              <button type="button" onClick={()=>setSelectedJob(null)} className="px-6 py-3 bg-gray-700 text-white rounded-xl">Cancel</button>
            </div>
          </form>

          {ok === true && <p className="text-green-400 mt-3">Application submitted.</p>}
          {ok === false && <p className="text-red-400 mt-3">Failed to submit.</p>}
        </div>
      )}
    </section>
  );
}
