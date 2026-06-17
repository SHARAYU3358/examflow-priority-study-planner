import React from 'react';
import ChapterTable from './ChapterTable';

export default function InputSection({
  daysRemaining,
  hoursPerDay,
  chapters,
  errors,
  onChangeDays,
  onChangeHours,
  onAddChapter,
  onUpdateChapter,
  onRemoveChapter,
  onGeneratePlan,
  onResetEverything
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onGeneratePlan();
  };

  return (
    <section className="glass-card" id="input-section" aria-labelledby="input-section-title">
      <h2 className="section-title" id="input-section-title">Planning Parameters</h2>
      
      {/* Validation Errors Banner */}
      {errors && errors.length > 0 && (
        <div className="alert-banner error" id="validation-alert" role="alert">
          <span className="alert-banner-icon">🛑</span>
          <div className="alert-banner-content">
            <div className="alert-banner-title">Input Validation Errors</div>
            <ul className="alert-banner-list">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} id="planner-form">
        <div className="input-section-layout">
          {/* Global Parameters */}
          <div className="global-settings-grid">
            <div className="form-group">
              <label htmlFor="days-remaining-input" className="form-label">
                Days Remaining
              </label>
              <input
                type="number"
                id="days-remaining-input"
                className="form-input"
                min="1"
                placeholder="e.g. 5"
                value={daysRemaining || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  onChangeDays(val);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hours-per-day-input" className="form-label">
                Study Hours Per Day
              </label>
              <input
                type="number"
                id="hours-per-day-input"
                className="form-input"
                min="1"
                placeholder="e.g. 3"
                value={hoursPerDay || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  onChangeHours(val);
                }}
                required
              />
            </div>
          </div>

          {/* Chapters Table */}
          <ChapterTable
            chapters={chapters}
            onAddChapter={onAddChapter}
            onUpdateChapter={onUpdateChapter}
            onRemoveChapter={onRemoveChapter}
          />

          {/* Form Actions */}
          <div className="action-buttons">
            <div className="left-actions">
              <button
                type="submit"
                className="btn btn-primary"
                id="btn-generate-plan"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Generate Study Plan
              </button>
            </div>
            
            <button
              type="button"
              className="btn btn-secondary btn-danger-hover"
              id="btn-reset-everything"
              onClick={onResetEverything}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Reset Everything
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
