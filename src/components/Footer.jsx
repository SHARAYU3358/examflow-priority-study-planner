import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer" id="app-footer" role="contentinfo">
      <div className="footer-dev-info">
        <p className="footer-dev-name" id="footer-dev-name">
          Full Name:Sharayu Tathe
        </p>
        <p className="footer-dev-email" id="footer-dev-email">
          Email:sharayutathe@gmail.com 
        </p>
      </div>
      <a
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link-btn"
        id="btn-digital-heroes"
      >
        Built for Digital Heroes
      </a>
    </footer>
  );
}
