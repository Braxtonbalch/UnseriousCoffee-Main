import { useEffect, useState, useRef } from 'react';
import './App.css';

type Page = 'home' | 'menu' | 'find-us' | 'about' | 'merchandise';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  const defaultContent = {
    heroTagline: "The grind sucks. Our coffee doesn't.",
    heroLocation: "Opening day: SOON!!!",
    elevatorLead:
      "Unserious Coffee exists to give hard-working people a much-needed pause from the daily grind through great coffee, uplifting beats, and a vibe that reminds you not to take life too seriously. We're here for the overworked, the burnt out, and the under caffeinated serving hot espresso, connection, and killer vibes in a place that reminds you to take a minute for yourself.",
    elevatorSecond:
      "Our mission is simple: serve serious coffee with unserious vibes. We believe coffee should be cheap in price but not in taste. After traveling around the world and tasting some of the best coffee, we know that exceptional quality doesn't have to break the bank. We believe coffee is always best paired with bangin music and great friends - because the perfect brew deserves the perfect vibe. And hey, if you've got an uptight boss, bring them here and tell them to chill out - our coffee has that effect on people.",
    elevatorThird:
      "Coming soon to Panama City, Florida - a place where the coffee is strong, the vibes are chill, and the community is everything. Because life's too short for bad coffee and boring conversations.",
    aboutSkeletonQuote: '"Work hard, but remember: none of us make it out alive anyway."',
    aboutText: "Unserious Coffee isn't just a business — it's a reminder that life isn't meant to be a nonstop grind with no room to breathe. In a world obsessed with productivity and burnout, we exist to pull people out of the rat race, even if it's only for the length of a cup. Every drink is an invitation to pause, laugh, and remember that your worth isn't measured by emails or deadlines. Life is short, and nobody ever looks back wishing they'd spent more time stressed out. So come in, loosen up, and enjoy the little moments — they're the whole point."
  };

  const content = defaultContent;

  useEffect(() => {
    // Grain overlay animation
    const grainOverlay = document.querySelector('.grain-overlay');
    if (grainOverlay) {
      let frame = 0;
      const animateGrain = () => {
        frame++;
        (grainOverlay as HTMLElement).style.backgroundPosition = `${frame % 100}% ${frame % 100}%`;
        requestAnimationFrame(animateGrain);
      };
      animateGrain();
    }

    // Enhanced scroll reveal animations with IntersectionObserver
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smooth reveals
          requestAnimationFrame(() => {
            entry.target.classList.add('visible');
            entry.target.classList.add('revealed');
          });
        }
      });
    }, observerOptions);

    // Observe all elements that should reveal on scroll
    const animatedElements = document.querySelectorAll(
      '.section-header, .elevator-text, .social-links, .menu-item, .schedule-item, .mission-content, .smooth-reveal, .smooth-reveal-stagger'
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentPage]);

  // Measure header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);



  const menuItems = {
    'Unserious Picks': [
      { name: 'Death Wish Espresso', description: 'For when you need to feel alive again', price: '$4.50', featured: true },
      { name: 'Skeleton Latte', description: 'Bone-chillingly good (but actually warm)', price: '$5.00', featured: true },
      { name: 'Monday Morning Murder', description: 'Strong enough to kill your Monday blues', price: '$4.75', featured: true },
    ],
    'Espresso': [
      { name: 'Espresso Shot', description: 'Pure, unadulterated caffeine', price: '$2.50' },
      { name: 'Double Shot', description: 'For the brave souls', price: '$3.50' },
      { name: 'Americano', description: 'Espresso with hot water (we keep it simple)', price: '$3.00' },
      { name: 'Cortado', description: 'Espresso + steamed milk = perfection', price: '$4.00' },
    ],
    'Coffee': [
      { name: 'Drip Coffee', description: 'Classic. Reliable. Caffeinated.', price: '$2.75' },
      { name: 'Cold Brew', description: 'Smooth, strong, and ready to go', price: '$4.00' },
      { name: 'Nitro Cold Brew', description: 'Cold brew but make it fancy', price: '$5.00' },
    ],
    'Specialty Drinks': [
      { name: 'Vanilla Latte', description: 'Basic? Maybe. Delicious? Absolutely.', price: '$5.50' },
      { name: 'Caramel Macchiato', description: 'Sweet, creamy, and slightly pretentious', price: '$5.75' },
      { name: 'Mocha', description: 'Coffee + chocolate = happiness', price: '$5.50' },
      { name: 'Matcha Latte', description: 'For when you want to feel zen (but still caffeinated)', price: '$5.00' },
    ],
    'Tea': [
      { name: 'Green Tea', description: 'For the health-conscious (we see you)', price: '$3.00' },
      { name: 'Chai Latte', description: 'Spicy, warm, and comforting', price: '$4.50' },
      { name: 'Earl Grey', description: 'Fancy tea for fancy people', price: '$3.50' },
    ],
  };

  const schedule = [
    { day: 'Monday', location: 'Downtown Panama City', time: '7:00 AM - 2:00 PM', status: 'Open' },
    { day: 'Tuesday', location: 'St. Andrews', time: '7:00 AM - 2:00 PM', status: 'Open' },
    { day: 'Wednesday', location: 'Panama City Beach', time: '7:00 AM - 2:00 PM', status: 'Open' },
    { day: 'Thursday', location: 'Lynn Haven', time: '7:00 AM - 2:00 PM', status: 'Open' },
    { day: 'Friday', location: 'Downtown Panama City', time: '7:00 AM - 3:00 PM', status: 'Open' },
    { day: 'Saturday', location: 'Pier Park', time: '8:00 AM - 1:00 PM', status: 'Open' },
    { day: 'Sunday', location: 'St. Andrews', time: '9:00 AM - 1:00 PM', status: 'Open' },
  ];

  const merchandiseItems = [
    { 
      name: 'Unserious Coffee T-Shirt', 
      description: 'Show off your unserious vibes with our signature tee', 
      price: '$25.00',
      category: 'Apparel',
      featured: true
    },
    { 
      name: 'Coffee Skeleton Sticker Pack', 
      description: 'Stick these bad boys anywhere that needs more personality', 
      price: '$8.00',
      category: 'Accessories',
      featured: true
    },
    { 
      name: 'Unserious Coffee Mug', 
      description: 'Perfect for your morning existential crisis (and coffee)', 
      price: '$18.00',
      category: 'Accessories',
      featured: false
    },
    { 
      name: 'Hoodie - "Don\'t Take Life Too Seriously"', 
      description: 'Cozy up in comfort while staying unserious', 
      price: '$45.00',
      category: 'Apparel',
      featured: false
    },
    { 
      name: 'Logo Hat', 
      description: 'Keep it casual, keep it unserious', 
      price: '$22.00',
      category: 'Accessories',
      featured: false
    },
    { 
      name: 'Tote Bag', 
      description: 'Carry your stuff (and your attitude) in style', 
      price: '$15.00',
      category: 'Accessories',
      featured: false
    },
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav ref={headerRef} className="main-nav">
        <div className="nav-container">
          <button className="nav-logo" onClick={() => setCurrentPage('home')}>
            <img src="/unserious-coffee-logo.png" alt="Unserious Coffee" className="nav-logo-image" />
          </button>
          <div className="nav-links">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${currentPage === 'menu' ? 'active' : ''}`}
              onClick={() => setCurrentPage('menu')}
            >
              Menu
            </button>
            <button 
              className={`nav-link ${currentPage === 'find-us' ? 'active' : ''}`}
              onClick={() => setCurrentPage('find-us')}
            >
              Find Us
            </button>
            <button 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => setCurrentPage('about')}
            >
              About
            </button>
            <button 
              className={`nav-link ${currentPage === 'merchandise' ? 'active' : ''}`}
              onClick={() => setCurrentPage('merchandise')}
            >
              Merchandise
            </button>
          </div>
        </div>
      </nav>

      {/* Header Spacer - prevents content jump */}
      <div style={{ height: `${headerHeight}px` }} className="header-spacer" />

      {/* Page Content */}
      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section className="hero">
            <div className="grain-overlay"></div>
            <div className="hero-content">
              <div className="hero-logo">
                <img 
                  src="/ChatGPT Image Jan 5, 2026 at 11_40_08 AM copy.png" 
                  alt="Unserious Coffee" 
                  className="hero-logo-image"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <h1 className="hero-tagline">
                {content.heroTagline}
              </h1>
              <p className="hero-location">
                {content.heroLocation}
              </p>
              <div className="hero-buttons">
                <button className="cta-button primary" onClick={() => setCurrentPage('menu')}>
                  See What We're Brewing
                </button>
                <button className="cta-button secondary" onClick={() => setCurrentPage('find-us')}>
                  Find Our Trailer
                </button>
              </div>
            </div>
          </section>

          {/* Elevator Pitch Section */}
          <section className="elevator-pitch">
            <div className="container">
              <div className="section-header smooth-reveal">
                <h2>What We're Building</h2>
                <p className="section-subtitle">None of us make it out of life alive, don't take it too serious.</p>
              </div>
              <div className="elevator-content">
                <div className="elevator-text smooth-reveal">
                  <p className="elevator-lead">
                    {content.elevatorLead}
                  </p>
                  <p className="elevator-second">
                    {content.elevatorSecond}
                  </p>
                  <p className="elevator-third">
                    {content.elevatorThird}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Section */}
          <section className="social-section">
            <div className="container">
              <div className="section-header smooth-reveal">
                <h2>Connect With Us</h2>
                <p className="section-subtitle">Stay in the loop (or don't, your call)</p>
              </div>
              <div className="social-content">
                <div className="social-links smooth-reveal">
                  <div className="social-grid">
                    <a 
                      href="https://www.instagram.com/unseriouscoffee/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Follow us on Instagram"
                    >
                      <img src="/instagram QR code.png" alt="Instagram QR Code" className="social-qr-code" />
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
                    <a 
                      href="https://www.facebook.com/profile.php?id=61579091281417" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Follow us on Facebook"
                    >
                      <img src="/Facebook QR code.png" alt="Facebook QR Code" className="social-qr-code" />
                      <span>Facebook</span>
                    </a>
                  </div>
                  <div className="email-contact">
                    <p>
                      <a href="mailto:UnseriousCoffee@gmail.com" className="email-link">
                        📧 UnseriousCoffee@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === 'menu' && (
        <section className="menu-page">
          <div className="container">
            <div className="section-header smooth-reveal">
              <h2>Our Menu</h2>
              <p className="section-subtitle">Good coffee, bad jokes, zero regrets</p>
            </div>
            
            <div className="menu-tabs">
              {Object.keys(menuItems).map((category) => (
                <button
                  key={category}
                  className={`menu-tab ${category === 'Unserious Picks' ? 'active' : ''}`}
                  onClick={(e) => {
                    const tabs = document.querySelectorAll('.menu-tab');
                    tabs.forEach(tab => tab.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    const categoryName = e.currentTarget.textContent;
                    const categorySection = document.querySelector(`[data-category="${categoryName}"]`);
                    if (categorySection) {
                      categorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {Object.entries(menuItems).map(([category, items]) => (
              <div key={category} className="menu-category" data-category={category}>
                <h3 className="category-title">
                  {category}
                  {category === 'Unserious Picks' && <span className="featured-badge">🔥 Hot Picks</span>}
                </h3>
                <div className="menu-grid smooth-reveal-stagger">
                  {items.map((item, index) => (
                    <div key={index} className={`menu-item ${'featured' in item && item.featured ? 'featured' : ''}`}>
                      {'featured' in item && item.featured && <div className="featured-glow"></div>}
                      <div className="menu-item-content">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <span className="price">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {currentPage === 'find-us' && (
        <section className="find-us-page">
          <div className="container">
            <div className="section-header smooth-reveal">
              <h2>Find Our Trailer</h2>
              <p className="section-subtitle">We're mobile, we're caffeinated, we're here for you</p>
            </div>
            
            <div className="schedule-container">
              <div className="schedule-intro">
                <p>Our coffee trailer roams around Panama City like a caffeinated nomad. Check where we'll be this week (subject to change because, you know, life happens).</p>
              </div>
              
              <div className="schedule-grid smooth-reveal-stagger">
                {schedule.map((item, index) => (
                  <div key={index} className="schedule-item">
                    <div className="schedule-day">{item.day}</div>
                    <div className="schedule-location">{item.location}</div>
                    <div className="schedule-time">{item.time}</div>
                    <div className={`schedule-status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>

              <div className="schedule-note">
                <p>⚠️ <strong>Pro tip:</strong> Follow us on social media for real-time updates. Sometimes we show up early, sometimes we're fashionably late. That's just how we roll.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentPage === 'about' && (
        <section className="about-page">
          <div className="container">
            <div className="section-header smooth-reveal">
              <h2>Our Story</h2>
              <p className="section-subtitle">Don't take life too seriously or you'll work yourself to death</p>
            </div>
            
            <div className="mission-content smooth-reveal">
              <div className="skeleton-visual">
                <div className="skeleton-figure">
                  <div className="skeleton-head">💀</div>
                  <div className="skeleton-body">
                    <div className="skeleton-suit">👔</div>
                  </div>
                </div>
                <p className="skeleton-quote">
                  {content.aboutSkeletonQuote}
                </p>
              </div>

              <div className="mission-text">
                <p>
                  {content.aboutText}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentPage === 'merchandise' && (
        <section className="merchandise-page">
          <div className="container">
            <div className="section-header smooth-reveal">
              <h2>Merchandise</h2>
              <p className="section-subtitle">Wear your unserious vibes (or stick them on your laptop)</p>
            </div>
            
            <div className="merchandise-intro">
              <p>Support the cause and rep the brand. All proceeds go toward making our coffee dreams a reality (and maybe buying more coffee equipment).</p>
            </div>

            <div className="merchandise-grid smooth-reveal-stagger">
              {merchandiseItems.map((item, index) => (
                <div key={index} className={`merchandise-item ${item.featured ? 'featured' : ''}`}>
                  {item.featured && <div className="featured-glow"></div>}
                  <div className="merchandise-item-content">
                    <div className="merchandise-image-placeholder">
                      <span className="merchandise-icon">
                        {item.category === 'Apparel' ? '👕' : '🎁'}
                      </span>
                    </div>
                    <div className="merchandise-category">{item.category}</div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <div className="merchandise-footer">
                      <span className="price">{item.price}</span>
                      <button className="merchandise-button">Coming Soon</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="merchandise-note">
              <p>💡 <strong>Coming Soon:</strong> We're working on getting our merch store up and running. In the meantime, follow us on social media for updates and maybe we'll have some pop-up merch at our trailer!</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <img src="/unserious-coffee-logo.png" alt="Unserious Coffee" className="footer-logo-image" />
              <p>A dream in the making since 2024</p>
            </div>
            <div className="footer-section">
              <h4>Location</h4>
              <p>📍 Panama City, FL (Coming Soon)</p>
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

export default App;
