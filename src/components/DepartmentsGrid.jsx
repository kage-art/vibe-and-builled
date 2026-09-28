import React from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Sparkles, 
  Brain, 
  Activity, 
  Smile, 
  Baby, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export default function DepartmentsGrid({ 
  selectedDepartment, 
  onSelectDepartment 
}) {
  const iconMap = {
    Stethoscope,
    HeartPulse,
    Sparkles,
    Brain,
    Activity,
    Smile,
    Baby,
    ShieldCheck
  };

  return (
    <section className="departments-section-clean">
      <div className="container">
        <div className="section-header-clean">
          <span className="badge badge-teal" style={{ marginBottom: '8px' }}>
            Medical Specialties
          </span>
          <h2>Explore Care by Department</h2>
          <p>
            Filter through verified healthcare departments to find nearby specialized doctors, specialized clinics, and ICU beds.
          </p>
        </div>

        <div className="clean-departments-grid">
          {DEPARTMENTS.map((dept) => {
            const Icon = iconMap[dept.icon] || Stethoscope;
            const isSelected = selectedDepartment === dept.id;

            return (
              <div 
                key={dept.id}
                onClick={() => onSelectDepartment(isSelected ? null : dept.id)}
                className={`clean-dept-card clean-card ${isSelected ? 'selected' : ''}`}
              >
                <div className="card-top-row">
                  <div className="dept-icon-circle">
                    <Icon size={22} color="#0891b2" />
                  </div>
                  <span className="clean-tag">
                    {dept.doctorCount} Doctors
                  </span>
                </div>

                <div className="dept-info-area">
                  <h3 className="clean-dept-name">{dept.name}</h3>
                  <span className="clean-dept-hindi">{dept.hindiName}</span>
                </div>

                <p className="clean-dept-description">{dept.description}</p>

                {/* Symptom Tags */}
                <div className="clean-symptom-tags">
                  {dept.symptoms.slice(0, 3).map((sym, sIdx) => (
                    <span key={sIdx} className="mini-tag">
                      {sym}
                    </span>
                  ))}
                  {dept.symptoms.length > 3 && (
                    <span className="mini-tag more">+{dept.symptoms.length - 3}</span>
                  )}
                </div>

                <div className="dept-card-action">
                  <span className="action-label">{isSelected ? 'Active Filter ✓' : 'View Specialists'}</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {selectedDepartment && (
          <div className="clear-filter-container">
            <span>Filtered by specialty.</span>
            <button className="btn-secondary clear-filter-btn" onClick={() => onSelectDepartment(null)}>
              Reset to All Departments
            </button>
          </div>
        )}
      </div>

      <style>{`
        .departments-section-clean {
          padding: 30px 0 50px;
          background: #f8fafc;
        }

        .clean-departments-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .clean-dept-card {
          padding: 22px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #ffffff;
          border-radius: var(--radius-lg);
          transition: all 0.2s ease;
        }

        .clean-dept-card:hover {
          border-color: var(--teal-500);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(22, 181, 203, 0.12);
        }

        .clean-dept-card.selected {
          border-color: var(--teal-500);
          background: var(--teal-50);
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .dept-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--teal-50);
          border: 1px solid var(--teal-100);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clean-tag {
          font-size: 0.72rem;
          color: var(--text-muted);
          background: #f1f5f9;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .dept-info-area {
          margin-bottom: 8px;
        }

        .clean-dept-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.25;
        }

        .clean-dept-hindi {
          font-size: 0.76rem;
          color: var(--text-muted);
          display: block;
        }

        .clean-dept-description {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .clean-symptom-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 16px;
        }

        .mini-tag {
          font-size: 0.7rem;
          background: #f8fafc;
          border: 1px solid var(--border-light);
          color: var(--text-body);
          padding: 2px 7px;
          border-radius: 4px;
        }

        .mini-tag.more {
          color: var(--teal-700);
          background: var(--teal-50);
          border-color: var(--teal-200);
        }

        .dept-card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--teal-700);
        }

        .clear-filter-container {
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .clear-filter-btn {
          font-size: 0.8rem;
          padding: 6px 14px;
        }

        @media (max-width: 1024px) {
          .clean-departments-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .clean-departments-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
