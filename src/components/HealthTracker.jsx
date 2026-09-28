import React, { useState } from 'react';
import { 
  Clock, 
  Pill, 
  Plus, 
  Check, 
  Flame, 
  Droplet, 
  Heart, 
  Activity, 
  Coins, 
  Calendar,
  AlertCircle,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Percent,
  Sparkles,
  ChevronRight,
  DollarSign
} from 'lucide-react';

export default function HealthTracker({ 
  userState, 
  onToggleReminder, 
  onAddReminder, 
  onAddWater,
  onOpenCreditModal,
  onNavigate
}) {
  const [activeSubTab, setActiveSubTab] = useState('wealth'); // 'wealth' | 'routine' | 'savings'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('Morning');
  const [newTime, setNewTime] = useState('09:00 AM');

  // Transaction Ledger Data
  const [transactions] = useState([
    {
      id: 'tx-1',
      title: 'Consultation Reward (Cardiology)',
      facility: 'Dr. Rajesh Vardhan • Apollo City',
      date: 'Today, 11:45 AM',
      type: 'earned',
      amount: 75,
      balanceAfter: userState.healthCredits
    },
    {
      id: 'tx-2',
      title: '7-Day Routine Consistency Streak',
      facility: 'Daily Medication & Hydration Logging',
      date: 'Yesterday, 09:30 PM',
      type: 'earned',
      amount: 10,
      balanceAfter: userState.healthCredits - 75
    },
    {
      id: 'tx-3',
      title: 'Jan Aushadhi Prescription Payment',
      facility: 'Kendra #104 • South Extension',
      date: '25 Sep 2026',
      type: 'spent',
      amount: 150,
      balanceAfter: userState.healthCredits - 85
    },
    {
      id: 'tx-4',
      title: 'Welcome Healthcare Wallet Credit',
      facility: 'MedBridge Digital Health Onboarding',
      date: '20 Sep 2026',
      type: 'earned',
      amount: 50,
      balanceAfter: 50
    }
  ]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    onAddReminder({
      id: `rem-${Date.now()}`,
      name: newMedName,
      dosage: newDosage || '1 Tablet',
      timeSlot: newTimeSlot,
      time: newTime,
      takenToday: false
    });

    setNewMedName('');
    setNewDosage('');
    setShowAddModal(false);
  };

  const handleToggle = (id) => {
    onToggleReminder(id);
  };

  const waterPercent = Math.min(100, Math.round((userState.vitals.waterIntakeLiters / userState.vitals.waterGoalLiters) * 100));

  return (
    <section className="health-wealth-tracker-section">
      <div className="container">
        {/* Header Banner */}
        <div className="tracker-top-banner clean-card">
          <div className="banner-left-info">
            <span className="badge badge-amber" style={{ marginBottom: '8px' }}>
              <Coins size={13} color="#b45309" />
              <span>Personal Health & Wealth Tracking Hub</span>
            </span>
            <h2>Healthcare Savings & Wealth Ledger</h2>
            <p>
              Track your out-of-pocket medical savings, earn spendable <strong>HealthCredits</strong> on verified doctor visits and daily adherence streaks, and monitor your vital health habits in real time.
            </p>
          </div>

          <div className="balance-highlight-box">
            <span className="bh-label">Spendable HealthCredits</span>
            <div className="bh-amount-row">
              <Coins size={30} color="#d97706" />
              <span className="bh-number">{userState.healthCredits}</span>
              <span className="bh-curr">Credits</span>
            </div>
            <span className="bh-valuation">
              = <strong>₹{userState.healthCredits}.00 INR</strong> Cashless Medical Balance
            </span>
            <button 
              type="button" 
              className="bh-redeem-btn"
              onClick={onOpenCreditModal}
            >
              <span>Redeem & Ledger Details</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Wealth Navigation Pills */}
        <div className="tracker-tab-pills">
          <button 
            type="button" 
            className={`tracker-tab-pill ${activeSubTab === 'wealth' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('wealth')}
          >
            <Wallet size={16} />
            <span>HealthCredits & Savings Ledger</span>
          </button>

          <button 
            type="button" 
            className={`tracker-tab-pill ${activeSubTab === 'routine' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('routine')}
          >
            <Clock size={16} />
            <span>Daily Medication & Habits ({userState.medReminders.length})</span>
          </button>

          <button 
            type="button" 
            className={`tracker-tab-pill ${activeSubTab === 'savings' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('savings')}
          >
            <TrendingUp size={16} />
            <span>Generic Savings & Credit Rules</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: HEALTHCREDITS & WEALTH SAVINGS LEDGER
            ======================================================== */}
        {activeSubTab === 'wealth' && (
          <div className="wealth-tab-view">
            {/* 4 Financial Metric Cards */}
            <div className="wealth-grid-four">
              <div className="metric-card clean-card">
                <div className="metric-header">
                  <div className="m-icon-box gold">
                    <Coins size={20} color="#d97706" />
                  </div>
                  <span className="m-tag gold">Total Balance</span>
                </div>
                <div className="m-body">
                  <span className="m-value">₹{userState.healthCredits}</span>
                  <span className="m-sub">1 Credit = ₹1 INR Cashless Value</span>
                </div>
                <div className="m-footer">
                  <span>Available for Jan Aushadhi & OPD slots</span>
                </div>
              </div>

              <div className="metric-card clean-card">
                <div className="metric-header">
                  <div className="m-icon-box green">
                    <TrendingUp size={20} color="#059669" />
                  </div>
                  <span className="m-tag green">Saved This Month</span>
                </div>
                <div className="m-body">
                  <span className="m-value">₹1,840</span>
                  <span className="m-sub">Across Generic Meds & Off-Peak OPD</span>
                </div>
                <div className="m-footer">
                  <span className="text-green">↑ 34% more savings than last month</span>
                </div>
              </div>

              <div className="metric-card clean-card">
                <div className="metric-header">
                  <div className="m-icon-box purple">
                    <ShieldCheck size={20} color="#7c3aed" />
                  </div>
                  <span className="m-tag purple">Verified Visits</span>
                </div>
                <div className="m-body">
                  <span className="m-value">{userState.completedTreatments} Consults</span>
                  <span className="m-sub">+₹225 Credits Earned Directly</span>
                </div>
                <div className="m-footer">
                  <span>Earns +₹75 per completed doctor visit</span>
                </div>
              </div>

              <div className="metric-card clean-card">
                <div className="metric-header">
                  <div className="m-icon-box orange">
                    <Flame size={20} color="#ea580c" />
                  </div>
                  <span className="m-tag orange">Adherence Streak</span>
                </div>
                <div className="m-body">
                  <span className="m-value">{userState.vitals.streakDays} Days</span>
                  <span className="m-sub">+10 Credits Daily Bonus Active</span>
                </div>
                <div className="m-footer">
                  <span>Next bonus in 6 hours upon evening dose</span>
                </div>
              </div>
            </div>

            {/* Split Row: Savings Breakdown + Transaction Ledger */}
            <div className="wealth-split-row">
              {/* Savings Breakdown by Source */}
              <div className="wealth-breakdown-card clean-card">
                <div className="wb-header">
                  <div>
                    <h3>Where You Saved Medical Money</h3>
                    <p className="text-muted-xs">Out-of-pocket healthcare expense optimizations</p>
                  </div>
                  <span className="badge badge-teal">Live Telemetry</span>
                </div>

                <div className="savings-items-list">
                  <div className="savings-item-row">
                    <div className="si-icon-box teal">
                      <Pill size={18} color="#0891b2" />
                    </div>
                    <div className="si-details">
                      <strong>Jan Aushadhi Generic Medicine Substitutions</strong>
                      <span>Bought generic Paracetamol, Amoxicillin & Metformin</span>
                    </div>
                    <div className="si-amounts">
                      <span className="si-saved-val">+₹980 Saved</span>
                      <span className="si-saved-pct">82% vs Private MRP</span>
                    </div>
                  </div>

                  <div className="savings-item-row">
                    <div className="si-icon-box green">
                      <Clock size={18} color="#059669" />
                    </div>
                    <div className="si-details">
                      <strong>Off-Peak "Happy Hour" OPD Discounts</strong>
                      <span>Booked 2 afternoon doctor slots (02:30 PM - 04:00 PM)</span>
                    </div>
                    <div className="si-amounts">
                      <span className="si-saved-val">+₹510 Saved</span>
                      <span className="si-saved-pct">35% Flat Discount</span>
                    </div>
                  </div>

                  <div className="savings-item-row">
                    <div className="si-icon-box gold">
                      <Coins size={18} color="#d97706" />
                    </div>
                    <div className="si-details">
                      <strong>HealthCredits Redemptions at Checkout</strong>
                      <span>Cashless bill deductions from completed visit rewards</span>
                    </div>
                    <div className="si-amounts">
                      <span className="si-saved-val">+₹350 Paid via Credits</span>
                      <span className="si-saved-pct">100% Cashless</span>
                    </div>
                  </div>
                </div>

                <div className="total-savings-summary-bar">
                  <span>Total Cumulative Out-of-Pocket Savings:</span>
                  <strong className="text-teal">₹1,840 INR</strong>
                </div>
              </div>

              {/* Transaction Ledger */}
              <div className="transaction-ledger-card clean-card">
                <div className="wb-header">
                  <div>
                    <h3>HealthCredits Transaction Ledger</h3>
                    <p className="text-muted-xs">Recent wallet activity & rewards log</p>
                  </div>
                  <button 
                    type="button" 
                    className="view-full-ledger-btn"
                    onClick={onOpenCreditModal}
                  >
                    View All
                  </button>
                </div>

                <div className="ledger-items-list">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="ledger-item-row">
                      <div className={`tx-icon ${tx.type === 'earned' ? 'earned' : 'spent'}`}>
                        {tx.type === 'earned' ? (
                          <ArrowDownLeft size={16} color="#059669" />
                        ) : (
                          <ArrowUpRight size={16} color="#dc2626" />
                        )}
                      </div>

                      <div className="tx-info-col">
                        <strong>{tx.title}</strong>
                        <span className="tx-meta">{tx.facility} • {tx.date}</span>
                      </div>

                      <div className="tx-amount-col">
                        <span className={`tx-val ${tx.type === 'earned' ? 'positive' : 'negative'}`}>
                          {tx.type === 'earned' ? `+${tx.amount}` : `-${tx.amount}`} Cr
                        </span>
                        <span className="tx-sub">Bal: {tx.balanceAfter}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ledger-footer-actions">
                  <button 
                    type="button" 
                    className="btn-teal-outline"
                    onClick={() => onNavigate && onNavigate('solutions')}
                  >
                    <span>Book Doctor Slot (+75 Cr)</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn-teal"
                    onClick={() => onNavigate && onNavigate('medicines')}
                  >
                    <span>Jan Aushadhi Radar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: DAILY MEDICATION SCHEDULE & HABIT WEALTH
            ======================================================== */}
        {activeSubTab === 'routine' && (
          <div className="routine-tab-view">
            {/* Vitals Summary Strip */}
            <div className="clean-vitals-row">
              {/* Routine Streak */}
              <div className="clean-vital-card clean-card">
                <div className="v-icon-box orange">
                  <Flame size={22} color="#b45309" />
                </div>
                <div className="v-content-area">
                  <span className="v-label">Adherence Streak</span>
                  <div className="v-value-wrap">
                    <span className="v-num">{userState.vitals.streakDays} Days</span>
                    <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Active</span>
                  </div>
                  <span className="v-hint">+10 HealthCredits daily consistency bonus</span>
                </div>
              </div>

              {/* Water Intake */}
              <div className="clean-vital-card clean-card">
                <div className="v-icon-box blue">
                  <Droplet size={22} color="#0284c7" />
                </div>
                <div className="v-content-area" style={{ flex: 1 }}>
                  <div className="water-title-line">
                    <span className="v-label">Daily Hydration</span>
                    <button className="add-cup-btn" onClick={onAddWater}>
                      +250 ml
                    </button>
                  </div>
                  <div className="v-value-wrap">
                    <span className="v-num">{userState.vitals.waterIntakeLiters.toFixed(1)}L</span>
                    <span className="v-goal">/ {userState.vitals.waterGoalLiters}L Goal</span>
                  </div>
                  <div className="clean-progress-wrap">
                    <div className="clean-progress-fill" style={{ width: `${waterPercent}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Blood Pressure */}
              <div className="clean-vital-card clean-card">
                <div className="v-icon-box red">
                  <Heart size={22} color="#dc2626" />
                </div>
                <div className="v-content-area">
                  <span className="v-label">Blood Pressure</span>
                  <div className="v-value-wrap">
                    <span className="v-num">{userState.vitals.bloodPressure}</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Normal</span>
                  </div>
                  <span className="v-hint">Synchronized from recent clinic visit</span>
                </div>
              </div>
            </div>

            {/* Prescriptions Checklist */}
            <div className="schedule-panel-clean clean-card">
              <div className="schedule-top-bar">
                <div className="schedule-heading">
                  <Clock size={18} color="#0891b2" />
                  <h3>Today's Prescribed Dosage Schedule</h3>
                </div>

                <button className="btn-teal add-alert-btn" onClick={() => setShowAddModal(true)}>
                  <Plus size={15} />
                  <span>Add Medicine Reminder</span>
                </button>
              </div>

              <div className="clean-pills-list">
                {userState.medReminders.map((rem) => (
                  <div 
                    key={rem.id} 
                    className={`clean-pill-row ${rem.takenToday ? 'completed' : ''}`}
                    onClick={() => handleToggle(rem.id)}
                  >
                    <div className="checkbox-wrap">
                      <div className={`clean-check ${rem.takenToday ? 'checked' : ''}`}>
                        {rem.takenToday && <Check size={13} strokeWidth={3} />}
                      </div>
                    </div>

                    <div className="pill-text-col">
                      <div className="p-title-row">
                        <h4>{rem.name}</h4>
                        <span className="clean-dose-badge">{rem.dosage}</span>
                      </div>
                      <div className="p-time-row">
                        <Clock size={11} />
                        <span>{rem.timeSlot} • <strong>{rem.time}</strong></span>
                      </div>
                    </div>

                    <div className="p-status-col">
                      {rem.takenToday ? (
                        <span className="badge badge-emerald">✓ Completed (+10 Cr)</span>
                      ) : (
                        <span className="badge badge-slate">Mark Taken (+10 Cr)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="schedule-advisory-clean">
                <AlertCircle size={14} color="#0891b2" />
                <span>Marking prescribed doses on time updates your habit streak and awards +10 HealthCredits daily.</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: GENERIC SAVINGS & MUTUAL VALUE RULES
            ======================================================== */}
        {activeSubTab === 'savings' && (
          <div className="savings-tab-view">
            <div className="rules-cards-grid">
              <div className="rule-card-item clean-card">
                <div className="rc-badge gold">Rule 1</div>
                <h4>Complete Verified Treatments</h4>
                <p>
                  Every time you complete an appointment with any verified specialist (Cardiologist, Dermatologist, Orthopedic, etc.), your wallet receives <strong>+₹75 HealthCredits</strong> and your doctor earns <strong>+30 TrustScore</strong> points.
                </p>
                <div className="rc-footer-tag">Outcome-Linked Health Economy</div>
              </div>

              <div className="rule-card-item clean-card">
                <div className="rc-badge teal">Rule 2</div>
                <h4>Maintain Daily Adherence Streaks</h4>
                <p>
                  Taking your prescribed medications on time and hitting your daily hydration goal gives you <strong>+10 HealthCredits every day</strong>. Consistent patients save more on long-term healthcare bills.
                </p>
                <div className="rc-footer-tag">Habit-Based Wealth Generation</div>
              </div>

              <div className="rule-card-item clean-card">
                <div className="rc-badge green">Rule 3</div>
                <h4>1:1 Cashless Spendability</h4>
                <p>
                  HealthCredits are not locked loyalty points. They function as genuine <strong>1:1 Indian Rupee equivalents</strong> (1 Credit = ₹1 INR) usable against any consultation fee, lab test, or Jan Aushadhi generic medicine bill.
                </p>
                <div className="rc-footer-tag">Guaranteed Zero Hidden Fees</div>
              </div>
            </div>

            {/* Price Comparison Showcase */}
            <div className="savings-comparison-banner clean-card">
              <div className="scb-left">
                <span className="badge badge-teal">Hyperlocal Price Radar</span>
                <h3>Jan Aushadhi Generic vs Branded Private Chemist</h3>
                <p>
                  India's Pradhan Mantri Jan Aushadhi Kendras offer identical WHO-GMP certified bioequivalent molecules at up to 84% lower cost than private retail pharmacies.
                </p>
                <button 
                  type="button" 
                  className="btn-teal"
                  onClick={() => onNavigate && onNavigate('medicines')}
                >
                  <span>Open Generic Price Radar</span>
                  <ChevronRight size={15} />
                </button>
              </div>

              <div className="scb-right-matrix">
                <div className="scb-row">
                  <span>Dolo 650 (15 Tabs) vs Generic Paracetamol 650mg:</span>
                  <strong>Save 68% (₹11 vs ₹34)</strong>
                </div>
                <div className="scb-row">
                  <span>Augmentin 625 Duo vs Generic Amoxicillin + Clav:</span>
                  <strong>Save 74% (₹52 vs ₹201)</strong>
                </div>
                <div className="scb-row">
                  <span>Glycomet GP 1 vs Generic Glimepiride + Metformin:</span>
                  <strong>Save 84% (₹22 vs ₹138)</strong>
                </div>
                <div className="scb-row">
                  <span>Pan-D Capsule vs Generic Pantoprazole + Domperidone:</span>
                  <strong>Save 77% (₹35 vs ₹155)</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content-clean" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ marginBottom: '16px', fontSize: '1.3rem' }}>Add Medicine Alert</h3>

              <form onSubmit={handleAddSubmit} className="clean-add-form">
                <div className="form-item">
                  <label>Medicine / Molecule Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Paracetamol 650, Metformin 500mg"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    className="clean-field"
                  />
                </div>

                <div className="form-item">
                  <label>Dosage</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1 Tablet, 10ml syrup"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    className="clean-field"
                  />
                </div>

                <div className="form-two-cols">
                  <div className="form-item">
                    <label>Timing Slot</label>
                    <select 
                      value={newTimeSlot} 
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="clean-field"
                    >
                      <option value="Morning">Morning (Breakfast)</option>
                      <option value="Afternoon">Afternoon (Lunch)</option>
                      <option value="Evening">Evening (Snacks)</option>
                      <option value="Night">Night (Dinner / Bed)</option>
                    </select>
                  </div>

                  <div className="form-item">
                    <label>Reminder Time</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 08:30 AM"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="clean-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)} style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-teal" style={{ flex: 1 }}>
                    Save Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .health-wealth-tracker-section {
          padding: 30px 0 60px;
          background: #f8fafc;
        }

        .tracker-top-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 28px 32px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          margin-bottom: 24px;
        }

        .banner-left-info {
          max-width: 620px;
        }
        .banner-left-info h2 {
          font-size: 1.8rem;
          color: #0f172a;
          margin: 6px 0 10px 0;
          font-weight: 800;
        }
        .banner-left-info p {
          font-size: 0.92rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        .balance-highlight-box {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border: 1px solid #fde68a;
          border-radius: 16px;
          padding: 20px 24px;
          text-align: center;
          min-width: 270px;
          flex-shrink: 0;
        }
        .bh-label {
          display: block;
          font-size: 0.76rem;
          text-transform: uppercase;
          font-weight: 700;
          color: #92400e;
          letter-spacing: 0.04em;
        }
        .bh-amount-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 6px 0 2px 0;
        }
        .bh-number {
          font-size: 2.2rem;
          font-weight: 900;
          color: #78350f;
          font-family: var(--font-heading);
        }
        .bh-curr {
          font-size: 0.85rem;
          font-weight: 700;
          color: #b45309;
        }
        .bh-valuation {
          display: block;
          font-size: 0.76rem;
          color: #92400e;
          margin-bottom: 12px;
        }
        .bh-redeem-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #78350f;
          color: #ffffff;
          border: none;
          padding: 7px 14px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .bh-redeem-btn:hover {
          background: #92400e;
          transform: translateY(-1px);
        }

        /* Nav Pills */
        .tracker-tab-pills {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .tracker-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.86rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .tracker-tab-pill:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        .tracker-tab-pill.active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
        }

        /* 4 Metrics */
        .wealth-grid-four {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .metric-card {
          padding: 18px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .m-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .m-icon-box.gold { background: #fffbeb; }
        .m-icon-box.green { background: #ecfdf5; }
        .m-icon-box.purple { background: #f5f3ff; }
        .m-icon-box.orange { background: #fff7ed; }

        .m-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
        }
        .m-tag.gold { background: #fffbeb; color: #92400e; }
        .m-tag.green { background: #ecfdf5; color: #065f46; }
        .m-tag.purple { background: #f5f3ff; color: #6d28d9; }
        .m-tag.orange { background: #fff7ed; color: #9a3412; }

        .m-value {
          display: block;
          font-size: 1.55rem;
          font-weight: 800;
          color: #0f172a;
          font-family: var(--font-heading);
        }
        .m-sub {
          display: block;
          font-size: 0.74rem;
          color: #64748b;
          margin-top: 2px;
        }
        .m-footer {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
          font-size: 0.72rem;
          color: #64748b;
        }
        .text-green {
          color: #059669;
          font-weight: 600;
        }

        /* Split Row */
        .wealth-split-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 20px;
        }

        .wealth-breakdown-card, .transaction-ledger-card {
          padding: 22px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
        }

        .wb-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .wb-header h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 2px 0;
        }

        .savings-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 18px;
        }
        .savings-item-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .si-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .si-icon-box.teal { background: #eef8fa; }
        .si-icon-box.green { background: #ecfdf5; }
        .si-icon-box.gold { background: #fffbeb; }

        .si-details {
          flex: 1;
        }
        .si-details strong {
          display: block;
          font-size: 0.82rem;
          color: #0f172a;
        }
        .si-details span {
          display: block;
          font-size: 0.72rem;
          color: #64748b;
        }
        .si-amounts {
          text-align: right;
        }
        .si-saved-val {
          display: block;
          font-size: 0.84rem;
          font-weight: 700;
          color: #059669;
        }
        .si-saved-pct {
          display: block;
          font-size: 0.68rem;
          color: #0891b2;
          font-weight: 600;
        }

        .total-savings-summary-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #eef8fa;
          border-radius: 10px;
          font-size: 0.82rem;
          color: #0e7490;
          font-weight: 600;
        }
        .text-teal {
          font-size: 1.15rem;
          font-weight: 800;
          color: #00a8cc;
        }

        /* Ledger */
        .view-full-ledger-btn {
          font-size: 0.74rem;
          color: #00a8cc;
          font-weight: 700;
          background: none;
          border: none;
          cursor: pointer;
        }
        .ledger-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 18px;
        }
        .ledger-item-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 10px;
        }
        .tx-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tx-icon.earned { background: #ecfdf5; }
        .tx-icon.spent { background: #fef2f2; }

        .tx-info-col {
          flex: 1;
        }
        .tx-info-col strong {
          display: block;
          font-size: 0.8rem;
          color: #0f172a;
        }
        .tx-meta {
          display: block;
          font-size: 0.7rem;
          color: #64748b;
        }

        .tx-amount-col {
          text-align: right;
        }
        .tx-val {
          display: block;
          font-size: 0.84rem;
          font-weight: 700;
        }
        .tx-val.positive { color: #059669; }
        .tx-val.negative { color: #dc2626; }
        .tx-sub {
          display: block;
          font-size: 0.68rem;
          color: #94a3b8;
        }

        .ledger-footer-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .btn-teal-outline {
          background: #ffffff;
          border: 1px solid #00a8cc;
          color: #00a8cc;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: center;
        }
        .btn-teal-outline:hover {
          background: #eef8fa;
        }

        /* Rules Cards */
        .rules-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 24px;
        }
        .rule-card-item {
          padding: 22px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }
        .rc-badge {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .rc-badge.gold { background: #fffbeb; color: #92400e; }
        .rc-badge.teal { background: #eef8fa; color: #0891b2; }
        .rc-badge.green { background: #ecfdf5; color: #065f46; }

        .rule-card-item h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px 0;
        }
        .rule-card-item p {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 16px 0;
          flex-grow: 1;
        }
        .rc-footer-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #00a8cc;
          border-top: 1px solid #f1f5f9;
          padding-top: 10px;
        }

        /* Comparison Banner */
        .savings-comparison-banner {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
          padding: 28px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
        }
        .scb-left h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0f172a;
          margin: 8px 0 10px 0;
        }
        .scb-left p {
          font-size: 0.86rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 18px;
        }
        .scb-right-matrix {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: center;
        }
        .scb-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.78rem;
          color: #334155;
        }
        .scb-row strong {
          color: #059669;
          font-weight: 700;
        }

        /* Routine Section */
        .clean-vitals-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .clean-vital-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
        }
        .v-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .v-icon-box.orange { background: #fffbeb; }
        .v-icon-box.blue { background: #f0f9ff; }
        .v-icon-box.red { background: #fef2f2; }

        .v-label {
          font-size: 0.74rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }
        .v-value-wrap {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin: 2px 0;
        }
        .v-num {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
        }
        .v-goal {
          font-size: 0.8rem;
          color: #64748b;
        }
        .v-hint {
          font-size: 0.72rem;
          color: #94a3b8;
          display: block;
        }

        .water-title-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .add-cup-btn {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          color: #0284c7;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 4px;
          cursor: pointer;
        }
        .clean-progress-wrap {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 6px;
        }
        .clean-progress-fill {
          height: 100%;
          background: #00a8cc;
          border-radius: 9999px;
          transition: width 0.25s ease;
        }

        .schedule-panel-clean {
          padding: 24px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
        }
        .schedule-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .schedule-heading {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .schedule-heading h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .clean-pills-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 18px;
        }
        .clean-pill-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .clean-pill-row:hover {
          background: #f1f5f9;
        }
        .clean-pill-row.completed {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }

        .checkbox-wrap {
          display: flex;
          align-items: center;
        }
        .clean-check {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .clean-check.checked {
          background: #059669;
          border-color: #059669;
          color: #ffffff;
        }

        .pill-text-col {
          flex: 1;
        }
        .p-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }
        .p-title-row h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .clean-dose-badge {
          font-size: 0.68rem;
          background: #f1f5f9;
          color: #475569;
          padding: 1px 6px;
          border-radius: 4px;
        }
        .p-time-row {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          color: #64748b;
        }

        .schedule-advisory-clean {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #eef8fa;
          border-radius: 8px;
          font-size: 0.76rem;
          color: #0e7490;
        }

        @media (max-width: 900px) {
          .tracker-top-banner {
            flex-direction: column;
            align-items: stretch;
          }
          .balance-highlight-box {
            min-width: unset;
          }
          .wealth-grid-four {
            grid-template-columns: repeat(2, 1fr);
          }
          .wealth-split-row {
            grid-template-columns: 1fr;
          }
          .rules-cards-grid {
            grid-template-columns: 1fr;
          }
          .savings-comparison-banner {
            grid-template-columns: 1fr;
          }
          .clean-vitals-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 550px) {
          .wealth-grid-four {
            grid-template-columns: 1fr;
          }
          .ledger-footer-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
