import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Building2, 
  CheckCircle2, 
  Coins,
  ShieldCheck,
  Tag,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Stethoscope,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { DOCTORS } from '../data/mockData';

const CLINICAL_CATEGORIES = [
  { id: 'cardiology', name: 'Cardiologist', icon: '🫀', deptId: 'cardiology' },
  { id: 'dermatology', name: 'Dermatologist', icon: '✨', deptId: 'dermatology' },
  { id: 'orthopedics', name: 'Orthopedic / Orthologist', icon: '🦴', deptId: 'orthopedics' },
  { id: 'neurology', name: 'Neurologist', icon: '🧠', deptId: 'neurology' },
  { id: 'general', name: 'General Physician', icon: '🩺', deptId: 'general' },
  { id: 'pediatrics', name: 'Pediatrician', icon: '👶', deptId: 'pediatrics' },
  { id: 'dentistry', name: 'Dentist', icon: '🦷', deptId: 'dentistry' },
  { id: 'psychiatry', name: 'Counselor / Therapist', icon: '🧘', deptId: 'psychiatry' }
];

const REASON_CATEGORIES = [
  { id: 'consult', label: 'General Consultation', icon: '🩺' },
  { id: 'urgent', label: 'Urgent OPD Care', icon: '⚡' },
  { id: 'second_opinion', label: 'Second Opinion & Reports', icon: '📄' },
  { id: 'follow_up', label: 'Follow-up / Review', icon: '🔄' }
];

