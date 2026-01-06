import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <div className="skeleton-illustration">
            <div className="skeleton-head">💀</div>
            <div className="skeleton-body">👔</div>
          </div>
          <h1>Our Story</h1>
          <p className="about-hero-subtitle">
            Don't take life too seriously or you'll work yourself to death
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>The Mission</h2>
              <p className="mission-lead">
                Life's too short for bad coffee and boring conversations. We started Unserious Coffee 
                because we believe that the best moments happen when you stop taking everything so seriously.
              </p>
              <p>
                You know that skeleton in a suit? That's us. That's all of us. We're all just trying 
                to make it through the day, and sometimes the only thing that gets us through is a 
                damn good cup of coffee and a reminder that none of us are getting out of here alive anyway.
              </p>
              <p>
                So why stress? Why pretend? Why pay $8 for a latte that tastes like regret? 
                We're here to serve serious coffee with unserious vibes. No pretension. No BS. 
                Just good coffee, good music, and good people.
              </p>
            </div>

            <div className="mission-values">
              <div className="value-card">
                <div className="value-icon">☕</div>
                <h3>Serious Coffee</h3>
                <p>We don't mess around when it comes to quality. Great beans, great brewing, great taste. Period.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">😎</div>
                <h3>Unserious Vibes</h3>
                <p>Life's already stressful enough. We're here to remind you to chill out and enjoy the moment.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">💰</div>
                <h3>Fair Prices</h3>
                <p>Good coffee shouldn't cost your firstborn. We keep it affordable because everyone deserves great coffee.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🎵</div>
                <h3>Good Music</h3>
                <p>Coffee and music go together like... well, coffee and music. We curate the vibes so you don't have to.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-content">
            <h2>The Philosophy</h2>
            <div className="philosophy-quote">
              <p className="quote-text">
                "We're all just skeletons in suits, trying to make it through another Monday. 
                Might as well have good coffee while we're at it."
              </p>
              <p className="quote-author">— The Unserious Coffee Team</p>
            </div>
            <div className="philosophy-text">
              <p>
                We believe in working hard, but not so hard that you forget to live. We believe in 
                quality, but not at the expense of accessibility. We believe in community, but not 
                the kind that requires you to pretend you're someone you're not.
              </p>
              <p>
                At Unserious Coffee, you can be yourself. You can be tired. You can be stressed. 
                You can be overworked and under-caffeinated. We get it. We've been there. 
                That's why we're here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="coming-soon-section">
        <div className="container">
          <div className="coming-soon-content">
            <h2>Coming Soon to Wichita</h2>
            <p>
              We're building something special in the heart of Kansas. A place where the coffee is strong, 
              the vibes are chill, and the community is everything.
            </p>
            <p className="coming-soon-note">
              Follow our journey on social media. We'll keep you posted (or we won't, we're not your boss).
            </p>
            <div className="cta-buttons">
              <a href="/find-us" className="cta-button primary">
                Find Us
              </a>
              <a href="/menu" className="cta-button secondary">
                See Menu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

