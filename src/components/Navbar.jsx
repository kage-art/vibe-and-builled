import React, { useState } from 'react';
import { Menu, X, Coins, Sparkles, Building2 } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  userCredits, 
  onOpenCreditModal, 
  onOpenAuthModal,
  onOpenPartnersModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabKey) => {
    setActiveTab(tabKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="medbridge-header-root">
      <div className="container nav-content-row">
        {/* Brand Logo & Wordmark (Exact Bridge Arch + Medical Cross Location Pin Logo) */}
        <div 
          className="brand-logo-container" 
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img 
            src="./medbridge-logo.png" 
            alt="MedBridge Logo" 
            className="medbridge-logo-img" 
          />
          <span className="brand-title-text">MedBridge</span>
        </div>

        {/* Desktop Navigation Links (Home, About Us, Solutions | Login, Register) */}
        <nav className="desktop-nav-links">
          <button 
            type="button"
            className={`nav-text-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>

          <button 
            type="button"
            className={`nav-text-link ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>

          <button 
            type="button"
            className={`nav-text-link ${activeTab === 'solutions' || activeTab === 'find' ? 'active' : ''}`}
            onClick={() => handleNavClick('solutions')}
          >
            Solutions
          </button>

          <button 
            type="button"
            className={`nav-text-link ${activeTab === 'medicines' ? 'active' : ''}`}
            onClick={() => handleNavClick('medicines')}
          >
            Medicine Prices
          </button>

          <button 
            type="button"
            className={`nav-text-link ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => handleNavClick('tracker')}
          >
            Wealth Tracking
          </button>

          <span className="nav-vertical-divider">|</span>

          {/* User Credits Subtle Tag if logged in */}
          {userCredits > 0 && (
            <button 
              type="button" 
              className="credits-pill-tag"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onOpenCreditModal) onOpenCreditModal();
              }}
              title="HealthCredits Balance: Click to view details"
            >
              <Coins size={14} color="#d97706" />
              <span>{userCredits}</span>
            </button>
          )}

          <button 
            type="button"
            className="nav-text-link login-nav-link"
            onClick={() => onOpenAuthModal('login')}
          >
            Login
          </button>

          <button 
            type="button"
            className="nav-register-pill-btn"
            onClick={() => onOpenAuthModal('register')}
          >
            Register
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <button 
            className={`mobile-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className={`mobile-link ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>
          <button 
            className={`mobile-link ${activeTab === 'solutions' || activeTab === 'find' ? 'active' : ''}`}
            onClick={() => handleNavClick('solutions')}
          >
            Solutions
          </button>
          <button 
            className={`mobile-link ${activeTab === 'medicines' ? 'active' : ''}`}
            onClick={() => handleNavClick('medicines')}
          >
            Medicine Prices
          </button>
          <button 
            className={`mobile-link ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => handleNavClick('tracker')}
          >
            Wealth Tracking
          </button>
          {userCredits > 0 && (
            <button 
              type="button"
              className="mobile-link"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: '700' }}
              onClick={() => { 
                setMobileMenuOpen(false); 
                if (onOpenCreditModal) onOpenCreditModal(); 
              }}
            >
              <Coins size={16} color="#d97706" />
              <span>HealthCredits: {userCredits}</span>
            </button>
          )}
          <div className="mobile-auth-row">
            <button 
              className="mobile-login-btn"
              onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('login'); }}
            >
              Login
            </button>
            <button 
              className="nav-register-pill-btn"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('register'); }}
            >
              Register
            </button>
          </div>
        </div>
      )}

      <style>{`
        .medbridge-header-root {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
        }

        .nav-content-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          max-width: 1240px;
          margin: 0 auto;
        }

        .brand-logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        .medbridge-logo-img {
          display: block;
          height: 38px;
          width: auto;
          object-fit: contain;
          transition: transform 0.2s ease;
        }
        .brand-logo-container:hover .medbridge-logo-img {
          transform: scale(1.05);
        }

        .brand-title-text {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.55rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.025em;
        }

        .desktop-nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-text-link {
          background: transparent;
          color: #334155;
          font-size: 0.94rem;
          font-weight: 500;
          padding: 6px 4px;
          transition: color 0.15s ease;
        }
        .nav-text-link:hover {
          color: #00a8cc;
        }
        .nav-text-link.active {
          color: #00a8cc;
          font-weight: 600;
        }

        .login-nav-link {
          font-weight: 600;
          color: #1e293b;
          margin-left: 4px;
        }
        .login-nav-link:hover {
          color: #00a8cc;
        }

        .nav-vertical-divider {
          color: #cbd5e1;
          font-size: 1.1rem;
          font-weight: 300;
          user-select: none;
          margin: 0 4px;
        }

        .credits-pill-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
          cursor: pointer;
        }

        /* Register Pill Button - Exact visual match from screenshot */
        .nav-register-pill-btn {
          background: #00a8cc; /* exact vibrant cyan-teal from image */
          color: #ffffff;
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 8px 24px;
          border-radius: 9999px;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 168, 204, 0.28);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-register-pill-btn:hover {
          background: #0092b3;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 168, 204, 0.38);
        }

        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #0f172a;
          cursor: pointer;
        }

        .mobile-nav-drawer {
          display: none;
        }

        @media (max-width: 860px) {
          .desktop-nav-links {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
          .mobile-nav-drawer {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 16px 24px 24px;
            background: #ffffff;
            border-top: 1px solid #e2e8f0;
          }
          .mobile-link {
            text-align: left;
            background: transparent;
            font-size: 1rem;
            color: #1e293b;
            padding: 8px 0;
            font-weight: 500;
          }
          .mobile-auth-row {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 8px;
            padding-top: 12px;
            border-top: 1px solid #f1f5f9;
          }
          .mobile-login-btn {
            background: #f1f5f9;
            color: #0f172a;
            padding: 10px;
            border-radius: 9999px;
            font-weight: 600;
          }
        }
      `}</style>
    </header>
  );
}
