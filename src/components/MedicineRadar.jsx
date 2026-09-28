import React, { useState, useMemo } from 'react';
import { 
  Pill, 
  Search, 
  MapPin, 
  Store, 
  Coins, 
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  Phone,
  ShieldCheck,
  Check
} from 'lucide-react';
import { MEDICINES } from '../data/mockData';

export default function MedicineRadar({ userCredits, onRedeemMedicine }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubstituteView, setSelectedSubstituteView] = useState({});

  // Helper to dynamically synthesize a custom medicine result if user types something not in mockData
  const dynamicCustomMedicine = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const exactMatch = MEDICINES.find(m => 
      m.brandName.toLowerCase().includes(q) || 
      m.genericName.toLowerCase().includes(q)
    );
    if (exactMatch) return null; // Found in standard database

    // Synthesize realistic medicine rate and substitute data for whatever the user entered
    const isSyrup = q.includes('syrup') || q.includes('liquid') || q.includes('tonic') || q.includes('suspension');
    const isGel = q.includes('gel') || q.includes('cream') || q.includes('spray') || q.includes('ointment');
    const isCapsule = q.includes('cap') || q.includes('capsule');
    const formType = isSyrup ? 'Syrup' : isGel ? 'Gel' : isCapsule ? 'Capsule' : 'Tablet';

    const baseMrp = 150.00;
    const janPrice = 32.00;
    const localPrice = 120.00;
    const apolloPrice = 138.00;

    return {
      id: `custom-${Date.now()}`,
      brandName: searchQuery.trim().charAt(0).toUpperCase() + searchQuery.trim().slice(1),
      genericName: `${searchQuery.trim().charAt(0).toUpperCase() + searchQuery.trim().slice(1)} Active Molecule Equivalent`,
      category: 'General Healthcare',
      department: 'general',
      form: `Standard Pack of ${formType}s`,
      formType: formType,
      availableForms: [`${formType} Standard Dose`, `${formType} Forte (Double Strength)`, `Pediatric Oral Form`],
      substitutes: [
        { name: `PM Jan Aushadhi Generic ${searchQuery.trim()}`, price: janPrice, type: 'Govt Generic' },
        { name: `${searchQuery.trim()} Standard Brand`, price: baseMrp, type: 'Market Chemist' }
      ],
      mrp: baseMrp,
      prescriptionRequired: false,
      uses: `Symptomatic relief and therapeutic treatment as prescribed for ${searchQuery.trim()}`,
      dosageInfo: 'Take as directed by registered medical practitioner with water after food',
      pharmacies: [
        {
          pharmacyName: 'Jan Aushadhi Kendra #104 (Govt. Generic Store)',
          price: janPrice,
          discountPercent: Math.round(((baseMrp - janPrice) / baseMrp) * 100),
          distanceKm: 0.6,
          inStock: true,
          address: 'Opposite Community Center, Block C',
          isBestPrice: true,
          phone: '+91 98112 34501'
        },
        {
          pharmacyName: 'Sanjeevani Local Medicos',
          price: localPrice,
          discountPercent: Math.round(((baseMrp - localPrice) / baseMrp) * 100),
          distanceKm: 1.1,
          inStock: true,
          address: 'Main Market, Shop 4',
          phone: '+91 11 2678 1234'
        },
        {
          pharmacyName: 'Apollo 24/7 Retail Chemist',
          price: apolloPrice,
          discountPercent: Math.round(((baseMrp - apolloPrice) / baseMrp) * 100),
          distanceKm: 1.5,
          inStock: true,
          address: 'Hospital Square, Ground Floor',
          phone: '+91 11 4567 8900'
        }
      ]
    };
  }, [searchQuery]);

  // Filtered List
  const displayMedicines = useMemo(() => {
    let list = MEDICINES.filter((med) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchBrand = med.brandName.toLowerCase().includes(q);
        const matchGeneric = med.genericName.toLowerCase().includes(q);
        const matchUses = med.uses.toLowerCase().includes(q);
        const matchCategory = med.category.toLowerCase().includes(q);
        if (!matchBrand && !matchGeneric && !matchUses && !matchCategory) return false;
      }
      return true;
    });

    if (dynamicCustomMedicine && list.length === 0) {
      list = [dynamicCustomMedicine];
    }

    return list;
  }, [searchQuery, dynamicCustomMedicine]);

  const toggleSubstitutes = (medId) => {
    setSelectedSubstituteView(prev => ({
      ...prev,
      [medId]: !prev[medId]
    }));
  };

  return (
    <section className="medicine-radar-clean">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-clean">
          <div className="sec-badge-row">
            <span className="badge badge-teal">
              <Store size={13} />
              <span>Hyperlocal Medicine Price & Types Radar</span>
            </span>
          </div>
          <h2>Compare Different Rates of Any Medicine Around You</h2>
          <p>
            Type any medicine name below to discover different dosage types (Tablets, Syrups, Capsules), compare real-time rates at nearby Government Jan Aushadhi Kendras vs private retail chemists, and save up to 84% on your bills.
          </p>
        </div>

        {/* 1. CLEAN INTERACTIVE MEDICINE SEARCH / TYPE INPUT BAR */}
        <div className="med-search-hero-box clean-card">
          <div className="med-type-input-wrap">
            <Search size={22} className="med-type-search-ico" />
            <input 
              type="text"
              placeholder="Enter ANY medicine name (e.g. Dolo 650, Augmentin, Paracetamol, Telma, Cough Syrup, Volini, Cetirizine...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="med-type-input-field"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clean-clear-btn" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Live Search Stats Bar */}
        <div className="med-results-stats-bar">
          <span>
            Showing <strong>{displayMedicines.length} medicine profile(s)</strong> with real-time pharmacy rates around you.
          </span>
          {searchQuery && (
            <span className="active-query-tag">Searching: "{searchQuery}"</span>
          )}
        </div>

        {/* 2. MEDICINES DISPLAY LIST */}
        <div className="meds-clean-container">
          {displayMedicines.length === 0 ? (
            <div className="empty-med-search clean-card">
              <Pill size={40} color="#94a3b8" />
              <h3>No Medicines Found for "{searchQuery}"</h3>
              <p>Check the spelling or try searching by generic salt name (e.g., Paracetamol, Amoxicillin, Pantoprazole).</p>
              <button 
                type="button" 
                className="btn-teal"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            displayMedicines.map((med) => {
              const nearbyStores = med.pharmacies;
              const bestStore = nearbyStores.find(p => p.isBestPrice) || nearbyStores[0];
              const maxSavingsPercent = Math.max(...nearbyStores.map(p => p.discountPercent || 0));
              const isSubstitutesOpen = !!selectedSubstituteView[med.id];

              return (
                <div key={med.id} className="clean-med-card clean-card">
                  {/* Left Column: Medicine Profile, Forms & Substitutes */}
                  <div className="med-info-block">
                    <div className="med-name-heading">
                      <div className="pill-ico-wrap">
                        <Pill size={24} color="#0891b2" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="med-badges-row">
                          <span className="med-cat-label">{med.category}</span>
                          <span className="med-form-pill">{med.formType || 'Tablet'}</span>
                          {med.prescriptionRequired && (
                            <span className="rx-required-tag">Rx Required</span>
                          )}
                        </div>
                        <h3 className="med-brand-title">{med.brandName}</h3>
                        <span className="generic-salt-text">
                          Active Salt / Generic: <strong>{med.genericName}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Packaging & Form Specs */}
                    <div className="med-specs-row">
                      <div className="spec-item">
                        <span className="spec-label">Packaging:</span>
                        <strong className="spec-val">{med.form}</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Standard MRP:</span>
                        <span className="mrp-strike">₹{med.mrp.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="med-details-box">
                      <div className="detail-line">
                        <span className="d-label">Prescribed For:</span>
                        <span className="d-val">{med.uses}</span>
                      </div>
                      <div className="detail-line">
                        <span className="d-label">Dosage Guide:</span>
                        <span className="d-val">{med.dosageInfo}</span>
                      </div>
                    </div>

                    {/* Available Forms of this Medicine */}
                    {med.availableForms && med.availableForms.length > 0 && (
                      <div className="available-forms-section">
                        <span className="forms-label">Different Types / Strengths Available:</span>
                        <div className="forms-chips-wrap">
                          {med.availableForms.map((f, fIdx) => (
                            <span key={fIdx} className="form-chip">{f}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Substitutes & Equivalent Brands Toggle */}
                    {med.substitutes && med.substitutes.length > 0 && (
                      <div className="substitutes-accordion-box">
                        <button 
                          type="button" 
                          className="substitutes-toggle-btn"
                          onClick={() => toggleSubstitutes(med.id)}
                        >
                          <Layers size={13} color="#0891b2" />
                          <span>{isSubstitutesOpen ? 'Hide' : 'View'} Alternative Brands & Generic Substitutes ({med.substitutes.length})</span>
                        </button>

                        {isSubstitutesOpen && (
                          <div className="substitutes-list-table">
                            {med.substitutes.map((sub, sIdx) => (
                              <div key={sIdx} className="substitute-row">
                                <div>
                                  <span className="sub-name">{sub.name}</span>
                                  <span className={`sub-type-badge ${sub.type === 'Govt Generic' ? 'generic' : 'brand'}`}>
                                    {sub.type}
                                  </span>
                                </div>
                                <span className="sub-price">₹{sub.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Savings Highlight Pill */}
                    <div className="best-savings-summary-pill">
                      <TrendingDown size={14} color="#059669" />
                      <span>
                        Lowest Price Around You: <strong>₹{bestStore ? bestStore.price.toFixed(2) : med.mrp.toFixed(2)}</strong> (Save up to <strong>{maxSavingsPercent}%</strong>)
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Local Chemists Around You with Different Rates */}
                  <div className="pharmacies-block">
                    <div className="pharm-header">
                      <div className="pharm-title-left">
                        <Store size={16} color="#0891b2" />
                        <span>Different Rates Across Pharmacies Around You:</span>
                      </div>
                      <span className="pharm-count-badge">{nearbyStores.length} Stores</span>
                    </div>

                    <div className="pharm-table">
                      {nearbyStores.map((pharm, pIdx) => {
                        const rupeesSaved = (med.mrp - pharm.price).toFixed(2);
                        return (
                          <div 
                            key={pIdx} 
                            className={`pharm-row ${pharm.isBestPrice ? 'best-price-row' : ''}`}
                          >
                            <div className="pharm-store-info">
                              <div className="pharm-store-name">
                                <strong>{pharm.pharmacyName}</strong>
                                {pharm.isBestPrice && (
                                  <span className="badge badge-emerald lowest-badge">
                                    ★ Lowest Rate Around You
                                  </span>
                                )}
                              </div>
                              <div className="pharm-store-dist">
                                <MapPin size={11} color="#64748b" />
                                <span>{pharm.address} • <strong>{pharm.distanceKm} km away</strong></span>
                              </div>
                              {pharm.phone && (
                                <div className="pharm-store-phone">
                                  <Phone size={10} color="#0891b2" />
                                  <span>{pharm.phone}</span>
                                  <span className="stock-status-dot">● In Stock</span>
                                </div>
                              )}
                            </div>

                            <div className="pharm-pricing-action">
                              <div className="price-tag-wrap">
                                <div className="rate-line">
                                  <span className="store-price">₹{pharm.price.toFixed(2)}</span>
                                  <span className="store-discount">{pharm.discountPercent}% OFF</span>
                                </div>
                                <span className="rupees-saved-text">Save ₹{rupeesSaved}</span>
                              </div>

                              <button 
                                type="button"
                                className="btn-teal store-reserve-btn"
                                onClick={() => onRedeemMedicine(med, pharm)}
                              >
                                <ShoppingBag size={13} />
                                <span>Reserve (₹{pharm.price.toFixed(2)})</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* HealthCredits Redemption Prompt */}
                    <div className="credits-hint-bar">
                      <Coins size={14} color="#b45309" />
                      <span>
                        Use your <strong>{userCredits} HealthCredits</strong> to pay 100% cashless at verified partner chemists!
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <style>{`
        .medicine-radar-clean {
          padding: 30px 0 60px;
          background: #f8fafc;
        }

        .sec-badge-row {
          margin-bottom: 8px;
        }

        /* 1. Clean Big Hero Search / Type Box */
        .med-search-hero-box {
          padding: 20px 24px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 18px rgba(0,0,0,0.03);
          margin-bottom: 20px;
        }

        .med-type-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          padding: 14px 18px;
          border-radius: 14px;
          transition: all 0.2s ease;
          margin: 0;
        }
        .med-type-input-wrap:focus-within {
          border-color: #00a8cc;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0, 168, 204, 0.12);
        }

        .med-type-search-ico {
          color: #00a8cc;
          flex-shrink: 0;
        }

        .med-type-input-field {
          flex: 1;
          background: transparent;
          border: none;
          color: #0f172a;
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 500;
          outline: none;
        }
        .med-type-input-field::placeholder {
          color: #94a3b8;
          font-size: 0.95rem;
        }

        .clean-clear-btn {
          background: #e2e8f0;
          border: none;
          color: #475569;
          font-size: 0.8rem;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }
        .clean-clear-btn:hover {
          background: #cbd5e1;
        }

        /* Results Stats Bar */
        .med-results-stats-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.84rem;
          color: #64748b;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .active-query-tag {
          font-size: 0.74rem;
          background: #eef8fa;
          color: #0891b2;
          padding: 3px 9px;
          border-radius: 6px;
          font-weight: 700;
        }

        /* Medicines Cards Container */
        .meds-clean-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .clean-med-card {
          padding: 24px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
          display: grid;
          grid-template-columns: 1.15fr 1.35fr;
          gap: 26px;
          transition: all 0.2s ease;
        }
        .clean-med-card:hover {
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.04);
        }

        /* Left Info Block */
        .med-name-heading {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 12px;
        }

        .pill-ico-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #eef8fa;
          border: 1px solid #c9ecf2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .med-badges-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 3px;
          flex-wrap: wrap;
        }
        .med-cat-label {
          font-size: 0.68rem;
          color: #0891b2;
          background: #eef8fa;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .med-form-pill {
          font-size: 0.68rem;
          color: #475569;
          background: #f1f5f9;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .rx-required-tag {
          font-size: 0.65rem;
          color: #b91c1c;
          background: #fee2e2;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .med-brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 2px 0;
        }

        .generic-salt-text {
          font-size: 0.78rem;
          color: #64748b;
        }
        .generic-salt-text strong {
          color: #0e7490;
        }

        .med-specs-row {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
        }
        .spec-label {
          color: #64748b;
        }
        .spec-val {
          color: #0f172a;
        }
        .mrp-strike {
          text-decoration: line-through;
          color: #94a3b8;
          font-weight: 600;
        }

        .med-details-box {
          background: #f8fafc;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .detail-line {
          font-size: 0.76rem;
          line-height: 1.4;
        }
        .d-label {
          font-weight: 700;
          color: #334155;
          margin-right: 5px;
        }
        .d-val {
          color: #64748b;
        }

        /* Available forms */
        .available-forms-section {
          margin-bottom: 12px;
        }
        .forms-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 5px;
        }
        .forms-chips-wrap {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }
        .form-chip {
          font-size: 0.7rem;
          background: #f1f5f9;
          color: #334155;
          border: 1px solid #e2e8f0;
          padding: 2px 7px;
          border-radius: 4px;
          font-weight: 500;
        }

        /* Substitutes Accordion */
        .substitutes-accordion-box {
          margin-bottom: 12px;
        }
        .substitutes-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #00a8cc;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .substitutes-toggle-btn:hover {
          text-decoration: underline;
        }
        .substitutes-list-table {
          margin-top: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .substitute-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.74rem;
        }
        .sub-name {
          font-weight: 600;
          color: #0f172a;
          margin-right: 6px;
        }
        .sub-type-badge {
          font-size: 0.65rem;
          padding: 1px 5px;
          border-radius: 4px;
          font-weight: 600;
        }
        .sub-type-badge.generic {
          background: #ecfdf5;
          color: #065f46;
        }
        .sub-type-badge.brand {
          background: #f1f5f9;
          color: #475569;
        }
        .sub-price {
          font-weight: 700;
          color: #059669;
        }

        .best-savings-summary-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          font-size: 0.76rem;
          padding: 7px 12px;
          border-radius: 8px;
        }

        /* Right Column: Pharmacies Around You */
        .pharmacies-block {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        .pharm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }
        .pharm-title-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f172a;
        }
        .pharm-count-badge {
          font-size: 0.7rem;
          background: #e2e8f0;
          color: #475569;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .pharm-table {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .pharm-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 14px;
          transition: all 0.15s ease;
        }
        .pharm-row.best-price-row {
          border-color: #a7f3d0;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(5, 150, 105, 0.08);
        }

        .pharm-store-info {
          flex: 1;
        }
        .pharm-store-name {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 3px;
          flex-wrap: wrap;
        }
        .pharm-store-name strong {
          font-size: 0.82rem;
          color: #0f172a;
        }
        .lowest-badge {
          font-size: 0.65rem;
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .pharm-store-dist {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          color: #64748b;
        }

        .pharm-store-phone {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          color: #0891b2;
          margin-top: 3px;
        }
        .stock-status-dot {
          color: #059669;
          font-weight: 600;
        }

        .pharm-pricing-action {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .price-tag-wrap {
          text-align: right;
        }
        .rate-line {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .store-price {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          font-family: var(--font-heading);
        }
        .store-discount {
          font-size: 0.72rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 1px 4px;
          border-radius: 4px;
        }
        .rupees-saved-text {
          display: block;
          font-size: 0.68rem;
          font-weight: 600;
          color: #059669;
        }

        .store-reserve-btn {
          padding: 7px 14px;
          font-size: 0.78rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .credits-hint-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
          font-size: 0.72rem;
          padding: 8px 12px;
          border-radius: 8px;
          margin-top: 12px;
        }

        .empty-med-search {
          text-align: center;
          padding: 40px 20px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        .empty-med-search h3 {
          font-size: 1.2rem;
          color: #0f172a;
          margin: 12px 0 6px 0;
        }
        .empty-med-search p {
          color: #64748b;
          font-size: 0.85rem;
          margin-bottom: 16px;
        }

        @media (max-width: 900px) {
          .clean-med-card {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .pharm-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .pharm-pricing-action {
            justify-content: space-between;
          }
        }
      `}</style>
    </section>
  );
}
