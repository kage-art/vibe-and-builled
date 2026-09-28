import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  CheckCircle2, 
  Gift, 
  Sparkles, 
  X,
  ShieldCheck
} from 'lucide-react';

export default function CreditModal({ 
  isOpen, 
  onClose, 
  userCredits, 
  onClaimBonus 
}) {
  const [hasClaimed, setHasClaimed] = useState(false);

  if (!isOpen) return null;

  const handleClaim = () => {
    if (!hasClaimed) {
      onClaimBonus();
      setHasClaimed(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-clean credit-modal-clean" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="clean-modal-head">
          <div className="coin-ico-box">
            <Coins size={26} color="#b45309" />
          </div>
          <div>
            <h3>MedBridge Dual Credit Economy</h3>
            <p className="modal-subtext">Transparent incentives for patient compliance & clinical excellence</p>
          </div>
          <button className="clean-close-x" onClick={onClose}>✕</button>
        </div>

        {/* Balance Card */}
        <div className="clean-balance-box">
          <div>
            <span className="balance-head-label">Your Available HealthCredits</span>
            <div className="balance-row">
              <span className="balance-number">{userCredits}</span>
              <span className="balance-curr">Credits = ₹{userCredits} Real Value</span>
            </div>
            <span className="balance-hint">Redeemable at registered Jan Aushadhi & partner pharmacies</span>
          </div>

          <button 
            className={`claim-bonus-btn ${hasClaimed ? 'claimed' : ''}`} 
            onClick={handleClaim}
            disabled={hasClaimed}
          >
            {hasClaimed ? <CheckCircle2 size={15} /> : <Gift size={15} />}
            <span>{hasClaimed ? 'Claimed (+50 Added)' : 'Claim +50 Bonus'}</span>
          </button>
        </div>

        {/* Dual Pillar Comparison */}
        <div className="dual-pillar-grid">
          {/* Patient */}
          <div className="pillar-clean-card">
            <div className="pillar-clean-head">
              <div className="p-ico blue">
                <Coins size={18} color="#0284c7" />
              </div>
              <div>
                <h4>For Patients & Students</h4>
                <span className="pillar-role">HealthPoints Reward Loop</span>
              </div>
            </div>

            <ul className="pillar-clean-list">
              <li>
                <CheckCircle2 size={15} color="#059669" />
                <span><strong>+75 to +150 Credits:</strong> Earned upon verified completion of doctor consult.</span>
              </li>
              <li>
                <CheckCircle2 size={15} color="#059669" />
                <span><strong>+10 Credits/Week:</strong> Medication schedule adherence bonus.</span>
              </li>
              <li>
                <CheckCircle2 size={15} color="#059669" />
                <span><strong>₹1 = 1 Credit:</strong> Direct deduction from pharmacy bill or student counseling.</span>
              </li>
            </ul>
          </div>

          {/* Doctor */}
          <div className="pillar-clean-card">
            <div className="pillar-clean-head">
              <div className="p-ico teal">
                <TrendingUp size={18} color="#0e7490" />
              </div>
              <div>
                <h4>For Clinicians & Doctors</h4>
                <span className="pillar-role">TrustScore Reputation Boost</span>
              </div>
            </div>

            <ul className="pillar-clean-list">
              <li>
                <CheckCircle2 size={15} color="#0891b2" />
                <span><strong>+30 TrustScore:</strong> Earned per successful treatment and verified patient review.</span>
              </li>
              <li>
                <CheckCircle2 size={15} color="#0891b2" />
                <span><strong>Top Specialty Rank:</strong> Highest TrustScore doctors appear at the top of search.</span>
              </li>
              <li>
                <CheckCircle2 size={15} color="#0891b2" />
                <span><strong>Verified Provider Badge:</strong> Increases patient booking rate by 3.5x.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-cta-footer">
          <button className="btn-teal" onClick={onClose} style={{ width: '100%' }}>
            Understood
          </button>
        </div>
      </div>

      <style>{`
        .credit-modal-clean {
          max-width: 620px;
        }

        .clean-modal-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          position: relative;
        }

        .coin-ico-box {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          background: #fffbeb;
          border: 1px solid #fde68a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .clean-modal-head h3 {
          font-size: 1.25rem;
          color: var(--text-main);
        }

        .modal-subtext {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .clean-close-x {
          position: absolute;
          right: 0;
          top: 0;
          background: #f1f5f9;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
        }
        .clean-close-x:hover {
          background: #e2e8f0;
          color: var(--text-main);
        }

        .clean-balance-box {
          background: #fffbeb;
          border: 1px solid #fde68a;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .balance-head-label {
          font-size: 0.74rem;
          color: #92400e;
          font-weight: 700;
          text-transform: uppercase;
        }

        .balance-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin: 2px 0;
        }

        .balance-number {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: #92400e;
        }

        .balance-curr {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .balance-hint {
          font-size: 0.72rem;
          color: #78350f;
          display: block;
        }

        .claim-bonus-btn {
          background: #b45309;
          color: white;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          border: none;
        }
        .claim-bonus-btn:hover {
          background: #92400e;
        }
        .claim-bonus-btn.claimed {
          background: #059669;
          cursor: default;
        }

        .dual-pillar-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .pillar-clean-card {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 16px;
          border-radius: var(--radius-md);
        }

        .pillar-clean-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .p-ico {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .p-ico.blue { background: #f0f9ff; }
        .p-ico.teal { background: var(--teal-50); }

        .pillar-clean-head h4 {
          font-size: 0.92rem;
          color: var(--text-main);
        }

        .pillar-role {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .pillar-clean-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.78rem;
          color: var(--text-body);
        }
        .pillar-clean-list li {
          display: flex;
          gap: 6px;
          line-height: 1.4;
        }
        .pillar-clean-list strong {
          color: var(--text-main);
        }

        .modal-cta-footer {
          margin-top: 14px;
        }

        @media (max-width: 600px) {
          .dual-pillar-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
