import React from 'react';
import { Link } from 'react-router-dom';
import './documentationPage.css';
import PageMeta from '../components/PageMeta';

export default function TermsPage() {
  return (
    <div className="go-root">
      <main className="go-main">
        <div className="go-breadcrumb">
          <Link to="/">Home</Link>
          <span className="go-breadcrumb-chevron">›</span>
          <span>Terms of Service</span>
        </div>

        <section className="go-hero">
          <h1 className="go-hero-title">Terms of Service</h1>
          <p className="go-hero-desc">CorePilot is provided on an as-is basis during the early access period. Users agree not to misuse the platform or attempt unauthorized access to systems or data. For questions contact <a href="mailto:hello@corepilot.online" style={{color:'var(--go-primary)'}}>hello@corepilot.online</a>.</p>
        </section>

        <section className="go-bento-main">
          <div className="go-section-heading">
            <span className="go-section-num">01</span>
            <h2>Acceptable Use</h2>
          </div>
          <div className="go-section-body">
            <p>Do not use CorePilot to perform illegal activities or to harm others. Respect applicable laws and regulations.</p>
          </div>

          <div className="go-section-heading">
            <span className="go-section-num">02</span>
            <h2>Limitation of Liability</h2>
          </div>
          <div className="go-section-body">
            <p>CorePilot is provided as-is. We disclaim liability to the extent permitted by law. These are placeholder terms for demonstration.</p>
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>
          <PageMeta title="Terms of Service" description="Terms and acceptable use for CorePilot during early access." image="/corepilot.png" />
        </section>
      </main>
    </div>
  );
}
