import React from 'react';
import { Coins, TrendingUp, X, Sparkles } from 'lucide-react';

export default function RewardToast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="clean-reward-toast clean-card">
      <div className="toast-icon-circle">
        {toast.type === 'doctor-boost' ? (
          <TrendingUp size={20} color="#0891b2" />
        ) : (
          <Coins size={20} color="#b45309" />
        )}
      </div>

      <div className="toast-content-col">
        <h4 className="t-title">{toast.title}</h4>
        <p className="t-msg">{toast.message}</p>
        {toast.rewardPoints && (
          <div className="t-badge">
            <Sparkles size={11} />
            <span>+{toast.rewardPoints} {toast.pointsLabel || 'HealthCredits Added'}</span>
          </div>
        )}
      </div>

      <button className="t-close" onClick={onClose}>
        <X size={13} />
      </button>

      <style>{`
        .clean-reward-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 2000;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          background: #ffffff;
          border: 1px solid var(--border-light);
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15);
          max-width: 380px;
          border-radius: var(--radius-lg);
        }

        .toast-icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #fffbeb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-content-col {
          flex: 1;
        }

        .t-title {
          font-size: 0.9rem;
          color: var(--text-main);
          margin-bottom: 2px;
        }

        .t-msg {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 4px;
        }

        .t-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
          padding: 2px 7px;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .t-close {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          padding: 2px;
        }
        .t-close:hover {
          color: var(--text-main);
        }
      `}</style>
    </div>
  );
}
