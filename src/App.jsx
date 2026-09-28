import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HomeExploreHub from './components/HomeExploreHub';
import AboutUs from './components/AboutUs';
import DepartmentsGrid from './components/DepartmentsGrid';
import DoctorsAndFacilities from './components/DoctorsAndFacilities';
import CounselingHub from './components/CounselingHub';
import MedicineRadar from './components/MedicineRadar';
import HealthTracker from './components/HealthTracker';
import MedCommunity from './components/MedCommunity';
import CreditModal from './components/CreditModal';
import EmergencyModal from './components/EmergencyModal';
import AppointmentModal from './components/AppointmentModal';
import RewardToast from './components/RewardToast';
import FloatingHelp from './components/FloatingHelp';
import AuthModal from './components/AuthModal';
import PartnersModal from './components/PartnersModal';

import SmartMarketplaceHub from './components/SmartMarketplaceHub';

import { 
  ShieldCheck, 
  Coins, 
  Sparkles, 
  HeartHandshake, 
  Pill, 
  ArrowRight,
  TrendingUp,
  Award,
  Stethoscope,
  GraduationCap,
  WifiOff
} from 'lucide-react';
import { INITIAL_USER, DOCTORS, DEPARTMENTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'solutions' | 'about' | 'departments' | 'counseling' | 'medicines' | 'tracker' | 'community'
  const [solutionsCategory, setSolutionsCategory] = useState('specialists');
  const [userState, setUserState] = useState(INITIAL_USER);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('South Extension, New Delhi');

  // Modals state
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register'); // 'login' | 'register'
  const [isPartnersModalOpen, setIsPartnersModalOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [toast, setToast] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('Connection Restored', 'You are back online. All services synchronized.', null, 'gold');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast('Offline Mode Active', 'MedBridge is running from local cache. Emergency guides and cached records remain accessible.', null, 'info');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Trigger Toast helper
  const showToast = (title, message, rewardPoints = null, type = 'gold', pointsLabel = null) => {
    setToast({ title, message, rewardPoints, type, pointsLabel });
    setTimeout(() => {
      setToast(null);
    }, 5500);
  };

  const handleOpenAuth = (mode = 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    handleOpenAuth('register');
    showToast(
      'Get Started with MedBridge',
      'Welcome to MedBridge! Create your account to claim 50 bonus HealthCredits and access verified care.',
      50,
      'gold',
      'Welcome Bonus'
    );
  };

  const handleLoginSuccess = (userData) => {
    setUserState(prev => ({
      ...prev,
      name: userData.name,
      role: userData.role
    }));
    showToast(
      'Session Authenticated',
      `Welcome to MedBridge, ${userData.name}! Your health profile is synced.`,
      25,
      'doctor-boost',
      'Bonus Credits'
    );
  };

  const handleAddCredits = (amount) => {
    setUserState(prev => ({
      ...prev,
      healthCredits: prev.healthCredits + amount
    }));
  };

  // Symptom search from Hero
  const handleSearchSymptom = (query) => {
    setSearchQuery(query);
    if (!query) {
      setSelectedDepartment(null);
      return;
    }

    const q = query.toLowerCase();
    const matchedDept = DEPARTMENTS.find(d => 
      d.name.toLowerCase().includes(q) || 
      d.hindiName.toLowerCase().includes(q) ||
      d.symptoms.some(s => q.includes(s.toLowerCase()) || s.toLowerCase().includes(q))
    );

    if (matchedDept) {
      setSelectedDepartment(matchedDept.id);
      showToast(
        'Care Match Located',
        `Recognized clinical symptoms matching ${matchedDept.name}. Filtered top rated specialists near you.`,
        null,
        'info'
      );
    }

    const dirEl = document.getElementById('care-directory');
    if (dirEl) {
      dirEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Treatment completed simulation
  const handleSimulateTreatmentCompletion = (doctor) => {
    const earnedCredits = 75;
    const boostScoreEarned = 30;

    setUserState(prev => ({
      ...prev,
      healthCredits: prev.healthCredits + earnedCredits,
      completedTreatments: prev.completedTreatments + 1
    }));

    doctor.trustScore += boostScoreEarned;
  };

  // Pill Reminder Toggle
  const handleToggleReminder = (id) => {
    setUserState(prev => {
      const updated = prev.medReminders.map(rem => {
        if (rem.id === id) {
          const willBeTaken = !rem.takenToday;
          return { ...rem, takenToday: willBeTaken };
        }
        return rem;
      });

      return {
        ...prev,
        healthCredits: prev.healthCredits + 10,
        medReminders: updated
      };
    });
  };

  const handleAddReminder = (newReminder) => {
    setUserState(prev => ({
      ...prev,
      medReminders: [...prev.medReminders, newReminder]
    }));
  };

  const handleAddWater = () => {
    setUserState(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        waterIntakeLiters: +(prev.vitals.waterIntakeLiters + 0.25).toFixed(2)
      }
    }));
  };

  const handleClaimBonus = () => {
    setUserState(prev => ({
      ...prev,
      healthCredits: prev.healthCredits + 50
    }));
  };

  const handleBookingConfirmed = (bookingData) => {
    if (bookingData.creditsUsed > 0) {
      setUserState(prev => ({
        ...prev,
        healthCredits: Math.max(0, prev.healthCredits - bookingData.creditsUsed)
      }));
    }
    setBookingDoctor(null);
  };

  const handleRedeemMedicine = (med, pharmacy) => {
    showToast(
      'Medicine Reserved',
      `Reserved ${med.brandName} at ${pharmacy.pharmacyName} for ₹${pharmacy.price}. You saved ${pharmacy.discountPercent}%!`
    );
  };

  const handleScrollToCare = () => {
    setActiveTab('solutions');
    setSolutionsCategory('specialists');
    setTimeout(() => {
      const el = document.getElementById('smart-marketplace-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleScrollToMarketplace = () => {
    setActiveTab('solutions');
    setSolutionsCategory('marketplace');
    setTimeout(() => {
      const el = document.getElementById('smart-marketplace-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectSpecialtyFromHome = (deptId) => {
    setSelectedDepartment(deptId);
    setActiveTab('solutions');
    setSolutionsCategory('specialists');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const dept = DEPARTMENTS.find(d => d.id === deptId);
    showToast(
      'Specialist Category Filtered',
      `Showing verified ${dept ? dept.name : 'Specialist'} doctors near you with instant booking availability.`,
      null,
      'info'
    );
  };

  return (
    <div className="medbridge-app">
      {isOffline && (
        <div style={{
          background: '#0284c7',
          color: '#ffffff',
          padding: '8px 16px',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontWeight: '600',
          position: 'sticky',
          top: 0,
          zIndex: 9999
        }}>
          <WifiOff size={16} />
          <span>Offline Mode Active — Running seamlessly from local cache</span>
        </div>
      )}
      {/* Navigation (Matches exact header from reference mockup) */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userCredits={userState.healthCredits}
        onOpenCreditModal={() => setIsCreditModalOpen(true)}
        onOpenAuthModal={handleOpenAuth}
        onOpenPartnersModal={() => setIsPartnersModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="main-content">
        {/* Home Page View (Featuring Hero Section) */}
        {activeTab === 'home' && (
          <div className="home-page-view">
            {/* Hero Section Banner */}
            <HeroSection 
              onConnectNow={() => {
                setActiveTab('solutions');
                setSolutionsCategory('specialists');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGetStarted={handleGetStarted}
              onRegister={() => handleOpenAuth('register')}
              onLogin={() => handleOpenAuth('login')}
              userState={userState}
            />

            {/* Quick Solutions Gateway on Home Page */}
            <div className="home-gateway-container">
              <div className="container">
                <div className="home-gateway-grid">
                  <div 
                    className="home-gate-card clean-card"
                    onClick={() => {
                      setActiveTab('solutions');
                      setSolutionsCategory('specialists');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="gate-icon-box teal">
                      <Stethoscope size={24} color="#0891b2" />
                    </div>
                    <h4>Verified Specialists</h4>
                    <p>Consult top-ranked board certified doctors with genuine patient recovery ratings.</p>
                    <span className="gate-link">Find Doctors →</span>
                  </div>

                  <div 
                    className="home-gate-card clean-card"
                    onClick={() => {
                      setActiveTab('medicines');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="gate-icon-box green">
                      <Pill size={24} color="#059669" />
                    </div>
                    <h4>Jan Aushadhi Radar</h4>
                    <p>Hyperlocal generic medicine price comparison saving patients up to 84%.</p>
                    <span className="gate-link">Compare Medicines →</span>
                  </div>

                  <div 
                    className="home-gate-card clean-card"
                    onClick={() => {
                      setActiveTab('counseling');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="gate-icon-box purple">
                      <GraduationCap size={24} color="#7c3aed" />
                    </div>
                    <h4>Campus Wellness Pass</h4>
                    <p>Subsidized, confidential 1-on-1 counseling for college students.</p>
                    <span className="gate-link">Student Hub →</span>
                  </div>

                  <div 
                    className="home-gate-card clean-card"
                    onClick={() => setIsSOSModalOpen(true)}
                  >
                    <div className="gate-icon-box red">
                      <ShieldCheck size={24} color="#dc2626" />
                    </div>
                    <h4>24/7 Trauma Emergency</h4>
                    <p>One-click GPS ambulance dispatch with pre-arrival hospital ER bed lock.</p>
                    <span className="gate-link text-red">Emergency Dispatch →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Core Requested Sections: Doctor Categories, Medicine Price Radar & Wealth Tracker */}
            <HomeExploreHub 
              onSelectSpecialty={handleSelectSpecialtyFromHome}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              userState={userState}
              onToggleReminder={handleToggleReminder}
              onAddWater={handleAddWater}
              onOpenCreditModal={() => setIsCreditModalOpen(true)}
              onRedeemMedicine={handleRedeemMedicine}
            />
          </div>
        )}

        {/* Solutions Page View */}
        {(activeTab === 'solutions' || activeTab === 'find') && (
          <div className="solutions-page-view" style={{ paddingTop: '20px' }}>
            {/* Categorized Solutions Hub (Specialists, Bidding, Transparency, Queue, Bundles) */}
            <SmartMarketplaceHub 
              activeCategory={solutionsCategory}
              onSelectCategory={setSolutionsCategory}
              selectedDepartment={selectedDepartment}
              searchQuery={searchQuery}
              handleSimulateTreatmentCompletion={handleSimulateTreatmentCompletion}
              onBookDoctor={(doc) => setBookingDoctor(doc)}
              onOpenSOS={() => setIsSOSModalOpen(true)}
              showToast={showToast}
              userCredits={userState.healthCredits}
              onAddCredits={handleAddCredits}
            />
          </div>
        )}

        {/* About Us View */}
        {activeTab === 'about' && (
          <AboutUs 
            onExploreCare={handleScrollToCare}
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo(0, 0); }}
            onOpenSOS={() => setIsSOSModalOpen(true)}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
          />
        )}

        {/* Departments View */}
        {activeTab === 'departments' && (
          <div style={{ paddingTop: '20px' }}>
            <DepartmentsGrid 
              selectedDepartment={selectedDepartment}
              onSelectDepartment={(deptId) => {
                setSelectedDepartment(deptId);
                setActiveTab('find');
                setSolutionsCategory('specialists');
                setTimeout(() => {
                  const el = document.getElementById('smart-marketplace-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
            />
          </div>
        )}

        {/* Counseling View */}
        {activeTab === 'counseling' && (
          <CounselingHub 
            onBookCounselor={(counselor) => setBookingDoctor(counselor)}
          />
        )}

        {/* Medicine Radar View */}
        {activeTab === 'medicines' && (
          <MedicineRadar 
            userCredits={userState.healthCredits}
            onRedeemMedicine={handleRedeemMedicine}
          />
        )}

        {/* Health Tracker View */}
        {/* Health & Wealth Tracker View */}
        {activeTab === 'tracker' && (
          <HealthTracker 
            userState={userState}
            onToggleReminder={handleToggleReminder}
            onAddReminder={handleAddReminder}
            onAddWater={handleAddWater}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Community View */}
        {activeTab === 'community' && (
          <MedCommunity />
        )}
      </main>

      {/* Floating Need Help Widget (Exact match from reference mockup bottom right) */}
      <FloatingHelp 
        onOpenSOS={() => setIsSOSModalOpen(true)}
        onFindSpecialist={handleScrollToCare}
      />

      {/* Modals & Feedback Toasts */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      <PartnersModal 
        isOpen={isPartnersModalOpen}
        onClose={() => setIsPartnersModalOpen(false)}
      />

      <CreditModal 
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        userCredits={userState.healthCredits}
        onClaimBonus={handleClaimBonus}
      />

      <EmergencyModal 
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
      />

      <AppointmentModal 
        doctor={bookingDoctor}
        isOpen={!!bookingDoctor}
        onClose={() => setBookingDoctor(null)}
        userCredits={userState.healthCredits}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <RewardToast 
        toast={toast}
        onClose={() => setToast(null)}
      />

      {/* Clean Light Footer */}
      <footer className="clean-footer">
        <div className="container footer-grid-clean">
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <img src="./medbridge-logo.png" alt="MedBridge Logo" className="footer-logo-img" />
              <span className="footer-brand-name">MedBridge</span>
            </div>
          </div>

          <div className="footer-nav-columns">
            <div className="footer-col">
              <h5>Care Solutions</h5>
              <a onClick={handleScrollToCare}>Find Specialists</a>
              <a onClick={() => { setActiveTab('departments'); window.scrollTo(0,0); }}>Departments</a>
              <a onClick={() => setIsSOSModalOpen(true)}>24/7 Trauma SOS</a>
            </div>

            <div className="footer-col">
              <h5>Students & Community</h5>
              <a onClick={() => { setActiveTab('counseling'); window.scrollTo(0,0); }}>Campus Wellness (50% Off)</a>
              <a onClick={() => { setActiveTab('community'); window.scrollTo(0,0); }}>Clinical Forum</a>
              <a onClick={() => { setActiveTab('about'); window.scrollTo(0,0); }}>About Our Mission</a>
            </div>

            <div className="footer-col">
              <h5>Medicine & Adherence</h5>
              <a onClick={() => { setActiveTab('medicines'); window.scrollTo(0,0); }}>Jan Aushadhi Radar</a>
              <a onClick={() => { setActiveTab('tracker'); window.scrollTo(0,0); }}>Daily Pill Tracker</a>
              <a onClick={() => setIsCreditModalOpen(true)}>HealthCredits Economy</a>
            </div>
          </div>
        </div>

        <style>{`
          .clean-footer {
            background: #ffffff;
            border-top: 1px solid #e2e8f0;
            padding: 50px 0 30px;
            margin-top: 50px;
          }

          .footer-grid-clean {
            display: grid;
            grid-template-columns: 1.5fr 2fr;
            gap: 40px;
            margin-bottom: 36px;
          }

          .footer-logo-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }

          .footer-logo-img {
            height: 38px;
            width: auto;
            object-fit: contain;
          }

          .footer-brand-name {
            font-family: var(--font-heading);
            font-size: 1.45rem;
            font-weight: 700;
            color: #0f172a;
          }

          .footer-tagline {
            font-size: 0.88rem;
            color: #64748b;
            line-height: 1.55;
            max-width: 400px;
          }

          .footer-nav-columns {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }

          .footer-col h5 {
            font-size: 0.88rem;
            color: #0f172a;
            margin-bottom: 12px;
            font-weight: 700;
          }

          .footer-col a {
            display: block;
            font-size: 0.82rem;
            color: #64748b;
            margin-bottom: 8px;
            cursor: pointer;
            transition: color 0.15s ease;
          }
          .footer-col a:hover {
            color: #00a8cc;
          }

          .footer-sub-bar {
            padding-top: 20px;
            border-top: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.76rem;
            color: #64748b;
            flex-wrap: wrap;
            gap: 12px;
          }

          /* Home Gateway Section */
          .home-gateway-container {
            padding: 44px 0 20px;
            background: #ffffff;
          }

          .home-gateway-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }

          .home-gate-card {
            padding: 24px;
            border-radius: var(--radius-lg);
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
          }

          .home-gate-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 28px -6px rgba(18, 156, 176, 0.12);
            border-color: var(--teal-500);
          }

          .gate-icon-box {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
          }

          .gate-icon-box.teal { background: #eef8fa; border: 1px solid #cffafe; }
          .gate-icon-box.green { background: #ecfdf5; border: 1px solid #d1fae5; }
          .gate-icon-box.purple { background: #f5f3ff; border: 1px solid #ede9fe; }
          .gate-icon-box.red { background: #fef2f2; border: 1px solid #fee2e2; }

          .home-gate-card h4 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 8px;
          }

          .home-gate-card p {
            font-size: 0.86rem;
            color: #64748b;
            line-height: 1.5;
            margin-bottom: 16px;
            flex-grow: 1;
          }

          .gate-link {
            font-size: 0.82rem;
            font-weight: 700;
            color: var(--teal-600);
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }

          .gate-link.text-red {
            color: #dc2626;
          }

          @media (max-width: 1024px) {
            .home-gateway-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 640px) {
            .home-gateway-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 900px) {
            .footer-grid-clean {
              grid-template-columns: 1fr;
            }
            .footer-nav-columns {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </footer>
    </div>
  );
}
