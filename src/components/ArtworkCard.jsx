import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ArtworkCard({ artwork, index, onOpen }) {
  return (
    <motion.button
      type="button"
      className={`art-card accent-${artwork.accent}`}
      onClick={() => onOpen(artwork)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.25), ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -7 }}
    >
      <div className="art-card-media">
        <div className="art-card-stamp">{String(index + 1).padStart(2, "0")}</div>
        <motion.img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          whileHover={{ scale: 1.035 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <span className="art-card-arrow">
          <ArrowUpRight size={19} />
        </span>
      </div>

      <div className="art-card-meta">
        <div>
          <span className="eyebrow">{artwork.category}</span>
          <h3>{artwork.title}</h3>
        </div>
        <div className="art-card-side">
          <span>{artwork.year}</span>
          <span className="muted">{artwork.medium}</span>
        </div>
      </div>
    </motion.button>
  );
}
