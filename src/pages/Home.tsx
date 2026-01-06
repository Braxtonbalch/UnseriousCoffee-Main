import { useEffect, useState } from 'react';
import type { FocusEvent } from 'react';
import './Home.css';

export default function Home() {
  const defaultContent = {
    heroTagline: "The grind sucks. Our coffee doesn't.",
    heroLocation: "Opening day: Who f**king knows",
    elevatorLead:
      "Unserious Coffee exists to give hard-working people a much-needed pause from the daily grind through great coffee, uplifting beats, and a vibe that reminds you not to take life too seriously. We're here for the overworked, the burnt out, and the under caffeinated serving hot espresso, connection, and killer vibes in a place that reminds you to take a minute for yourself.",
    elevatorSecond:
      "Our mission is simple: serve serious coffee with unserious vibes. We believe coffee should be cheap in price but not in taste. After traveling around the world and tasting some of the best coffee, we know that exceptional quality doesn't have to break the bank. We believe coffee is always best paired with bangin music and great friends - because the perfect brew deserves the perfect vibe. And hey, if you've got an uptight boss, bring them here and tell them to chill out - our coffee has that effect on people.",
    elevatorThird:
      "Coming soon to Wichita, Kansas - a place where the coffee is strong, the vibes are chill, and the community is everything. Because life's too short for bad coffee and boring conversations."
  };

  const [content, setContent] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('unseriousCoffeeContent');
      if (stored) {
        try {
          return { ...defaultContent, ...JSON.parse(stored) };
        } catch (error) {
          console.warn('Failed to parse stored content, falling back to defaults.', error);
        }
      }
    }
    return defaultContent;
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('unseriousCoffeeContent', JSON.stringify(content));
    }
  }, [content]);

  useEffect(() => {
    // Grain overlay animation
    const grainOverlay = document.querySelector('.grain-overlay');
    if (grainOverlay) {
      let position = 0;
      const animate = () => {
        position += 0.5;
        (grainOverlay as HTMLElement).style.backgroundPosition = `${position}px ${position}px`;
        requestAnimationFrame(animate);
      };
      animate();
    }

    // Scroll animations
    const observerOptions = {
      threshold: [0, 0.1, 0.5, 1.0],
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 0);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.section-header, .elevator-text, .social-links'
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleBlur =
    (field: keyof typeof defaultContent) => (event: FocusEvent<HTMLElement>) => {
      const value = event.currentTarget.textContent ?? '';
      setContent((prev: typeof defaultContent) => ({
        ...prev,
        [field]: value
      }));
    };

  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleResetContent = () => {
    setContent(defaultContent);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('unseriousCoffeeContent');
    }
  };

  return (
    <div className="home-page">
      <div className={`edit-toolbar ${editMode ? 'active' : ''}`}>
        <button type="button" className="edit-toggle" onClick={handleToggleEditMode}>
          {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </button>
        {editMode && (
          <button type="button" className="edit-reset" onClick={handleResetContent}>
            Reset Text
          </button>
        )}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="grain-overlay"></div>
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-logo">
            <img 
              src="/UnseriousCoffee profile picture copy.png" 
              alt="Unserious Coffee" 
              className="hero-logo-image" 
            />
          </div>
          <h1
            className="hero-tagline editable"
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={handleBlur('heroTagline')}
            role={editMode ? 'textbox' : undefined}
            aria-label="Hero tagline"
          >
            {content.heroTagline}
          </h1>
          <p
            className="hero-location editable"
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={handleBlur('heroLocation')}
            role={editMode ? 'textbox' : undefined}
            aria-label="Hero location"
          >
            {content.heroLocation}
          </p>
          <div className="hero-cta">
            <a href="#story" className="cta-button primary">
              Our Story
            </a>
            <a href="/menu" className="cta-button secondary">
              See Menu
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll for more chaos</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Elevator Pitch Section */}
      <section id="story" className="elevator-pitch">
        <div className="container">
          <div className="section-header">
            <h2>What We're Building</h2>
            <p className="section-subtitle">None of us make it out of life alive, don't take it too serious.</p>
          </div>
          <div className="elevator-content">
            <div className="elevator-text">
              <p
                className="elevator-lead editable"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={handleBlur('elevatorLead')}
                role={editMode ? 'textbox' : undefined}
                aria-label="Elevator pitch lead paragraph"
              >
                {content.elevatorLead}
              </p>
              <p
                className="elevator-second editable"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={handleBlur('elevatorSecond')}
                role={editMode ? 'textbox' : undefined}
                aria-label="Elevator pitch second paragraph"
              >
                {content.elevatorSecond}
              </p>
              <p
                className="elevator-third editable"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={handleBlur('elevatorThird')}
                role={editMode ? 'textbox' : undefined}
                aria-label="Elevator pitch third paragraph"
              >
                {content.elevatorThird}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-section">
        <div className="container">
          <div className="section-header">
            <h2>Connect With Us</h2>
            <p className="section-subtitle">Stay in the loop and join the community (or don't, we're not your boss)</p>
          </div>
          <div className="social-content">
            <div className="social-links">
              <div className="social-grid">
                <a href="#" className="social-link">
                  <span className="social-icon">📸</span>
                  <span>Instagram</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">🐦</span>
                  <span>X (Twitter)</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">🎵</span>
                  <span>TikTok</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">📘</span>
                  <span>Facebook</span>
                </a>
              </div>
              <div className="email-contact">
                <p>
                  <a href="mailto:UnseriousCoffee@gmail.com" className="email-link">
                    📧 UnseriousCoffee@gmail.com
                  </a>
                </p>
                <p className="email-subtitle">(We actually check this, promise)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Unserious Coffee</h4>
              <p>A dream in the making since 2024</p>
            </div>
            <div className="footer-section">
              <h4>Location</h4>
              <p>📍 Wichita, KS (Coming Soon)</p>
            </div>
            <div className="footer-section">
              <h4>Legal Stuff</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Unserious Coffee. All rights reserved.</p>
            <p>Powered by caffeine and sarcasm ☕</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

