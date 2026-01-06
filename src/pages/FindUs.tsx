import './FindUs.css';

interface ScheduleItem {
  day: string;
  time: string;
  location: string;
  status: 'open' | 'closed' | 'special';
  note?: string;
}

const schedule: ScheduleItem[] = [
  {
    day: 'Monday',
    time: '7:00 AM - 2:00 PM',
    location: 'Downtown Wichita',
    status: 'open',
  },
  {
    day: 'Tuesday',
    time: '7:00 AM - 2:00 PM',
    location: 'Riverside Park',
    status: 'open',
  },
  {
    day: 'Wednesday',
    time: '7:00 AM - 2:00 PM',
    location: 'Old Town Square',
    status: 'open',
  },
  {
    day: 'Thursday',
    time: '7:00 AM - 2:00 PM',
    location: 'College Hill',
    status: 'open',
  },
  {
    day: 'Friday',
    time: '7:00 AM - 3:00 PM',
    location: 'Downtown Wichita',
    status: 'open',
    note: 'Extended hours for your weekend prep',
  },
  {
    day: 'Saturday',
    time: '8:00 AM - 2:00 PM',
    location: 'Farmers Market',
    status: 'open',
  },
  {
    day: 'Sunday',
    time: 'Closed',
    location: 'Recovering from the week',
    status: 'closed',
    note: 'Even coffee trailers need a day off',
  },
];

export default function FindUs() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#68d391';
      case 'closed':
        return '#fc8181';
      case 'special':
        return '#d69e2e';
      default:
        return '#718096';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
      case 'special':
        return 'Special Hours';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="find-us-page">
      <div className="find-us-hero">
        <div className="find-us-hero-content">
          <h1>Find Us</h1>
          <p className="find-us-hero-subtitle">We're mobile. We're flexible. We're probably caffeinated.</p>
        </div>
      </div>

      <section className="schedule-section">
        <div className="container">
          <div className="schedule-header">
            <h2>Trailer Schedule</h2>
            <p className="schedule-subtitle">
              Our coffee trailer roams around Wichita. Here's where you can catch us (or miss us, no judgment).
            </p>
          </div>

          <div className="schedule-grid">
            {schedule.map((item, index) => (
              <div 
                key={item.day} 
                className="schedule-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="schedule-card-header">
                  <h3>{item.day}</h3>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(item.status),
                      color: item.status === 'open' ? '#1a202c' : '#fff'
                    }}
                  >
                    {getStatusText(item.status)}
                  </span>
                </div>
                <div className="schedule-card-body">
                  <div className="schedule-time">
                    <span className="schedule-icon">⏰</span>
                    <span>{item.time}</span>
                  </div>
                  <div className="schedule-location">
                    <span className="schedule-icon">📍</span>
                    <span>{item.location}</span>
                  </div>
                  {item.note && (
                    <div className="schedule-note">
                      <span className="schedule-icon">💡</span>
                      <span>{item.note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="schedule-footer">
            <div className="schedule-note-box">
              <h3>📱 Stay Updated</h3>
              <p>
                Schedule subject to change (because life happens). 
                Follow us on social media for real-time updates and surprise locations.
              </p>
              <p className="schedule-note-small">
                Pro tip: If you see a coffee trailer and hear good music, that's probably us.
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

