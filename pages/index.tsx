import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>NRNA Youth UK</title>
      </Head>

      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="logo">
          <span className="mark">
            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 20L9 7L13 14L17 5L24 20H2Z" fill="#F3A430" />
            </svg>
          </span>
          NRNA Youth UK
        </div>
        <div className="nav-links-wrap">
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#membership">Membership</a></li>
            </ul>
          </nav>
          <a className="nav-cta" href="#membership">Join Us</a>
          <button className="menu-btn" aria-label="Menu">&#9776;</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="eyebrow">A new chapter under NRNA UK</div>
          <h1>Nepalese youth, <span>rooted and rising</span> across the UK</h1>
          <p>
            NRNA Youth UK is the newest team within NRNA UK — built by and for young
            Nepalese residents across the country, connecting culture, community, and
            opportunity in one place.
          </p>
          <div className="hero-ctas">
            <a className="btn-primary" href="#membership">Become a Member</a>
            <a className="btn-secondary" href="#events">See Upcoming Events</a>
          </div>
        </div>
        <div className="ridge">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <polygon points="0,120 0,80 180,30 340,70 520,10 700,60 880,20 1080,75 1260,35 1440,65 1440,120" fill="#232A52" />
            <polygon points="0,120 0,100 220,55 400,90 600,45 800,85 1000,50 1200,95 1440,80 1440,120" fill="#F7F6F2" />
          </svg>
        </div>
      </section>

      <section className="pillars" id="about">
        <div className="section-head">
          <div className="eyebrow">Why we exist</div>
          <h2>Three things we&apos;re here to do</h2>
        </div>
        <div className="pillar-grid">
          <div className="pillar">
            <div className="num">01</div>
            <h3>Connect</h3>
            <p>Bringing young Nepalese residents together across UK cities — students, professionals, and families alike — so no one navigates life here alone.</p>
          </div>
          <div className="pillar">
            <div className="num">02</div>
            <h3>Celebrate</h3>
            <p>Keeping Nepalese culture, festivals, and language alive in the diaspora, through events that feel like home wherever you are.</p>
          </div>
          <div className="pillar">
            <div className="num">03</div>
            <h3>Contribute</h3>
            <p>Channeling youth energy into NRNA UK&apos;s wider mission — mentorship, volunteering, and representation at every level.</p>
          </div>
        </div>
      </section>

      <section className="parent-strip">
        <p>NRNA Youth UK operates as part of the Non-Resident Nepali Association UK, the UK chapter of the worldwide NRNA network.</p>
        <a href="https://www.nrnauk.org/unity-convention/" target="_blank" rel="noopener noreferrer">Visit NRNA UK &rarr;</a>
      </section>

      <section className="events" id="events">
        <div className="section-head">
          <div className="eyebrow">What&apos;s coming up</div>
          <h2>Upcoming events</h2>
        </div>
        <div className="event-grid">
          <div className="event-card">
            <div className="date">Date to be confirmed</div>
            <h3>Youth Welcome Meetup</h3>
            <p>An introductory gathering for young members to meet the founding team and shape what comes next.</p>
          </div>
          <div className="event-card">
            <div className="date">Date to be confirmed</div>
            <h3>Dashain &amp; Tihar Social</h3>
            <p>Celebrating the festival season together — food, music, and community, London-based.</p>
          </div>
          <div className="event-card">
            <div className="date">Date to be confirmed</div>
            <h3>Careers &amp; Mentorship Evening</h3>
            <p>Connecting students and early professionals with mentors from across the Nepalese community.</p>
          </div>
        </div>

        <article className="featured-event" aria-label="3rd NRNA Cup and Nepali Festival">
          <div className="date">Saturday, 19 September 2026</div>
          <h3>3rd NRNA Cup &amp; Nepali Festival</h3>
          <div className="featured-meta">
            <span><strong>Time:</strong> 08:00 hrs</span>
            <span><strong>Venue:</strong> Browells Lane, Feltham, TW13 7EF, London</span>
            <span><strong>Format:</strong> 9-a-side football tournament</span>
          </div>
          <figure className="event-poster">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nrna-cup-poster.jpg" alt="Poster for the 3rd NRNA Cup and Nepali Festival" loading="lazy" />
          </figure>
          <p>
            NRNA Youth UK warmly invites clubs, community teams, and supporters to join
            the 3rd NRNA Cup, hosted as part of our wider Nepali Festival celebration.
            This flagship event combines competitive football with community spirit,
            culture, and family-friendly festival energy. Throughout the day, teams from
            across the UK will compete in a fast-paced 9-a-side format, while attendees
            enjoy the atmosphere of one of the biggest Nepalese community sporting
            gatherings of the year.
          </p>
          <p style={{ marginTop: "0.9rem" }}>
            The tournament includes three categories: Main Team, Veterans, and Women&apos;s
            Team. Each category has its own registration fee and payment link. Choose the
            correct category below and register your squad early to secure your place.
          </p>

          <div className="category-grid">
            <div className="category-card">
              <h4>Main Team</h4>
              <div className="fee">Entry fee: GBP 300</div>
              <Link className="register-btn" href="/register?category=main">Register Your Team</Link>
            </div>
            <div className="category-card">
              <h4>Veterans Team</h4>
              <div className="fee">Entry fee: GBP 200</div>
              <Link className="register-btn" href="/register?category=veterans">Register Your Team</Link>
            </div>
            <div className="category-card">
              <h4>Women&apos;s Team</h4>
              <div className="fee">Entry fee: GBP 150</div>
              <Link className="register-btn" href="/register?category=womens">Register Your Team</Link>
            </div>
          </div>
        </article>
      </section>

      <section className="cta-band" id="membership">
        <h2>Ready to be part of it?</h2>
        <p>Membership is free to join at launch. Sign up to get early updates on events and how to get involved.</p>
        <a className="btn-primary" href="#" style={{ display: "inline-block" }}>Become a Member</a>
      </section>

      <footer>
        <div className="footer-top">
          <div>
            <div className="logo">
              <span className="mark">
                <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 20L9 7L13 14L17 5L24 20H2Z" fill="#F3A430" />
                </svg>
              </span>
              NRNA Youth UK
            </div>
            <p style={{ maxWidth: "280px" }}>A team under NRNA UK for Nepalese residents across the United Kingdom.</p>
          </div>
          <div className="footer-cols">
            <div>
              <span>Site</span>
              <a href="#about">About</a>
              <a href="#events">Events</a>
              <a href="#membership">Membership</a>
            </div>
            <div>
              <span>NRNA UK</span>
              <a href="https://www.nrnauk.org/unity-convention/" target="_blank" rel="noopener noreferrer">Parent site</a>
              <a href="https://members.nrnauk.org/" target="_blank" rel="noopener noreferrer">NRNA Membership Portal</a>
            </div>
          </div>
        </div>
        <div className="bottom-line">
          <span>&copy; 2026 NRNA Youth UK</span>
          <span>Part of the NRNA UK family</span>
        </div>
      </footer>
    </>
  );
}