export default function AppointmentModal({ 
  doctor: initialDoctor, 
  isOpen, 
  onClose, 
  userCredits,
  onBookingConfirmed 
}) {
  if (!isOpen || !initialDoctor) return null;

  const [activeDoctor, setActiveDoctor] = useState(initialDoctor);
  const [activeSpecialtyCategory, setActiveSpecialtyCategory] = useState(initialDoctor.departmentId || 'general');
  const [selectedReason, setSelectedReason] = useState('General Consultation');
  const [slotFilter, setSlotFilter] = useState('all'); // 'all' | 'morning' | 'happy_hour' | 'evening' | 'tomorrow'
  const [consultType, setConsultType] = useState('video'); // 'video' | 'clinic'
  const [selectedSlot, setSelectedSlot] = useState(initialDoctor.nextSlot || 'Today 11:30 AM');
  const [useCredits, setUseCredits] = useState(false);
  const [bundleLabSample, setBundleLabSample] = useState(false);
  const [showItemizedToggle, setShowItemizedToggle] = useState(false);

  useEffect(() => {
    if (initialDoctor) {
      setActiveDoctor(initialDoctor);
      setActiveSpecialtyCategory(initialDoctor.departmentId || 'general');
      setSelectedSlot(initialDoctor.nextSlot || 'Today 11:30 AM');
    }
  }, [initialDoctor]);

  // When user clicks a different doctor specialty category inside the modal
  const handleCategorySwitch = (catId) => {
    setActiveSpecialtyCategory(catId);
    const matchingDoc = DOCTORS.find(d => d.departmentId === catId);
    if (matchingDoc) {
      setActiveDoctor(matchingDoc);
      setSelectedSlot(matchingDoc.nextSlot || 'Today 11:30 AM');
    }
  };

  const allAvailableSlots = [
    { time: activeDoctor.nextSlot || '10:15 AM Today', category: 'morning', label: 'Morning Slot', isOffPeak: false },
    { time: '11:45 AM Today', category: 'morning', label: 'Morning Slot', isOffPeak: false },
    { time: '02:00 PM Today (Happy Hour 35% Off)', category: 'happy_hour', label: '⚡ Off-Peak 35% Off', isOffPeak: true },
    { time: '03:15 PM Today (Happy Hour 35% Off)', category: 'happy_hour', label: '⚡ Off-Peak 35% Off', isOffPeak: true },
    { time: '05:00 PM Today', category: 'evening', label: 'Evening Slot', isOffPeak: false },
    { time: '06:30 PM Today', category: 'evening', label: 'Evening Slot', isOffPeak: false },
    { time: '10:30 AM Tomorrow', category: 'tomorrow', label: 'Tomorrow Priority', isOffPeak: false }
  ];

  const displayedSlots = allAvailableSlots.filter(s => {
    if (slotFilter === 'all') return true;
    return s.category === slotFilter;
  });

  const isSlotOffPeak = selectedSlot.includes('Happy Hour');
  const rawBaseFee = activeDoctor.studentDiscountFee ? activeDoctor.studentDiscountFee : activeDoctor.consultationFee;
  const offPeakDiscount = isSlotOffPeak ? Math.round(rawBaseFee * 0.35) : 0;
  const baseFeeAfterOffPeak = rawBaseFee - offPeakDiscount;

  const labAddonFee = bundleLabSample ? 399 : 0;
  const creditsToUse = useCredits ? Math.min(userCredits, 150) : 0;
  const finalFee = Math.max(0, baseFeeAfterOffPeak + labAddonFee - creditsToUse);

  const handleConfirm = () => {
    const currentCat = CLINICAL_CATEGORIES.find(c => c.id === activeSpecialtyCategory);
    onBookingConfirmed({
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      specialty: activeDoctor.specialty,
      departmentId: activeDoctor.departmentId,
      categoryName: currentCat ? currentCat.name : activeDoctor.specialty,
      reason: selectedReason,
      slot: selectedSlot,
      type: consultType,
      creditsUsed: creditsToUse,
      finalFee,
      isPriceGuaranteed: true,
      isOffPeak: isSlotOffPeak,
      labBundleIncluded: bundleLabSample
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-clean appointment-clean-modal" onClick={(e) => e.stopPropagation()}>
        <button className="clean-close-x" onClick={onClose} aria-label="Close modal">✕</button>

        <div className="apt-modal-inner">
          {/* Modal Header */}
          <div className="apt-top-title-bar">
            <span className="apt-modal-badge">
              <Stethoscope size={13} />
              <span>Verified OPD Slot Reservation</span>
            </span>
            <h3 className="apt-modal-h3">Book Doctor Consultation Slot</h3>
          </div>

          {/* 1. DOCTOR CATEGORY SELECTOR CHIPS */}
          <div className="field-group-wrap cat-selector-section">
            <div className="section-label-row">
              <label className="field-label">Specialist Category:</label>
              <span className="field-sublabel">Switch doctor specialty directly</span>
            </div>

            <div className="apt-categories-chips-scroll">
              {CLINICAL_CATEGORIES.map((cat) => {
                const isSelected = activeSpecialtyCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`apt-cat-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleCategorySwitch(cat.id)}
                  >
                    <span className="chip-icon">{cat.icon}</span>
                    <span className="chip-name">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Doctor Showcase Card */}
          <div className="apt-doc-header">
            <img src={activeDoctor.image} alt={activeDoctor.name} className="doc-avatar-img" />
            <div className="doc-info-wrap">
              <div className="doc-specialty-badge-row">
                <span className="badge badge-teal">{activeDoctor.specialty}</span>
                <span className="trust-pill-sm">Score: {activeDoctor.trustScore}</span>
              </div>
              <h4 className="doc-h3-title">{activeDoctor.name}</h4>
              <p className="doc-h3-facility">
                <Building2 size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                {activeDoctor.hospitalName} • {activeDoctor.distanceKm} km away
              </p>
            </div>
          </div>

          {/* 2. REASON / CONCERN CATEGORY */}
          <div className="field-group-wrap">
            <label className="field-label">Consultation Purpose:</label>
            <div className="reasons-pills-grid">
              {REASON_CATEGORIES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`reason-chip-btn ${selectedReason === r.label ? 'active' : ''}`}
                  onClick={() => setSelectedReason(r.label)}
                >
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. MODE SELECTION */}
          <div className="field-group-wrap">
            <label className="field-label">Consultation Mode:</label>
            <div className="consult-mode-pair">
              <button 
                type="button" 
                className={`mode-select-btn ${consultType === 'video' ? 'active' : ''}`}
                onClick={() => setConsultType('video')}
              >
                <Video size={16} />
                <div>
                  <strong>Online Video Call</strong>
                  <span>Connect from home/hostel</span>
                </div>
              </button>

              <button 
                type="button" 
                className={`mode-select-btn ${consultType === 'clinic' ? 'active' : ''}`}
                onClick={() => setConsultType('clinic')}
              >
                <Building2 size={16} />
                <div>
                  <strong>In-Clinic Visit</strong>
                  <span>Live Queue OPD Token</span>
                </div>
              </button>
            </div>
          </div>

          {/* 4. SLOT CATEGORY FILTERS & TIME SLOTS SELECTION */}
          <div className="field-group-wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="field-label" style={{ margin: 0 }}>Select Available Time Slot:</label>
              <span className="happy-hour-tag">⚡ Happy Hours (35% OFF)</span>
            </div>

            {/* Slot Category Filter Tabs */}
            <div className="slot-category-tabs">
              <button 
                type="button" 
                className={`slot-tab-btn ${slotFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSlotFilter('all')}
              >
                All Slots
              </button>
              <button 
                type="button" 
                className={`slot-tab-btn ${slotFilter === 'morning' ? 'active' : ''}`}
                onClick={() => setSlotFilter('morning')}
              >
                🌅 Morning
              </button>
              <button 
                type="button" 
                className={`slot-tab-btn ${slotFilter === 'happy_hour' ? 'active' : ''}`}
                onClick={() => setSlotFilter('happy_hour')}
              >
                ⚡ Happy Hour (-35%)
              </button>
              <button 
                type="button" 
                className={`slot-tab-btn ${slotFilter === 'evening' ? 'active' : ''}`}
                onClick={() => setSlotFilter('evening')}
              >
                🌆 Evening
              </button>
              <button 
                type="button" 
                className={`slot-tab-btn ${slotFilter === 'tomorrow' ? 'active' : ''}`}
                onClick={() => setSlotFilter('tomorrow')}
              >
                📅 Tomorrow
              </button>
            </div>

            {/* Slot Buttons Grid */}
            <div className="slot-chips-wrap">
              {displayedSlots.map((slotObj, sIdx) => {
                const isSelected = selectedSlot === slotObj.time;
                return (
                  <button 
                    key={sIdx}
                    type="button"
                    className={`clean-slot-btn ${isSelected ? 'selected' : ''} ${slotObj.isOffPeak ? 'offpeak-btn' : ''}`}
                    onClick={() => setSelectedSlot(slotObj.time)}
                  >
                    <Clock size={12} />
                    <div className="slot-btn-inner">
                      <span className="slot-time-text">{slotObj.time}</span>
                      {slotObj.isOffPeak && <span className="slot-save-tag">Save 35%</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doorstep Phlebotomy Lab Sample Bundle Add-on */}
          <div className="bundle-addon-box">
            <label className="bundle-checkbox-label">
              <input 
                type="checkbox" 
                checked={bundleLabSample}
                onChange={(e) => setBundleLabSample(e.target.checked)}
              />
              <div>
                <strong>Bundle Doorstep Health Blood Panel (+₹399)</strong>
                <span>Home phlebotomist collects CBC, Blood Sugar & Lipid profile before consult (Save 58%)</span>
              </div>
            </label>
          </div>

          {/* Price Guarantee Banner */}
          <div className="price-guarantee-pill-bar">
            <ShieldCheck size={16} color="#059669" />
            <span><strong>100% Price Guarantee:</strong> All-inclusive fee with zero surprise bills at hospital.</span>
          </div>

          {/* Price breakdown */}
          <div className="price-breakdown-card">
            <div className="p-row">
              <span>Standard Consultation Fee ({activeDoctor.specialty}):</span>
              <span>₹{activeDoctor.consultationFee}</span>
            </div>

            {activeDoctor.studentDiscountFee && (
              <div className="p-row student-discount-line">
                <span>Student Wellness Pass:</span>
                <span>-₹{activeDoctor.consultationFee - activeDoctor.studentDiscountFee}</span>
              </div>
            )}

            {isSlotOffPeak && (
              <div className="p-row happy-discount-line">
                <span>Dynamic Off-Peak "Happy Hour" (-35%):</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>-₹{offPeakDiscount}</span>
              </div>
            )}

            {bundleLabSample && (
              <div className="p-row">
                <span>Doorstep Lab Sample Bundle:</span>
                <span style={{ color: '#00a8cc', fontWeight: 700 }}>+₹399</span>
              </div>
            )}

            {userCredits > 0 && (
              <div className="credit-discount-line">
                <label className="credit-checkbox">
                  <input 
                    type="checkbox" 
                    checked={useCredits} 
                    onChange={(e) => setUseCredits(e.target.checked)}
                  />
                  <span>Redeem <strong>{Math.min(userCredits, 150)} HealthCredits</strong></span>
                </label>
                <span className="minus-amt">-₹{creditsToUse}</span>
              </div>
            )}

            {/* Itemized Price Toggle */}
            <div className="apt-itemized-toggle" onClick={() => setShowItemizedToggle(!showItemizedToggle)}>
              <span>{showItemizedToggle ? 'Hide' : 'View'} All-Inclusive Itemized Breakdown</span>
              {showItemizedToggle ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </div>

            {showItemizedToggle && (
              <div className="apt-itemized-subtable">
                <div><span>• Board Certified {activeDoctor.specialty} Evaluation:</span> <strong>Covered</strong></div>
                <div><span>• Digital Prescription & Vital Triage:</span> <strong>Covered</strong></div>
                <div><span>• Post-Consultation Follow-up (7 Days):</span> <strong>Free</strong></div>
                <div><span>• WhatsApp Live Queue Telemetry Alert:</span> <strong>Included</strong></div>
              </div>
            )}

            <div className="line-sep"></div>

            <div className="p-row total-line">
              <span>Final Payable for {selectedSlot}:</span>
              <span className="total-num">₹{finalFee}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button className="btn-teal" onClick={handleConfirm} style={{ flex: 1.6 }}>
              <span>Confirm & Lock Slot (₹{finalFee})</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .appointment-clean-modal {
          max-width: 550px;
          max-height: 92vh;
          overflow-y: auto;
          border-radius: 20px;
          background: #ffffff;
          padding: 24px;
        }

        .apt-modal-inner {
          position: relative;
        }

        .apt-top-title-bar {
          margin-bottom: 14px;
        }

        .apt-modal-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #eef8fa;
          color: #0891b2;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 9999px;
          margin-bottom: 4px;
        }

        .apt-modal-h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .section-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .field-sublabel {
          font-size: 0.72rem;
          color: #64748b;
        }

        .apt-categories-chips-scroll {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: thin;
        }

        .apt-cat-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 11px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.75rem;
          color: #334155;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .apt-cat-chip:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        .apt-cat-chip.active {
          background: #00a8cc;
          border-color: #00a8cc;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 168, 204, 0.25);
        }

        .apt-doc-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 14px;
        }

        .doc-avatar-img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }

        .doc-info-wrap {
          flex: 1;
        }

        .doc-specialty-badge-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2px;
        }

        .trust-pill-sm {
          font-size: 0.68rem;
          color: #0891b2;
          background: #eef8fa;
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 700;
        }

        .doc-h3-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 2px 0;
        }

        .doc-h3-facility {
          font-size: 0.76rem;
          color: #64748b;
          margin: 0;
        }

        .reasons-pills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }

        .reason-chip-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.74rem;
          color: #334155;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }
        .reason-chip-btn:hover {
          background: #f1f5f9;
        }
        .reason-chip-btn.active {
          background: #eef8fa;
          border-color: #00a8cc;
          color: #0e7490;
          font-weight: 600;
        }

        .field-group-wrap {
          margin-bottom: 14px;
        }

        .field-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 6px;
        }

        .happy-hour-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .consult-mode-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .mode-select-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }
        .mode-select-btn.active {
          border-color: #00a8cc;
          background: #eef8fa;
        }
        .mode-select-btn strong {
          display: block;
          font-size: 0.82rem;
          color: #0f172a;
        }
        .mode-select-btn span {
          display: block;
          font-size: 0.7rem;
          color: #64748b;
        }

        .slot-category-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          margin-bottom: 8px;
          padding-bottom: 2px;
        }

        .slot-tab-btn {
          padding: 4px 8px;
          background: #f1f5f9;
          border: 1px solid transparent;
          border-radius: 6px;
          font-size: 0.7rem;
          color: #475569;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .slot-tab-btn:hover {
          background: #e2e8f0;
        }
        .slot-tab-btn.active {
          background: #0f172a;
          color: #ffffff;
        }

        .slot-chips-wrap {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 6px;
        }

        .clean-slot-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.74rem;
          color: #475569;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }
        .clean-slot-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        .clean-slot-btn.selected {
          background: #00a8cc;
          color: #ffffff;
          border-color: #00a8cc;
        }
        .clean-slot-btn.offpeak-btn {
          border-color: #a7f3d0;
          background: #f0fdf4;
          color: #065f46;
          font-weight: 600;
        }
        .clean-slot-btn.offpeak-btn.selected {
          background: #059669;
          color: #ffffff;
          border-color: #059669;
        }

        .slot-btn-inner {
          display: flex;
          flex-direction: column;
        }
        .slot-time-text {
          font-size: 0.72rem;
          font-weight: 600;
        }
        .slot-save-tag {
          font-size: 0.65rem;
          font-weight: 700;
          color: #059669;
        }
        .clean-slot-btn.selected .slot-save-tag {
          color: #ffffff;
        }

        .bundle-addon-box {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 12px;
        }
        .bundle-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
        }
        .bundle-checkbox-label input {
          margin-top: 3px;
        }
        .bundle-checkbox-label strong {
          display: block;
          font-size: 0.8rem;
          color: #0f172a;
        }
        .bundle-checkbox-label span {
          display: block;
          font-size: 0.72rem;
          color: #64748b;
        }

        .price-guarantee-pill-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 8px;
          font-size: 0.76rem;
          color: #065f46;
          margin-bottom: 12px;
        }

        .price-breakdown-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 14px;
        }
        .p-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #475569;
          margin-bottom: 5px;
        }
        .happy-discount-line {
          color: #059669;
        }
        .credit-discount-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #92400e;
          background: #fffbeb;
          padding: 6px 8px;
          border-radius: 6px;
          margin: 6px 0;
        }
        .credit-checkbox {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .line-sep {
          height: 1px;
          background: #e2e8f0;
          margin: 8px 0;
        }
        .total-line {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0;
        }
        .total-num {
          font-size: 1.25rem;
          font-weight: 800;
          color: #00a8cc;
        }

        .apt-itemized-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.74rem;
          color: #00a8cc;
          font-weight: 600;
          cursor: pointer;
          margin: 6px 0;
        }
        .apt-itemized-subtable {
          font-size: 0.72rem;
          color: #64748b;
          padding: 6px 8px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-bottom: 6px;
        }
        .apt-itemized-subtable strong {
          color: #059669;
        }

        @media (max-width: 600px) {
          .reasons-pills-grid {
            grid-template-columns: 1fr;
          }
          .slot-chips-wrap {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
