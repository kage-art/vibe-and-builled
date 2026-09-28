import React, { useState } from 'react';
import { 
  Tag, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Layers, 
  FileText, 
  Upload, 
  AlertCircle, 
  CreditCard, 
  Home, 
  Video, 
  Stethoscope, 
  ChevronDown, 
  ChevronUp, 
  Percent, 
  Radio, 
  HelpCircle,
  Coins,
  Search,
  Building2,
  DollarSign
} from 'lucide-react';
import { 
  REVERSE_BIDS, 
  SURGERY_POOLS, 
  PROCEDURE_ESTIMATES, 
  PEER_BILLS, 
  LIVE_QUEUE_DATA, 
  HYBRID_BUNDLES, 
  SECOND_OPINION_SPECIALISTS, 
  HOSPITAL_COMPARISON_MATRIX,
  DOCTORS
} from '../data/mockData';
import DoctorsAndFacilities from './DoctorsAndFacilities';

export default function SmartMarketplaceHub({ 
  onBookDoctor, 
  onOpenSOS, 
  showToast,
  userCredits,
  onAddCredits,
  selectedDepartment,
  searchQuery,
  handleSimulateTreatmentCompletion,
  activeCategory: propActiveCategory,
  onSelectCategory: propOnSelectCategory
}) {
  const [internalCategory, setInternalCategory] = useState('specialists');
  const activeCategory = propActiveCategory !== undefined ? propActiveCategory : internalCategory;
  const setActiveCategory = propOnSelectCategory || setInternalCategory;

  // --- 1. REVERSE BIDDING STATE ---
  const [bidsList, setBidsList] = useState(REVERSE_BIDS);
  const [isNewBidModal, setIsNewBidModal] = useState(false);
  const [newBidForm, setNewBidForm] = useState({
    treatmentTitle: '',
    specialty: 'Dentistry',
    targetBudget: '',
    urgency: 'Moderate'
  });
  const [acceptedBids, setAcceptedBids] = useState({});

  // --- 2. SURGERY POOLS STATE ---
  const [poolsList, setPoolsList] = useState(SURGERY_POOLS);
  const [joinedPools, setJoinedPools] = useState({});

  // --- 3. PROCEDURE ESTIMATES & ITEMIZATION ---
  const [selectedProcId, setSelectedProcId] = useState('proc-1');
  const [showItemizedToggle, setShowItemizedToggle] = useState(true);
  const [priceClaimModal, setPriceClaimModal] = useState(false);
  const [claimStatus, setClaimStatus] = useState(null);

  // --- 4. PEER BILL UPLOADS ---
  const [peerBillsList, setPeerBillsList] = useState(PEER_BILLS);
  const [isUploadBillModal, setIsUploadBillModal] = useState(false);
  const [newBillForm, setNewBillForm] = useState({
    procedureName: '',
    hospitalName: '',
    amountPaid: '',
    notes: ''
  });

  // --- 5. LIVE QUEUE STATE ---
  const [queueDoctorId, setQueueDoctorId] = useState('doc-1');
  const [queueState, setQueueState] = useState(LIVE_QUEUE_DATA);
  const [smsAlertEnabled, setSmsAlertEnabled] = useState(true);

  // --- 6. EMERGENCY ESCROW STATE ---
  const [escrowDepositStatus, setEscrowDepositStatus] = useState(null);
  const [selectedEscrowHosp, setSelectedEscrowHosp] = useState('MaxCure Super Speciality Hospital');

  // --- 7. AI SYMPTOM-TO-BUDGET MATCHER STATE ---
  const [matcherSymptom, setMatcherSymptom] = useState('Mild chest discomfort & high pulse after running');
  const [matcherBudget, setMatcherBudget] = useState(800);
  const [matchedResults, setMatchedResults] = useState(null);

  // --- 8. SECOND OPINION MARKETPLACE ---
  const [secondOpinionSelected, setSecondOpinionSelected] = useState(null);
  const [secondOpinionSubmitted, setSecondOpinionSubmitted] = useState(false);

  // --- 9. HYBRID BUNDLE BOOKING ---
  const [bookedBundles, setBookedBundles] = useState({});

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  // Reverse Bidding Submit
  const handleCreateBid = (e) => {
    e.preventDefault();
    if (!newBidForm.treatmentTitle || !newBidForm.targetBudget) return;

    const newBid = {
      id: `bid-${Date.now()}`,
      patientName: 'Aman Sharma (You)',
      treatmentTitle: newBidForm.treatmentTitle,
      specialty: newBidForm.specialty,
      targetBudget: Number(newBidForm.targetBudget),
      preferredLocation: 'South Extension, New Delhi',
      preferredDate: 'Within 48 Hours',
      urgency: newBidForm.urgency,
      status: 'Broadcasting to 14 Verified Clinics...',
      bidsCount: 2,
      clinicOffers: [
        {
          id: `off-${Date.now()}-1`,
          clinicName: 'MedBridge Verified Partner Clinic',
          doctorName: 'Attending Specialist (Board Certified)',
          offeredPrice: Math.round(Number(newBidForm.targetBudget) * 0.92),
          distanceKm: 1.4,
          rating: 4.88,
          turnaround: 'Slot available Tomorrow Morning',
          inclusions: ['Pre-Procedural Check', 'Standard Treatment', '1 Follow-up Visit'],
          isPriceGuaranteed: true
        }
      ]
    };

    setBidsList([newBid, ...bidsList]);
    setIsNewBidModal(false);
    setNewBidForm({ treatmentTitle: '', specialty: 'Dentistry', targetBudget: '', urgency: 'Moderate' });
    showToast(
      'Requirement Broadcasted',
      `Your budget requirement for ₹${newBid.targetBudget} was sent to verified practitioners. Bids will arrive shortly.`,
      null,
      'info'
    );
  };

  const handleAcceptClinicOffer = (bidId, offer) => {
    setAcceptedBids(prev => ({ ...prev, [bidId]: offer.id }));
  };

  // Join Surgery Pool
  const handleJoinPool = (poolId) => {
    if (joinedPools[poolId]) return;
    setJoinedPools(prev => ({ ...prev, [poolId]: true }));
    setPoolsList(prev => prev.map(p => {
      if (p.id === poolId) {
        const updatedCount = Math.min(p.targetCohortSize, p.currentJoinedCount + 1);
        return {
          ...p,
          currentJoinedCount: updatedCount,
          status: updatedCount === p.targetCohortSize ? 'Cohort Full! 30% Bulk Discount Locked!' : `${p.targetCohortSize - updatedCount} Slots Remaining`
        };
      }
      return p;
    }));
    showToast(
      'Joined Surgery Pool',
      'You are now locked into the pooled surgical cohort. Group discount secured on OT & bed fees with zero upfront lock-in.',
      null,
      'info'
    );
  };

  // Upload Peer Bill
  const handleUploadBill = (e) => {
    e.preventDefault();
    if (!newBillForm.procedureName || !newBillForm.amountPaid) return;

    const newBill = {
      id: `bill-${Date.now()}`,
      procedureName: newBillForm.procedureName,
      hospitalName: newBillForm.hospitalName || 'Verified Regional Hospital',
      city: 'New Delhi',
      amountPaid: Number(newBillForm.amountPaid),
      quotedInitialAmount: Math.round(Number(newBillForm.amountPaid) * 1.25),
      dateUploaded: 'Just now',
      verifiedStamp: 'MedBridge Community Audit #MB-VER-NEW',
      daysAdmitted: 'Verified Patient Receipt',
      patientReviewSnippet: newBillForm.notes || 'Uploaded for community transparency. Itemized charges matched MedBridge benchmark.',
      isAnonymized: true,
      billType: 'Community'
    };

    setPeerBillsList([newBill, ...peerBillsList]);
    setIsUploadBillModal(false);
    setNewBillForm({ procedureName: '', hospitalName: '', amountPaid: '', notes: '' });

    if (onAddCredits) onAddCredits(50);
  };

  // Simulate Live Queue Advance
  const handleAdvanceQueue = () => {
    setQueueState(prev => {
      const currentDoc = prev[queueDoctorId];
      if (!currentDoc) return prev;
      const nextToken = currentDoc.currentlyServingToken + 1;
      const newMinutes = Math.max(2, currentDoc.estimatedMinutesWait - currentDoc.avgConsultationMins);
      const newPatientsAhead = Math.max(0, currentDoc.patientsAhead - 1);

      return {
        ...prev,
        [queueDoctorId]: {
          ...currentDoc,
          currentlyServingToken: nextToken,
          estimatedMinutesWait: newMinutes,
          patientsAhead: newPatientsAhead,
          delayAlert: newPatientsAhead === 0 ? 'Your Token is Next! Please approach consultation room.' : currentDoc.delayAlert
        }
      };
    });

    showToast(
      'Queue Token Advanced',
      `Doctor is now consulting Token #${queueState[queueDoctorId]?.currentlyServingToken + 1}.`,
      null,
      'info'
    );
  };

  // Emergency Escrow Deposit
  const handleLockEmergencyEscrow = () => {
    setEscrowDepositStatus({
      token: '#EMG-ESCROW-8921',
      hospital: selectedEscrowHosp,
      depositAmount: 5000,
      status: 'Active & Held Safely in MedBridge Escrow',
      reservedBed: 'ICU & Emergency Trauma Bay 04',
      code: '8921-VERIFIED'
    });
    showToast(
      'Emergency Bed Reserved via Escrow',
      `₹5,000 held in MedBridge Escrow. ${selectedEscrowHosp} notified for immediate zero-delay admission.`,
      null,
      'info'
    );
  };

  // AI Symptom to Budget Run
  const handleRunSymptomBudgetMatch = (customDept = null, customSymptom = null) => {
    const symptomText = customSymptom !== null ? customSymptom : matcherSymptom;
    const q = symptomText.toLowerCase();
    let targetDept = customDept || 'general';

    if (!customDept) {
      if (q.includes('chest') || q.includes('heart') || q.includes('bp') || q.includes('pulse')) targetDept = 'cardiology';
      else if (q.includes('skin') || q.includes('rash') || q.includes('acne') || q.includes('hair')) targetDept = 'dermatology';
      else if (q.includes('knee') || q.includes('bone') || q.includes('joint') || q.includes('back') || q.includes('ortho')) targetDept = 'orthopedics';
      else if (q.includes('stress') || q.includes('anxiety') || q.includes('exam') || q.includes('sleep') || q.includes('therap')) targetDept = 'psychiatry';
      else if (q.includes('headache') || q.includes('migraine') || q.includes('brain') || q.includes('nerve')) targetDept = 'neurology';
      else if (q.includes('tooth') || q.includes('teeth') || q.includes('dental') || q.includes('cavity') || q.includes('rct')) targetDept = 'dentistry';
      else if (q.includes('child') || q.includes('baby') || q.includes('infant') || q.includes('pediatric')) targetDept = 'pediatrics';
    }

    const eligibleDoctors = DOCTORS.filter(doc => {
      const fee = doc.studentDiscountFee || doc.consultationFee;
      return (doc.departmentId === targetDept || targetDept === 'general') && fee <= matcherBudget;
    });

    setMatchedResults({
      specialtyDetected: targetDept.toUpperCase(),
      budgetCap: matcherBudget,
      matches: eligibleDoctors.length > 0 ? eligibleDoctors : DOCTORS.filter(d => d.departmentId === targetDept)
    });
  };

  const handleSelectQuickCategoryMatcher = (deptId, symptomPhrase) => {
    setMatcherSymptom(symptomPhrase);
    handleRunSymptomBudgetMatch(deptId, symptomPhrase);
  };

  // Book Hybrid Bundle
  const handleBookBundle = (bundleId) => {
    setBookedBundles(prev => ({ ...prev, [bundleId]: true }));
  };

  // Current Procedure for Estimator
  const activeProc = PROCEDURE_ESTIMATES.find(p => p.id === selectedProcId) || PROCEDURE_ESTIMATES[0];
  const activeQueue = queueState[queueDoctorId];

  return (
    <section id="smart-marketplace-section" className="smart-marketplace-root">
      <div className="container">
        {/* Core Solutions Category Navigation Tabs */}
        <div className="hub-tabs-bar">
          <button 
            type="button" 
            className={`hub-tab-button ${activeCategory === 'specialists' ? 'active' : ''}`}
            onClick={() => setActiveCategory('specialists')}
          >
            <Stethoscope size={16} />
            <span>Verified Specialists & Clinics</span>
          </button>

          <button 
            type="button" 
            className={`hub-tab-button ${activeCategory === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveCategory('marketplace')}
          >
            <Tag size={16} />
            <span>Marketplace & Bidding</span>
          </button>

          <button 
            type="button" 
            className={`hub-tab-button ${activeCategory === 'transparency' ? 'active' : ''}`}
            onClick={() => setActiveCategory('transparency')}
          >
            <ShieldCheck size={16} />
            <span>Price Transparency & Trust</span>
          </button>

          <button 
            type="button" 
            className={`hub-tab-button ${activeCategory === 'operations' ? 'active' : ''}`}
            onClick={() => setActiveCategory('operations')}
          >
            <Clock size={16} />
            <span>Queue & Emergency Escrow</span>
          </button>

          <button 
            type="button" 
            className={`hub-tab-button ${activeCategory === 'clinical' ? 'active' : ''}`}
            onClick={() => setActiveCategory('clinical')}
          >
            <Sparkles size={16} />
            <span>Smart Access & Bundles</span>
          </button>
        </div>

        {/* ==================================================================== */}
        {/* TAB 0: VERIFIED SPECIALISTS & CARE DIRECTORY                          */}
        {/* ==================================================================== */}
        {activeCategory === 'specialists' && (
          <div id="care-directory" className="hub-tab-pane">
            <DoctorsAndFacilities 
              selectedDepartment={selectedDepartment}
              searchQuery={searchQuery}
              onSimulateTreatmentCompletion={handleSimulateTreatmentCompletion}
              onBookDoctor={onBookDoctor}
            />
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 1: MARKETPLACE & PRICING                                         */}
        {/* ==================================================================== */}
        {activeCategory === 'marketplace' && (
          <div className="hub-tab-pane">
            <div className="pane-intro-row">
              <div>
                <h3>Reverse Bidding & Community Surgery Pooling</h3>
                <p>Post custom treatment requirements to let nearby clinics bid with discounted packages, or join surgical pools for bulk discounts.</p>
              </div>
              <button 
                type="button" 
                className="btn-primary-teal"
                onClick={() => setIsNewBidModal(true)}
              >
                + Post Treatment Requirement
              </button>
            </div>

            {/* Reverse Bidding Cards */}
            <div className="sub-module-box">
              <div className="sub-header-row">
                <span className="sub-label">Active Patient Requirements & Clinic Counter-Bids</span>
                <span className="text-muted-xs">Competitive Marketplace Logic • Price Protected</span>
              </div>

              <div className="bids-grid">
                {bidsList.map((bid) => (
                  <div key={bid.id} className="bid-card clean-card">
                    <div className="bid-card-head">
                      <div>
                        <span className="badge-tag-cyan">{bid.specialty}</span>
                        <h4 className="bid-title">{bid.treatmentTitle}</h4>
                        <span className="bid-meta-sub">Posted by {bid.patientName} • {bid.preferredLocation}</span>
                      </div>
                      <div className="budget-target-box">
                        <span className="target-lbl">Target Budget</span>
                        <span className="target-val">₹{bid.targetBudget.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Offers received */}
                    <div className="clinic-offers-wrap">
                      <span className="offers-header-lbl">
                        Received {bid.clinicOffers.length} Verified Clinic Bids:
                      </span>
                      <div className="offers-list">
                        {bid.clinicOffers.map((offer) => {
                          const isAccepted = acceptedBids[bid.id] === offer.id;
                          return (
                            <div key={offer.id} className={`offer-item ${isAccepted ? 'accepted' : ''}`}>
                              <div className="offer-left">
                                <div className="offer-clinic-name">
                                  <strong>{offer.clinicName}</strong>
                                  <span className="doctor-sub">by {offer.doctorName} • {offer.distanceKm} km away</span>
                                </div>
                                <div className="offer-inclusions">
                                  {offer.inclusions.map((inc, i) => (
                                    <span key={i} className="inc-chip">✓ {inc}</span>
                                  ))}
                                </div>
                                <span className="turnaround-tag">{offer.turnaround}</span>
                              </div>

                              <div className="offer-right">
                                <div className="offer-price-val">₹{offer.offeredPrice.toLocaleString('en-IN')}</div>
                                {offer.isPriceGuaranteed && (
                                  <span className="guarantee-chip">100% Price Lock</span>
                                )}
                                <button 
                                  type="button" 
                                  className={`btn-action-sm ${isAccepted ? 'accepted-btn' : ''}`}
                                  disabled={isAccepted}
                                  onClick={() => handleAcceptClinicOffer(bid.id, offer)}
                                >
                                  {isAccepted ? '✓ Offer Locked' : 'Accept & Book'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Off-Peak Hour Pricing ("Happy Hours" for OPD) */}
            <div className="sub-module-box" style={{ marginTop: '28px' }}>
              <div className="sub-header-row">
                <div>
                  <span className="sub-label">Dynamic Off-Peak "Happy Hours" for OPD</span>
                  <p className="text-muted-xs">Fill low-demand clinic slots (e.g. 02:00 PM – 04:00 PM) at 30–50% discount.</p>
                </div>
                <span className="badge-tag-green">Active Today</span>
              </div>

              <div className="offpeak-grid">
                <div className="offpeak-card">
                  <div className="offpeak-time">02:00 PM – 04:00 PM</div>
                  <div className="offpeak-discount">35% Flat Discount</div>
                  <p className="offpeak-desc">Applicable across Cardiology, Dermatology, and Orthopedics OPD clinics.</p>
                  <div className="offpeak-sample">
                    <span className="regular-price">Regular: ₹750</span>
                    <span className="happy-price">Happy Hour: ₹485</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-outline-teal"
                    onClick={() => {
                      const el = document.getElementById('care-directory');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Happy Hour Doctors
                  </button>
                </div>

                <div className="offpeak-card">
                  <div className="offpeak-time">11:00 AM – 01:00 PM</div>
                  <div className="offpeak-discount">50% Student Subsidy</div>
                  <p className="offpeak-desc">Confidential mental health & counseling sessions for university students.</p>
                  <div className="offpeak-sample">
                    <span className="regular-price">Regular: ₹500</span>
                    <span className="happy-price">Student Pass: ₹199</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-outline-teal"
                    onClick={() => {
                      const el = document.getElementById('care-directory');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Student Pass
                  </button>
                </div>
              </div>
            </div>

            {/* Group / Community Surgery Pooling */}
            <div className="sub-module-box" style={{ marginTop: '28px' }}>
              <div className="sub-header-row">
                <div>
                  <span className="sub-label">Group / Community Surgery Pooling</span>
                  <p className="text-muted-xs">Collective bargaining power: Patients pool together for scheduled procedures to unlock 25–35% bulk savings on OT & bed fees.</p>
                </div>
              </div>

              <div className="pools-grid">
                {poolsList.map((pool) => {
                  const percentFilled = Math.round((pool.currentJoinedCount / pool.targetCohortSize) * 100);
                  const isUserJoined = joinedPools[pool.id];

                  return (
                    <div key={pool.id} className="pool-card clean-card">
                      <div className="pool-top-row">
                        <span className="badge-tag-purple">{pool.department}</span>
                        <span className="pool-save-pill">Save {pool.savingsPercent}% Group Rate</span>
                      </div>

                      <h4 className="pool-title">{pool.surgeryName}</h4>
                      <div className="pool-hospital">{pool.hospitalName} • Surgery Date: <strong>{pool.surgeryDate}</strong></div>

                      <div className="pool-pricing-row">
                        <div>
                          <span className="lbl-muted">Individual Cost:</span>
                          <span className="cross-price">₹{pool.individualCost.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="lbl-muted">Pooled Group Price:</span>
                          <span className="pooled-price">₹{pool.pooledGroupCost.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Progress threshold bar */}
                      <div className="pool-progress-wrap">
                        <div className="progress-labels">
                          <span>{pool.currentJoinedCount} of {pool.targetCohortSize} Patients Joined</span>
                          <span className="strong-teal">{percentFilled}%</span>
                        </div>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${percentFilled}%` }}></div>
                        </div>
                        <span className="pool-status-note">{pool.status}</span>
                      </div>

                      <div className="pool-inclusions-list">
                        {pool.inclusions.map((inc, i) => (
                          <span key={i} className="inc-dot">✓ {inc}</span>
                        ))}
                      </div>

                      <button 
                        type="button"
                        className={`btn-pool-join ${isUserJoined ? 'joined' : ''}`}
                        onClick={() => handleJoinPool(pool.id)}
                      >
                        {isUserJoined ? '✓ In Cohort Pool (0 Upfront Risk)' : 'Join Surgery Pool (Save ₹' + (pool.individualCost - pool.pooledGroupCost).toLocaleString('en-IN') + ')'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: TRANSPARENCY & TRUST                                          */}
        {/* ==================================================================== */}
        {activeCategory === 'transparency' && (
          <div className="hub-tab-pane">
            <div className="pane-intro-row">
              <div>
                <h3>All-Inclusive Procedure Cost Estimator & Price Guarantee</h3>
                <p>Calculates true out-of-pocket costs with guaranteed caps on surgeon, room, consumables, and post-op care. Backed by verified peer receipts.</p>
              </div>
            </div>

            {/* Procedure Estimator Module */}
            <div className="sub-module-box">
              <div className="estimator-selector-tabs">
                {PROCEDURE_ESTIMATES.map((proc) => (
                  <button 
                    key={proc.id}
                    type="button"
                    className={`proc-pill-btn ${selectedProcId === proc.id ? 'active' : ''}`}
                    onClick={() => setSelectedProcId(proc.id)}
                  >
                    {proc.procedureName.split('(')[0]}
                  </button>
                ))}
              </div>

              {/* Estimator Details Card */}
              <div className="estimator-card clean-card">
                <div className="estimator-summary-row">
                  <div>
                    <span className="badge-tag-cyan">{activeProc.category}</span>
                    <h3 className="proc-main-title">{activeProc.procedureName}</h3>
                    <span className="proc-hospital-name">{activeProc.hospitalName}</span>
                  </div>

                  <div className="pricing-caps-box">
                    <div className="cap-item">
                      <span className="cap-label">Standard Hospital Market Rate</span>
                      <span className="cap-strike">₹{activeProc.averageHospitalCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="cap-item highlight">
                      <span className="cap-label">Guaranteed Max Out-of-Pocket</span>
                      <span className="cap-guaranteed">₹{activeProc.maxGuaranteedCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Price Guarantee Badge & EMI banner */}
                <div className="guarantee-and-emi-bar">
                  <div className="guarantee-status-left">
                    <ShieldCheck size={20} color="#059669" />
                    <div>
                      <strong>MedBridge 100% Price Guarantee Protocol</strong>
                      <span>If the final bill exceeds ₹{activeProc.maxGuaranteedCost.toLocaleString('en-IN')}, MedBridge automatically reimburses the difference.</span>
                    </div>
                  </div>

                  <div className="emi-tag-right">
                    <CreditCard size={18} color="#00a8cc" />
                    <span>0% No-Cost EMI: <strong>₹{activeProc.emiOptions.monthlyAmount.toLocaleString('en-IN')}/mo</strong> ({activeProc.emiOptions.months} Months)</span>
                  </div>
                </div>

                {/* All-Inclusive Itemized Breakdown Toggle */}
                <div className="itemized-toggle-header">
                  <button 
                    type="button" 
                    className="toggle-text-btn"
                    onClick={() => setShowItemizedToggle(!showItemizedToggle)}
                  >
                    <span>"All-Inclusive Package" Itemized Breakdown</span>
                    {showItemizedToggle ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <span className="transparency-pill">100% Cost Itemization</span>
                </div>

                {showItemizedToggle && (
                  <div className="itemized-table-wrap">
                    <table className="clean-itemized-table">
                      <thead>
                        <tr>
                          <th>Component</th>
                          <th>Coverage Scope & Details</th>
                          <th style={{ textAlign: 'right' }}>Included Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeProc.itemizedBreakdown.map((item, idx) => (
                          <tr key={idx}>
                            <td><strong>{item.component}</strong></td>
                            <td className="text-muted-cell">{item.note}</td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{item.amount.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Peer-Verified Out-of-Pocket Bill Uploads */}
            <div className="sub-module-box" style={{ marginTop: '28px' }}>
              <div className="sub-header-row">
                <div>
                  <span className="sub-label">Peer-Verified Out-of-Pocket Bill Uploads</span>
                  <p className="text-muted-xs">Real patient medical bills audited by MedBridge to verify actual historical averages and eliminate bill shocks.</p>
                </div>
                <button 
                  type="button" 
                  className="btn-outline-teal"
                  onClick={() => setIsUploadBillModal(true)}
                >
                  <Upload size={14} />
                  <span>Upload Your Bill (+50 Credits)</span>
                </button>
              </div>

              <div className="peer-bills-grid">
                {peerBillsList.map((bill) => (
                  <div key={bill.id} className="peer-bill-card clean-card">
                    <div className="bill-top">
                      <span className="badge-tag-cyan">{bill.billType}</span>
                      <span className="verified-stamp">✓ {bill.verifiedStamp}</span>
                    </div>

                    <h4 className="bill-proc-title">{bill.procedureName}</h4>
                    <div className="bill-hosp">{bill.hospitalName}, {bill.city}</div>

                    <div className="bill-amounts-row">
                      <div>
                        <span className="lbl-muted">Initial Quote:</span>
                        <span className="cross-price">₹{bill.quotedInitialAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="lbl-muted">Actual Verified Paid:</span>
                        <span className="verified-price">₹{bill.amountPaid.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <p className="bill-review-text">"{bill.patientReviewSnippet}"</p>
                    <span className="bill-date-footer">Audited on {bill.dateUploaded} • {bill.daysAdmitted}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Hospital "Cost vs Quality" Comparison Matrix */}
            <div className="sub-module-box" style={{ marginTop: '28px' }}>
              <div className="sub-header-row">
                <span className="sub-label">Multi-Hospital "Cost vs. Quality" Comparison Matrix</span>
                <span className="text-muted-xs">Side-by-side analytical evaluation across South Delhi hospitals</span>
              </div>

              <div className="matrix-table-wrap">
                <table className="clean-matrix-table">
                  <thead>
                    <tr>
                      <th>Quality & Financial Metric</th>
                      <th>MaxCure Super Speciality</th>
                      <th>Apollo City Hospital</th>
                      <th>City Trauma & Neuro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOSPITAL_COMPARISON_MATRIX.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.feature}</strong></td>
                        <td>{row.maxCure}</td>
                        <td>{row.apollo}</td>
                        <td>{row.cityTrauma}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: OPERATIONAL EFFICIENCY & QUEUE                                 */}
        {/* ==================================================================== */}
        {activeCategory === 'operations' && (
          <div className="hub-tab-pane">
            <div className="pane-intro-row">
              <div>
                <h3>Live OPD Queue Telemetry & Emergency Escrow Deposit</h3>
                <p>Track real-time doctor consultation tokens to skip crowded waiting rooms, and lock emergency hospital beds via refundable escrow deposits.</p>
              </div>
            </div>

            {/* Live Queue Tracker */}
            <div className="sub-module-box">
              <div className="sub-header-row">
                <span className="sub-label">Live OPD Queue Tracker & Room Telemetry</span>
                <div className="doc-select-pills">
                  <button 
                    className={`queue-doc-pill ${queueDoctorId === 'doc-1' ? 'active' : ''}`}
                    onClick={() => setQueueDoctorId('doc-1')}
                  >
                    Dr. Rajesh Vardhan (Cardiology)
                  </button>
                  <button 
                    className={`queue-doc-pill ${queueDoctorId === 'doc-2' ? 'active' : ''}`}
                    onClick={() => setQueueDoctorId('doc-2')}
                  >
                    Dr. Ananya Sen (Dermatology)
                  </button>
                  <button 
                    className={`queue-doc-pill ${queueDoctorId === 'doc-3' ? 'active' : ''}`}
                    onClick={() => setQueueDoctorId('doc-3')}
                  >
                    Dr. Vikram Malhotra (Orthopedics)
                  </button>
                </div>
              </div>

              <div className="queue-telemetry-card clean-card">
                <div className="telemetry-grid">
                  {/* Current Serving */}
                  <div className="telemetry-box current">
                    <span className="telemetry-lbl">Currently in Consultation</span>
                    <div className="token-giant-number">#{activeQueue.currentlyServingToken}</div>
                    <span className="token-status-pill" style={{ color: activeQueue.statusColor }}>
                      ● {activeQueue.doctorStatus}
                    </span>
                    <span className="telemetry-sub-info">{activeQueue.clinicLocation}</span>
                  </div>

                  {/* Your Token */}
                  <div className="telemetry-box your-token">
                    <span className="telemetry-lbl">Your Appointment Token</span>
                    <div className="token-giant-number teal">#{activeQueue.yourToken}</div>
                    <span className="token-eta-text">Estimated Time: <strong>{activeQueue.estimatedTime}</strong></span>
                    <span className="token-wait-clock">~{activeQueue.estimatedMinutesWait} mins wait ({activeQueue.patientsAhead} patients ahead)</span>
                  </div>

                  {/* Controls & Advance simulation */}
                  <div className="telemetry-box controls">
                    <span className="telemetry-lbl">Real-time Telemetry Controls</span>
                    <div className="delay-info-alert">
                      <Radio size={14} color="#00a8cc" />
                      <span>{activeQueue.delayAlert}</span>
                    </div>

                    <div className="sms-toggle-row">
                      <input 
                        type="checkbox" 
                        id="sms-check" 
                        checked={smsAlertEnabled}
                        onChange={(e) => setSmsAlertEnabled(e.target.checked)} 
                      />
                      <label htmlFor="sms-check">Send WhatsApp Alert when Token #{activeQueue.yourToken - 1} enters room</label>
                    </div>

                    <button 
                      type="button" 
                      className="btn-outline-teal" 
                      style={{ marginTop: '12px', width: '100%' }}
                      onClick={handleAdvanceQueue}
                    >
                      ▶ Simulate Doctor Calling Next Token
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Fixed-Price Escrow Deposit */}
            <div className="sub-module-box" style={{ marginTop: '28px' }}>
              <div className="sub-header-row">
                <div>
                  <span className="sub-label">Emergency "Fixed-Price Escrow" Deposit</span>
                  <p className="text-muted-xs">Eliminating emergency room counter delays: Pay a refundable deposit into MedBridge Escrow to guarantee instant admission without counter disputes.</p>
                </div>
                <span className="badge-tag-red">Frictionless Critical Admission</span>
              </div>

              <div className="escrow-card clean-card">
                {escrowDepositStatus ? (
                  <div className="escrow-success-box">
                    <CheckCircle2 size={44} color="#059669" />
                    <h4>Emergency Admission Escrow Active</h4>
                    <div className="escrow-details-row">
                      <div>
                        <span>Hospital:</span>
                        <strong>{escrowDepositStatus.hospital}</strong>
                      </div>
                      <div>
                        <span>Deposit Held:</span>
                        <strong>₹{escrowDepositStatus.depositAmount.toLocaleString('en-IN')} (Refundable)</strong>
                      </div>
                      <div>
                        <span>Admission Token:</span>
                        <strong className="code-text">{escrowDepositStatus.token}</strong>
                      </div>
                      <div>
                        <span>Reserved Bed:</span>
                        <strong>{escrowDepositStatus.reservedBed}</strong>
                      </div>
                    </div>
                    <p className="escrow-note">
                      Show this token at the emergency triage counter. The hospital will admit the patient immediately without demanding upfront counter cash. Unused funds are released upon discharge.
                    </p>
                    <button 
                      type="button" 
                      className="btn-outline-teal"
                      onClick={() => setEscrowDepositStatus(null)}
                    >
                      Reset / Reserve Another Bed
                    </button>
                  </div>
                ) : (
                  <div className="escrow-action-grid">
                    <div className="escrow-info-col">
                      <h4>How MedBridge Emergency Escrow Works:</h4>
                      <ul className="escrow-steps-list">
                        <li><strong>1. Instant Bed Hold:</strong> Deposit ₹5,000 into secure MedBridge Escrow.</li>
                        <li><strong>2. Triage Bypass:</strong> Hospital emergency desk instantly receives digital pre-auth code.</li>
                        <li><strong>3. Immediate Treatment:</strong> Patient admitted without administrative argument.</li>
                        <li><strong>4. 100% Refundable:</strong> Escrow adjusted against insurance TPA or refunded on discharge.</li>
                      </ul>
                    </div>

                    <div className="escrow-form-col">
                      <label>Select Emergency Hospital</label>
                      <select 
                        value={selectedEscrowHosp}
                        onChange={(e) => setSelectedEscrowHosp(e.target.value)}
                        className="clean-select"
                      >
                        <option value="MaxCure Super Speciality Hospital">MaxCure Super Speciality Hospital (8 ICU Beds Available)</option>
                        <option value="City Trauma & Neuro Care Center">City Trauma & Neuro Care Center (14 Beds Available)</option>
                        <option value="Apollo City Hospital & Care Clinic">Apollo City Hospital (12 Beds Available)</option>
                      </select>

                      <div className="escrow-fee-row">
                        <span>Fixed Escrow Hold:</span>
                        <strong>₹5,000 (100% Refundable)</strong>
                      </div>

                      <button 
                        type="button" 
                        className="btn-primary-teal" 
                        style={{ width: '100%', marginTop: '12px' }}
                        onClick={handleLockEmergencyEscrow}
                      >
                        Reserve Emergency Bed with Escrow
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: SMART ACCESS & BUNDLES                                        */}
        {/* ==================================================================== */}
        {activeCategory === 'clinical' && (
          <div className="hub-tab-pane">
            <div className="pane-intro-row">
              <div>
                <h3>AI Symptom-to-Budget Matcher, Second Opinions & Hybrid Bundles</h3>
                <p>Conversational clinical and budget mapping, 24-hour fixed-fee report reviews, and combined tele-consult + home phlebotomy care packages.</p>
              </div>
            </div>

            {/* AI Smart Symptom-to-Budget Matcher */}
            <div className="sub-module-box">
              <div className="sub-header-row">
                <span className="sub-label">AI Smart Symptom-to-Budget Matcher</span>
                <span className="text-muted-xs">Maps symptoms & financial boundaries to verified specialists</span>
              </div>

              <div className="matcher-card clean-card">
                {/* Specialty Category Pills for Quick Slot Booking */}
                <div className="matcher-quick-categories">
                  <span className="quick-cat-label">Quick Category Select:</span>
                  <div className="quick-cat-pills">
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('cardiology', 'Chest discomfort, breathlessness, irregular heartbeat')}>
                      🫀 Cardiologist
                    </button>
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('dermatology', 'Acne flare-up, stubborn eczema rash, excessive hairfall')}>
                      ✨ Dermatologist
                    </button>
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('orthopedics', 'Severe knee joint pain, backache, suspected bone fracture')}>
                      🦴 Orthopedic
                    </button>
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('neurology', 'Persistent migraine headache, numbness, tremors')}>
                      🧠 Neurologist
                    </button>
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('general', 'High fever, viral cold, general weakness, body ache')}>
                      🩺 General Physician
                    </button>
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('pediatrics', 'Child persistent fever, pediatric cough, vaccine schedule')}>
                      👶 Pediatrician
                    </button>
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('dentistry', 'Sharp toothache, deep cavity, painful gums, root canal')}>
                      🦷 Dentist
                    </button>
                    <button type="button" className="quick-cat-pill" onClick={() => handleSelectQuickCategoryMatcher('psychiatry', 'Exam stress, panic anxiety, insomnia, severe burnout')}>
                      🧘 Counselor
                    </button>
                  </div>
                </div>

                <div className="matcher-inputs-row">
                  <div className="matcher-input-field flex-2">
                    <label>Describe Symptoms / Health Challenge</label>
                    <input 
                      type="text" 
                      value={matcherSymptom}
                      onChange={(e) => setMatcherSymptom(e.target.value)}
                      placeholder="e.g., severe migraine, knee joint stiffness, skin allergy..."
                    />
                  </div>

                  <div className="matcher-input-field flex-1">
                    <label>Max Budget Cap (₹)</label>
                    <select 
                      value={matcherBudget}
                      onChange={(e) => setMatcherBudget(Number(e.target.value))}
                      className="clean-select"
                    >
                      <option value={300}>Under ₹300 (Student / Subsidized)</option>
                      <option value={600}>Under ₹600 (Affordable Clinic)</option>
                      <option value={800}>Under ₹800 (Senior Specialist)</option>
                      <option value={1500}>Under ₹1,500 (Super-Specialist)</option>
                    </select>
                  </div>

                  <button 
                    type="button" 
                    className="btn-primary-teal matcher-submit-btn"
                    onClick={() => handleRunSymptomBudgetMatch()}
                  >
                    Match Specialist
                  </button>
                </div>

                {matchedResults && (
                  <div className="matched-results-box">
                    <div className="match-banner">
                      <span>Mapped Department: <strong>{matchedResults.specialtyDetected}</strong></span>
                      <span>Budget Filter: <strong>≤ ₹{matchedResults.budgetCap}</strong></span>
                    </div>

                    <div className="matched-doctors-list">
                      {matchedResults.matches.map((doc) => (
                        <div key={doc.id} className="matched-doctor-item">
                          <img src={doc.image} alt={doc.name} className="doc-avatar" />
                          <div className="doc-info-col">
                            <strong>{doc.name}</strong>
                            <span className="specialty-sub">{doc.specialty} • {doc.experienceYears} Yrs Exp</span>
                            <span className="hosp-name">{doc.hospitalName}</span>
                          </div>
                          <div className="doc-fee-col">
                            <span className="fee-tag">₹{doc.studentDiscountFee || doc.consultationFee}</span>
                            <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 600 }}>Slot: {doc.nextSlot || 'Today 11:30 AM'}</span>
                            <button 
                              type="button" 
                              className="btn-action-sm"
                              onClick={() => onBookDoctor(doc)}
                            >
                              📅 Book Slot
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor "Second Opinion" Fixed-Fee Marketplace */}
            <div className="sub-module-box" style={{ marginTop: '28px' }}>
              <div className="sub-header-row">
                <div>
                  <span className="sub-label">Doctor "Second Opinion" Fixed-Fee Marketplace</span>
                  <p className="text-muted-xs">Upload MRI, CT scans, or biopsy reports for a written, legally valid second opinion from AIIMS/Fortis faculty within 24 hours.</p>
                </div>
              </div>

              <div className="second-opinion-grid">
                {SECOND_OPINION_SPECIALISTS.map((spec) => (
                  <div key={spec.id} className="second-opinion-card clean-card">
                    <div className="so-head">
                      <span className="badge-tag-cyan">24h Written Review</span>
                      <span className="so-fee">₹{spec.fixedFee} Flat Fee</span>
                    </div>

                    <h4 className="so-name">{spec.doctorName}</h4>
                    <span className="so-cred">{spec.credentials}</span>
                    <span className="so-hosp">{spec.hospital} • {spec.casesReviewed}+ Reviews Done</span>

                    <div className="so-suitable">
                      <span className="lbl-muted">Ideal For:</span>
                      <div className="chips-wrap">
                        {spec.suitableFor.map((item, idx) => (
                          <span key={idx} className="so-chip">{item}</span>
                        ))}
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="btn-outline-teal"
                      style={{ width: '100%', marginTop: '14px' }}
                      onClick={() => {
                        setSecondOpinionSelected(spec);
                        setSecondOpinionSubmitted(false);
                      }}
                    >
                      Request Second Opinion (₹{spec.fixedFee})
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Doorstep Sample Collection & Tele-Consult Price Bundling */}
            <div className="sub-module-box" style={{ marginTop: '28px' }}>
              <div className="sub-header-row">
                <div>
                  <span className="sub-label">Doorstep Sample Collection & Tele-Consult Bundles</span>
                  <p className="text-muted-xs">Single unified care packages combining online doctor consultation, home phlebotomy sample pickup, and post-report review at up to 60% savings.</p>
                </div>
              </div>

              <div className="bundles-grid">
                {HYBRID_BUNDLES.map((bundle) => {
                  const isBooked = bookedBundles[bundle.id];
                  return (
                    <div key={bundle.id} className="bundle-card clean-card">
                      <div className="bundle-top">
                        <span className="badge-tag-purple">{bundle.tag}</span>
                        <span className="save-badge">Save {bundle.savingsPercent}%</span>
                      </div>

                      <h4 className="bundle-title">{bundle.bundleTitle}</h4>
                      <span className="delivery-window-sub">Pickup: <strong>{bundle.deliveryWindow}</strong></span>

                      <div className="bundle-pricing-row">
                        <div>
                          <span className="lbl-muted">Standalone Total:</span>
                          <span className="cross-price">₹{bundle.standaloneValue}</span>
                        </div>
                        <div>
                          <span className="lbl-muted">Bundled Package:</span>
                          <span className="bundled-price">₹{bundle.bundledPrice}</span>
                        </div>
                      </div>

                      <div className="bundle-inclusions-list">
                        {bundle.inclusions.map((inc, i) => (
                          <span key={i} className="inc-line">✓ {inc}</span>
                        ))}
                      </div>

                      <button 
                        type="button" 
                        className={`btn-action-sm ${isBooked ? 'accepted-btn' : ''}`}
                        style={{ width: '100%', padding: '10px' }}
                        disabled={isBooked}
                        onClick={() => handleBookBundle(bundle.id)}
                      >
                        {isBooked ? '✓ Phlebotomist & Doctor Scheduled' : 'Book Hybrid Bundle (₹' + bundle.bundledPrice + ')'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL: POST REVERSE BIDDING REQUIREMENT                               */}
        {/* ==================================================================== */}
        {isNewBidModal && (
          <div className="hub-modal-backdrop" onClick={() => setIsNewBidModal(false)}>
            <div className="hub-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h4>Post Treatment Requirement & Target Budget</h4>
                <button className="close-btn" onClick={() => setIsNewBidModal(false)}>✕</button>
              </div>

              <form onSubmit={handleCreateBid} className="hub-form">
                <div className="form-group">
                  <label>Treatment or Procedure Required</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Root Canal Treatment, Knee Arthroscopy, MRI Lumbar Spine..."
                    value={newBidForm.treatmentTitle}
                    onChange={(e) => setNewBidForm({ ...newBidForm, treatmentTitle: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Department</label>
                    <select 
                      value={newBidForm.specialty}
                      onChange={(e) => setNewBidForm({ ...newBidForm, specialty: e.target.value })}
                      className="clean-select"
                    >
                      <option value="Dentistry">Dentistry</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology / Radiology">Neurology / Radiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="General Surgery">General Surgery</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Target Budget (₹)</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="e.g. 7500"
                      value={newBidForm.targetBudget}
                      onChange={(e) => setNewBidForm({ ...newBidForm, targetBudget: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Urgency Level</label>
                  <select 
                    value={newBidForm.urgency}
                    onChange={(e) => setNewBidForm({ ...newBidForm, urgency: e.target.value })}
                    className="clean-select"
                  >
                    <option value="Immediate / 24 Hours">Immediate / Within 24 Hours</option>
                    <option value="Moderate (Next 3-5 Days)">Moderate (Next 3-5 Days)</option>
                    <option value="Flexible (Within 2 Weeks)">Flexible (Within 2 Weeks)</option>
                  </select>
                </div>

                <div className="bid-explainer-note">
                  <ShieldCheck size={16} color="#00a8cc" />
                  <span>Nearby clinics receive this anonymously and counter with competitive all-inclusive packages. You choose who to accept.</span>
                </div>

                <button type="submit" className="btn-primary-teal" style={{ width: '100%', marginTop: '10px' }}>
                  Broadcast Requirement to Verified Clinics
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL: UPLOAD PEER BILL                                               */}
        {/* ==================================================================== */}
        {isUploadBillModal && (
          <div className="hub-modal-backdrop" onClick={() => setIsUploadBillModal(false)}>
            <div className="hub-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h4>Upload Anonymized Medical Bill for Community Audit</h4>
                <button className="close-btn" onClick={() => setIsUploadBillModal(false)}>✕</button>
              </div>

              <form onSubmit={handleUploadBill} className="hub-form">
                <div className="form-group">
                  <label>Procedure or Treatment Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., Cataract Surgery, Angiography, Appendectomy..."
                    value={newBillForm.procedureName}
                    onChange={(e) => setNewBillForm({ ...newBillForm, procedureName: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Hospital or Clinic Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Max Hospital, Fortis, Apollo..."
                      value={newBillForm.hospitalName}
                      onChange={(e) => setNewBillForm({ ...newBillForm, hospitalName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Total Amount Paid (₹)</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="e.g. 18500"
                      value={newBillForm.amountPaid}
                      onChange={(e) => setNewBillForm({ ...newBillForm, amountPaid: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Patient Experience Notes / Consumables Transparency</label>
                  <textarea 
                    rows={3}
                    placeholder="Were there hidden charges? Did insurance pay cashless? How was the service?"
                    value={newBillForm.notes}
                    onChange={(e) => setNewBillForm({ ...newBillForm, notes: e.target.value })}
                  />
                </div>

                <div className="upload-reward-callout">
                  <Coins size={18} color="#d97706" />
                  <span>You will receive <strong>+50 MedBridge HealthCredits (₹50)</strong> upon submission. All patient identifiable info is permanently redacted.</span>
                </div>

                <button type="submit" className="btn-primary-teal" style={{ width: '100%', marginTop: '10px' }}>
                  Verify & Earn +50 HealthCredits
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL: SECOND OPINION REQUEST                                        */}
        {/* ==================================================================== */}
        {secondOpinionSelected && (
          <div className="hub-modal-backdrop" onClick={() => setSecondOpinionSelected(null)}>
            <div className="hub-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h4>24h Written Second Opinion with {secondOpinionSelected.doctorName}</h4>
                <button className="close-btn" onClick={() => setSecondOpinionSelected(null)}>✕</button>
              </div>

              {secondOpinionSubmitted ? (
                <div className="so-success-state">
                  <CheckCircle2 size={44} color="#059669" />
                  <h4>Medical Files Uploaded</h4>
                  <p>Dr. {secondOpinionSelected.doctorName} has been assigned. Your written clinical opinion will be uploaded to your patient portal within 24 hours.</p>
                  <button className="btn-outline-teal" onClick={() => setSecondOpinionSelected(null)}>
                    Done
                  </button>
                </div>
              ) : (
                <div className="hub-form">
                  <div className="so-doc-mini">
                    <strong>{secondOpinionSelected.doctorName}</strong> ({secondOpinionSelected.specialty})
                    <span>Fixed Fee: ₹{secondOpinionSelected.fixedFee} • Guaranteed 24h Turnaround</span>
                  </div>

                  <div className="form-group">
                    <label>Upload Clinical Scans / Reports (PDF, JPG, DICOM)</label>
                    <div className="drag-upload-box">
                      <FileText size={24} color="#00a8cc" />
                      <span>Drag diagnostic reports here or click to browse</span>
                      <small>MRI, CT, Biopsy, Blood reports supported (Max 25MB)</small>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Specific Questions for the Specialist</label>
                    <textarea 
                      rows={2} 
                      placeholder="e.g. Is immediate surgery required or can medical therapy be tried first?"
                    />
                  </div>

                  <button 
                    type="button" 
                    className="btn-primary-teal" 
                    style={{ width: '100%' }}
                    onClick={() => {
                      setSecondOpinionSubmitted(true);
                    }}
                  >
                    Confirm & Lock 24h Review (₹{secondOpinionSelected.fixedFee})
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .smart-marketplace-root {
          padding: 56px 0 64px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .hub-header-area {
          text-align: left;
          margin-bottom: 32px;
        }

        .hub-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .clean-pill-badge {
          background: #00a8cc;
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .clean-pill-sub {
          background: #eef8fa;
          color: #0e8192;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 9999px;
          border: 1px solid #bee3ea;
        }

        .hub-title {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 2.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .hub-subtitle {
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 1rem;
          color: #64748b;
          max-width: 780px;
          line-height: 1.6;
        }

        /* 4 Tabs Bar */
        .hub-tabs-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          padding: 6px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          margin-bottom: 32px;
          overflow-x: auto;
        }

        .hub-tab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          background: transparent;
          border: none;
          font-size: 0.88rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .hub-tab-button:hover {
          color: #0f172a;
          background: #f8fafc;
        }

        .hub-tab-button.active {
          background: #00a8cc;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 168, 204, 0.25);
        }

        /* Pane Intro */
        .pane-intro-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }
        .pane-intro-row h3 {
          font-size: 1.35rem;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .pane-intro-row p {
          font-size: 0.9rem;
          color: #64748b;
        }

        /* Sub Modules */
        .sub-module-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
        }

        .sub-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .sub-label {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
        }
        .text-muted-xs {
          font-size: 0.8rem;
          color: #64748b;
        }

        /* Bids Grid */
        .bids-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .bid-card {
          padding: 20px;
          border: 1px solid #e2e8f0;
        }

        .bid-card-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 14px;
          margin-bottom: 14px;
        }

        .bid-title {
          font-size: 1.05rem;
          color: #0f172a;
          margin: 6px 0 4px;
        }

        .bid-meta-sub {
          font-size: 0.78rem;
          color: #64748b;
        }

        .budget-target-box {
          text-align: right;
          background: #eef8fa;
          padding: 6px 12px;
          border-radius: 10px;
          border: 1px solid #bee3ea;
        }
        .target-lbl {
          display: block;
          font-size: 0.68rem;
          color: #0e8192;
          font-weight: 600;
        }
        .target-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: #00a8cc;
        }

        .offers-header-lbl {
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 10px;
          display: block;
        }

        .offers-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .offer-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.15s ease;
        }
        .offer-item:hover {
          border-color: #00a8cc;
          background: #ffffff;
        }
        .offer-item.accepted {
          border-color: #059669;
          background: #f0fdf4;
        }

        .offer-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .offer-clinic-name strong {
          font-size: 0.88rem;
          color: #0f172a;
        }
        .doctor-sub {
          display: block;
          font-size: 0.74rem;
          color: #64748b;
        }

        .offer-inclusions {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 3px;
        }
        .inc-chip {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          font-size: 0.68rem;
          padding: 2px 6px;
          border-radius: 4px;
          color: #475569;
        }

        .turnaround-tag {
          font-size: 0.72rem;
          color: #00a8cc;
          font-weight: 600;
        }

        .offer-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .offer-price-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
        }

        .guarantee-chip {
          font-size: 0.65rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Offpeak Happy hours */
        .offpeak-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .offpeak-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .offpeak-time {
          font-size: 0.8rem;
          font-weight: 700;
          color: #00a8cc;
        }
        .offpeak-discount {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
        }
        .offpeak-desc {
          font-size: 0.82rem;
          color: #64748b;
        }
        .offpeak-sample {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 6px 0;
        }
        .regular-price {
          font-size: 0.8rem;
          text-decoration: line-through;
          color: #94a3b8;
        }
        .happy-price {
          font-size: 0.95rem;
          font-weight: 800;
          color: #059669;
        }

        /* Surgery Pooling */
        .pools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .pool-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .pool-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .pool-save-pill {
          font-size: 0.72rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 9999px;
        }
        .pool-title {
          font-size: 1rem;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        .pool-hospital {
          font-size: 0.78rem;
          color: #64748b;
          margin-bottom: 12px;
        }
        .pool-pricing-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 10px;
          background: #f8fafc;
          border-radius: 8px;
          margin-bottom: 14px;
        }
        .cross-price {
          display: block;
          font-size: 0.8rem;
          text-decoration: line-through;
          color: #94a3b8;
        }
        .pooled-price {
          display: block;
          font-size: 1rem;
          font-weight: 800;
          color: #00a8cc;
        }
        .pool-progress-wrap {
          margin-bottom: 14px;
        }
        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.74rem;
          color: #475569;
          margin-bottom: 4px;
        }
        .progress-track {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 9999px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #00a8cc;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }
        .pool-status-note {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          color: #d97706;
          margin-top: 4px;
        }
        .pool-inclusions-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
          flex: 1;
        }
        .inc-dot {
          font-size: 0.74rem;
          color: #64748b;
        }
        .btn-pool-join {
          background: #00a8cc;
          color: #ffffff;
          padding: 10px;
          border-radius: 9999px;
          border: none;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-pool-join:hover {
          background: #0092b3;
        }
        .btn-pool-join.joined {
          background: #059669;
        }

        /* Estimator Styling */
        .estimator-selector-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
          overflow-x: auto;
        }
        .proc-pill-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .proc-pill-btn.active {
          background: #00a8cc;
          color: #ffffff;
          border-color: #00a8cc;
        }

        .estimator-card {
          padding: 24px;
        }
        .estimator-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 18px;
          margin-bottom: 18px;
        }
        .proc-main-title {
          font-size: 1.35rem;
          color: #0f172a;
          margin: 6px 0 2px;
        }
        .proc-hospital-name {
          font-size: 0.86rem;
          color: #64748b;
        }
        .pricing-caps-box {
          display: flex;
          gap: 24px;
          text-align: right;
        }
        .cap-item {
          display: flex;
          flex-direction: column;
        }
        .cap-label {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 500;
        }
        .cap-strike {
          font-size: 1.1rem;
          text-decoration: line-through;
          color: #94a3b8;
        }
        .cap-guaranteed {
          font-size: 1.5rem;
          font-weight: 800;
          color: #00a8cc;
        }

        .guarantee-and-emi-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #eef8fa;
          border: 1px solid #bee3ea;
          border-radius: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .guarantee-status-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .guarantee-status-left strong {
          display: block;
          font-size: 0.82rem;
          color: #059669;
        }
        .guarantee-status-left span {
          display: block;
          font-size: 0.74rem;
          color: #065f46;
        }
        .emi-tag-right {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #0e8192;
        }

        .itemized-toggle-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .toggle-text-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          cursor: pointer;
        }
        .transparency-pill {
          font-size: 0.7rem;
          font-weight: 600;
          color: #00a8cc;
          background: #eef8fa;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .clean-itemized-table, .clean-matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .clean-itemized-table th, .clean-matrix-table th {
          text-align: left;
          padding: 10px 12px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          color: #475569;
          font-weight: 600;
        }
        .clean-itemized-table td, .clean-matrix-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
        }
        .text-muted-cell {
          color: #64748b;
          font-size: 0.8rem;
        }

        /* Peer Bills Grid */
        .peer-bills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .peer-bill-card {
          padding: 18px;
          display: flex;
          flex-direction: column;
        }
        .bill-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .verified-stamp {
          font-size: 0.68rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .bill-proc-title {
          font-size: 0.98rem;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .bill-hosp {
          font-size: 0.76rem;
          color: #64748b;
          margin-bottom: 10px;
        }
        .bill-amounts-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 10px;
          background: #f8fafc;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .verified-price {
          display: block;
          font-size: 0.95rem;
          font-weight: 800;
          color: #059669;
        }
        .bill-review-text {
          font-size: 0.8rem;
          color: #475569;
          font-style: italic;
          margin-bottom: 10px;
          line-height: 1.45;
          flex: 1;
        }
        .bill-date-footer {
          font-size: 0.7rem;
          color: #94a3b8;
        }

        /* Queue Telemetry */
        .doc-select-pills {
          display: flex;
          gap: 6px;
        }
        .queue-doc-pill {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 9999px;
          cursor: pointer;
        }
        .queue-doc-pill.active {
          background: #00a8cc;
          color: #ffffff;
          border-color: #00a8cc;
        }

        .telemetry-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 20px;
          padding: 6px;
        }
        .telemetry-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .telemetry-lbl {
          font-size: 0.74rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .token-giant-number {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 2.8rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 6px;
        }
        .token-giant-number.teal {
          color: #00a8cc;
        }
        .token-status-pill {
          font-size: 0.78rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .telemetry-sub-info {
          font-size: 0.74rem;
          color: #64748b;
        }
        .token-eta-text {
          font-size: 0.82rem;
          color: #334155;
          margin-bottom: 4px;
        }
        .token-wait-clock {
          font-size: 0.74rem;
          color: #64748b;
        }

        .delay-info-alert {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          color: #0e8192;
          background: #eef8fa;
          padding: 8px;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .sms-toggle-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: #475569;
        }

        /* Escrow */
        .escrow-action-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          padding: 10px;
        }
        .escrow-steps-list {
          list-style: none;
          padding: 0;
          margin: 12px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.84rem;
          color: #334155;
        }
        .escrow-fee-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 12px;
          background: #f8fafc;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-top: 10px;
        }
        .escrow-success-box {
          text-align: center;
          padding: 24px;
        }
        .escrow-details-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
          margin: 16px 0;
          text-align: left;
          font-size: 0.8rem;
        }
        .escrow-details-row span {
          display: block;
          color: #64748b;
          font-size: 0.72rem;
        }
        .code-text {
          color: #00a8cc;
          font-family: monospace;
          font-size: 0.95rem;
        }
        .escrow-note {
          font-size: 0.82rem;
          color: #475569;
          margin-bottom: 16px;
        }

        /* AI Symptom Matcher */
        .matcher-card {
          padding: 20px;
        }

        .matcher-quick-categories {
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
        }

        .quick-cat-label {
          display: block;
          font-size: 0.74rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 6px;
        }

        .quick-cat-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .quick-cat-pill {
          padding: 5px 11px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.74rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .quick-cat-pill:hover {
          background: #eef8fa;
          border-color: #00a8cc;
          color: #0891b2;
          transform: translateY(-1px);
        }

        .matcher-inputs-row {
          display: flex;
          gap: 14px;
          align-items: flex-end;
          margin-bottom: 16px;
        }
        .matcher-input-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .flex-2 { flex: 2; }
        .flex-1 { flex: 1; }
        .matcher-input-field label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
        }
        .matcher-input-field input, .clean-select {
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.86rem;
          outline: none;
          background: #ffffff;
        }
        .matcher-submit-btn {
          padding: 10px 20px;
          height: 38px;
        }

        .match-banner {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: #eef8fa;
          border-radius: 8px;
          font-size: 0.82rem;
          color: #0e8192;
          margin-bottom: 12px;
        }
        .matched-doctors-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .matched-doctor-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
        }
        .doc-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }
        .doc-info-col {
          flex: 1;
        }
        .doc-info-col strong {
          display: block;
          font-size: 0.88rem;
          color: #0f172a;
        }
        .specialty-sub {
          display: block;
          font-size: 0.72rem;
          color: #64748b;
        }
        .hosp-name {
          font-size: 0.68rem;
          color: #94a3b8;
        }
        .doc-fee-col {
          text-align: right;
        }
        .fee-tag {
          display: block;
          font-size: 0.95rem;
          font-weight: 800;
          color: #00a8cc;
          margin-bottom: 4px;
        }

        /* Second Opinion */
        .second-opinion-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .second-opinion-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .so-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .so-fee {
          font-size: 0.95rem;
          font-weight: 800;
          color: #00a8cc;
        }
        .so-name {
          font-size: 1.05rem;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .so-cred {
          font-size: 0.74rem;
          color: #64748b;
          margin-bottom: 2px;
        }
        .so-hosp {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-bottom: 12px;
        }
        .so-suitable {
          flex: 1;
        }
        .chips-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 4px;
        }
        .so-chip {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 6px;
          color: #475569;
        }

        /* Bundles Grid */
        .bundles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .bundle-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .bundle-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .save-badge {
          background: #ecfdf5;
          color: #059669;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
        }
        .bundle-title {
          font-size: 1.05rem;
          color: #0f172a;
          margin-bottom: 4px;
          line-height: 1.35;
        }
        .delivery-window-sub {
          font-size: 0.74rem;
          color: #64748b;
          margin-bottom: 12px;
        }
        .bundle-pricing-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 10px;
          background: #f8fafc;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .bundled-price {
          display: block;
          font-size: 1.15rem;
          font-weight: 800;
          color: #00a8cc;
        }
        .bundle-inclusions-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 16px;
          flex: 1;
        }
        .inc-line {
          font-size: 0.74rem;
          color: #475569;
          line-height: 1.4;
        }

        /* Common Elements */
        .badge-tag-cyan {
          background: #eef8fa;
          color: #0e8192;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
        }
        .badge-tag-green {
          background: #ecfdf5;
          color: #059669;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
        }
        .badge-tag-purple {
          background: #f5f3ff;
          color: #7c3aed;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
        }
        .badge-tag-red {
          background: #fef2f2;
          color: #dc2626;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .btn-primary-teal {
          background: #00a8cc;
          color: #ffffff;
          padding: 9px 18px;
          border-radius: 9999px;
          border: none;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-primary-teal:hover {
          background: #0092b3;
        }

        .btn-outline-teal {
          background: transparent;
          color: #00a8cc;
          border: 1px solid #00a8cc;
          padding: 7px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.15s;
        }
        .btn-outline-teal:hover {
          background: #eef8fa;
        }

        .btn-action-sm {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-action-sm:hover {
          background: #1e293b;
        }
        .btn-action-sm.accepted-btn {
          background: #059669;
          cursor: default;
        }

        /* Modal Backdrop */
        .hub-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 20px;
        }
        .hub-modal-card {
          background: #ffffff;
          border-radius: 18px;
          width: 100%;
          max-width: 520px;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .modal-head h4 {
          font-size: 1.15rem;
          color: #0f172a;
        }
        .close-btn {
          background: transparent;
          border: none;
          font-size: 1.1rem;
          color: #94a3b8;
          cursor: pointer;
        }

        .hub-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: left;
        }
        .form-group label {
          font-size: 0.76rem;
          font-weight: 700;
          color: #334155;
        }
        .form-group input, .form-group textarea {
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.86rem;
          outline: none;
        }
        .bid-explainer-note, .upload-reward-callout {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          border-radius: 8px;
          font-size: 0.78rem;
          line-height: 1.4;
        }
        .bid-explainer-note {
          background: #eef8fa;
          color: #0e8192;
        }
        .upload-reward-callout {
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
        }
        .drag-upload-box {
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .drag-upload-box span {
          font-size: 0.84rem;
          color: #334155;
          font-weight: 600;
        }
        .drag-upload-box small {
          font-size: 0.72rem;
          color: #94a3b8;
        }
        .so-doc-mini {
          padding: 10px;
          background: #f8fafc;
          border-radius: 8px;
          font-size: 0.82rem;
          display: flex;
          flex-direction: column;
        }
        .so-success-state {
          text-align: center;
          padding: 24px 10px;
        }
        .so-success-state h4 {
          font-size: 1.25rem;
          color: #0f172a;
          margin: 12px 0 6px;
        }
        .so-success-state p {
          font-size: 0.86rem;
          color: #64748b;
          margin-bottom: 16px;
        }

        @media (max-width: 990px) {
          .bids-grid, .pools-grid, .peer-bills-grid, .second-opinion-grid, .bundles-grid {
            grid-template-columns: 1fr;
          }
          .telemetry-grid {
            grid-template-columns: 1fr;
          }
          .offpeak-grid, .escrow-action-grid, .matched-doctors-list {
            grid-template-columns: 1fr;
          }
          .matcher-inputs-row {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </section>
  );
}
