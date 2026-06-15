"use client";

import { useState, useEffect } from "react";
import { Heart, CheckCircle, Film } from "lucide-react";
import EMBLEM_URL from "./swanemblem_B.png"
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

export default function SaveTheDate() {
  const daysToGo = useDaysUntil(WEDDING_DATE);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    setSubmitting(true);

    const formData = new URLSearchParams();
    formData.append("entry.673683376", name.trim());
    formData.append("entry.233590652", address.trim());

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
      {/* Top border accent */}
      {/* <div className="page-border-top" aria-hidden="true" /> */}

      {/* ── HERO ── */}
      <section className="hero-section">
        {/* Swan Emblem */}
        <div className="emblem-wrapper">
          <img
            src={EMBLEM_URL}
            alt="Wedding emblem — two swans surrounded by florals"
          />
        </div>

        {/* Save the Date */}
        <h1 className="save-the-date">Save the Date</h1>

        {/* <div className="divider" aria-hidden="true" /> */}
      </section>

      {/* ── VIDEO ── */}
      <section className="video-section">
        <div className="video-container" aria-label="Video placeholder">
          <div className="video-placeholder">
            <Film
              className="video-placeholder-icon"
              size={48}
              strokeWidth={1}
              aria-hidden="true"
            />
            <span className="video-placeholder-text">Video coming soon</span>
          </div>
        </div>
      </section>

      {/* ── NAMES & DETAILS ── */}
      <section className="names-section">
        <h2 className="couple-names">
          Manny <span className="ampersand">&amp;</span> Liv
        </h2>

        <p className="wedding-details2">February 7, 2027</p>
        <p className="wedding-details">Lakeland, FL</p>

        <div className="countdown-wrapper" aria-label={`${daysToGo} days to go`}>
          <div className="countdown-display">
            <span className="countdown-number">{daysToGo}</span>
          </div>
          <span className="countdown-label">Days to Go</span>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="form-section">
        {!submitted ? (
          <>
            <p className="form-instruction">
              Please provide your current information in the form below so we
              can get you your invitation!
            </p>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-field">
                <label htmlFor="guest-name" className="form-label">
                  Full Name
                </label>
                <input
                  id="guest-name"
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="guest-address" className="form-label">
                  Address
                </label>
                <input
                  id="guest-address"
                  type="text"
                  className="form-input"
                  placeholder="Your mailing address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  autoComplete="street-address"
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={submitting || !name.trim() || !address.trim()}
              >
                {submitting ? "Sending\u2026" : "Submit"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-wrapper" role="status">
            <CheckCircle
              className="success-icon"
              size={52}
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="success-title">Thank You!</p>
            <p className="success-message">
              Your information has been saved. We can&apos;t wait to celebrate
              with you!
            </p>
            <Heart
              size={20}
              strokeWidth={1}
              fill="currentColor"
              style={{ color: "var(--color-pink)", marginTop: "0.5rem" }}
              aria-hidden="true"
            />
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-section">
        {/* <div className="divider" aria-hidden="true" /> */}

        <p className="see-you-soon">See You Soon</p>
        <p className="wedding-details2">Check back later for more details.</p>

        {/* <div className="emblem-wrapper" aria-hidden="true">
          <img src={EMBLEM_URL} alt="" />
        </div> */}
      </footer>

      {/* Bottom border accent */}
      {/* <div className="page-border-bottom" aria-hidden="true" /> */}
    </div>
  );
}
