import { useEffect, useState, useRef } from 'react';
import './App.css';

type Page = 'home' | 'find-us' | 'about' | 'merchandise' | 'pop-ups';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    eventType: '',
    dateTime: '',
    location: '',
    attendance: '',
    notes: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const defaultContent = {
    heroTagline: "The grind sucks. Our coffee doesn't.",
    heroLocation: "",
    elevatorLead:
      "Unserious Coffee is a mobile pop-up coffee experience designed to elevate events and bring people together. We partner with real estate agents, brokers, small businesses, markets, and community events to serve fresh, handcrafted hot and iced coffee on-site. Whether it's an open house, boutique launch, corporate gathering, or local event, we tailor the menu and setup to fit your vibe—creating a welcoming atmosphere that helps you connect with your guests in a memorable way.",
    elevatorSecond:
      "We serve serious coffee with unserious vibes. Great coffee shouldn't cost a fortune, after tasting some of the best coffee around the world, we learned that quality and affordability can go hand in hand. Add good music and great people, and you've got the perfect cup. And if your boss needs to relax… bring them by — we've seen coffee work miracles.",
    elevatorThird:
      "Serving Panama City, Florida - a place where the coffee is strong, the vibes are chill, and the community is everything. Life's too short for bad coffee and boring conversations.",
    serviceAreas: [
      'Callaway, FL',
      'Panama City, FL',
      'Lynn Haven, FL',
      'Parker, FL',
      'Southport, FL',
      'Panama City Beach, FL',
    ],
    aboutSkeletonQuote: '"Work hard, but remember: none of us make it out alive anyway."',
    aboutText: "Unserious Coffee isn't just a business — it's a reminder that life isn't meant to be a nonstop grind with no room to breathe. In a world obsessed with productivity and burnout, we exist to pull people out of the rat race, even if it's only for the length of a cup. Every drink is an invitation to pause, laugh, and remember that your worth isn't measured by emails or deadlines. Life is short, and nobody ever looks back wishing they'd spent more time stressed out. So come in, loosen up, and enjoy the little moments — they're the whole point."
  };

  const content = defaultContent;

  // Update document title based on current page
  useEffect(() => {
    const titles: Record<Page, string> = {
      'home': 'Unserious Coffee - Serious Coffee, Unserious Vibes',
      'find-us': 'Find Us | Unserious Coffee',
      'about': 'About | Unserious Coffee',
      'merchandise': 'Merchandise | Unserious Coffee',
      'pop-ups': 'Pop-Ups | Unserious Coffee'
    };
    document.title = titles[currentPage] || 'Unserious Coffee';
  }, [currentPage]);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name || !formData.email || !formData.eventType || !formData.dateTime || !formData.location) {
      setFormStatus('error');
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => prev === 'error' ? 'idle' : prev);
      }, 5000);
      return;
    }

    setFormStatus('loading');

    // Prepare FormData for Formspree
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email); // Required for Formspree autoresponse
    if (formData.organization) formDataToSubmit.append('organization', formData.organization);
    if (formData.phone) formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('event_type', formData.eventType);
    formDataToSubmit.append('event_date', formData.dateTime);
    formDataToSubmit.append('location', formData.location);
    if (formData.attendance) formDataToSubmit.append('attendance', formData.attendance);
    if (formData.notes) formDataToSubmit.append('message', formData.notes);

    try {
      const FORMPREE_ENDPOINT = 'https://formspree.io/f/xaqdlloz';

      const response = await fetch(FORMPREE_ENDPOINT, {
        method: 'POST',
        body: formDataToSubmit,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        // Clear form on success
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          eventType: '',
          dateTime: '',
          location: '',
          attendance: '',
          notes: ''
        });
        // Clear success message after 10 seconds
        setTimeout(() => {
          setFormStatus(prev => prev === 'success' ? 'idle' : prev);
        }, 10000);
      } else {
        setFormStatus('error');
        // Clear error message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => prev === 'error' ? 'idle' : prev);
        }, 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => prev === 'error' ? 'idle' : prev);
      }, 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Map form name attributes to state keys
    const stateKeyMap: Record<string, keyof typeof formData> = {
      'event_type': 'eventType',
      'event_date': 'dateTime',
      'message': 'notes'
    };
    const stateKey = stateKeyMap[name] || name;
    setFormData(prev => ({ ...prev, [stateKey]: value }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Update this object whenever you have a new pop-up booked
  const nextPopUp = {
    location: 'LOCATION: 1202 Maryland Ave. Lynn Haven, FL 32444',
    date: 'DATE: 28 February (Saturday)',
    time: 'TIME: 11:00 - 2:00',
    eventType: 'EVENT: Open House',
    note: 'Check back here or follow us on social for the latest.',
  };

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
          <div className="nav-links">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Home
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
            <button 
              className={`nav-link ${currentPage === 'pop-ups' ? 'active' : ''}`}
              onClick={() => setCurrentPage('pop-ups')}
            >
              Pop-Ups
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
                <button className="cta-button primary" onClick={() => setCurrentPage('pop-ups')}>
                  BOOK A POP-UP
                </button>
                <button className="cta-button secondary" onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' }), 150); }}>
                  SUPPORT US
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
          <section id="support" className="social-section">
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
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61579091281417" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Follow us on Facebook"
                    >
                      <img src="/Facebook QR code.png" alt="Facebook QR Code" className="social-qr-code" />
                    </a>
                    <a 
                      href="https://open.spotify.com/playlist/1c1OdnwDuud43tAQGX2OBh?si=ede4e3f1ad5f4b64" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Listen to our Spotify playlist"
                    >
                      <img src="/Spotify QR code.png" alt="Spotify QR Code" className="social-qr-code" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@unseriouscoffee" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Follow us on TikTok"
                    >
                      <img src="/unseriouscoffee_tiktok_qr_actual_logo.png" alt="TikTok QR Code" className="social-qr-code" />
                    </a>
                  </div>
                  <div className="email-contact">
                    <div className="email-block">
                      <a href="mailto:UnseriousCoffee@gmail.com" className="email-link">
                        <div className="email-row">
                          <span className="email-icon">📧</span>
                          <span className="email-address">UnseriousCoffee@gmail.com</span>
                        </div>
                        <p className="email-tagline">Got questions or collabs?</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Menu page removed from navigation; keeping data for future use if needed */}

      {currentPage === 'find-us' && (
        <section className="find-us-page">
          <div className="container">
            <div className="section-header smooth-reveal">
              <h2>Find Us</h2>
              <p className="section-subtitle">
                Come find where Unserious Coffee will be next!
              </p>
            </div>
            
            <div className="schedule-container">
              <div className="schedule-intro">
                <p>
                  We're a mobile pop-up coffee shop. Check here to see where we're brewing next.
                </p>
              </div>
              
              <div className="schedule-grid smooth-reveal-stagger">
                <div className="schedule-item">
                  <div className="schedule-day">Upcoming Pop-Up</div>
                  <div className="schedule-location">{nextPopUp.location}</div>
                  <div className="schedule-time">{nextPopUp.date}</div>
                  <div className="schedule-time">{nextPopUp.time}</div>
                  <div className="schedule-status special">
                    {nextPopUp.eventType}
                  </div>
                </div>
              </div>

              <div className="schedule-note">
                <p>
                  ⚠️ <strong>Stay updated:</strong> Pop-up details can change. Follow us on social media for real-time updates and new locations.
                </p>
                {nextPopUp.note && <p>{nextPopUp.note}</p>}
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

      {currentPage === 'pop-ups' && (
        <section className="popups-page">
          {/* Hero Section */}
          <section className="popups-hero">
            <div className="container">
              <div className="popups-hero-content smooth-reveal">
                <div className="free-badge">NOW BOOKING</div>
                <h1>Pop-Ups</h1>
                <h2 className="popups-headline">We'll bring the espresso, You bring the people!</h2>
                <p className="popups-subheadline">
                  We set up pop-up coffee bars at open houses, broker's opens, boutiques, local businesses, farmers markets, and events. 
                  All we ask: spread the name <strong>UNSERIOUS COFFEE</strong>.
                </p>
                <div className="popups-cta-buttons">
                  <button className="cta-button primary" onClick={() => document.getElementById('popup-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Request a Pop-Up
                  </button>
                  <button
                    type="button"
                    className="cta-button secondary"
                    onClick={() => {
                      setCurrentPage('home');
                      setTimeout(() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' }), 150);
                    }}
                  >
                    Follow Us
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Where We Pop Up */}
          <section className="popups-section">
            <div className="container">
              <div className="section-header smooth-reveal">
                <h2>Where We Pop Up</h2>
                <p className="section-subtitle">We're flexible. You're busy. Let's make it work.</p>
              </div>
              <div className="popup-categories-grid smooth-reveal-stagger">
                <div className="popup-category-card">
                  <div className="category-icon">🏠</div>
                  <h3>Real Estate</h3>
                  <p>Open houses and broker's opens that need that extra touch.</p>
                </div>
                <div className="popup-category-card">
                  <div className="category-icon">🌾</div>
                  <h3>Farmers Markets</h3>
                  <p>Local markets where community and coffee come together.</p>
                </div>
                <div className="popup-category-card">
                  <div className="category-icon">🛍️</div>
                  <h3>Local Businesses / Boutiques</h3>
                  <p>Boutiques and shops looking to create a memorable experience.</p>
                </div>
                <div className="popup-category-card">
                  <div className="category-icon">🎉</div>
                  <h3>Events</h3>
                  <p>Community gatherings, corporate events, and private celebrations.</p>
                </div>
                <div className="popup-category-card">
                  <div className="category-icon">🎂</div>
                  <h3>Parties</h3>
                  <p>Birthdays, showers, reunions—any excuse for great coffee and good vibes.</p>
                </div>
                <div className="popup-category-card">
                  <div className="category-icon">✨</div>
                  <h3>You Name It</h3>
                  <p>Got another idea? We're open to it. Reach out and let's make it happen.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="popups-section alt-bg">
            <div className="container">
              <div className="section-header smooth-reveal">
                <h2>How It Works</h2>
                <p className="section-subtitle">Three simple steps to caffeinated bliss</p>
              </div>
              <div className="how-it-works-steps smooth-reveal-stagger">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h3>Pick a date + location</h3>
                  <p>Tell us when and where, and we'll check our availability.</p>
                </div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h3>We set up a clean pop-up espresso bar</h3>
                  <p>We bring everything needed for a professional coffee experience.</p>
                </div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h3>You share/mention UNSERIOUS COFFEE</h3>
                  <p>Signage + social tag. That's it. Simple as that.</p>
                </div>
              </div>
            </div>
          </section>

          {/* What You Provide */}
          <section className="popups-section alt-bg">
            <div className="container">
              <div className="section-header smooth-reveal">
                <h2>What You Provide</h2>
                <p className="section-subtitle">Keep it simple, keep it chill</p>
              </div>
              <div className="requirements-list smooth-reveal">
                <ul className="requirements">
                  <li>Access to power (standard outlet)</li>
                  <li>A small footprint (table + space)</li>
                  <li>Permission to serve on-site</li>
                  <li>Optional: a spot for a small sign + QR code</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing Note */}
          <section className="popups-section">
            <div className="container">
              <div className="free-for-now-content smooth-reveal">
                <h2>Pricing & Availability</h2>
                <p>
                  Pop-up pricing depends on the event type, size, and setup. 
                  Share the details and we&apos;ll follow up with a custom quote.
                </p>
                <p className="disclaimer">
                  <small>Availability is limited; travel/time constraints may apply.</small>
                </p>
              </div>
            </div>
          </section>

          {/* Request Form */}
          <section id="popup-form" className="popups-section alt-bg">
            <div className="container">
              <div className="section-header smooth-reveal">
                <h2>Request a Pop-Up</h2>
                <p className="section-subtitle">Let's make your event unforgettable</p>
              </div>
              <form 
                className="popup-request-form smooth-reveal" 
                onSubmit={handleFormSubmit}
                method="POST"
                action="https://formspree.io/f/xaqdlloz"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="organization">Organization / Brokerage / Business</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventType">Event Type *</label>
                    <select
                      id="eventType"
                      name="event_type"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                    >
                      <option value="">Select event type</option>
                      <option value="open-house">Open House</option>
                      <option value="brokers-open">Broker's Open</option>
                      <option value="farmers-market">Farmers Market</option>
                      <option value="boutique">Boutique</option>
                      <option value="event">Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateTime">Date &amp; Time *</label>
                    <input
                      type="datetime-local"
                      id="dateTime"
                      name="event_date"
                      value={formData.dateTime}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location / Address *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., 123 Main St, Panama City, FL 32401"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="attendance">Expected Attendance</label>
                    <input
                      type="text"
                      id="attendance"
                      value={formData.attendance}
                      onChange={handleInputChange}
                      name="attendance"
                      placeholder="e.g., 50-100 people"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="message"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Any additional details about your event..."
                  />
                </div>
                {formStatus === 'error' && (
                  <div className="form-message error" role="alert">
                    Something went wrong — please try again or email <a href="mailto:unseriouscoffee@gmail.com" style={{color: 'inherit', textDecoration: 'underline'}}>unseriouscoffee@gmail.com</a>
                  </div>
                )}
                {formStatus === 'success' && (
                  <div className="form-message success" role="alert">
                    Request received — we'll hit you back soon ☕
                  </div>
                )}
                <button 
                  type="submit" 
                  className="cta-button primary form-submit"
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading' ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            </div>
          </section>

          {/* FAQ */}
          <section className="popups-section">
            <div className="container">
              <div className="section-header smooth-reveal">
                <h2>Frequently Asked Questions</h2>
                <p className="section-subtitle">Got questions? We've got answers.</p>
              </div>
              <div className="faq-accordion smooth-reveal">
                {[
                  {
                    question: 'How much does a pop-up cost?',
                    answer: 'Pricing depends on the event type, size, and setup. Share your details and we\'ll follow up with a quote that fits your vibe and budget.'
                  },
                  {
                    question: 'What kinds of events do you do?',
                    answer: 'We do open houses, broker\'s opens, farmers markets, boutique events, community gatherings, corporate events, and private celebrations. If you have an event, let\'s talk!'
                  },
                  {
                    question: 'How much space do you need?',
                    answer: 'We need a small footprint - just enough for a table and some space to work. Typically about 6x4 feet is perfect, but we can work with what you have.'
                  },
                  {
                    question: 'Do you need water access?',
                    answer: 'No water access needed! We bring everything we need, including water. Just need a standard power outlet.'
                  },
                  {
                    question: 'How far do you travel?',
                    answer: 'We primarily serve the Panama City, Florida area. Availability is limited and travel/time constraints may apply, but we\'re flexible - reach out and let\'s see if we can make it work!'
                  },
                  {
                    question: 'Can we book recurring pop-ups?',
                    answer: 'Absolutely! We love building ongoing partnerships. If you have a regular event or recurring need, let\'s chat about setting something up.'
                  },
                  {
                    question: 'Do you do indoor vs outdoor?',
                    answer: 'Both! We can set up indoors or outdoors. Just let us know your setup and we\'ll make sure we\'re prepared.'
                  },
                  {
                    question: 'What do you need from us to promote UNSERIOUS COFFEE?',
                    answer: 'Simple: allow us to display a small sign with our name and QR code, and if you\'re posting on social media, tag us @unseriouscoffee. That\'s it!'
                  }
                ].map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className={`faq-question ${openFaq === index ? 'open' : ''}`}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      className={`faq-answer ${openFaq === index ? 'open' : ''}`}
                      aria-hidden={openFaq !== index}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="popups-cta-strip">
            <div className="container">
              <div className="cta-strip-content smooth-reveal">
                <h2>Let's make your event unforgettable.</h2>
                <button className="cta-button primary" onClick={() => document.getElementById('popup-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Request a Pop-Up
                </button>
              </div>
            </div>
          </section>
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
              <h4>Locations</h4>
              <ul className="footer-locations">
                {content.serviceAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
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
