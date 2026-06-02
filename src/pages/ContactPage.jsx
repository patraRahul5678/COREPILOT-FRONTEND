import React from 'react';
import { Link } from 'react-router-dom';
import './documentationPage.css';
import PageMeta from '../components/PageMeta';

export default function ContactPage() {
  return (
    <div className="go-root">
      <main className="go-main">
        <div className="go-breadcrumb">
          <Link to="/">Home</Link>
          <span className="go-breadcrumb-chevron">›</span>
          <span>Contact</span>
        </div>

        <section className="go-hero">
          <h1 className="go-hero-title">Contact</h1>
          <p className="go-hero-desc">Questions, partnerships, press or security reports — reach out at <a href="mailto:hello@corepilot.online" style={{color:'var(--go-primary)'}}>hello@corepilot.online</a> and we'll respond as soon as possible.</p>
        </section>

        <section className="go-bento-main">
          <div className="go-section-heading">
            <span className="go-section-num">01</span>
            <h2>General Inquiries</h2>
          </div>
          <div className="go-section-body">
            <p>Email us at <a href="mailto:hello@corepilot.online">hello@corepilot.online</a> for general inquiries, partnerships and press. For security reports, use the same address with subject line <strong>Security Report</strong>.</p>
            <p style={{ marginTop: '1rem' }}>You can also follow us on GitHub or join our community channels for updates.</p>
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>

          <PageMeta title="Contact" description="Contact CorePilot for general inquiries, partnerships and security reports." image="/corepilot.png" />
        </section>
      </main>
    </div>
  );
}
