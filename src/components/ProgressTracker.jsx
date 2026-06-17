import React from 'react';

export default function ProgressTracker({
  completedTasksCount,
  remainingTasksCount,
  progressPercentage,
  isPlanGenerated
}) {
  if (!isPlanGenerated) {
    return (
      <section className="glass-card" id="progress-tracker-section" aria-labelledby="progress-tracker-title">
        <h2 className="section-title" id="progress-tracker-title">Progress Tracker</h2>
        <div className="empty-state" id="progress-empty-state">
          <span className="empty-state-icon">📈</span>
          <p>Generate a plan to track your task completion and visual progress.</p>
        </div>
      </section>
    );
  }

  const totalTasks = completedTasksCount + remainingTasksCount;

  return (
    <section className="glass-card" id="progress-tracker-section" aria-labelledby="progress-tracker-title">
      <h2 className="section-title" id="progress-tracker-title">Progress Tracker</h2>
      
      <div className="progress-tracker-layout" id="progress-tracker-layout">
        {/* Progress Bar Display */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '0.5rem'
            }}
          >
            <span className="form-label">Task Completion Rate</span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--color-secondary)'
              }}
              id="progress-tracker-percent-text"
            >
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="progress-container">
            <div className="progress-track" style={{ height: '14px' }}>
              <div
                className="progress-bar"
                id="progress-tracker-bar"
                style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="progress-stats-grid">
          <div className="progress-stat-card" id="stat-completed-tasks">
            <span className="progress-stat-label">Completed Tasks</span>
            <div className="progress-stat-value success" id="completed-tasks-count">
              {completedTasksCount}
            </div>
          </div>

          <div className="progress-stat-card" id="stat-remaining-tasks">
            <span className="progress-stat-label">Remaining Tasks</span>
            <div className="progress-stat-value pending" id="remaining-tasks-count">
              {remainingTasksCount}
            </div>
          </div>

          <div className="progress-stat-card" id="stat-total-tasks">
            <span className="progress-stat-label">Total Tasks</span>
            <div className="progress-stat-value percentage" id="total-tasks-count">
              {totalTasks}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
