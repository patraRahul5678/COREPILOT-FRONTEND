import React from 'react';
import { Link } from 'react-router-dom';
import './documentationPage.css';
import PageMeta from '../components/PageMeta';

export default function StatusPage() {
  const services = [
    { key: 'Frontend', status: 'Operational', cls: 'go-val-primary' },
    { key: 'API', status: 'Degraded', cls: 'go-val-tertiary' },
    { key: 'Auth', status: 'Operational', cls: 'go-val-primary' },
    { key: 'Webhook Processor', status: 'Maintenance', cls: '' },
  ];

  return (
    <div className="go-root">
      <main className="go-main">
        <div className="go-breadcrumb">
          <Link to="/">Home</Link>
          <span className="go-breadcrumb-chevron">›</span>
          <span>System Status</span>
        </div>

        <section className="go-hero">
          <h1 className="go-hero-title">System Status</h1>
          <p className="go-hero-desc">Current operational status for core systems. This is a static snapshot for demonstration.</p>
        </section>

        <section className="go-bento-main">
          <div className="go-section-heading">
            <span className="go-section-num">01</span>
            <h2>Service Status</h2>
          </div>
          <div className="go-section-body">
            <div className="go-status-list">
              {services.map(s => (
                <div key={s.key} className="go-status-row">
                  <div>
                    <div className="go-status-key">{s.key}</div>
                    <div className="go-status-val">{s.status}</div>
                  </div>
                  <div style={{ minWidth: 120, textAlign: 'right' }}>
                    <small className={s.cls}>{s.status}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>
          <PageMeta title="System Status" description="Operational status for CorePilot services." image="/corepilot.png" />
        </section>
      </main>
    </div>
  );
}
