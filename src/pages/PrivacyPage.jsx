import React from 'react';
import { Link } from 'react-router-dom';
import './documentationPage.css';
import PageMeta from '../components/PageMeta';

export default function PrivacyPage() {
  return (
    <div className="go-root">
      <main className="go-main">
        <div className="go-breadcrumb">
          <Link to="/">Home</Link>
          <span className="go-breadcrumb-chevron">›</span>
          <span>Privacy Policy</span>
        </div>

        <section className="go-hero">
          <h1 className="go-hero-title">Privacy Policy</h1>
          <p className="go-hero-desc">This Privacy Policy explains how CorePilot collects, uses, and protects personal information.</p>
        </section>

        <section className="go-bento-main">
          <div className="go-section-heading">
            <span className="go-section-num">01</span>
            <h2>Information We Collect</h2>
          </div>
          <div className="go-section-body">
            <p>We collect only the information necessary to provide early access and product updates.</p>
            <ul>
              <li><strong>Name</strong></li>
              <li><strong>Email Address</strong></li>
            </ul>
          </div>

          <div className="go-section-heading">
            <span className="go-section-num">02</span>
            <h2>How We Use Information</h2>
          </div>
          <div className="go-section-body">
            <ul>
              <li>Early access invitations</li>
              <li>Product updates and important announcements</li>
            </ul>
            <p>We retain this information only as long as necessary to provide the service and communicate launch details. Current waitlist storage is local to your browser (<code>localStorage</code>) for this demo; production deployments should use secure, access-controlled storage on the server.</p>
          </div>

          <div className="go-section-heading">
            <span className="go-section-num">03</span>
            <h2>Data Sharing</h2>
          </div>
          <div className="go-section-body">
            <p>We do not sell personal information. We will not share your personal data with third parties except as required to provide the service or when you give explicit consent.</p>
          </div>

          <div className="go-section-heading">
            <span className="go-section-num">04</span>
            <h2>Contact</h2>
          </div>
          <div className="go-section-body">
            <p>For privacy questions or requests, contact us at <a href="mailto:hello@corepilot.online">hello@corepilot.online</a>.</p>
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>
          <PageMeta title="Privacy Policy" description="How CorePilot collects and uses waitlist and contact information." image="/corepilot.png" />
        </section>
      </main>
    </div>
  );
}
