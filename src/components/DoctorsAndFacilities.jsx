import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Coins, 
  TrendingUp, 
  Building2, 
  Bed, 
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { DOCTORS, HOSPITALS } from '../data/mockData';

const SPECIALTY_CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: '🌟', count: DOCTORS.length },
  { id: 'cardiology', label: 'Cardiologist', icon: '🫀', count: DOCTORS.filter(d => d.departmentId === 'cardiology').length },
  { id: 'dermatology', label: 'Dermatologist', icon: '✨', count: DOCTORS.filter(d => d.departmentId === 'dermatology').length },
  { id: 'orthopedics', label: 'Orthopedic / Orthologist', icon: '🦴', count: DOCTORS.filter(d => d.departmentId === 'orthopedics').length },
  { id: 'neurology', label: 'Neurologist', icon: '🧠', count: DOCTORS.filter(d => d.departmentId === 'neurology').length },
  { id: 'general', label: 'General Physician', icon: '🩺', count: DOCTORS.filter(d => d.departmentId === 'general').length },
  { id: 'pediatrics', label: 'Pediatrician', icon: '👶', count: DOCTORS.filter(d => d.departmentId === 'pediatrics').length },
  { id: 'dentistry', label: 'Dentist', icon: '🦷', count: DOCTORS.filter(d => d.departmentId === 'dentistry').length },
  { id: 'psychiatry', label: 'Counselor / Therapist', icon: '🧘', count: DOCTORS.filter(d => d.departmentId === 'psychiatry').length },
];

