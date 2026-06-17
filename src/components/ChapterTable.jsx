import React from 'react';

export default function ChapterTable({
  chapters,
  onAddChapter,
  onUpdateChapter,
  onRemoveChapter
}) {
  return (
    <div className="chapter-list-container" id="chapter-list-container">
      <h3 className="form-label" style={{ marginBottom: '0.5rem' }}>Chapters to Prepare</h3>
      
      {chapters.length === 0 ? (
        <div className="empty-state" id="chapters-empty-state">
          <span className="empty-state-icon">📚</span>
          <p>No chapters added yet. Add a chapter below to start planning.</p>
        </div>
      ) : (
        chapters.map((chapter, index) => (
          <div className="chapter-row" key={chapter.id} id={`chapter-row-${chapter.id}`}>
            {/* Chapter Name Input */}
            <div className="form-group">
              <label htmlFor={`chapter-name-${chapter.id}`} className="form-label">
                Chapter {index + 1} Name
              </label>
              <input
                type="text"
                id={`chapter-name-${chapter.id}`}
                className="form-input"
                placeholder="e.g. Algebra, Organic Chemistry"
                value={chapter.name}
                onChange={(e) => onUpdateChapter(chapter.id, 'name', e.target.value)}
                required
              />
            </div>

            {/* Priority Dropdown */}
            <div className="form-group">
              <label htmlFor={`chapter-priority-${chapter.id}`} className="form-label">
                Priority
              </label>
              <select
                id={`chapter-priority-${chapter.id}`}
                className="form-select"
                value={chapter.priority}
                onChange={(e) => onUpdateChapter(chapter.id, 'priority', e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Min Hours Required */}
            <div className="form-group">
              <label htmlFor={`chapter-hours-${chapter.id}`} className="form-label">
                Min Hours Needed
              </label>
              <input
                type="number"
                id={`chapter-hours-${chapter.id}`}
                className="form-input"
                min="1"
                placeholder="Hours"
                value={chapter.hoursRequired || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  onUpdateChapter(chapter.id, 'hoursRequired', val);
                }}
                required
              />
            </div>

            {/* Delete Button */}
            <button
              type="button"
              className="btn btn-danger btn-icon-only"
              id={`btn-remove-chapter-${chapter.id}`}
              onClick={() => onRemoveChapter(chapter.id)}
              title="Remove Chapter"
              aria-label="Remove Chapter"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        ))
      )}

      <div style={{ marginTop: '0.5rem' }}>
        <button
          type="button"
          className="btn btn-secondary"
          id="btn-add-chapter"
          onClick={onAddChapter}
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Chapter
        </button>
      </div>
    </div>
  );
}
