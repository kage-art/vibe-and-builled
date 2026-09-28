import React, { useState } from 'react';
import { 
  PhoneCall, 
  Bed, 
  MapPin, 
  Radio, 
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose }) {
  const [escrowDone, setEscrowDone] = useState(false);
  const [selectedHosp, setSelectedHosp] = useState('MaxCure Super Speciality Hospital');

  if (!isOpen) return null;

  const handleDepositEscrow = () => {
    setEscrowDone(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-clean emergency-clean-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="em-clean-head">
          <div className="em-red-box">
            <ShieldAlert size={26} color="#ffffff" />
          </div>
          <div>
            <span className="em-sub-tag">1-Click Immediate Care</span>
            <h3>Emergency SOS & Trauma Dispatch</h3>
          </div>
          <button className="clean-close-x" onClick={onClose}>✕</button>
        </div>

        {/* Primary Ambulance SOS Call Bar */}
        <div className="primary-ambulance-banner">
          <div className="amb-info">
            <Radio size={20} color="#dc2626" />
            <div>
              <h4>Government Emergency Ambulance (108)</h4>
              <p>GPS Geo-dispatch to current location • Avg Arrival: <strong>7-9 Mins</strong></p>
            </div>
          </div>
          <a href="tel:108" className="amb-call-button">
            <PhoneCall size={16} />
            <span>Call 108</span>
          </a>
        </div>

        {/* Rapid Helplines Grid */}
        <div className="clean-helpline-grid">
          <div className="h-box">
            <div className="h-box-top">
              <span className="h-title">Maternal & Infant (102)</span>
              <span className="h-dial">102</span>
            </div>
            <p className="h-desc">Pregnancy distress, newborn ambulance transport.</p>
            <a href="tel:102" className="btn-secondary h-call">Call 102</a>
          </div>

          <div className="h-box">
            <div className="h-box-top">
              <span className="h-title">Tele-MANAS Mental Crisis</span>
              <span className="h-dial">14416</span>
            </div>
            <p className="h-desc">Free, confidential 24/7 psychological support.</p>
            <a href="tel:14416" className="btn-secondary h-call">Call 14416</a>
          </div>

          <div className="h-box">
            <div className="h-box-top">
              <span className="h-title">AIIMS Poison Control</span>
              <span className="h-dial">1800-116-117</span>
            </div>
            <p className="h-desc">National toxic exposure & medicine poisoning helpline.</p>
            <a href="tel:1800116117" className="btn-secondary h-call">Call AIIMS</a>
          </div>

          <div className="h-box">
            <div className="h-box-top">
              <span className="h-title">Emergency Blood Bank</span>
              <span className="h-dial">104</span>
            </div>
            <p className="h-desc">Real-time availability of O-, A+, AB+ blood units.</p>
            <a href="tel:104" className="btn-secondary h-call">Call 104</a>
          </div>
        </div>

        {/* Emergency Escrow Bed Reservation Section (Proposal Feature 12) */}
        <div className="emergency-escrow-section clean-card">
          <div className="escrow-header-row">
            <div className="escrow-icon-title">
              <Lock size={18} color="#0e8192" />
              <h4>Emergency "Fixed-Price Escrow" Bed Reservation</h4>
            </div>
            <span className="badge-tag-green">Zero-Delay Admission</span>
          </div>

          {escrowDone ? (
            <div className="escrow-confirmed-box">
              <CheckCircle2 size={36} color="#059669" />
              <div>
                <strong>Admission Token: #EMG-ESCROW-8921 Generated</strong>
                <p>₹5,000 held safely in MedBridge Escrow. {selectedHosp} notified for immediate triage bypass. Hand over token at casualty counter.</p>
              </div>
            </div>
          ) : (
            <div className="escrow-action-content">
              <p className="escrow-explainer">
                Bypass emergency desk payment arguments. Hold a 100% refundable fixed deposit (₹5,000) into MedBridge Escrow to guarantee immediate casualty admission and bed reservation.
              </p>

              <div className="escrow-input-group">
                <select 
                  value={selectedHosp}
                  onChange={(e) => setSelectedHosp(e.target.value)}
                  className="clean-select"
                >
                  <option value="MaxCure Super Speciality Hospital">MaxCure Super Speciality Hospital (8 ICU Beds Live)</option>
                  <option value="City Trauma & Neuro Care Center">City Trauma & Neuro Care Center (14 ICU Beds Live)</option>
                  <option value="Apollo City Hospital & Care Clinic">Apollo City Hospital (12 ICU Beds Live)</option>
                </select>

                <button 
                  type="button" 
                  className="btn-escrow-deposit"
                  onClick={handleDepositEscrow}
                >
                  Lock ICU Bed with ₹5,000 Escrow
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Closest Trauma Facility */}
        <div className="nearest-facility-clean" style={{ marginTop: '16px' }}>
          <div className="facility-head-row">
            <div>
              <span className="fac-label">Closest 24/7 Facility to You</span>
              <h4>MaxCure Super Speciality Hospital (1.5 km)</h4>
            </div>
            <span className="badge badge-emerald">8 ICU Beds Available</span>
          </div>

          <div className="fac-details">
            <span><MapPin size={12} /> Ring Road, South Extension</span>
            <span><PhoneCall size={12} /> Direct ER: +91 11 4567 8999</span>
          </div>
        </div>

        <div style={{ marginTop: '18px' }}>
          <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }}>
            Close Emergency Window
          </button>
        </div>
      </div>

      <style>{`
        .emergency-clean-modal {
          max-width: 620px;
          border-radius: 20px;
          background: #ffffff;
        }

        .em-clean-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          position: relative;
        }

        .em-red-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .em-sub-tag {
          font-size: 0.72rem;
          color: #dc2626;
          font-weight: 700;
          text-transform: uppercase;
        }

        .em-clean-head h3 {
          font-size: 1.25rem;
          color: var(--text-main);
        }

        .primary-ambulance-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .amb-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .amb-info h4 {
          font-size: 0.98rem;
          color: #991b1b;
        }

        .amb-info p {
          font-size: 0.78rem;
          color: #7f1d1d;
        }
        .amb-info strong {
          color: #991b1b;
        }

        .amb-call-button {
          background: #dc2626;
          color: white;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .amb-call-button:hover {
          background: #b91c1c;
        }

        .clean-helpline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }

        .h-box {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 10px 12px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .h-box-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .h-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .h-dial {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--teal-700);
        }

        .h-desc {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.35;
          margin-bottom: 6px;
        }

        .h-call {
          font-size: 0.74rem;
          padding: 4px 10px;
        }

        /* Escrow Section */
        .emergency-escrow-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
        }

        .escrow-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .escrow-icon-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .escrow-icon-title h4 {
          font-size: 0.94rem;
          color: #0f172a;
          margin: 0;
        }

        .badge-tag-green {
          font-size: 0.68rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .escrow-explainer {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.45;
          margin-bottom: 12px;
        }

        .escrow-input-group {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 10px;
        }

        .clean-select {
          padding: 8px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.78rem;
          outline: none;
        }

        .btn-escrow-deposit {
          background: #00a8cc;
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-escrow-deposit:hover {
          background: #0092b3;
        }

        .escrow-confirmed-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 12px;
        }
        .escrow-confirmed-box strong {
          display: block;
          font-size: 0.85rem;
          color: #059669;
        }
        .escrow-confirmed-box p {
          font-size: 0.76rem;
          color: #166534;
          margin: 2px 0 0 0;
        }

        .nearest-facility-clean {
          background: var(--teal-50);
          border: 1px solid var(--teal-100);
          padding: 12px 14px;
          border-radius: var(--radius-md);
        }

        .facility-head-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .fac-label {
          font-size: 0.7rem;
          color: var(--teal-700);
          font-weight: 700;
        }

        .facility-head-row h4 {
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .fac-details {
          display: flex;
          gap: 14px;
          font-size: 0.74rem;
          color: var(--text-muted);
        }
        .fac-details span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}