export default function DoctorsAndFacilities({ 
  selectedDepartment, 
  searchQuery, 
  onSimulateTreatmentCompletion,
  onBookDoctor 
}) {
  const [viewType, setViewType] = useState('doctors'); // 'doctors' | 'hospitals'
  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [sortBy, setSortBy] = useState('trustScore'); // 'trustScore' | 'rating' | 'distance'
  const [activeCategory, setActiveCategory] = useState(selectedDepartment || 'all');

  useEffect(() => {
    if (selectedDepartment) {
      setActiveCategory(selectedDepartment);
    }
  }, [selectedDepartment]);

  // Filter Doctors by distance, category, and search query
  const filteredDoctors = DOCTORS.filter((doc) => {
    if (doc.distanceKm > maxDistance) return false;
    const effDept = activeCategory === 'all' ? null : activeCategory;
    if (effDept && doc.departmentId !== effDept) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpecialty = doc.specialty.toLowerCase().includes(q);
      const matchServices = doc.services.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchSpecialty && !matchServices) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'trustScore') return b.trustScore - a.trustScore;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    return 0;
  });

  // Filter Hospitals
  const filteredHospitals = HOSPITALS.filter((hosp) => {
    if (hosp.distanceKm > maxDistance) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = hosp.name.toLowerCase().includes(q);
      const matchDepts = hosp.departments.some(d => d.toLowerCase().includes(q));
      if (!matchName && !matchDepts) return false;
    }
    return true;
  });

  const handleSimulateClick = (doctor) => {
    onSimulateTreatmentCompletion(doctor);
  };

  const selectedCategoryObj = SPECIALTY_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section className="care-directory-clean" id="care-directory">
      <div className="container">
        {/* Controls Bar */}
        <div className="directory-controls clean-card">
          <div className="type-toggle-group">
            <button 
              className={`type-toggle-btn ${viewType === 'doctors' ? 'active' : ''}`}
              onClick={() => setViewType('doctors')}
            >
              <span>Verified Specialists ({filteredDoctors.length})</span>
            </button>
            <button 
              className={`type-toggle-btn ${viewType === 'hospitals' ? 'active' : ''}`}
              onClick={() => setViewType('hospitals')}
            >
              <span>Hospitals & Clinics ({filteredHospitals.length})</span>
            </button>
          </div>

          <div className="filter-sliders-row">
            <div className="clean-filter-item">
              <label>Distance Radius: <strong>{maxDistance} km</strong></label>
              <input 
                type="range" 
                min="1" 
                max="15" 
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="clean-range-slider"
              />
            </div>

            {viewType === 'doctors' && (
              <div className="clean-filter-item">
                <label>Sort By:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="clean-select-box"
                >
                  <option value="trustScore">Doctor TrustScore (Verified)</option>
                  <option value="rating">Highest Patient Rating</option>
                  <option value="distance">Proximity (Closest First)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* SPECIALTY CATEGORIES CHIPS FOR DIRECT SLOT BOOKING */}
        {viewType === 'doctors' && (
          <div className="directory-categories-wrap clean-card">
            <div className="dir-cat-header-row">
              <div className="dir-cat-title">
                <span className="dir-cat-badge">
                  <Stethoscope size={13} color="#0891b2" />
                  <span>Doctor Categories & Slot Booking</span>
                </span>
                <p className="dir-cat-subtitle">
                  Select a category to filter top clinicians (Cardiologist, Dermatologist, Orthopedic, etc.) and lock available OPD slots.
                </p>
              </div>
              {activeCategory !== 'all' && (
                <button 
                  type="button" 
                  className="clear-cat-btn"
                  onClick={() => setActiveCategory('all')}
                >
                  Clear Filter (Show All)
                </button>
              )}
            </div>

            <div className="category-scroll-container">
              {SPECIALTY_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`cat-pill-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span className="cat-pill-emoji">{cat.icon}</span>
                    <span className="cat-pill-name">{cat.label}</span>
                    <span className="cat-pill-badge">{cat.count}</span>
                  </button>
                );
              })}
            </div>

            {activeCategory !== 'all' && selectedCategoryObj && (
              <div className="active-cat-alert-bar">
                <span>Filtering by: <strong>{selectedCategoryObj.icon} {selectedCategoryObj.label}</strong> • Showing {filteredDoctors.length} verified specialist doctor(s) with open OPD slots.</span>
              </div>
            )}
          </div>
        )}



        {/* DOCTORS LIST */}
        {viewType === 'doctors' && (
          <div className="doctors-list-wrap">
            {filteredDoctors.length === 0 ? (
              <div className="empty-state-box clean-card">
                <p>No specialists found within {maxDistance}km radius matching your filters.</p>
                <button className="btn-secondary" onClick={() => setMaxDistance(15)}>
                  Expand Search Radius to 15km
                </button>
              </div>
            ) : (
              filteredDoctors.map((doc, index) => (
                <div key={doc.id} className="clean-doctor-card clean-card">
                  <div className="doc-main-grid">
                    {/* Doctor Avatar */}
                    <div className="doc-img-col">
                      <img src={doc.image} alt={doc.name} className="doc-thumbnail" />
                      {doc.isBoosted && (
                        <div className="clean-rank-badge">
                          <span>Rank #{index + 1}</span>
                        </div>
                      )}
                    </div>

                    {/* Doctor Details */}
                    <div className="doc-info-col">
                      <div className="doc-title-bar">
                        <div>
                          <h3 className="doc-full-name">{doc.name}</h3>
                          <div className="doc-credentials">{doc.degree}</div>
                        </div>

                        {/* TrustScore Pill */}
                        <div className="trustscore-chip" title="Earned through genuine patient treatments">
                          <TrendingUp size={13} color="#0891b2" />
                          <span>TrustScore: <strong>{doc.trustScore}</strong></span>
                        </div>
                      </div>

                      <div className="doc-pills-row">
                        <span className="clean-pill-specialty">{doc.specialty}</span>
                        <span className="clean-pill-gray">{doc.experienceYears}+ Yrs Practice</span>
                        <span className="clean-pill-rating">
                          <Star size={12} fill="#d97706" color="#d97706" />
                          <strong>{doc.rating}</strong> ({doc.reviewCount} reviews)
                        </span>
                        <span className="clean-pill-distance">
                          <MapPin size={12} />
                          {doc.distanceKm} km away
                        </span>
                      </div>

                      <p className="doc-about-summary">{doc.about}</p>

                      <div className="doc-facility-line">
                        <Building2 size={13} color="#64748b" />
                        <span>{doc.hospitalName} • <span className="address-sub">{doc.address}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Services Row */}
                  <div className="doc-services-bar">
                    <span className="services-heading">Clinical Focus:</span>
                    <div className="services-chips-wrap">
                      {doc.services.map((srv, sIdx) => (
                        <span key={sIdx} className="clinical-chip">{srv}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Pricing Row */}
                  <div className="doc-card-actions-bar">
                    <div className="doc-pricing-info">
                      <div className="consult-fee-line">
                        <span className="fee-lbl">Consultation Fee:</span>
                        <span className="fee-val">₹{doc.consultationFee}</span>
                      </div>
                      {doc.studentDiscountFee && (
                        <span className="student-pass-tag">
                          Student Wellness Pass: ₹{doc.studentDiscountFee}
                        </span>
                      )}
                      <div className="doc-next-slot-pill">
                        <Clock size={12} color="#059669" />
                        <span>Slot: <strong>{doc.nextSlot || 'Today 11:30 AM'}</strong></span>
                      </div>
                    </div>

                    <div className="doc-btn-group">
                      <button 
                        className="simulate-btn"
                        onClick={() => handleSimulateClick(doc)}
                        title="Simulate treatment completion to observe credit award to patient and TrustScore boost to doctor"
                      >
                        <Coins size={14} color="#b45309" />
                        <span>Simulate (+75 Pts)</span>
                      </button>

                      <button 
                        className="btn-teal book-slot-btn"
                        onClick={() => onBookDoctor(doc)}
                      >
                        <Calendar size={14} />
                        <span>Select Slot & Book (₹{doc.studentDiscountFee || doc.consultationFee})</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* HOSPITALS & CLINICS */}
        {viewType === 'hospitals' && (
          <div className="hospitals-list-wrap">
            {filteredHospitals.map((hosp) => (
              <div key={hosp.id} className="clean-hospital-card clean-card">
                <div className="hosp-top-row">
                  <div>
                    <span className="badge badge-teal" style={{ marginBottom: '6px' }}>{hosp.type}</span>
                    <h3 className="hosp-name-title">{hosp.name}</h3>
                    <p className="hosp-loc-text">
                      <MapPin size={13} />
                      <span>{hosp.address} ({hosp.distanceKm} km away)</span>
                    </p>
                  </div>

                  {hosp.emergency24x7 ? (
                    <span className="badge badge-rose">
                      ● 24/7 Trauma Emergency
                    </span>
                  ) : (
                    <span className="badge badge-slate">
                      Outpatient Day Clinic
                    </span>
                  )}
                </div>

                <div className="hosp-stats-cards">
                  <div className="hosp-stat-card">
                    <Bed size={16} color="#0891b2" />
                    <div>
                      <strong>{hosp.icuBedsAvailable > 0 ? `${hosp.icuBedsAvailable} ICU Beds` : 'OPD Care'}</strong>
                      <span>Available Now</span>
                    </div>
                  </div>

                  <div className="hosp-stat-card">
                    <Clock size={16} color="#059669" />
                    <div>
                      <strong>{hosp.ambulanceResponseTime}</strong>
                      <span>Ambulance Response</span>
                    </div>
                  </div>

                  <div className="hosp-stat-card">
                    <Star size={16} color="#d97706" fill="#d97706" />
                    <div>
                      <strong>{hosp.rating} / 5.0</strong>
                      <span>NABH Quality Certified</span>
                    </div>
                  </div>
                </div>

                <div className="hosp-depts-row">
                  <span className="depts-lead">Departments:</span>
                  <div className="depts-pills">
                    {hosp.departments.map((d, dIdx) => (
                      <span key={dIdx} className="dept-tag-pill">{d}</span>
                    ))}
                  </div>
                </div>

                <div className="hosp-footer-bar">
                  <div className="er-phone">
                    Emergency Line: <strong>{hosp.emergencyPhone}</strong>
                  </div>

                  <div className="hosp-footer-btns">
                    <a href={`tel:${hosp.phone}`} className="btn-secondary call-facility-btn">
                      <Phone size={13} />
                      <span>Call Facility</span>
                    </a>
                    <button className="btn-teal-outline" onClick={() => alert(`Opening navigation directions to ${hosp.name} in Google Maps.`)}>
                      <ArrowUpRight size={14} />
                      <span>Directions</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .care-directory-clean {
          padding: 30px 0 60px;
          background: #ffffff;
        }

        .directory-controls {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .type-toggle-group {
          display: flex;
          background: #f1f5f9;
          padding: 3px;
          border-radius: var(--radius-full);
        }

        .type-toggle-btn {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          background: transparent;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .type-toggle-btn.active {
          background: #ffffff;
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
        }

        .filter-sliders-row {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .clean-filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .clean-filter-item strong {
          color: var(--text-main);
        }

        .clean-range-slider {
          accent-color: var(--teal-500);
          cursor: pointer;
        }

        .clean-select-box {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          color: var(--text-main);
          outline: none;
          cursor: pointer;
        }

        .clean-info-banner {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          font-size: 0.84rem;
          color: var(--text-body);
          flex-wrap: wrap;
          gap: 12px;
        }

        .info-banner-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doctors-list-wrap, .hospitals-list-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .clean-doctor-card, .clean-hospital-card {
          padding: 24px;
        }

        .doc-main-grid {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }

        .doc-img-col {
          position: relative;
          width: 90px;
          height: 90px;
          flex-shrink: 0;
        }

        .doc-thumbnail {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 1px solid var(--border-light);
        }

        .clean-rank-badge {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          background: #0f172a;
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .doc-info-col {
          flex: 1;
        }

        .doc-title-bar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .doc-full-name {
          font-size: 1.25rem;
          color: var(--text-main);
          font-weight: 700;
        }

        .doc-credentials {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .trustscore-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          background: var(--teal-50);
          border: 1px solid var(--teal-100);
          color: var(--teal-700);
          padding: 3px 8px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
        }

        .doc-pills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin: 6px 0 10px;
        }

        .clean-pill-specialty {
          background: var(--teal-50);
          color: var(--teal-700);
          font-weight: 600;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .clean-pill-gray {
          background: #f1f5f9;
          color: var(--text-muted);
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .clean-pill-rating {
          background: #fffbeb;
          color: #92400e;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .clean-pill-distance {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .doc-about-summary {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-bottom: 8px;
        }

        .doc-facility-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-body);
        }
        .address-sub {
          color: var(--text-dim);
        }

        .doc-services-bar {
          background: #f8fafc;
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .services-heading {
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .services-chips-wrap {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .clinical-chip {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 0.72rem;
          color: var(--text-body);
        }

        .doc-card-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 14px;
        }

        .consult-fee-line {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .fee-lbl {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .fee-val {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .student-pass-tag {
          font-size: 0.72rem;
          color: #7c3aed;
          background: #f5f3ff;
          padding: 2px 6px;
          border-radius: 4px;
          display: block;
          margin-top: 2px;
        }

        .doc-btn-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .simulate-btn {
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
          padding: 7px 12px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .simulate-btn:hover {
          background: #fef3c7;
        }

        .book-slot-btn {
          padding: 8px 18px;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .doc-next-slot-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          margin-top: 4px;
        }

        /* Specialty Categories Bar */
        .directory-categories-wrap {
          margin-bottom: 22px;
          padding: 16px 20px;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .dir-cat-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .dir-cat-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #0891b2;
          background: #eef8fa;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-bottom: 4px;
        }

        .dir-cat-subtitle {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
        }

        .clear-cat-btn {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .clear-cat-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
        }

        .category-scroll-container {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: thin;
        }

        .cat-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.8rem;
          color: #334155;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cat-pill-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }
        .cat-pill-btn.active {
          background: #00a8cc;
          border-color: #00a8cc;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 168, 204, 0.25);
          font-weight: 600;
        }
        .cat-pill-emoji {
          font-size: 0.95rem;
        }
        .cat-pill-badge {
          background: rgba(0, 0, 0, 0.07);
          color: inherit;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 9999px;
        }
        .cat-pill-btn.active .cat-pill-badge {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .active-cat-alert-bar {
          margin-top: 10px;
          padding: 6px 12px;
          background: #f0fdf4;
          border-radius: 8px;
          border: 1px solid #bbf7d0;
          font-size: 0.76rem;
          color: #166534;
        }

        /* Hospital styling */
        .hosp-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .hosp-name-title {
          font-size: 1.25rem;
          color: var(--text-main);
        }

        .hosp-loc-text {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .hosp-stats-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .hosp-stat-card {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hosp-stat-card strong {
          display: block;
          font-size: 0.88rem;
          color: var(--text-main);
        }
        .hosp-stat-card span {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .hosp-depts-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .depts-lead {
          font-size: 0.76rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .depts-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .dept-tag-pill {
          background: #f1f5f9;
          font-size: 0.72rem;
          padding: 2px 7px;
          border-radius: 4px;
          color: var(--text-body);
        }

        .hosp-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 12px;
        }

        .er-phone {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .er-phone strong {
          color: #dc2626;
        }

        .hosp-footer-btns {
          display: flex;
          gap: 8px;
        }

        .call-facility-btn {
          font-size: 0.8rem;
          padding: 7px 14px;
        }

        @media (max-width: 768px) {
          .doc-main-grid {
            flex-direction: column;
          }
          .hosp-stats-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
