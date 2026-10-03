import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="navbar-shell">
      <nav className="navbar">
        <a className="brand" href="#home" aria-label="Lakshay Pareek home">
          <span className="brand-mark">LP</span>
          <span className="brand-name">Lakshay Pareek</span>
        </a>

        <div className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} className="nav-link" href={link.href}>
              <span>{link.label}</span>
              <span className="nav-dot" />
            </a>
          ))}
        </div>

        <motion.a
          className="nav-cta"
          href="#works"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>View Art</span>
          <ArrowUpRight size={16} strokeWidth={2.1} />
        </motion.a>
      </nav>
    </header>
  );
}
