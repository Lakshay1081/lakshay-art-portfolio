import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function ArtworkModal({ artwork, artworks, onClose, onChange }) {
  const currentIndex = artworks.findIndex((item) => item.id === artwork?.id);

  function goPrevious() {
    if (!artwork) return;
    const index = currentIndex <= 0 ? artworks.length - 1 : currentIndex - 1;
    onChange(artworks[index]);
  }

  function goNext() {
    if (!artwork) return;
    const index = currentIndex >= artworks.length - 1 ? 0 : currentIndex + 1;
    onChange(artworks[index]);
  }

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${artwork.title} artwork viewer`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="modal-panel"
            initial={{ opacity: 0, scale: 0.965, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 8 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="modal-toolbar">
              <span className="modal-index">
                {String(currentIndex + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}
              </span>
              <button className="icon-button" type="button" onClick={onClose} aria-label="Close artwork viewer">
                <X size={20} />
              </button>
            </div>

            <div className="modal-image-wrap">
              <img src={artwork.image} alt={artwork.title} />
            </div>

            <div className="modal-details">
              <div>
                <span className="eyebrow">{artwork.category} · {artwork.year}</span>
                <h2>{artwork.title}</h2>
              </div>
              <p>{artwork.medium}</p>
            </div>

            <div className="modal-controls">
              <button type="button" className="text-button" onClick={goPrevious}>
                <ArrowLeft size={17} /> Previous
              </button>
              <button type="button" className="text-button" onClick={goNext}>
                Next <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
