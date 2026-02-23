import './FindUs.css';

interface NextPopUp {
  location: string;
  date: string;
  time: string;
  eventType: string;
  note?: string;
}

// Update this object whenever you have a new pop-up booked
const nextPopUp: NextPopUp = {
  location: 'TBD',
  date: 'TBD',
  time: 'TBD',
  eventType: 'TBD',
  note: 'Check back here or follow us on social for the latest.',
};

export default function FindUs() {

  return (
    <div className="find-us-page">
      <div className="find-us-hero">
        <div className="find-us-hero-content">
          <h1>Find Us</h1>
          <p className="find-us-hero-subtitle">
            Unserious Coffee is a mobile pop-up coffee shop serving Panama City and surrounding areas.
          </p>
        </div>
      </div>

      <section className="schedule-section">
        <div className="container">
          <div className="schedule-header">
            <h2>Next Pop-Up</h2>
            <p className="schedule-subtitle">
              We&apos;re a mobile pop-up coffee shop. Check here to see where we&apos;re brewing next.
            </p>
          </div>

          <div className="schedule-grid">
            <div className="schedule-card">
              <div className="schedule-card-header">
                <h3>Upcoming Event</h3>
                <span className="status-badge" style={{ backgroundColor: '#d69e2e', color: '#1a202c' }}>
                  Pop-Up
                </span>
              </div>
              <div className="schedule-card-body">
                <div className="schedule-location">
                  <span className="schedule-icon">📍</span>
                  <span>{nextPopUp.location}</span>
                </div>
                <div className="schedule-time">
                  <span className="schedule-icon">📅</span>
                  <span>{nextPopUp.date}</span>
                </div>
                <div className="schedule-time">
                  <span className="schedule-icon">⏰</span>
                  <span>{nextPopUp.time}</span>
                </div>
                <div className="schedule-time">
                  <span className="schedule-icon">🎟️</span>
                  <span>{nextPopUp.eventType}</span>
                </div>
                {nextPopUp.note && (
                  <div className="schedule-note">
                    <span className="schedule-icon">💡</span>
                    <span>{nextPopUp.note}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="schedule-footer">
            <div className="schedule-note-box">
              <h3>📱 Stay Updated</h3>
              <p>
                Pop-up details can change (because life happens). 
                Follow us on social media for real-time updates and new locations.
              </p>
              <p className="schedule-note-small">
                Pro tip: If you see a pop-up coffee bar and hear good music, that&apos;s probably us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="map-placeholder">
            <div className="map-content">
              <h3>📍 Interactive Map Coming Soon</h3>
              <p>We're working on a fancy map that shows our current location in real-time.</p>
              <p className="map-note">Until then, just follow the smell of good coffee and better vibes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

