import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-black shadow z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-amber-400 text-2xl font-bold">Riyadvi</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/careers">Careers</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-900 flex flex-col items-center gap-4 py-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/portfolio" onClick={() => setOpen(false)}>Portfolio</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/careers" onClick={() => setOpen(false)}>Careers</Link>
        </div>
      )}
    </nav>
  );
}
