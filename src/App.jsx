import { useEffect, useState } from "react";
import {
  CheckCircle,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";
import image1 from "./assets/image1.webp";
import image2 from "./assets/image2.webp";
import image3 from "./assets/image3.webp";
import image4 from "./assets/image4.webp";
import image5 from "./assets/image5.webp";
import image6 from "./assets/image6.webp";
import image7 from "./assets/image7.webp";
import image8 from "./assets/image8.webp";
import image9 from "./assets/image9.webp";
import image10 from "./assets/image10.webp";
import image11 from "./assets/image11.webp";
import image12 from "./assets/image12.webp";
import EMBLEM_URL from "./assets/swanemblem_B.png";
import text2 from "./assets/text2.png";
import text3 from "./assets/text3.png";
import VIDEO from "./assets/video.mp4";
import "./App.css";

const WEDDING_DATE = new Date("2027-02-07T00:00:00");

function useDaysUntil(targetDate) {
  const [days, setDays] = useState(() => {
    const now = new Date();
    const diff = targetDate - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = targetDate - now;
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    tick();
    const id = setInterval(tick, 60 * 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return days;
}

const galleryImages = [
  image3,
  image10,
  image4,
  image6,
  image5,
  image8,
  image9,
  image7,
  image11,
  image12,
];

const faqs = [
  {
    question: "Is the wedding indoors or outdoors?",
    answer: "Weather permitting, the ceremony will take place outdoors. Cocktail hour will offer both indoor and outdoor spaces, and dinner and reception will be held indoors.",
  },
  {
    question: "What is the dress code?",
    answer: "We are requesting garden formal attire; think mid-to-floor length dresses and floral patterns. As parts of the day will take place on the grass, we kindly suggest that ladies opt for wedges, block heels, or dressy flats to stay comfortable. For the men, any classic attire in light tones or standard grey/black are welcome.",
  },
  {
    question: "Where should I park?",
    answer: "There is designated parking located in the lot directly behind the building. Please note that the section of Lake Morton Drive between Vistabula Street and Chiles Street will be blocked off for the duration of the wedding.",
  },
  {
    question: "Can I bring a plus-one?",
    answer: "Please check your invitation for the names of everyone included in your party.",
  },
  {
    question: "Will the ceremony and reception be at the same place?",
    answer: "Yes. The ceremony, dinner, and reception will all take place at The Junior League Building in Lakeland.",
  },
  {
    question: "What time should I arrive?",
    answer: "Doors open at 3:30 PM. Please be seated by 3:50 PM so we can begin the ceremony promptly at 4:00 PM.",
  },
  {
    question: "What if I arrive early?",
    answer: "If you arrive prior to 3:30pm, feel free to grab a coffee at Black & Brew, a sweet treat at Mootown Scoops, a cocktail or appetizer at The Peach House, or explore nearby spots like the Lakeland Public Library or the AGB Museum of Art. All of these locations are within a block of the venue.",
  },
];

function App() {
  const daysToGo = useDaysUntil(WEDDING_DATE);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("Joyfully Accepts");
  const [additionalGuests, setAdditionalGuests] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;

    setSubmitting(true);

    const formData = new URLSearchParams();
    formData.append("entry.673683376", name.trim());
    formData.append("entry.233590652", attendance);
    if (attendance === "Joyfully Accepts" && additionalGuests.trim()) {
      formData.append("entry.1574651908", additionalGuests.trim());
    }

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSeio1gf7VaNlGBnJJ6ypY1SkW1tNbKBkdwLfYtrD5aq_N7N8g/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
    } catch (_) {
      // no-cors swallows the response; proceed to success regardless
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="page-wrapper">
      <div className={`site-nav-bar ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#" className="nav-brand"><img src={EMBLEM_URL} alt="Manny and Liv swan emblem" /></a>
          <div className="nav-links">
            <a href="#gallery">Gallery</a>
            <a href="#rsvp">RSVP</a>
            <a href="#details">Details</a>
            <a href="#party">Party</a>
            <a href="#video">Registry</a>
            <a href="#faq">FAQ</a>
          </div>
        </nav>
      </div>

      <header className="hero-section" id="top">
        <div className="hero-content">
          <div className="emblem-wrapper" aria-label="Swan emblem">
            <img src={EMBLEM_URL} alt="Manny and Liv swan emblem" />
            {/* <span className="emblem-caption">Our day, our story</span> */}
          </div>
          {/* <p className="eyebrow">Together with their families</p> */}
          <img className="hero-title-image" src={text2} alt="Manny and Liv" />
          {/* <div className="divider-dot"><span /></div> */}
          <div className="hero-date-container">
            <p className="hero-date">February 7, 2027</p>
            {/* <p className="hero-date">Lakeland, Florida</p> */}
          </div>
          {/* <a className="hero-cta" href="#details">Explore our day <Navigation size={15} /></a> */}
        </div>
      </header>

      <main>
        <section className="gallery-section" id="gallery" aria-label="Photo gallery">
          <div className="section-heading gallery-heading">
            {/* <p className="eyebrow">A little glimpse</p> */}
            {/* <h2>Our favorite moments</h2> */}
          </div>
          <div className="carousel-track">
            {[...galleryImages, ...galleryImages].map((photo, index) => (
              <img key={`${photo}-${index}`} src={photo} alt="Manny and Liv together" loading={index === 0 ? "eager" : "lazy"} />
            ))}
          </div>
        </section>

        <section className="form-section" id="rsvp">
          <div className="section-heading">
            <p className="eyebrow">RSVP</p>
          </div>
          {!submitted ? (
            <>
              <p className="form-instruction">Please let us know if you will be able to join us by filling out the form below.</p>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="guest-name" className="form-label">Full Name</label>
                  <input id="guest-name" type="text" className="form-input" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                </div>
                <div className="form-field">
                  <label className="form-label">Attendance</label>
                  <div className="radio-group">
                    <label className="radio-label"><input type="radio" name="attendance" value="Joyfully Accepts" checked={attendance === "Joyfully Accepts"} onChange={(e) => setAttendance(e.target.value)} />Joyfully Accepts</label>
                    <label className="radio-label"><input type="radio" name="attendance" value="Regretfully Declines" checked={attendance === "Regretfully Declines"} onChange={(e) => setAttendance(e.target.value)} />Regretfully Declines</label>
                  </div>
                </div>
                {attendance === "Joyfully Accepts" && (
                  <div className="form-field">
                    <label htmlFor="additional-guests" className="form-label">Additional Guests</label>
                    <p className="form-subtext">Please fill this section out only if your invitation was extended to your household or a named plus-one.</p>
                    <textarea id="additional-guests" className="form-input form-textarea" rows="3" placeholder="Full names of additional guests." value={additionalGuests} onChange={(e) => setAdditionalGuests(e.target.value)} />
                  </div>
                )}
                <button type="submit" className="form-submit" disabled={submitting || !name.trim()}>{submitting ? "Sending…" : "Submit RSVP"}</button>
              </form>
            </>
          ) : (
            <div className="success-wrapper" role="status">
              <CheckCircle className="success-icon" size={52} strokeWidth={1} aria-hidden="true" />
              <p className="success-title">Thank You!</p>
              <p className="success-message">Your RSVP has been recorded. We can&apos;t wait to celebrate with you!</p>
              <Heart size={20} strokeWidth={1} fill="currentColor" style={{ color: "var(--color-pink)", marginTop: "0.5rem" }} aria-hidden="true" />
            </div>
          )}
        </section>

        <section className="details-section section-shell" id="details">
          <div className="section-heading">
            <p className="eyebrow">Details</p>
            {/* <h2>Event Details</h2> */}
            {/* <p className="section-intro">A day filled with good food, happy tears, and the people we love most.</p> */}
          </div>
          <div className="details-grid">
            <div className="venue-card">
              <div className="detail-icon"><MapPin size={22} strokeWidth={1.4} /></div>
              <p className="detail-kicker">The place</p>
              <h3>The Junior League Building</h3>
              <p>90 Lake Morton Drive<br />Lakeland, FL 33801</p>
              <a href="https://www.google.com/maps/search/?api=1&query=The+Junior+League+Building+Lakeland+FL" target="_blank" rel="noreferrer">View on map <Navigation size={14} /></a>
            </div>
            <div className="timeline-card">
              <div className="detail-icon"><Clock3 size={22} strokeWidth={1.4} /></div>
              <p className="detail-kicker">The schedule</p>
              <div className="timeline">
                {[['3:30 PM', 'Guests Arrive'], ['4:00 PM', 'Ceremony Begins'], ['4:30 PM', 'Cocktail Hour'], ['5:30 PM', 'Dinner / Reception'], ['10:00 PM', 'Send Off']].map(([time, event]) => (
                  <div className="timeline-row" key={time}>
                    <span>{time}</span><strong>{event}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="party-section section-shell" id="party">
          <div className="section-heading">
            <p className="eyebrow">Wedding Party</p>
            {/* <h2>Wedding Party</h2> */}
          </div>
          <div className="party-grid">
            <div className="party-side">
              <div className="party-card-top"><span>Groomsmen</span></div>
              <div className="party-names">
                {['Bryan Veiga', 'Hein Nguyen', 'Gabriel Rodríguez', 'Matthew Brooks'].map((name, index) => <div className="party-person" key={name}><strong>{name}</strong></div>)}
              </div>
            </div>
            <div className="party-side">
              <div className="party-card-top"><span>Bridesmaids</span></div>
              <div className="party-names">
                {['René Yates', 'Emily Yates', 'Zsalonda Legister', 'Lauren Gunther'].map((name, index) => <div className="party-person" key={name}><strong>{name}</strong></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="form-section" id="rsvp">
          <div className="section-heading">
            <p className="eyebrow">REGISTRY</p>
          </div>
        </section>

        <section className="video-section section-shell" id="video">
          <div className="section-heading">
            {/* <p className="eyebrow">Video</p> */}
            {/* <h2>Before the big day</h2> */}
          </div>
          <div className="video-container" aria-label="Wedding Video">
            <video 
              className="video-element" 
              controls 
              playsInline 
              disablePictureInPicture 
              controlsList="nodownload no-remote-playback" 
              preload="metadata" 
              crossOrigin="anonymous"
            >
              <source src={`${VIDEO}#t=0.001`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="faq-section section-shell" id="faq">
          <div className="section-heading"><p className="eyebrow">FAQ's</p></div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={faq.question}>
                <button className="faq-question" type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{faq.question}</span><ChevronDown size={19} />
                </button>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="countdown-wrapper" aria-label={`${daysToGo} days to go`}>
        {/* <p className="eyebrow">Until we say “I do”</p> */}
        <div className="countdown-display">
          <span className="countdown-number">{daysToGo}</span>
          <span className="countdown-label">Days to Go</span>
        </div>
      </section>

      <footer className="footer-section">
        <img
            className="seeYouThere"
            src={text3}
            alt="Save The Date Text"
          />
        <div className="footer-photos"><img src={image1} alt="Manny and Liv in the garden" /><img src={image2} alt="Manny and Liv together outdoors" /></div>
        <div className="footer-note">With love, Olivia and Manny</div>
      </footer>
    </div>
  );
}

export default App;