import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Video, 
  Lock, 
  GraduationCap, 
  CheckCircle, 
  Calendar,
  Headphones,
  ShieldCheck
} from 'lucide-react';
import { DOCTORS } from '../data/mockData';

export default function CounselingHub({ onBookCounselor }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const counselors = DOCTORS.filter(d => d.departmentId === 'psychiatry');

  const categories = [
    { id: 'all', label: 'All Therapists' },
    { id: 'exam', label: 'Exam & Academic Anxiety' },
    { id: 'sleep', label: 'Insomnia & Sleep Disorder' },
    { id: 'depression', label: 'Depression & CBT' },
    { id: 'career', label: 'Career Burnout & Stress' }
  ];

  return (
    <section className="counseling-clean-section">
      <div className="container">
        {/* Banner with Student Pass */}
        <div className="counseling-banner clean-card">
          <div className="banner-left-area">
            <span className="badge badge-teal" style={{ marginBottom: '10px' }}>
              <GraduationCap size={13} />
              <span>Campus & Youth Wellness Program</span>
            </span>
            <h2>Confidential 1-on-1 Online Counseling</h2>
            <p>
              Feeling overwhelmed by exams, deadlines, career uncertainty, or relationships? Connect with certified compassionate clinical psychologists from your phone or laptop in total privacy.
            </p>

            <div className="trust-pills-row">
              <div className="trust-pill">
                <Lock size={14} color="#059669" />
                <span>100% Anonymous & Private</span>
              </div>
              <div className="trust-pill">
                <Video size={14} color="#0284c7" />
                <span>HD Audio/Video or Chat</span>
              </div>
              <div className="trust-pill">
                <GraduationCap size={14} color="#b45309" />
                <span>₹199 Student Pass Rate</span>
              </div>
            </div>
          </div>

          <div className="student-pass-clean clean-card">
            <div className="pass-top">
              <GraduationCap size={22} color="#0891b2" />
              <div>
                <h4>Student Wellness Pass</h4>
                <span>Campus Verification Active</span>
              </div>
            </div>

            <div className="pass-body">
              <div className="discount-chip">
                50% Flat Discount on All Sessions
              </div>
              <p className="pass-note">
                For verified college students. Pay only <strong>₹199 / session</strong> instead of standard ₹500 fee.
              </p>
              <div className="verified-user-tag">
                <CheckCircle size={13} color="#059669" />
                <span>Aman Sharma (ID: DU-2024-89)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="counseling-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Counselors Grid */}
        <div className="counselors-two-col">
          {counselors.map((counselor) => (
            <div key={counselor.id} className="clean-counselor-card clean-card">
              <div className="counselor-header-row">
                <div className="counselor-avatar-wrapper">
                  <img src={counselor.image} alt={counselor.name} className="counselor-photo" />
                  <div className="live-status-dot" title="Available for Instant Booking"></div>
                </div>

                <div className="counselor-meta-details">
                  <span className="badge badge-teal" style={{ marginBottom: '4px' }}>
                    {counselor.badgeText}
                  </span>
                  <h3>{counselor.name}</h3>
                  <p className="counselor-subtext">{counselor.degree}</p>
                  <p className="counselor-facility">{counselor.hospitalName}</p>
                </div>
              </div>

              <p className="counselor-bio-text">{counselor.about}</p>

              <div className="focus-services-area">
                <span className="focus-header">Clinical Focus:</span>
                <div className="focus-chips-list">
                  {counselor.services.map((srv, idx) => (
                    <span key={idx} className="focus-service-tag">{srv}</span>
                  ))}
                </div>
              </div>

              <div className="counselor-action-footer">
                <div className="session-rates">
                  <span className="original-rate">Standard: ₹{counselor.consultationFee}</span>
                  <div className="discounted-rate-wrap">
                    <span className="final-rate">₹{counselor.studentDiscountFee || 199}</span>
                    <span className="rate-sub">with Student Pass</span>
                  </div>
                  <div className="counselor-slot-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', color: '#065f46', fontSize: '0.72rem', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>
                    <Calendar size={11} />
                    <span>Slot: <strong>{counselor.nextSlot || 'Today 12:00 PM (Virtual)'}</strong></span>
                  </div>
                </div>

                <button 
                  className="btn-teal book-therapy-btn"
                  onClick={() => onBookCounselor(counselor)}
                >
                  <Video size={15} />
                  <span>Select Slot & Book (₹{counselor.studentDiscountFee || 199})</span>
                </button>
              </div>
            </div>
          ))}

          {/* National Crisis Box */}
          <div className="telemanas-crisis-card clean-card">
            <div className="crisis-icon-box">
              <Headphones size={24} color="#dc2626" />
            </div>
            <h4>Immediate Emotional Support</h4>
            <p>
              National Tele-MANAS Mental Health Helpline is completely free, 24x7 confidential, and accessible across India.
            </p>
            <a href="tel:14416" className="telemanas-call-btn">
              Call Tele-MANAS (14416)
            </a>
            <span className="tollfree-text">Toll-Free Helpline: 1800 891 4416</span>
          </div>
        </div>
      </div>

      <style>{`
        .counseling-clean-section {
          padding: 30px 0 60px;
          background: #f8fafc;
        }

        .counseling-banner {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 28px;
          padding: 32px;
          margin-bottom: 28px;
          background: #ffffff;
        }

        .banner-left-area h2 {
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .banner-left-area p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.55;
          margin-bottom: 20px;
        }

        .trust-pills-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .trust-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-body);
        }

        .student-pass-clean {
          background: var(--teal-50);
          border: 1px solid var(--teal-200);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .pass-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .pass-top h4 {
          font-size: 1.05rem;
          color: var(--text-main);
        }
        .pass-top span {
          font-size: 0.72rem;
          color: var(--teal-700);
        }

        .discount-chip {
          background: #ffffff;
          border: 1px solid var(--teal-200);
          color: var(--teal-700);
          font-size: 0.76rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .pass-note {
          font-size: 0.82rem;
          color: var(--text-body);
          margin-bottom: 12px;
        }

        .verified-user-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid #d1fae5;
          padding: 5px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #047857;
          font-weight: 600;
        }

        .counseling-filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .filter-pill {
          background: #ffffff;
          border: 1px solid var(--border-light);
          color: var(--text-muted);
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
        }
        .filter-pill:hover {
          color: var(--text-main);
          border-color: #cbd5e1;
        }
        .filter-pill.active {
          background: var(--teal-50);
          color: var(--teal-700);
          border-color: var(--teal-200);
          font-weight: 600;
        }

        .counselors-two-col {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .clean-counselor-card {
          padding: 24px;
        }

        .counselor-header-row {
          display: flex;
          gap: 16px;
          margin-bottom: 14px;
        }

        .counselor-avatar-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          flex-shrink: 0;
        }

        .counselor-photo {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 1px solid var(--border-light);
        }

        .live-status-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid white;
        }

        .counselor-meta-details h3 {
          font-size: 1.2rem;
          color: var(--text-main);
        }

        .counselor-subtext {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .counselor-facility {
          font-size: 0.76rem;
          color: var(--teal-700);
        }

        .counselor-bio-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .focus-services-area {
          margin-bottom: 18px;
        }

        .focus-header {
          font-size: 0.74rem;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }

        .focus-chips-list {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .focus-service-tag {
          background: #f1f5f9;
          font-size: 0.72rem;
          padding: 2px 7px;
          border-radius: 4px;
          color: var(--text-body);
        }

        .counselor-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 12px;
        }

        .session-rates {
          display: flex;
          flex-direction: column;
        }

        .original-rate {
          font-size: 0.74rem;
          color: var(--text-dim);
          text-decoration: line-through;
        }

        .discounted-rate-wrap {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .final-rate {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: #059669;
        }

        .rate-sub {
          font-size: 0.74rem;
          color: var(--teal-700);
          font-weight: 600;
        }

        .book-therapy-btn {
          font-size: 0.82rem;
          padding: 8px 18px;
        }

        .telemanas-crisis-card {
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fef2f2;
          border-color: #fecaca;
        }

        .crisis-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .telemanas-crisis-card h4 {
          font-size: 1.1rem;
          color: #991b1b;
          margin-bottom: 6px;
        }

        .telemanas-crisis-card p {
          font-size: 0.82rem;
          color: #7f1d1d;
          line-height: 1.45;
          margin-bottom: 16px;
        }

        .telemanas-call-btn {
          background: #dc2626;
          color: white;
          padding: 9px 18px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 8px;
        }
        .telemanas-call-btn:hover {
          background: #b91c1c;
        }

        .tollfree-text {
          font-size: 0.74rem;
          color: #991b1b;
        }

        @media (max-width: 900px) {
          .counseling-banner {
            grid-template-columns: 1fr;
          }
          .counselors-two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
