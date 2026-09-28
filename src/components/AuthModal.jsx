import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  User, 
  Stethoscope, 
  Lock, 
  Mail, 
  Phone, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Coins,
  Pill,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'register', onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [role, setRole] = useState('patient'); // 'patient' | 'doctor'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    specialty: 'Cardiologist',
    hospitalName: 'Apollo Care Center'
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync mode if initialMode changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Handle ESC key to close full-screen modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when full screen auth is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          name: formData.fullName || (role === 'doctor' ? 'Dr. Shalini Mehta' : 'Aman Sharma'),
          role
        });
      }
      onClose();
    }, 1200);
  };

  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'doctor') {
      setFormData({
        fullName: 'Dr. Shalini Mehta',
        email: 'dr.shalini@medbridge.in',
        phone: '+91 98111 22334',
        password: 'demoPassword123',
        specialty: 'Cardiologist (AIIMS)',
        hospitalName: 'Max Super Speciality'
      });
    } else {
      setFormData({
        fullName: 'Aman Sharma',
        email: 'aman.sharma@medbridge.in',
        phone: '+91 98765 43210',
        password: 'demoPassword123',
        specialty: '',
        hospitalName: ''
      });
    }
  };

  return (
    <div className="auth-fullscreen-root">
      {/* ========================================================
          LEFT COLUMN: Cinematic Healthcare Showcase (Desktop)
          ======================================================== */}
      <div className="auth-hero-showcase-panel">
        {/* Top Brand Link */}
        <div className="auth-showcase-header">
          <div className="brand-logo-pill">
            <img src="./medbridge-logo.png" alt="MedBridge Logo" className="brand-logo-img" />
            <span className="brand-logo-text">MedBridge</span>
          </div>
          <span className="platform-tag">Official Healthcare Hub</span>
        </div>

        {/* Center Visual Content */}
        <div className="auth-showcase-content">
          <div className="hero-announcement-chip">
            <Sparkles size={14} color="#5eead4" />
            <span>Empowering Affordable Healthcare</span>
          </div>

          <h1 className="showcase-headline">
            {mode === 'login' ? (
              <>
                Welcome Back to Your<br />
                <span className="gradient-highlight">Connected Care Hub.</span>
              </>
            ) : (
              <>
                Bridging Quality &<br />
                <span className="gradient-highlight">Affordable Care.</span>
              </>
            )}
          </h1>

          <p className="showcase-subtext">
            Join over 50,000+ verified patients and board-certified clinicians simplifying doctor appointments, medicine price transparency, and medical wealth tracking.
          </p>

          {/* Key Value Cards */}
          <div className="showcase-highlights-list">
            <div className="showcase-highlight-item">
              <div className="highlight-icon-box teal">
                <Stethoscope size={20} color="#00a8cc" />
              </div>
              <div className="highlight-text-wrap">
                <h4>15,000+ Verified Specialists</h4>
                <p>Authentic patient recovery scores and instant OPD slots without clinic wait times.</p>
              </div>
            </div>

            <div className="showcase-highlight-item">
              <div className="highlight-icon-box gold">
                <Coins size={20} color="#d97706" />
              </div>
              <div className="highlight-text-wrap">
                <h4>Dual-Credit Health Wealth</h4>
                <p>Earn spendable +₹75 HealthCredits per treatment and +₹10 daily routine adherence.</p>
              </div>
            </div>

            <div className="showcase-highlight-item">
              <div className="highlight-icon-box green">
                <Pill size={20} color="#059669" />
              </div>
              <div className="highlight-text-wrap">
                <h4>Jan Aushadhi Generic Radar</h4>
                <p>Hyperlocal generic price transparency saving families up to 84% on daily drugs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="auth-showcase-footer">
          <div className="trust-footer-content">
            <HeartHandshake size={18} color="#5eead4" />
            <span>Bridging quality, transparency, and clinical excellence across India.</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT COLUMN: Full-Screen Form Container
          ======================================================== */}
      <div className="auth-form-panel">
        {/* Top Bar with Close / Exit Button */}
        <div className="auth-top-bar">
          <button 
            type="button" 
            className="btn-exit-fullscreen"
            onClick={onClose}
            title="Return to MedBridge Website (Esc)"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
            <span className="key-hint">Esc</span>
          </button>
        </div>

        {/* Center Form Box */}
        <div className="auth-form-scroll-body">
          <div className="auth-form-container">
            {isSuccess ? (
              <div className="auth-success-state">
                <div className="success-icon-badge">
                  <CheckCircle2 size={54} color="#059669" />
                </div>
                <h2>{mode === 'login' ? 'Authentication Successful!' : 'Account Created Successfully!'}</h2>
                <p>
                  Welcome to MedBridge, <strong>{formData.fullName || (role === 'doctor' ? 'Dr. Shalini Mehta' : 'Aman Sharma')}</strong>! Syncing your health dashboard and credits...
                </p>
                <div className="success-progress-bar">
                  <div className="success-progress-fill"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Form Header */}
                <div className="form-intro-header">
                  <h2 className="form-main-title">
                    {mode === 'login' ? 'Sign In to MedBridge' : 'Create your MedBridge account'}
                  </h2>
                  <p className="form-sub-title">
                    {mode === 'login' 
                      ? 'Access your unified patient dashboard, consultations, and health credits.'
                      : 'Create your free account today and claim 50 bonus HealthCredits instantly.'}
                  </p>
                </div>

                {/* Role Selector Tabs (Patient vs Doctor) */}
                <div className="auth-role-selector">
                  <button 
                    type="button"
                    className={`role-choice-btn ${role === 'patient' ? 'active' : ''}`}
                    onClick={() => setRole('patient')}
                  >
                    <div className="role-btn-inner">
                      <User size={18} />
                      <div className="role-text-meta">
                        <span className="role-title">Patient Account</span>
                        <span className="role-desc">Search doctors & earn credits</span>
                      </div>
                    </div>
                  </button>

                  <button 
                    type="button"
                    className={`role-choice-btn ${role === 'doctor' ? 'active' : ''}`}
                    onClick={() => setRole('doctor')}
                  >
                    <div className="role-btn-inner">
                      <Stethoscope size={18} />
                      <div className="role-text-meta">
                        <span className="role-title">Doctor / Clinic</span>
                        <span className="role-desc">Manage OPD & earn TrustScore</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Quick 1-Click Demo Fill */}
                <div className="quick-demo-strip">
                  <span className="demo-label">Quick Demo Fill:</span>
                  <div className="demo-buttons-row">
                    <button 
                      type="button" 
                      className={`demo-btn ${role === 'patient' ? 'highlight' : ''}`}
                      onClick={() => handleQuickDemo('patient')}
                    >
                      <User size={12} />
                      <span>Sample Patient (Aman)</span>
                    </button>
                    <button 
                      type="button" 
                      className={`demo-btn ${role === 'doctor' ? 'highlight' : ''}`}
                      onClick={() => handleQuickDemo('doctor')}
                    >
                      <Stethoscope size={12} />
                      <span>Sample Doctor (Dr. Shalini)</span>
                    </button>
                  </div>
                </div>

                {/* Main Auth Form */}
                <form onSubmit={handleSubmit} className="auth-interactive-form">
                  {mode === 'register' && (
                    <div className="auth-input-group">
                      <label>Full Legal Name</label>
                      <div className="input-field-wrap">
                        <User size={17} className="field-icon" />
                        <input 
                          type="text" 
                          required 
                          placeholder={role === 'doctor' ? 'Dr. Full Name (e.g. Dr. Shalini Mehta)' : 'Your Full Name (e.g. Aman Sharma)'}
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {role === 'doctor' && mode === 'register' && (
                    <div className="auth-input-group">
                      <label>Medical Specialty & Degrees</label>
                      <div className="input-field-wrap">
                        <Stethoscope size={17} className="field-icon" />
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Cardiologist (MBBS, MD, DM)"
                          value={formData.specialty}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="auth-input-group">
                    <label>Email Address</label>
                    <div className="input-field-wrap">
                      <Mail size={17} className="field-icon" />
                      <input 
                        type="email" 
                        required 
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {mode === 'register' && (
                    <div className="auth-input-group">
                      <label>Mobile Number (for instant OTP & SMS)</label>
                      <div className="input-field-wrap">
                        <Phone size={17} className="field-icon" />
                        <input 
                          type="tel" 
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="auth-input-group">
                    <div className="label-with-aside">
                      <label>Password</label>
                      {mode === 'login' && (
                        <button 
                          type="button" 
                          className="forgot-password-link"
                          onClick={() => alert('Password reset link sent to registered email!')}
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="input-field-wrap">
                      <Lock size={17} className="field-icon" />
                      <input 
                        type="password" 
                        required 
                        placeholder="••••••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-auth-submit-primary">
                    <span>
                      {mode === 'login' 
                        ? `Sign In as ${role === 'doctor' ? 'Doctor' : 'Patient'}` 
                        : `Create ${role === 'doctor' ? 'Doctor' : 'Patient'} Account & Claim 50 Credits`}
                    </span>
                    <ArrowRight size={17} />
                  </button>
                </form>

                {/* Footer Switcher */}
                <div className="auth-switch-prompt">
                  {mode === 'login' ? (
                    <p>
                      Don't have a MedBridge account yet?{' '}
                      <button type="button" onClick={() => setMode('register')}>
                        Register Now (Free)
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an existing account?{' '}
                      <button type="button" onClick={() => setMode('login')}>
                        Sign In Here
                      </button>
                    </p>
                  )}
                </div>

                <div className="auth-privacy-footnote">
                  <span>🔒 256-bit SSL encrypted. Data protected under ABDM & National Health Authority norms.</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Styled JSX */}
      <style>{`
        /* Full-Screen Root Container */
        .auth-fullscreen-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          z-index: 99999;
          display: flex;
          overflow: hidden;
          animation: authFadeIn 0.22s ease-out;
        }

        @keyframes authFadeIn {
          from { opacity: 0; transform: scale(0.99); }
          to { opacity: 1; transform: scale(1); }
        }

        /* 1. Left Showcase Panel */
        .auth-hero-showcase-panel {
          flex: 1;
          max-width: 520px;
          background: linear-gradient(155deg, #092c3e 0%, #0d4b60 50%, #007791 100%);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 44px 48px;
          position: relative;
          overflow: hidden;
        }

        .auth-hero-showcase-panel::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -20%;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 168, 204, 0.28) 0%, rgba(0, 168, 204, 0) 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .auth-hero-showcase-panel::after {
          content: '';
          position: absolute;
          bottom: -15%;
          right: -15%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.2) 0%, rgba(94, 234, 212, 0) 70%);
          filter: blur(35px);
          pointer-events: none;
        }

        .auth-showcase-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .brand-logo-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .brand-logo-img {
          height: 32px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .brand-logo-text {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .platform-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #5eead4;
          background: rgba(94, 234, 212, 0.12);
          border: 1px solid rgba(94, 234, 212, 0.3);
          padding: 4px 12px;
          border-radius: 9999px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .auth-showcase-content {
          position: relative;
          z-index: 2;
          margin: 40px 0;
        }

        .hero-announcement-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px 12px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #a5f3fc;
          margin-bottom: 20px;
        }

        .showcase-headline {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 2.45rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }

        .gradient-highlight {
          color: #5eead4;
        }

        .showcase-subtext {
          font-size: 0.94rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .showcase-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .showcase-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .highlight-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .highlight-icon-box.teal { background: rgba(0, 168, 204, 0.2); border: 1px solid rgba(0, 168, 204, 0.4); }
        .highlight-icon-box.gold { background: rgba(217, 119, 6, 0.2); border: 1px solid rgba(217, 119, 6, 0.4); }
        .highlight-icon-box.green { background: rgba(5, 150, 105, 0.2); border: 1px solid rgba(5, 150, 105, 0.4); }

        .highlight-text-wrap h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 3px;
        }

        .highlight-text-wrap p {
          font-size: 0.8rem;
          color: #94a3b8;
          line-height: 1.45;
          margin: 0;
        }

        .auth-showcase-footer {
          position: relative;
          z-index: 2;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .trust-footer-content {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* 2. Right Form Panel */
        .auth-form-panel {
          flex: 1.3;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow-y: auto;
          position: relative;
        }

        .auth-top-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 24px 36px 0;
          position: sticky;
          top: 0;
          background: #ffffff;
          z-index: 10;
        }

        .btn-exit-fullscreen {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .btn-exit-fullscreen:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #cbd5e1;
          transform: translateX(-2px);
        }

        .key-hint {
          font-size: 0.7rem;
          background: #e2e8f0;
          color: #64748b;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .auth-form-scroll-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 36px 50px;
        }

        .auth-form-container {
          max-width: 480px;
          width: 100%;
          margin: 0 auto;
        }

        .form-intro-header {
          margin-bottom: 24px;
          text-align: left;
        }

        .form-main-title {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 2.1rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .form-sub-title {
          font-size: 0.92rem;
          color: #64748b;
          line-height: 1.5;
        }

        /* Role Selector (Patient vs Doctor) */
        .auth-role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .role-choice-btn {
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 14px;
          padding: 12px 14px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }
        .role-choice-btn:hover {
          border-color: #00a8cc;
          background: #ffffff;
        }
        .role-choice-btn.active {
          border-color: #00a8cc;
          background: #f0fdfa;
          box-shadow: 0 4px 14px rgba(0, 168, 204, 0.12);
        }

        .role-btn-inner {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .role-choice-btn.active .role-btn-inner svg {
          color: #00a8cc;
        }
        .role-choice-btn:not(.active) .role-btn-inner svg {
          color: #94a3b8;
        }

        .role-text-meta {
          display: flex;
          flex-direction: column;
        }

        .role-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
        }
        .role-desc {
          font-size: 0.7rem;
          color: #64748b;
        }

        /* Demo Strip */
        .quick-demo-strip {
          background: #eef8fa;
          border: 1px solid #d4eff5;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          gap: 8px;
          flex-wrap: wrap;
        }

        .demo-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: #0e8192;
        }

        .demo-buttons-row {
          display: flex;
          gap: 8px;
        }

        .demo-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #ffffff;
          border: 1px solid #b5e4ec;
          color: #0e8192;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .demo-btn:hover {
          background: #00a8cc;
          color: #ffffff;
          border-color: #00a8cc;
        }
        .demo-btn.highlight {
          border-color: #00a8cc;
          background: #ffffff;
          font-weight: 800;
        }

        /* Form Inputs */
        .auth-interactive-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .auth-input-group label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #334155;
        }

        .label-with-aside {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-password-link {
          background: none;
          border: none;
          color: #00a8cc;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }
        .forgot-password-link:hover {
          text-decoration: underline;
        }

        .input-field-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1.5px solid #cbd5e1;
          border-radius: 12px;
          padding: 12px 14px;
          background: #ffffff;
          transition: all 0.18s ease;
        }
        .input-field-wrap:focus-within {
          border-color: #00a8cc;
          box-shadow: 0 0 0 3.5px rgba(0, 168, 204, 0.15);
        }

        .field-icon {
          color: #94a3b8;
          flex-shrink: 0;
        }
        .input-field-wrap:focus-within .field-icon {
          color: #00a8cc;
        }

        .input-field-wrap input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 0.92rem;
          color: #0f172a;
          background: transparent;
        }

        .btn-auth-submit-primary {
          margin-top: 10px;
          background: linear-gradient(135deg, #00a8cc 0%, #0284c7 100%);
          color: #ffffff;
          border: none;
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          padding: 14px 24px;
          border-radius: 9999px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 6px 20px rgba(0, 168, 204, 0.35);
          transition: all 0.22s ease;
        }
        .btn-auth-submit-primary:hover {
          background: linear-gradient(135deg, #0092b3 0%, #0369a1 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 168, 204, 0.45);
        }

        /* Switch Prompt */
        .auth-switch-prompt {
          margin-top: 24px;
          text-align: center;
          font-size: 0.88rem;
          color: #64748b;
        }

        .auth-switch-prompt button {
          background: none;
          border: none;
          color: #00a8cc;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .auth-switch-prompt button:hover {
          color: #0891b2;
        }

        .auth-privacy-footnote {
          margin-top: 24px;
          text-align: center;
          font-size: 0.74rem;
          color: #94a3b8;
          line-height: 1.4;
        }

        /* Success State */
        .auth-success-state {
          padding: 40px 10px;
          text-align: center;
        }
        .success-icon-badge {
          margin-bottom: 20px;
        }
        .auth-success-state h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }
        .auth-success-state p {
          color: #475569;
          font-size: 1rem;
          line-height: 1.6;
        }
        .success-progress-bar {
          margin: 30px auto 0;
          width: 200px;
          height: 5px;
          background: #e2e8f0;
          border-radius: 9999px;
          overflow: hidden;
          position: relative;
        }
        .success-progress-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 50%;
          background: #059669;
          border-radius: 9999px;
          animation: progressSlide 1s infinite ease-in-out;
        }
        @keyframes progressSlide {
          0% { left: -50%; }
          100% { left: 100%; }
        }

        /* Responsive Breakpoint for Mobile & Tablets */
        @media (max-width: 960px) {
          .auth-fullscreen-root {
            flex-direction: column;
            overflow-y: auto;
          }
          .auth-hero-showcase-panel {
            max-width: 100%;
            flex: none;
            padding: 30px 24px;
          }
          .showcase-headline {
            font-size: 1.8rem;
          }
          .showcase-highlights-list {
            display: none;
          }
          .auth-form-panel {
            flex: none;
            height: auto;
            min-height: 100vh;
          }
          .auth-top-bar {
            padding: 18px 24px 0;
          }
          .auth-form-scroll-body {
            padding: 20px 24px 40px;
          }
          .form-main-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}
