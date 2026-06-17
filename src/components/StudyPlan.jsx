import React from 'react';

export default function StudyPlan({
  studyPlan,
  daysRemaining,
  totalHoursNeeded,
  totalAvailableHours,
  onToggleTask
}) {
  const isOverLimit = totalHoursNeeded > totalAvailableHours;
  const hoursDifference = totalHoursNeeded - totalAvailableHours;

  if (!studyPlan || studyPlan.length === 0) {
    return (
      <section className="glass-card" id="study-plan-section" aria-labelledby="study-plan-title">
        <h2 className="section-title" id="study-plan-title">Generated Study Plan</h2>
        <div className="empty-state" id="study-plan-empty-state">
          <span className="empty-state-icon">🗓️</span>
          <p>Configure your parameters and click "Generate Study Plan" to see your personalized schedule here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="glass-card" id="study-plan-section" aria-labelledby="study-plan-title">
      <h2 className="section-title" id="study-plan-title">Generated Study Plan</h2>

      {/* Over Limit Warning Banner */}
      {isOverLimit && (
        <div className="alert-banner warning" id="schedule-warning-banner" role="alert">
          <span className="alert-banner-icon">⚠️</span>
          <div className="alert-banner-content">
            <div className="alert-banner-title">Schedule Warning</div>
            <p>
              Your chapters require a total of <strong>{totalHoursNeeded} hours</strong>, which exceeds the{' '}
              <strong>{totalAvailableHours} available hours</strong>. An additional{' '}
              <strong>{hoursDifference} hour{hoursDifference > 1 ? 's' : ''}</strong> of study is needed. 
              The schedule has been fully generated, but days exceeding your limit are highlighted below.
            </p>
          </div>
        </div>
      )}

      <div className="study-plan-grid" id="study-plan-grid">
        {studyPlan.map((dayPlan) => {
          const isDayOverdue = dayPlan.day > daysRemaining;
          const totalDayHours = dayPlan.tasks.reduce((sum, task) => sum + task.hours, 0);

          return (
            <div
              className={`glass-card day-card ${isDayOverdue ? 'day-overdue' : ''}`}
              key={dayPlan.day}
              id={`day-card-${dayPlan.day}`}
            >
              <div className="day-card-header">
                <span>Day {dayPlan.day} {isDayOverdue && ' (Extra Day ⚠️)'}</span>
                <span className="day-card-hours">{totalDayHours} hr{totalDayHours !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="day-tasks-list">
                {dayPlan.tasks.map((task) => {
                  const badgeClass = task.priority.toLowerCase();
                  return (
                    <div
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      key={task.id}
                      id={`task-item-${task.id}`}
                    >
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          id={`checkbox-task-${task.id}`}
                          checked={task.completed}
                          onChange={() => onToggleTask(task.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                      
                      <div className="task-content">
                        <span className={`task-name ${task.completed ? 'line-through' : ''}`}>
                          {task.chapterName}
                        </span>
                        <div className="task-meta">
                          <span className={`priority-badge ${badgeClass}`}>{task.priority}</span>
                          <span className="task-duration">{task.hours} hr{task.hours !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
