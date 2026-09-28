import React, { useState } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Brain, 
  Activity, 
  Stethoscope, 
  Baby, 
  ShieldCheck, 
  Smile, 
  Pill, 
  Coins, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Flame, 
  Droplet, 
  Check, 
  Percent, 
  Wallet,
  Building2,
  ChevronRight
} from 'lucide-react';
import { DEPARTMENTS, MEDICINES, DOCTORS } from '../data/mockData';

export default function HomeExploreHub({
  onSelectSpecialty,
  onNavigate,
  userState,
  onToggleReminder,
  onAddWater,
  onOpenCreditModal,
  onRedeemMedicine
}) {
  const [selectedSpecialtyTab, setSelectedSpecialtyTab] = useState('all');

  // Icon map for specialties
  const specialtyIconMap = {
    cardiology: HeartPulse,
    dermatology: Sparkles,
    neurology: Brain,
    orthopedics: Activity,
    general: Stethoscope,
    pediatrics: Baby,
    dentistry: ShieldCheck,
    psychiatry: Smile
  };

  // Color map for specialty badges
  const specialtyColorMap = {
    cardiology: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', tag: 'Critical Care' },
    dermatology: { bg: '#fdf2f8', border: '#fbcfe8', text: '#db2777', tag: 'Cosmetic & Skin' },
    neurology: { bg: '#f5f3ff', border: '#ddd6fe', text: '#7c3aed', tag: 'Brain & Nerve' },
    orthopedics: { bg: '#fff7ed', border: '#fed7aa', text: '#ea580c', tag: 'Bone & Joints' },
    general: { bg: '#f0fdfa', border: '#ccfbf1', text: '#0d9488', tag: 'Primary Care' },
    pediatrics: { bg: '#ecfeff', border: '#cffafe', text: '#0891b2', tag: 'Child & Infant' },
    dentistry: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', tag: 'Teeth & Dental' },
    psychiatry: { bg: '#faf5ff', border: '#f3e8ff', text: '#9333ea', tag: 'Mental Health' }
  };

  // Top 4 representative medicines for price comparison
  const sampleMedicines = MEDICINES.slice(0, 4);

  const waterPercent = Math.min(100, Math.round((userState.vitals.waterIntakeLiters / userState.vitals.waterGoalLiters) * 100));

  return (
    <div className="home-explore-hub">
      {/* ========================================================
          1. DOCTOR SPECIALTY SELECTOR (Cardiologist, Dermatologist, etc.)
          ======================================================== */}
      <section className="home-section doctor-specialties-section">
        <div className="container">
          <div className="section-head-badge-row">
            <span className="hub-badge teal">
              <Stethoscope size={14} />
              <span>Specialized Clinical Care</span>
            </span>
          </div>

          <div className="section-title-wrap">
            <h2 className="section-main-heading">
              Browse Doctors by Specialty
            </h2>
            <p className="section-sub-heading">
              Select a medical department to easily find verified specialists, compare genuine recovery ratings, and reserve immediate OPD slots.
            </p>
          </div>

          {/* Specialty Grid */}
          <div className="specialties-grid">
            {DEPARTMENTS.map((dept) => {
              const Icon = specialtyIconMap[dept.id] || Stethoscope;
              const colorTheme = specialtyColorMap[dept.id] || specialtyColorMap.general;

              return (
                <div 
                  key={dept.id} 
                  className="specialty-card clean-card"
                  onClick={() => onSelectSpecialty(dept.id)}
                >
                  <div className="specialty-card-header">
                    <div 
                      className="specialty-icon-box"
                      style={{ background: colorTheme.bg, borderColor: colorTheme.border }}
                    >
                      <Icon size={24} color={colorTheme.text} />
                    </div>
                    <span 
                      className="specialty-category-tag"
                      style={{ background: colorTheme.bg, color: colorTheme.text, borderColor: colorTheme.border }}
                    >
                      {colorTheme.tag}
                    </span>
                  </div>

                  <h3 className="specialty-name">{dept.name}</h3>
                  <span className="specialty-hindi">{dept.hindiName}</span>

                  <p className="specialty-desc">{dept.description}</p>

                  {/* Symptom Tag Pills */}
                  <div className="specialty-symptoms-row">
                    {dept.symptoms.slice(0, 3).map((sym, sIdx) => (
                      <span key={sIdx} className="symptom-tag">
                        {sym}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer: Doctor count, Next slot & Quick action */}
                  <div className="specialty-card-footer">
                    <div className="specialty-footer-left">
                      <div className="doc-count-pill">
                        <span className="live-doc-dot"></span>
                        <span><strong>{dept.doctorCount}</strong> Doctors</span>
                      </div>
                      {(() => {
                        const matchingDoc = DOCTORS.find(d => d.departmentId === dept.id);
                        return (
                          <div className="specialty-slot-tag">
                            <Clock size={10} color="#059669" />
                            <span>Slot: <strong>{matchingDoc?.nextSlot || 'Today 11:30 AM'}</strong></span>
                          </div>
                        );
                      })()}
                    </div>

                    <button 
                      type="button" 
                      className="btn-select-specialty"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSpecialty(dept.id);
                      }}
                    >
                      <span>Book Slot</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. HYPERLOCAL MEDICINE PRICE COMPARISON RADAR
          ======================================================== */}
      <section className="home-section medicine-radar-preview-section">
        <div className="container">
          <div className="section-head-badge-row">
            <span className="hub-badge green">
              <Pill size={14} />
              <span>Hyperlocal Price Transparency</span>
            </span>
          </div>

          <div className="section-title-wrap">
            <h2 className="section-main-heading">
              Compare Medicine Prices Across Nearby Stores
            </h2>
            <p className="section-sub-heading">
              Check live retail prices before you buy. Compare Government Jan Aushadhi generic stores with private pharmacies and discover therapeutic alternatives saving up to 84%.
            </p>
          </div>

          {/* Comparison Cards Grid */}
          <div className="medicine-compare-grid">
            {sampleMedicines.map((med) => {
              const bestPharmacy = med.pharmacies.find(p => p.isBestPrice) || med.pharmacies[0];
              const privateChemist = med.pharmacies.find(p => !p.isBestPrice) || med.pharmacies[1] || med.pharmacies[0];
              const savingsPercent = Math.round(((privateChemist.price - bestPharmacy.price) / privateChemist.price) * 100);

              return (
                <div key={med.id} className="med-compare-card clean-card">
                  <div className="med-card-top">
                    <div>
                      <span className="med-form-pill">{med.form}</span>
                      <h4 className="med-title">{med.brandName}</h4>
                      <span className="med-salt-name">{med.genericName}</span>
                    </div>
                    {savingsPercent > 0 && (
                      <span className="savings-badge-pill">
                        Save {savingsPercent}%
                      </span>
                    )}
                  </div>

                  <p className="med-use-text"><strong>Indication:</strong> {med.uses}</p>

                  {/* Live Price Comparison Box */}
                  <div className="price-comparison-box">
                    <div className="price-col jan-aushadhi">
                      <span className="price-source">Jan Aushadhi Generic</span>
                      <div className="price-val">₹{bestPharmacy.price.toFixed(2)}</div>
                      <span className="store-distance">
                        <MapPin size={11} />
                        {bestPharmacy.distanceKm} km • In Stock
                      </span>
                    </div>

                    <div className="price-divider">vs</div>

                    <div className="price-col private-chemist">
                      <span className="price-source">Private Pharmacy</span>
                      <div className="price-val strike">₹{privateChemist.price.toFixed(2)}</div>
                      <span className="store-distance">
                        <MapPin size={11} />
                        {privateChemist.distanceKm} km away
                      </span>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="med-action-footer">
                    <span className="store-name-sub">
                      📍 {bestPharmacy.pharmacyName}
                    </span>
                    <button 
                      type="button" 
                      className="btn-reserve-med"
                      onClick={() => onRedeemMedicine(med, bestPharmacy)}
                    >
                      <span>Reserve @ ₹{bestPharmacy.price}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="view-more-radar-bar">
            <button 
              type="button" 
              className="btn-open-full-radar"
              onClick={() => {
                onNavigate('medicines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Explore Medicine Radar for 250+ Generic Drugs</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. HEALTH & WEALTH TRACKING (HealthCredits Economy)
          ======================================================== */}
      <section className="home-section wealth-tracker-section">
        <div className="container">
          <div className="section-head-badge-row">
            <span className="hub-badge amber">
              <Coins size={14} />
              <span>Dual-Credit Wealth Economy</span>
            </span>
          </div>

          <div className="section-title-wrap">
            <h2 className="section-main-heading">
              Turn Daily Health Habits into Spendable Wealth
            </h2>
            <p className="section-sub-heading">
              MedBridge treats healthcare as an investment. Earn spendable HealthCredits (+₹75/treatment, +₹10/day) for keeping prescriptions on track, and redeem credits directly for medicine discounts and free consultations.
            </p>
          </div>

          {/* Wealth & Tracker Tri-Card Layout */}
          <div className="wealth-tracker-grid">
            {/* 1. Health Wallet & Wealth Balance */}
            <div className="wealth-card clean-card wallet-highlight">
              <div className="wealth-card-header">
                <div className="wealth-icon-wrap gold">
                  <Wallet size={22} color="#b45309" />
                </div>
                <span className="wealth-tag gold">Spendable Balance</span>
              </div>

              <div className="wealth-balance-showcase">
                <div className="balance-numeric-row">
                  <Coins size={32} color="#d97706" />
                  <span className="balance-amount">{userState.healthCredits}</span>
                  <span className="balance-currency">HealthCredits</span>
                </div>
                <span className="balance-valuation-note">
                  Equivalent to <strong>₹{userState.healthCredits}.00 INR</strong> in cashless medical care
                </span>
              </div>

              <div className="wealth-stats-list">
                <div className="wealth-stat-row">
                  <span>Completed Verified Treatments</span>
                  <strong>{userState.completedTreatments} visits (+₹225 earned)</strong>
                </div>
                <div className="wealth-stat-row">
                  <span>Prescription Adherence Streak</span>
                  <strong>{userState.vitals.streakDays} Days (+₹10/day)</strong>
                </div>
                <div className="wealth-stat-row">
                  <span>Cashless Redemption Rate</span>
                  <strong>100% at Jan Aushadhi & OPD</strong>
                </div>
              </div>

              <button 
                type="button" 
                className="btn-open-wallet"
                onClick={onOpenCreditModal}
              >
                <span>View HealthCredits Ledger</span>
                <ChevronRight size={15} />
              </button>
            </div>

            {/* 2. Live Daily Habit Tracker (Interactive) */}
            <div className="wealth-card clean-card">
              <div className="wealth-card-header">
                <div className="wealth-icon-wrap teal">
                  <Clock size={22} color="#0891b2" />
                </div>
                <span className="wealth-tag teal">Daily Habits Tracker</span>
              </div>

              <div className="pill-reminders-sublist">
                <h4 className="card-subheading">Today's Medication Adherence</h4>
                {userState.medReminders.map((rem) => (
                  <div 
                    key={rem.id} 
                    className={`reminder-row-item ${rem.takenToday ? 'completed' : ''}`}
                    onClick={() => onToggleReminder(rem.id)}
                  >
                    <div className="rem-checkbox">
                      {rem.takenToday && <Check size={14} color="#ffffff" />}
                    </div>
                    <div className="rem-details">
                      <span className="rem-name">{rem.name} ({rem.dosage})</span>
                      <span className="rem-slot">{rem.timeSlot} • {rem.time}</span>
                    </div>
                    <span className="rem-reward">
                      {rem.takenToday ? '+10 Cr ✓' : '+10 Cr'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hydration Tracker */}
              <div className="water-tracker-block">
                <div className="water-header">
                  <div className="water-title-wrap">
                    <Droplet size={16} color="#0284c7" />
                    <span>Hydration: <strong>{userState.vitals.waterIntakeLiters.toFixed(1)}L</strong> / {userState.vitals.waterGoalLiters}L</span>
                  </div>
                  <span className="water-percent">{waterPercent}%</span>
                </div>

                <div className="water-progress-track">
                  <div className="water-progress-fill" style={{ width: `${waterPercent}%` }}></div>
                </div>

                <button 
                  type="button" 
                  className="btn-quick-water"
                  onClick={onAddWater}
                >
                  <Droplet size={13} />
                  <span>+ Log 250ml Water Glass</span>
                </button>
              </div>
            </div>

            {/* 3. The Dual-Credit Wealth Rules */}
            <div className="wealth-card clean-card rules-card">
              <div className="wealth-card-header">
                <div className="wealth-icon-wrap purple">
                  <TrendingUp size={22} color="#7c3aed" />
                </div>
                <span className="wealth-tag purple">Mutual Value Engine</span>
              </div>

              <h4 className="card-subheading">How MedBridge Credits Work</h4>

              <div className="rules-bullet-list">
                <div className="rule-bullet">
                  <div className="bullet-num">1</div>
                  <div className="bullet-content">
                    <h5>Consult & Complete Treatment</h5>
                    <p>Patients receive <strong>+₹75 HealthCredits</strong> while your doctor earns <strong>+30 TrustScore</strong> points based on verifiable health outcomes.</p>
                  </div>
                </div>

                <div className="rule-bullet">
                  <div className="bullet-num">2</div>
                  <div className="bullet-content">
                    <h5>Keep Routine Streaks</h5>
                    <p>Log daily medicines and hydration to earn <strong>+10 HealthCredits</strong> every single day you maintain your adherence streak.</p>
                  </div>
                </div>

                <div className="rule-bullet">
                  <div className="bullet-num">3</div>
                  <div className="bullet-content">
                    <h5>Cashless Care Everywhere</h5>
                    <p>Redeem accumulated credits 1:1 against doctor consultation fees and generic medicines across verified partner clinics.</p>
                  </div>
                </div>
              </div>

              <div className="student-wellness-quick-link">
                <span>🎓 University Student?</span>
                <button 
                  type="button" 
                  className="link-student-pass"
                  onClick={() => {
                    onNavigate('counseling');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Claim 50% Off Campus Pass →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styled JSX */}
      <style>{`
        .home-explore-hub {
          background: #ffffff;
          padding-top: 10px;
        }

        .home-section {
          padding: 60px 0 65px;
          border-top: 1px solid #f1f5f9;
        }

        .doctor-specialties-section {
          background: #ffffff;
        }

        .medicine-radar-preview-section {
          background: #fcfefe;
        }

        .wealth-tracker-section {
          background: #ffffff;
        }

        /* Headings & Badges */
        .section-head-badge-row {
          text-align: center;
          margin-bottom: 12px;
        }

        .hub-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 9999px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .hub-badge.teal {
          background: #e6f7fa;
          color: #0891b2;
          border: 1px solid #cceef3;
        }
        .hub-badge.green {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #d1fae5;
        }
        .hub-badge.amber {
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fef3c7;
        }

        .section-title-wrap {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 40px;
        }

        .section-main-heading {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .section-sub-heading {
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 1.02rem;
          color: #475569;
          line-height: 1.6;
        }

        /* 1. Specialties Grid */
        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .specialty-card {
          padding: 24px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
        }
        .specialty-card:hover {
          transform: translateY(-4px);
          border-color: #00a8cc;
          box-shadow: 0 12px 28px rgba(0, 168, 204, 0.12);
        }

        .specialty-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .specialty-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          transition: transform 0.2s ease;
        }
        .specialty-card:hover .specialty-icon-box {
          transform: scale(1.08);
        }

        .specialty-category-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 9px;
          border-radius: 9999px;
          border: 1px solid;
          letter-spacing: 0.02em;
        }

        .specialty-name {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.22rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .specialty-hindi {
          font-size: 0.78rem;
          color: #0891b2;
          font-weight: 600;
          margin-bottom: 10px;
          display: block;
        }

        .specialty-desc {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .specialty-symptoms-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .symptom-tag {
          font-size: 0.72rem;
          background: #f1f5f9;
          color: #475569;
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 500;
        }

        .specialty-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }

        .doc-count-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          color: #334155;
        }

        .specialty-footer-left {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .specialty-slot-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          color: #065f46;
          background: #ecfdf5;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .btn-select-specialty {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #e6f7fa;
          color: #00a8cc;
          border: 1px solid #b5e7f0;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .specialty-card:hover .btn-select-specialty {
          background: #00a8cc;
          color: #ffffff;
          border-color: #00a8cc;
        }

        /* 2. Medicine Price Compare Grid */
        .medicine-compare-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .med-compare-card {
          padding: 24px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .med-compare-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
          border-color: #a7f3d0;
        }

        .med-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .med-form-pill {
          font-size: 0.72rem;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 9999px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 6px;
        }

        .med-title {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 3px;
        }

        .med-salt-name {
          font-size: 0.82rem;
          color: #64748b;
          font-style: italic;
        }

        .savings-badge-pill {
          background: #059669;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);
        }

        .med-use-text {
          font-size: 0.84rem;
          color: #475569;
          margin-bottom: 16px;
          line-height: 1.45;
        }

        .price-comparison-box {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px 18px;
          margin-bottom: 16px;
        }

        .price-col {
          display: flex;
          flex-direction: column;
        }

        .price-source {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .price-col.jan-aushadhi .price-source {
          color: #059669;
        }

        .price-val {
          font-size: 1.45rem;
          font-weight: 800;
          color: #0f172a;
        }
        .price-col.jan-aushadhi .price-val {
          color: #059669;
        }
        .price-val.strike {
          color: #94a3b8;
          text-decoration: line-through;
          font-size: 1.2rem;
        }

        .store-distance {
          font-size: 0.72rem;
          color: #64748b;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }

        .price-divider {
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
          padding: 0 4px;
        }

        .med-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .store-name-sub {
          font-size: 0.78rem;
          color: #475569;
          font-weight: 500;
        }

        .btn-reserve-med {
          background: #059669;
          color: #ffffff;
          border: none;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 9999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);
        }
        .btn-reserve-med:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .view-more-radar-bar {
          text-align: center;
        }

        .btn-open-full-radar {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #0891b2;
          border: 1.5px solid #0891b2;
          font-weight: 700;
          font-size: 0.92rem;
          padding: 12px 28px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-open-full-radar:hover {
          background: #0891b2;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(8, 145, 178, 0.25);
        }

        /* 3. Wealth & Tracker Grid */
        .wealth-tracker-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .wealth-card {
          padding: 28px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
          transition: all 0.22s ease;
        }
        .wealth-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);
        }

        .wealth-card.wallet-highlight {
          border-color: #fde68a;
          background: linear-gradient(180deg, #fffdfa 0%, #ffffff 100%);
        }

        .wealth-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .wealth-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wealth-icon-wrap.gold { background: #fef3c7; }
        .wealth-icon-wrap.teal { background: #e0f2fe; }
        .wealth-icon-wrap.purple { background: #f3e8ff; }

        .wealth-tag {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 4px 10px;
          border-radius: 9999px;
        }
        .wealth-tag.gold { background: #fef3c7; color: #b45309; }
        .wealth-tag.teal { background: #e0f2fe; color: #0284c7; }
        .wealth-tag.purple { background: #f3e8ff; color: #7c3aed; }

        .wealth-balance-showcase {
          background: #fffbeb;
          border: 1.5px solid #fef3c7;
          border-radius: 16px;
          padding: 20px 16px;
          text-align: center;
          margin-bottom: 20px;
        }

        .balance-numeric-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .balance-amount {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 2.8rem;
          font-weight: 800;
          color: #92400e;
          line-height: 1;
        }

        .balance-currency {
          font-size: 0.86rem;
          font-weight: 700;
          color: #b45309;
        }

        .balance-valuation-note {
          font-size: 0.8rem;
          color: #78350f;
          display: block;
        }

        .wealth-stats-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
          flex-grow: 1;
        }

        .wealth-stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #64748b;
          padding-bottom: 8px;
          border-bottom: 1px solid #f1f5f9;
        }
        .wealth-stat-row strong {
          color: #0f172a;
        }

        .btn-open-wallet {
          width: 100%;
          background: #d97706;
          color: #ffffff;
          border: none;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 12px;
          border-radius: 9999px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.28);
        }
        .btn-open-wallet:hover {
          background: #b45309;
          transform: translateY(-1px);
        }

        .card-subheading {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.08rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 14px;
        }

        /* Pill Reminders Sublist */
        .pill-reminders-sublist {
          margin-bottom: 20px;
        }

        .reminder-row-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .reminder-row-item:hover {
          border-color: #00a8cc;
          background: #f8fafc;
        }
        .reminder-row-item.completed {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }

        .rem-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }
        .reminder-row-item.completed .rem-checkbox {
          background: #10b981;
          border-color: #10b981;
        }

        .rem-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .rem-name {
          font-size: 0.84rem;
          font-weight: 700;
          color: #0f172a;
        }
        .rem-slot {
          font-size: 0.72rem;
          color: #64748b;
        }

        .rem-reward {
          font-size: 0.75rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 3px 8px;
          border-radius: 9999px;
        }

        /* Hydration */
        .water-tracker-block {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 14px;
          padding: 14px;
        }

        .water-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .water-title-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: #0369a1;
        }

        .water-percent {
          font-size: 0.8rem;
          font-weight: 800;
          color: #0284c7;
        }

        .water-progress-track {
          height: 8px;
          background: #e0f2fe;
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .water-progress-fill {
          height: 100%;
          background: #0284c7;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .btn-quick-water {
          width: 100%;
          background: #ffffff;
          border: 1.5px solid #0284c7;
          color: #0284c7;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 9999px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .btn-quick-water:hover {
          background: #0284c7;
          color: #ffffff;
        }

        /* Rules Card */
        .rules-bullet-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .rule-bullet {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .bullet-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #7c3aed;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .bullet-content h5 {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 3px;
        }

        .bullet-content p {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.45;
          margin: 0;
        }

        .student-wellness-quick-link {
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #475569;
        }

        .link-student-pass {
          background: none;
          border: none;
          color: #7c3aed;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.8rem;
          padding: 0;
        }
        .link-student-pass:hover {
          text-decoration: underline;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .specialties-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .wealth-tracker-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .medicine-compare-grid {
            grid-template-columns: 1fr;
          }
          .section-main-heading {
            font-size: 1.85rem;
          }
        }

        @media (max-width: 640px) {
          .specialties-grid {
            grid-template-columns: 1fr;
          }
          .price-comparison-box {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .price-divider {
            margin: 6px 0;
          }
        }
      `}</style>
    </div>
  );
}
