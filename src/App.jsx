import React ,{ useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Instagram, Mail, Sparkles, MoveUpRight } from "lucide-react";
import Navbar from "./components/Navbar";
import ArtworkCard from "./components/ArtworkCard";
import ArtworkModal from "./components/ArtworkModal";
import { artworks, categories } from "./data/artworks";

const floatingCards = [
  { id: "hero-1", image: "/artworks/eye.jpeg", className: "hero-art hero-art-1", label: "DETAIL / 01" },
  { id: "hero-2", image: "/artworks/demon-slayer.jpeg", className: "hero-art hero-art-2", label: "GRAPHITE / 02" },
  { id: "hero-3", image: "/artworks/painting.jpeg", className: "hero-art hero-art-3", label: "COLOUR / 03" },
];

export default function App() {
  const [filter, setFilter] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  const filteredArtworks = useMemo(() => {
    if (filter === "All") return artworks;
    return artworks.filter((artwork) => artwork.category === filter);
  }, [filter]);

  // Lightweight cursor parallax for the hero; it does not affect document layout.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 18 });

  useEffect(() => {
    const onMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      mouseX.set(x);
      mouseY.set(y);
      setCursorVisible(true);
    };

    const onLeave = () => setCursorVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedArtwork(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedArtwork ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArtwork]);

  return (
    <div className="site">
      <Navbar />

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-bg-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />

          <motion.div
            className={`cursor-copy ${cursorVisible ? "is-visible" : ""}`}
            style={{ x: smoothX, y: smoothY }}
          >
            <span>MOVE</span>
          </motion.div>

          <div className="hero-inner">
            <div className="hero-copy">
              <motion.div
                className="eyebrow-pill"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="live-dot" />
                ARTIST / ILLUSTRATOR
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              >
                I DRAW
                <span className="outline-word">WHAT I</span>
                <span>IMAGINE.</span>
              </motion.h1>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Graphite portraits, characters, mythology and colour-led experiments —
                built slowly, one detail at a time.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.52 }}
              >
                <a className="button button-dark" href="#works">
                  Explore the work <ArrowUpRight size={18} />
                </a>
                <a className="text-link" href="#about">
                  Meet the artist <ArrowDown size={17} />
                </a>
              </motion.div>
            </div>

            <div className="hero-gallery" aria-hidden="true">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className={card.className}
                  initial={{ opacity: 0, y: 45, rotate: index === 0 ? -5 : index === 1 ? 4 : -2 }}
                  animate={{ opacity: 1, y: 0, rotate: index === 0 ? -5 : index === 1 ? 4 : -2 }}
                  transition={{ duration: 0.8, delay: 0.25 + index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="hero-card-frame">
                    <img src={card.image} alt="" />
                    <span>{card.label}</span>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>

          <div className="hero-bottom">
            <span>Scroll to enter the studio</span>
            <span>10 works / 01 collection</span>
          </div>
        </section>

        <section id="about" className="about section-shell">
          <div className="about-topbar">
            <div className="section-heading">
              <span className="section-number">01</span>
              <div>
                <span className="eyebrow">ABOUT THE ARTIST</span>
                <h2>Curiosity first.<br />Detail always.</h2>
              </div>
            </div>
            <span className="about-scroll-note">a glimpse inside the studio</span>
          </div>

          <div className="about-stage">
            <div className="about-note">
              <span className="note-sticker">studio note</span>
              <p>
                “I like the moment when a blank page stops feeling empty
                and starts becoming a person, a place, or a story.”
              </p>
              <div className="about-signature">— Lakshay</div>
            </div>

            <div className="about-copy">
              <p className="lead">
                I’m Lakshay Pareek, an artist drawn to expressive faces,
                cinematic characters, mythology and the tiny details that
                make a drawing feel alive.
              </p>
              <p>
                Most of my work starts with observation and patience. I move
                between pencil, ink and colour depending on what the subject
                needs. This portfolio is a growing studio wall — a place to
                collect finished pieces, experiments and the ideas in between.
              </p>

              <div className="about-stats">
                <div>
                  <strong>10+</strong>
                  <span>selected works</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>primary mediums</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>ever-growing studio</span>
                </div>
              </div>
            </div>

            <div className="about-character" aria-label="Artist at work illustration">
              <div className="character-halo" />
              <div className="character-tag character-tag-a">DRAW / PAINT</div>
              <div className="character-tag character-tag-b">KEEP CREATING</div>
              <motion.img
                src="/artworks/artist-character.png"
                alt="Illustration of an artist painting at an easel"
                initial={{ opacity: 0, y: 34, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>
          </div>
        </section>

        <section id="works" className="works section-pad">
          <div className="works-heading">
            <div>
              <span className="eyebrow">02 / SELECTED WORKS</span>
              <h2>The studio wall.</h2>
            </div>
            <p>
              Every image keeps its original composition. Click any piece
              to open the full artwork.
            </p>
          </div>

          <div className="filter-row" aria-label="Artwork filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`filter-button ${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="art-grid">
            <AnimatePresence mode="popLayout">
              {filteredArtworks.map((artwork, index) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  index={index}
                  onOpen={setSelectedArtwork}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section id="contact" className="contact section-shell section-pad">
          <div className="contact-grid">
            <div>
              <span className="eyebrow">03 / CONTACT</span>
              <h2>
                Let's make
                <span> something</span>
                <br />
                worth looking at.
              </h2>
            </div>

            <div className="contact-side">
              <p>
                Open to art commissions, collaborations, creative projects,
                and conversations about drawing.
              </p>

              <a className="contact-email" href="mailto:lakshaypareek1805@gmail.com">
                lakshaypareek1805@gmail.com
                <MoveUpRight size={22} />
              </a>

              <div className="contact-links">
                <a href="https://www.instagram.com/lakshay_art_01/" target="_blank" rel="noreferrer">
                  <Instagram size={18} />
                  Instagram
                </a>
                <a href="mailto:lakshaypareek1805@gmail.com">
                  <Mail size={18} />
                  Email
                </a>
                <a href="https://www.linkedin.com/in/lakshaypareek" target="_blank" rel="noreferrer">
                  <MoveUpRight size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="contact-footer">
            <span>© 2026 Lakshay Pareek</span>
            <span className="footer-chip"><Sparkles size={14} /> made with patience</span>
          </div>
        </section>
      </main>

      <ArtworkModal
        artwork={selectedArtwork}
        artworks={artworks}
        onClose={() => setSelectedArtwork(null)}
        onChange={setSelectedArtwork}
      />
    </div>
  );
}
