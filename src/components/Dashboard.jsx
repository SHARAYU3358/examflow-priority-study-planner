import React from 'react';

export default function Dashboard({
  totalChapters,
  totalHoursNeeded,
  totalAvailableHours,
  completionPercentage,
  isPlanGenerated
}) {
  const hoursDifference = totalHoursNeeded - totalAvailableHours;
  const isOnTrack = totalAvailableHours >= totalHoursNeeded;

  return (
    <section className="dashboard-section" id="dashboard-section" aria-label="Dashboard Metrics">
      <div className="dashboard-grid">
        {/* Card 1: Total Chapters */}
        <div className="glass-card dashboard-card card-chapters" id="db-card-chapters">
          <span className="dashboard-card-label">Total Chapters</span>
          <div className="dashboard-card-value">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--color-secondary)' }}
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>{totalChapters}</span>
          </div>
        </div>

        {/* Card 2: Total Study Hours Needed */}
        <div className="glass-card dashboard-card card-needed" id="db-card-needed">
          <span className="dashboard-card-label">Total Hours Needed</span>
          <div className="dashboard-card-value">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--color-high)' }}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{totalHoursNeeded}h</span>
          </div>
        </div>

        {/* Card 3: Total Available Hours */}
        <div className="glass-card dashboard-card card-available" id="db-card-available">
          <span className="dashboard-card-label">Total Available Hours</span>
          <div className="dashboard-card-value">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--color-primary)' }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{totalAvailableHours}h</span>
          </div>
        </div>

        {/* Card 4: Status */}
        <div
          className={`glass-card dashboard-card ${
            isOnTrack ? 'card-status-ok' : 'card-status-warn'
          }`}
          id="db-card-status"
        >
          <span className="dashboard-card-label">Status</span>
          <div className="dashboard-card-value">
            {isOnTrack ? (
              <span className="status-badge ok" id="status-badge-ok">
                On Track ✅
              </span>
            ) : (
              <span className="status-badge warn" id="status-badge-warn">
                Need {hoursDifference} Extra Hr{hoursDifference > 1 ? 's' : ''} ⚠️
              </span>
            )}
          </div>
        </div>

        {/* Card 5: Completion Percentage */}
        <div className="glass-card dashboard-card card-progress" id="db-card-completion">
          <span className="dashboard-card-label">Completion Progress</span>
          <div>
            <div className="dashboard-card-value" style={{ marginTop: '0', marginBottom: '0.25rem' }}>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <div className="progress-container">
              <div className="progress-track">
                <div
                  className="progress-bar"
                  id="dashboard-progress-bar"
                  style={{ width: `${Math.min(100, Math.max(0, completionPercentage))}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
