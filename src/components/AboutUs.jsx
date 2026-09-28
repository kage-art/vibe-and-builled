import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Network, 
  CalendarClock, 
  FolderHeart, 
  Coins, 
  Pill, 
  GraduationCap, 
  Siren 
} from 'lucide-react';

export default function AboutUs({ 
  onExploreCare, 
  onNavigate = () => {}, 
  onOpenSOS = () => {},
  onOpenCreditModal = () => {}
}) {
  return (
    <section className="about-us-section">
      {/* Header Banner */}
      <div className="about-hero-banner">
        <div className="container about-hero-grid">
          <div className="about-hero-text">
            <span className="badge badge-teal about-badge">
              <ShieldCheck size={15} />
              Our Mission & Impact
            </span>
            <h1 className="about-title">About MedBridge</h1>
            <p className="about-subtitle">
              We are dedicated to building a unified, transparent healthcare bridge that connects patients, qualified clinicians, affordable medicine outlets, and university wellness programs.
            </p>

            <div className="about-hero-highlights">
              <div className="hero-highlight-pill">
                <CheckCircle2 size={15} className="highlight-icon" />
                <span>Verified Practitioners</span>
              </div>
              <div className="hero-highlight-pill">
                <CheckCircle2 size={15} className="highlight-icon" />
                <span>Affordable Generics Radar</span>
              </div>
              <div className="hero-highlight-pill">
                <CheckCircle2 size={15} className="highlight-icon" />
                <span>Confidential Campus Wellness</span>
              </div>
            </div>

            <div className="about-hero-actions">
              <button className="btn-teal hero-cta-btn" onClick={onExploreCare}>
                <span>Explore Care Solutions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="about-hero-brand-col">
            <div className="about-brand-showcase">
              <img 
                src="./medbridge-brand-transparent.png" 
                alt="MedBridge - Your Path to Affordable Healthcare" 
                className="about-hero-brand-img" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container about-body">
        {/* 1. Our Core Features */}
        <div className="core-features-section">
          <div className="section-header-centered">
            <h2 className="section-title">Our Core Features</h2>
          </div>

          <div className="core-features-grid">
            <div className="core-feature-card clean-card">
              <div className="core-icon-box teal-glow">
                <Network size={26} color="#0891b2" />
              </div>
              <h3>Connect with Specialists</h3>
              <p>Access a verified network of providers.</p>
            </div>

            <div className="core-feature-card clean-card">
              <div className="core-icon-box blue-glow">
                <CalendarClock size={26} color="#2563eb" />
              </div>
              <h3>Streamline Booking</h3>
              <p>Instant scheduling and patient forms.</p>
            </div>

            <div className="core-feature-card clean-card">
              <div className="core-icon-box indigo-glow">
                <FolderHeart size={26} color="#4f46e5" />
              </div>
              <h3>Manage Your Health</h3>
              <p>Secure access to records and care pathways.</p>
            </div>
          </div>
        </div>

        {/* 2. Why MedBridge Section */}
        <div className="why-medbridge-section">
          <div className="why-header">
            <h2 className="section-title">Why MedBridge?</h2>
            <p className="why-lead-text">
              Traditional healthcare is fragmented, costly, and confusing. MedBridge builds an accountable, interconnected bridge that puts patients and doctors first.
            </p>
          </div>

          <div className="why-cards-grid">
            {/* Card 1: Dual-Credit Economy */}
            <div className="why-card clean-card">
              <div className="why-card-top">
                <div className="why-icon-box gold-glow">
                  <Coins size={24} color="#b45309" />
                </div>
                <span className="why-tag gold">Mutual Incentive Model</span>
              </div>
              <h3>Dual-Credit Economy</h3>
              <p>
                Patients earn spendable HealthCredits (+₹75/treatment) while doctors earn verified TrustScore points that boost clinic visibility based on real health outcomes.
              </p>
              <div className="why-card-action">
                <button className="why-action-btn" onClick={onOpenCreditModal}>
                  <span>HealthCredits Economy</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 2: Hyperlocal Generic Radar */}
            <div className="why-card clean-card">
              <div className="why-card-top">
                <div className="why-icon-box teal-glow">
                  <Pill size={24} color="#0891b2" />
                </div>
                <span className="why-tag teal">Up to 84% Savings</span>
              </div>
              <h3>Hyperlocal Generic Radar</h3>
              <p>
                Compare local medicine prices across Jan Aushadhi generic outlets and private chemists to discover identical therapeutic alternatives with up to 84% savings.
              </p>
              <div className="why-card-action">
                <button className="why-action-btn primary" onClick={() => onNavigate('medicines')}>
                  <span>Explore Medicine Radar</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 3: Campus Wellness Pass */}
            <div className="why-card clean-card">
              <div className="why-card-top">
                <div className="why-icon-box purple-glow">
                  <GraduationCap size={24} color="#7c3aed" />
                </div>
                <span className="why-tag purple">Youth & Student Care</span>
              </div>
              <h3>Campus Wellness Pass</h3>
              <p>
                Subsidized, confidential 1-on-1 counseling designed specifically for university students navigating academic stress, anxiety, and peer challenges.
              </p>
              <div className="why-card-action">
                <button className="why-action-btn primary" onClick={() => onNavigate('counseling')}>
                  <span>View Student Hub</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 4: 24/7 Trauma Dispatch */}
            <div className="why-card clean-card">
              <div className="why-card-top">
                <div className="why-icon-box red-glow">
                  <Siren size={24} color="#dc2626" />
                </div>
                <span className="why-tag red">Emergency Response</span>
              </div>
              <h3>24/7 Trauma Dispatch</h3>
              <p>
                One-click emergency SOS dispatching live GPS-tracked ambulances in ~8 minutes with pre-arrival hospital ER bed reservation.
              </p>
              <div className="why-card-action">
                <button className="why-action-btn emergency" onClick={onOpenSOS}>
                  <span>Emergency SOS Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-us-section {
          background: #ffffff;
          padding-bottom: 70px;
        }

        .about-hero-banner {
          background: var(--bg-hero);
          border-bottom: 1px solid var(--border-teal);
          padding: 55px 0 50px;
          margin-bottom: 44px;
          position: relative;
        }

        .about-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          align-items: center;
        }

        .about-hero-text {
          text-align: left;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
          font-weight: 600;
        }

        .about-title {
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .about-subtitle {
          font-size: 1.05rem;
          color: var(--text-body);
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .about-hero-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .hero-highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid var(--border-teal);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-main);
          box-shadow: 0 1px 3px rgba(18, 156, 176, 0.06);
          backdrop-filter: blur(4px);
        }

        .highlight-icon {
          color: var(--teal-600);
          flex-shrink: 0;
        }

        .about-hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          font-size: 0.92rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          background: var(--teal-600);
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .hero-cta-btn:hover {
          background: var(--teal-700);
          transform: translateY(-1px);
        }

        .about-hero-brand-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .about-brand-showcase {
          position: relative;
          width: 100%;
          max-width: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .about-brand-showcase::before {
          content: "";
          position: absolute;
          width: 90%;
          height: 90%;
          background: radial-gradient(ellipse at center, rgba(22, 181, 203, 0.14) 0%, rgba(22, 181, 203, 0) 70%);
          filter: blur(24px);
          pointer-events: none;
          z-index: 0;
        }

        .about-hero-brand-img {
          width: 100%;
          max-width: 460px;
          height: auto;
          display: block;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 10px 24px rgba(18, 156, 176, 0.12));
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .about-hero-brand-img:hover {
          transform: translateY(-2px) scale(1.02);
          filter: drop-shadow(0 14px 28px rgba(18, 156, 176, 0.18));
        }

        /* --- 1. Core Features Section --- */
        .core-features-section {
          margin-bottom: 56px;
        }

        .section-header-centered {
          text-align: center;
          margin-bottom: 28px;
        }

        .section-title {
          font-size: 1.95rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.01em;
        }

        .core-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .core-feature-card {
          padding: 28px 24px;
          border-radius: var(--radius-lg);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .core-feature-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.08);
        }

        .core-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .teal-glow {
          background: #ecfeff;
          border: 1px solid #cffafe;
        }

        .blue-glow {
          background: #eff6ff;
          border: 1px solid #dbeafe;
        }

        .indigo-glow {
          background: #eef2ff;
          border: 1px solid #e0e7ff;
        }

        .gold-glow {
          background: #fffbeb;
          border: 1px solid #fef3c7;
        }

        .purple-glow {
          background: #faf5ff;
          border: 1px solid #f3e8ff;
        }

        .red-glow {
          background: #fef2f2;
          border: 1px solid #fee2e2;
        }

        .core-feature-card h3 {
          font-size: 1.18rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .core-feature-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* --- 2. Why MedBridge Section --- */
        .why-medbridge-section {
          margin-bottom: 20px;
        }

        .why-header {
          text-align: center;
          max-width: 740px;
          margin: 0 auto 36px;
        }

        .why-lead-text {
          font-size: 1.05rem;
          color: var(--text-body);
          line-height: 1.6;
          margin-top: 10px;
        }

        .why-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .why-card {
          padding: 30px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .why-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -6px rgba(18, 156, 176, 0.1);
        }

        .why-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .why-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .why-tag {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .why-tag.teal {
          background: #ecfeff;
          color: #0891b2;
          border: 1px solid #cffafe;
        }

        .why-tag.gold {
          background: #fffbeb;
          color: #b45309;
          border: 1px solid #fef3c7;
        }

        .why-tag.purple {
          background: #faf5ff;
          color: #7c3aed;
          border: 1px solid #f3e8ff;
        }

        .why-tag.red {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fee2e2;
        }

        .why-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .why-card p {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.58;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .why-card-action {
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }

        .why-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 0.86rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-teal);
          background: #ffffff;
          color: var(--teal-700);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .why-action-btn:hover {
          background: var(--teal-50);
          border-color: var(--teal-500);
          transform: translateX(2px);
        }

        .why-action-btn.primary {
          background: var(--teal-50);
          color: var(--teal-700);
          border-color: var(--border-teal);
        }

        .why-action-btn.primary:hover {
          background: var(--teal-600);
          color: #ffffff;
          border-color: var(--teal-600);
        }

        .why-action-btn.emergency {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecaca;
        }

        .why-action-btn.emergency:hover {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
        }

        @media (max-width: 900px) {
          .about-hero-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .about-hero-text {
            text-align: center;
          }
          .about-subtitle {
            margin: 0 auto 20px;
          }
          .about-hero-highlights {
            justify-content: center;
          }
          .about-hero-actions {
            justify-content: center;
          }
          .about-brand-showcase {
            max-width: 360px;
            margin: 0 auto;
          }
          .core-features-grid {
            grid-template-columns: 1fr;
          }
          .why-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
