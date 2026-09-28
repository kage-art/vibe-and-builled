import React, { useState } from 'react';
import { 
  Coins, 
  Pill, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Building2, 
  Activity,
  HeartHandshake
} from 'lucide-react';

export default function WhyMedBridge({ 
  onExploreSolutions, 
  onOpenSOS, 
  onOpenCounseling, 
  onOpenMedicineRadar 
}) {
  const [activeAudienceTab, setActiveAudienceTab] = useState('patients'); // 'patients' | 'providers' | 'partners'

  const audienceContent = {
    patients: {
      tagline: 'Empowering Patients with Transparency & Rewards',
      points: [
        'Instant symptom matching to verified nearby board-certified specialists.',
        'Earn spendable MedBridge HealthCredits on every completed treatment.',
        'Compare nearby generic drug prices at Jan Aushadhi stores to save up to 84%.',
        'Secure 256-bit encrypted access to unified lab reports and prescriptions.'
      ],
      ctaText: 'Find Nearby Doctors',
      ctaAction: onExploreSolutions
    },
    providers: {
      tagline: 'Reputation Growth & Streamlined Clinical Workflows',
      points: [
        'Verified TrustScore system based on verified patient outcomes, not ad spend.',
        'Automated intake forms and pre-consultation vitals sharing to save 12 mins per visit.',
        'Zero patient no-shows with automated WhatsApp & SMS appointment reminders.',
        'Direct connection to university campus health referrals and corporate partners.'
      ],
      ctaText: 'Join as a Verified Provider',
      ctaAction: onExploreSolutions
    },
    partners: {
      tagline: 'Institutional Wellness for Campuses & Organizations',
      points: [
        'Confidential 1-on-1 mental health counseling pass for college students at 50% subsidy.',
        'Rapid campus trauma SOS hotline with emergency ambulance GPS dispatch in ~8 minutes.',
        'Anonymous student wellness analytics and preventative health workshops.',
        'Custom corporate health benefits integration with real-time utilization metrics.'
      ],
      ctaText: 'Partner Your Campus / Clinic',
      ctaAction: onOpenCounseling
    }
  };

  return (
    <section className="why-medbridge-root">
      <div className="container">
        {/* Main Section Heading matching screenshot */}
        <div className="why-header-area">
          <h2 className="why-main-title">Why MedBridge?</h2>
          <p className="why-main-subtitle">
            Traditional healthcare is fragmented, costly, and confusing. MedBridge builds an accountable, interconnected bridge that puts patients and doctors first.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="why-pillars-grid">
          {/* Pillar 1: Dual-Credit Economy */}
          <div className="pillar-card">
            <div className="pillar-icon-box icon-teal">
              <Coins size={26} color="#00a8cc" />
            </div>
            <h3 className="pillar-title">Dual-Credit Economy</h3>
            <p className="pillar-desc">
              Patients earn spendable HealthCredits (+₹75/treatment) while doctors earn verified TrustScore points that boost clinic visibility based on real health outcomes.
            </p>
            <div className="pillar-badge">Mutual Incentive Model</div>
          </div>

          {/* Pillar 2: Generic Medicine Radar */}
          <div className="pillar-card">
            <div className="pillar-icon-box icon-emerald">
              <Pill size={26} color="#059669" />
            </div>
            <h3 className="pillar-title">Hyperlocal Generic Radar</h3>
            <p className="pillar-desc">
              Compare local medicine prices across Jan Aushadhi generic outlets and private chemists to discover identical therapeutic alternatives with up to 84% savings.
            </p>
            <button type="button" className="pillar-inline-link" onClick={onOpenMedicineRadar}>
              <span>Explore Medicine Radar</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Pillar 3: Student Campus Wellness */}
          <div className="pillar-card">
            <div className="pillar-icon-box icon-purple">
              <GraduationCap size={26} color="#7c3aed" />
            </div>
            <h3 className="pillar-title">Campus Wellness Pass</h3>
            <p className="pillar-desc">
              Subsidized, confidential 1-on-1 counseling designed specifically for university students navigating academic stress, anxiety, and peer challenges.
            </p>
            <button type="button" className="pillar-inline-link" onClick={onOpenCounseling}>
              <span>View Student Hub</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Pillar 4: 24/7 Trauma SOS */}
          <div className="pillar-card">
            <div className="pillar-icon-box icon-red">
              <ShieldCheck size={26} color="#dc2626" />
            </div>
            <h3 className="pillar-title">24/7 Trauma Dispatch</h3>
            <p className="pillar-desc">
              One-click emergency SOS dispatching live GPS-tracked ambulances in ~8 minutes with pre-arrival hospital ER bed reservation.
            </p>
            <button type="button" className="pillar-inline-link" onClick={onOpenSOS}>
              <span>Emergency SOS Details</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Stakeholder Tabs: Patients, Providers, Partners */}
        <div className="audience-interactive-box">
          <div className="audience-tabs-nav">
            <button 
              type="button"
              className={`audience-tab-btn ${activeAudienceTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveAudienceTab('patients')}
            >
              <Users size={16} />
              <span>For Patients</span>
            </button>
            <button 
              type="button"
              className={`audience-tab-btn ${activeAudienceTab === 'providers' ? 'active' : ''}`}
              onClick={() => setActiveAudienceTab('providers')}
            >
              <Activity size={16} />
              <span>For Doctors & Providers</span>
            </button>
            <button 
              type="button"
              className={`audience-tab-btn ${activeAudienceTab === 'partners' ? 'active' : ''}`}
              onClick={() => setActiveAudienceTab('partners')}
            >
              <Building2 size={16} />
              <span>For Universities & Partners</span>
            </button>
          </div>

          <div className="audience-tab-body">
            <div className="audience-left">
              <h4>{audienceContent[activeAudienceTab].tagline}</h4>
              <ul className="audience-list">
                {audienceContent[activeAudienceTab].points.map((pt, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} color="#00a8cc" className="check-icon" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <button 
                type="button" 
                className="audience-cta-btn"
                onClick={audienceContent[activeAudienceTab].ctaAction}
              >
                <span>{audienceContent[activeAudienceTab].ctaText}</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="audience-stat-card">
              <div className="stat-item">
                <span className="stat-number">99.4%</span>
                <span className="stat-lbl">On-Time Care Access</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15,000+</span>
                <span className="stat-lbl">Verified Specialists</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2.5M+</span>
                <span className="stat-lbl">Health Records Secured</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-lbl">HIPAA & ABDM Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-medbridge-root {
          padding: 60px 0 70px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .why-header-area {
          text-align: left;
          margin-bottom: 40px;
        }

        .why-main-title {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .why-main-subtitle {
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 1.05rem;
          color: #64748b;
          max-width: 680px;
          line-height: 1.6;
        }

        .why-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 44px;
        }

        .pillar-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 26px 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
          transition: all 0.2s ease;
        }
        .pillar-card:hover {
          transform: translateY(-3px);
          border-color: #00a8cc;
          box-shadow: 0 8px 20px rgba(0, 168, 204, 0.08);
        }

        .pillar-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .icon-teal { background: #eef8fa; }
        .icon-emerald { background: #ecfdf5; }
        .icon-purple { background: #f5f3ff; }
        .icon-red { background: #fef2f2; }

        .pillar-title {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .pillar-desc {
          font-size: 0.86rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
          flex: 1;
        }

        .pillar-badge {
          align-self: flex-start;
          font-size: 0.72rem;
          font-weight: 600;
          background: #f1f5f9;
          color: #475569;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .pillar-inline-link {
          align-self: flex-start;
          background: transparent;
          border: none;
          color: #00a8cc;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 0;
        }
        .pillar-inline-link:hover {
          color: #008ba8;
          text-decoration: underline;
        }

        /* Audience Tabs Box */
        .audience-interactive-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }

        .audience-tabs-nav {
          display: flex;
          gap: 10px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }

        .audience-tab-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #64748b;
          padding: 10px 18px;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .audience-tab-btn.active {
          background: #00a8cc;
          color: #ffffff;
          border-color: #00a8cc;
          box-shadow: 0 3px 10px rgba(0, 168, 204, 0.25);
        }

        .audience-tab-body {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 36px;
          align-items: center;
        }

        .audience-left h4 {
          font-size: 1.3rem;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .audience-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .audience-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.5;
        }

        .check-icon {
          flex-shrink: 0;
          margin-top: 3px;
        }

        .audience-cta-btn {
          background: #0f172a;
          color: #ffffff;
          padding: 11px 24px;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .audience-cta-btn:hover {
          background: #1e293b;
        }

        .audience-stat-card {
          background: linear-gradient(135deg, #eef8fa 0%, #f4fbfd 100%);
          border: 1px solid #bee3ea;
          border-radius: 16px;
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.7rem;
          font-weight: 800;
          color: #00a8cc;
          line-height: 1.1;
        }

        .stat-lbl {
          font-size: 0.78rem;
          color: #475569;
          font-weight: 500;
          margin-top: 4px;
        }

        @media (max-width: 1024px) {
          .why-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .audience-tab-body {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .why-pillars-grid {
            grid-template-columns: 1fr;
          }
          .audience-tabs-nav {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
}
