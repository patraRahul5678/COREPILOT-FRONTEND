import React from 'react';
import { Link } from 'react-router-dom';
import './documentationPage.css';
import PageMeta from '../components/PageMeta';

export default function SecurityPage() {
  return (
    <div className="go-root">
      <main className="go-main">
        <div className="go-breadcrumb">
          <Link to="/">Home</Link>
          <span className="go-breadcrumb-chevron">›</span>
          <span>Security</span>
        </div>

        <section className="go-hero">
          <h1 className="go-hero-title">Security</h1>
          <p className="go-hero-desc">Security is a priority. Below are current policies and responsible disclosure instructions.</p>
        </section>

        <section className="go-bento-main">
          <div className="go-section-heading">
            <span className="go-section-num">01</span>
            <h2>Security Commitment</h2>
          </div>
          <div className="go-section-body">
            <ul>
              <li>CorePilot takes security seriously</li>
              <li>Use secure HTTP headers on the server (HSTS, X-Frame-Options, Referrer-Policy).</li>
              <li>We follow industry-standard practices to protect customer data and infrastructure.</li>
            </ul>
          </div>

          <div className="go-section-heading">
            <span className="go-section-num">02</span>
            <h2>Responsible Disclosure</h2>
          </div>
          <div className="go-section-body">
            <p>If you discover a security vulnerability, please report it privately to <a href="mailto:hello@corepilot.online">hello@corepilot.online</a>. We will investigate and address verified issues promptly.</p>
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>
          <PageMeta title="Security" description="Security practices, responsible disclosure and best practices for CorePilot." image="/corepilot.png" />
        </section>
      </main>
    </div>
  );
}
