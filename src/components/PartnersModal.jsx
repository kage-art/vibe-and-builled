import React, { useState } from 'react';
import { X, Building2, GraduationCap, Stethoscope, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PartnersModal({ isOpen, onClose }) {
  const [partnerType, setPartnerType] = useState('campus');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    orgName: '',
    email: '',
    phone: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="partner-modal-backdrop" onClick={onClose}>
      <div className="partner-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="partner-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {submitted ? (
          <div className="partner-success">
            <CheckCircle2 size={48} color="#059669" />
            <h3>Partnership Request Received!</h3>
            <p>Our Institutional Relations Team will reach out within 24 hours to schedule an onboarding consultation.</p>
          </div>
        ) : (
          <>
            <div className="partner-modal-header">
              <span className="partner-badge">MedBridge Partner Network</span>
              <h2>Join the Integrated Care Ecosystem</h2>
              <p>Expand health access for your students, clinical practice, or corporate employees.</p>
            </div>

            <div className="partner-type-selector">
              <button 
                type="button"
                className={`type-btn ${partnerType === 'campus' ? 'active' : ''}`}
                onClick={() => setPartnerType('campus')}
              >
                <GraduationCap size={16} />
                <span>Colleges & Universities</span>
              </button>
              <button 
                type="button"
                className={`type-btn ${partnerType === 'clinic' ? 'active' : ''}`}
                onClick={() => setPartnerType('clinic')}
              >
                <Stethoscope size={16} />
                <span>Hospitals & Clinics</span>
              </button>
              <button 
                type="button"
                className={`type-btn ${partnerType === 'corporate' ? 'active' : ''}`}
                onClick={() => setPartnerType('corporate')}
              >
                <Building2 size={16} />
                <span>Corporate Wellness</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="partner-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Contact Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Dr. Rajesh Kumar"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Institution / Hospital Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Delhi University / Max Lab"
                    value={form.orgName}
                    onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Official Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="contact@institution.edu.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Key Requirements or Inquiries</label>
                <textarea 
                  rows={3}
                  placeholder="e.g., Interested in subsidizing mental health passes for 4,000 students on our campus..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="partner-submit-btn">
                <span>Submit Partnership Proposal</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        .partner-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .partner-modal-card {
          background: #ffffff;
          border-radius: 20px;
          width: 100%;
          max-width: 540px;
          padding: 32px;
          position: relative;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
          animation: popIn 0.2s ease-out;
        }

        .partner-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #f1f5f9;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
        }
        .partner-modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .partner-badge {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 700;
          color: #00a8cc;
          background: #eef8fa;
          padding: 4px 10px;
          border-radius: 9999px;
          margin-bottom: 8px;
        }

        .partner-modal-header h2 {
          font-size: 1.45rem;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .partner-modal-header p {
          font-size: 0.88rem;
          color: #64748b;
          margin-bottom: 18px;
        }

        .partner-type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 6px;
          background: #f8fafc;
          padding: 4px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 20px;
        }

        .type-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 6px;
          border-radius: 8px;
          background: transparent;
          font-size: 0.74rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          text-align: center;
        }
        .type-btn.active {
          background: #ffffff;
          color: #00a8cc;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
        }

        .partner-form {
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
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
        }
        .form-group input, .form-group textarea {
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.86rem;
          outline: none;
          font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: #00a8cc;
        }

        .partner-submit-btn {
          background: #00a8cc;
          color: #ffffff;
          padding: 12px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.92rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 168, 204, 0.3);
          margin-top: 6px;
        }
        .partner-submit-btn:hover {
          background: #0092b3;
        }

        .partner-success {
          text-align: center;
          padding: 30px 10px;
        }
        .partner-success h3 {
          font-size: 1.35rem;
          color: #0f172a;
          margin: 14px 0 8px;
        }
        .partner-success p {
          color: #64748b;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
