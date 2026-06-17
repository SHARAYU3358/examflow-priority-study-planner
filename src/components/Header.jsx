import React from 'react';

export default function Header() {
  return (
    <header className="app-header" id="app-header">
      <h1 className="app-title" id="app-title">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--color-primary)', filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))' }}
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.2" />
        </svg>
        ExamFlow
      </h1>
      <p className="app-subtitle" id="app-subtitle">
        Automatically generate a study schedule based on chapter priorities and track your progress before exams.
      </p>
    </header>
  );
}
