import React from 'react';
import { CheckCircle2, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';

export default function HeroSection({ 
  onConnectNow,
  onGetStarted,
  onRegister,
  onLogin,
  userState
}) {

  const handleGetStartedClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else if (onRegister) {
      onRegister();
    }
  };

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <section className="medbridge-hero-wrapper">
      {/* Hero Banner with Geometric Graphics & Dual Columns */}
      <div className="hero-main-container">
        {/* Left Decorative Vector Graphics (from Mockup) */}
        <div className="hero-decor-left">
          {/* Cyan Filled Circle */}
          <div className="decor-cyan-dot"></div>

          {/* Isometric Diamond / Polygonal Line Art */}
          <svg className="decor-polygon-svg" width="140" height="140" viewBox="0 0 140 140" fill="none">
            <polygon points="20,70 70,20 120,70 70,120" stroke="#00a8cc" strokeWidth="1.6" strokeDasharray="3 3" opacity="0.6" />
            <polygon points="40,70 70,40 100,70 70,100" stroke="#00a8cc" strokeWidth="1.8" opacity="0.8" />
            <line x1="70" y1="20" x2="70" y2="120" stroke="#00a8cc" strokeWidth="1.2" opacity="0.5" />
            <line x1="20" y1="70" x2="120" y2="70" stroke="#00a8cc" strokeWidth="1.2" opacity="0.5" />
          </svg>

          {/* Subtle Line Graph / Pulse */}
          <svg className="decor-pulse-left" width="120" height="40" viewBox="0 0 120 40" fill="none">
            <path d="M 0 20 L 35 20 L 45 6 L 55 34 L 65 14 L 75 24 L 85 20 L 120 20" stroke="#00a8cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          </svg>
        </div>

        {/* Right Decorative Vector Graphics (Bar Chart & Line Plot from Mockup) */}
        <div className="hero-decor-right">
          {/* Vertical Bar Chart (5 Bars in Cyan) */}
          <div className="decor-bar-chart">
            <div className="bar bar-1"></div>
            <div className="bar bar-2"></div>
            <div className="bar bar-3"></div>
            <div className="bar bar-4"></div>
            <div className="bar bar-5"></div>
          </div>

          {/* Ascending Line Graph with Node Dots */}
          <svg className="decor-line-graph" width="130" height="60" viewBox="0 0 130 60" fill="none">
            <path d="M 10 50 L 40 38 L 70 42 L 100 20 L 125 10" stroke="#00a8cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="50" r="3.5" fill="#00a8cc" />
            <circle cx="40" cy="38" r="3.5" fill="#00a8cc" />
            <circle cx="70" cy="42" r="3.5" fill="#00a8cc" />
            <circle cx="100" cy="20" r="3.5" fill="#00a8cc" />
            <circle cx="125" cy="10" r="4.5" fill="#00a8cc" />
          </svg>
        </div>

        {/* Center Bottom Pulse Line */}
        <div className="hero-decor-bottom">
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
            <path d="M 2 16 C 8 16 12 4 18 4 C 24 4 28 20 34 20 C 40 20 44 8 50 8 C 54 8 56 16 58 16" stroke="#00a8cc" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>

        {/* Hero Content Grid (Left Text, Right Illustration) */}
        <div className="container hero-content-grid">
          {/* Left Column: Headline, Subtitle, CTA Button Group */}
          <div className="hero-left-text-block">
            <div className="hero-pill-announcement">
              <Sparkles size={14} color="#00a8cc" />
              <span>Next-Generation Healthcare Access & Quality</span>
            </div>

            <h1 className="hero-headline">
              BRIDGING THE GAP<br />
              IN HEALTHCARE.
            </h1>

            <p className="hero-subheadline">
              Seamlessly connecting patients, providers, and data to simplify access and optimize care delivery.
            </p>

            {/* Value Highlights */}
            <div className="hero-mini-badges">
              <span className="mini-badge">
                <CheckCircle2 size={13} color="#00a8cc" />
                Verified Doctors
              </span>
              <span className="mini-badge">
                <CheckCircle2 size={13} color="#00a8cc" />
                Price Transparency
              </span>
              <span className="mini-badge">
                <CheckCircle2 size={13} color="#00a8cc" />
                Instant HealthCredits
              </span>
            </div>

            {/* Primary Action Button: Get Started */}
            <div className="hero-cta-action-group">
              <button 
                type="button" 
                className="btn-hero-get-started"
                onClick={handleGetStartedClick}
                id="hero-get-started-btn"
              >
                <span>GET STARTED</span>
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Login Link Hint */}
            <div className="hero-login-subbar">
              <span>Already have an account?</span>
              <button 
                type="button" 
                className="hero-inline-login-btn"
                onClick={handleLoginClick}
                id="hero-login-link-btn"
              >
                Log In
              </button>
            </div>
          </div>

          {/* Right Column: Clean Official Healthcare Hub Card with Normal Logo */}
          <div className="hero-right-visual-block">
            <div className="hub-showcase-card">
              {/* Overlapping Top Badge (Exact from User Screenshot) */}
              <div className="hub-top-badge">
                <span className="hub-pulse-dot"></span>
                <span>Official Healthcare Hub</span>
              </div>

              {/* Normal MedBridge Brand Logo (Clean, exactly as before) */}
              <div className="hub-logo-wrap">
                <img 
                  src="./medbridge-brand-transparent.png" 
                  alt="MedBridge - Your Path to Affordable Healthcare" 
                  className="hub-brand-logo-img"
                />
              </div>

              {/* Bottom Tagline (Exact from User Screenshot) */}
              <div className="hub-footer-tagline">
                <HeartHandshake size={16} color="#00a8cc" />
                <span>Bridging Quality & Affordability</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        .medbridge-hero-wrapper {
          background: #ffffff;
          overflow: hidden;
        }

        /* Hero Banner with exact light cyan gradient matching screenshot */
        .hero-main-container {
          background: linear-gradient(180deg, #eaf7f9 0%, #edf9fb 60%, #f4fbfd 100%);
          border-bottom: 1px solid #d4f0f5;
          padding: 64px 0 56px;
          position: relative;
        }

        /* Left Decorative Vector Accents */
        .hero-decor-left {
          position: absolute;
          top: 30px;
          left: 20px;
          pointer-events: none;
          z-index: 1;
        }

        .decor-cyan-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #00a8cc;
          margin-bottom: 24px;
          margin-left: 20px;
        }

        .decor-polygon-svg {
          display: block;
          margin-bottom: 16px;
        }

        .decor-pulse-left {
          display: block;
        }

        /* Right Decorative Vector Accents */
        .hero-decor-right {
          position: absolute;
          top: 40px;
          right: 30px;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          gap: 20px;
          z-index: 1;
        }

        .decor-bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 5px;
          height: 55px;
        }
        .bar {
          width: 7px;
          border-radius: 4px 4px 0 0;
          background: #00a8cc;
          opacity: 0.75;
        }
        .bar-1 { height: 18px; }
        .bar-2 { height: 32px; }
        .bar-3 { height: 26px; }
        .bar-4 { height: 44px; }
        .bar-5 { height: 52px; opacity: 0.95; }

        .decor-line-graph {
          display: block;
        }

        .hero-decor-bottom {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          opacity: 0.7;
        }

        /* Grid Layout */
        .hero-content-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: 40px;
          align-items: center;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .hero-left-text-block {
          text-align: left;
        }

        /* Headline: Uppercase bold matching mockup */
        .hero-headline {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 3.35rem;
          line-height: 1.12;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        /* Subtitle */
        .hero-subheadline {
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 1.12rem;
          color: #334155;
          line-height: 1.6;
          max-width: 520px;
          margin-bottom: 28px;
          font-weight: 500;
        }

        /* Announcement Pill */
        .hero-pill-announcement {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 168, 204, 0.08);
          border: 1px solid rgba(0, 168, 204, 0.25);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #0891b2;
          margin-bottom: 18px;
          letter-spacing: 0.02em;
        }

        /* Value Highlights */
        .hero-mini-badges {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .mini-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          background: rgba(255, 255, 255, 0.7);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        /* Action Buttons: Get Started + Register + Connect */
        .hero-cta-action-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .btn-hero-get-started {
          background: linear-gradient(135deg, #00a8cc 0%, #0284c7 100%);
          color: #ffffff;
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          padding: 14px 26px;
          border-radius: 9999px;
          border: none;
          box-shadow: 0 6px 20px rgba(0, 168, 204, 0.38);
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-hero-get-started:hover {
          background: linear-gradient(135deg, #0092b3 0%, #0369a1 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(0, 168, 204, 0.48);
        }

        .btn-hero-register {
          background: #ffffff;
          color: #00a8cc;
          border: 2px solid #00a8cc;
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          padding: 12px 24px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 7px;
          box-shadow: 0 2px 8px rgba(0, 168, 204, 0.12);
        }
        .btn-hero-register:hover {
          background: #e6f7fa;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 168, 204, 0.22);
        }

        .btn-hero-connect-care {
          background: #f8fafc;
          color: #0f172a;
          border: 1.5px solid #cbd5e1;
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.86rem;
          font-weight: 700;
          padding: 12px 20px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.22s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-hero-connect-care:hover {
          border-color: #00a8cc;
          color: #00a8cc;
          background: #ffffff;
          transform: translateY(-2px);
        }

        /* Login Hint */
        .hero-login-subbar {
          font-size: 0.84rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-inline-login-btn {
          background: none;
          border: none;
          color: #00a8cc;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
          font-size: 0.84rem;
        }
        .hero-inline-login-btn:hover {
          color: #0891b2;
        }

        /* Right Visual Block */
        .hero-right-visual-block {
          display: flex;
          justify-content: center;
          position: relative;
        }

        /* Official Healthcare Hub Card (Pixel-match to user screenshot) */
        .hub-showcase-card {
          position: relative;
          background: #ffffff;
          border-radius: 26px;
          padding: 44px 34px 28px;
          box-shadow: 0 16px 44px -8px rgba(0, 168, 204, 0.16), 0 4px 18px rgba(15, 23, 42, 0.05);
          border: 1.5px solid rgba(0, 168, 204, 0.24);
          max-width: 470px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .hub-showcase-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 50px -8px rgba(0, 168, 204, 0.22), 0 6px 22px rgba(15, 23, 42, 0.07);
        }

        /* Overlapping Top Badge (Exact from User Screenshot) */
        .hub-top-badge {
          position: absolute;
          top: -14px;
          right: 32px;
          background: #ffffff;
          border: 1.5px solid #a5f3fc;
          box-shadow: 0 4px 14px rgba(0, 168, 204, 0.16);
          border-radius: 9999px;
          padding: 5px 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0284c7;
          letter-spacing: 0.01em;
          z-index: 3;
        }

        .hub-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.28);
          animation: hub-pulse 2s infinite;
        }

        @keyframes hub-pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        /* Logo Wrap */
        .hub-logo-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 16px 14px 26px;
        }

        .hub-brand-logo-img {
          max-width: 360px;
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(0, 168, 204, 0.08));
        }

        /* Bottom Tagline (Exact from User Screenshot) */
        .hub-footer-tagline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #0f2942;
          padding-top: 18px;
          border-top: 1px solid #f1f5f9;
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 960px) {
          .hero-content-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 36px;
          }
          .hero-left-text-block {
            text-align: center;
          }
          .hero-pill-announcement,
          .hero-mini-badges,
          .hero-cta-action-group,
          .hero-login-subbar {
            justify-content: center;
          }
          .hero-subheadline {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-headline {
            font-size: 2.6rem;
          }
          .hero-decor-left, .hero-decor-right {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
