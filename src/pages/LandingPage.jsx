import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './LandingPage.css';
import PageMeta from '../components/PageMeta';

const TERMINAL_LINES = [
  '> [GITHUB] PR_OPENED: feature/auth-refactor by dev@team.io',
  '> [KAFKA] EVENT_INGESTED: pr.events → topic_partition_03',
  '> [AI] UNDERSTANDING_LAYER: context_detected, entities_extracted',
  '> [AI] MATCHING: jira_ticket_linked → PROJ-4421',
  '> [AI] ANALYSIS: code_change_impact → 3 services affected',
  '> [AI] RISK_ENGINE: security_risk_detected → severity_HIGH',
  '> [AI] FIX_GEN: suggested_fix_generated → line_142.js',
  '> [LLM] ORCHESTRATION: prompt_dispatched → gemini-pro',
  '> [LLM] RESPONSE_VALIDATED: latency_1.2s cost_optimized',
  '> [OUTPUT] PR_COMMENT_POSTED: ownership_insights + risk_summary',
  '> [GITHUB] CHECK_RUN_UPDATED: status → requires_review',
  '> [JIRA] TICKET_UPDATED: PROJ-4421 linked to PR #88',
  '> [SLACK] NOTIFICATION_SENT: #eng-reviews channel',
  '> [DB] VECTOR_STORED: code_embedding saved → milvus',
  '> [DB] KNOWLEDGE_GRAPH_UPDATED: team_ownership refreshed',
  '> [SYS] MEMORY_LAYER: historical_pr_pattern_learned',
];

const FEATURES = [
  {
    mod: 'MOD_01',
    icon: 'hub',
    title: 'Event Ingestion',
    desc: 'Webhooks from GitHub, Jira, Slack and Confluence are streamed through Apache Kafka into dedicated event topics for real-time processing.',
    protocol: 'PROTOCOL: KAFKA_STREAM_INGEST',
  },
  {
    mod: 'MOD_02',
    icon: 'psychology',
    title: 'AI Intelligence Engine',
    desc: 'Eight specialised layers — Understanding, Matching, Analysis, Memory, Risk Detection, Fix Generation, LLM Orchestration and Output Structuring.',
    protocol: 'PROTOCOL: COREPILOT_ENGINE_V1',
  },
  {
    mod: 'MOD_03',
    icon: 'shield',
    title: 'Risk Detection',
    desc: 'Automatically surfaces security, performance, reliability and compliance risks in every PR with exact file locations and severity levels.',
    protocol: 'PROTOCOL: RISK_SCAN_DELTA',
  },
  {
    mod: 'MOD_04',
    icon: 'group',
    title: 'Ownership Insights',
    desc: 'Analyses changed files, commit history and team membership to suggest the right reviewers and flag unclear code ownership instantly.',
    protocol: 'PROTOCOL: OWNERSHIP_MAP_V2',
  },
];

const PRICING_FEATURES = [
  'GitHub + Jira + Slack Integration',
  'AI Risk Detection & Fix Suggestions',
  'Team Ownership Insights',
  'VS Code Extension + Dashboard',
];

const BAR_SETS = [
  [40, 75, 33, 100, 66, 50],
  [60, 45, 80, 55, 90, 35],
  [70, 30, 95, 40, 60, 85],
  [50, 88, 42, 72, 38, 65],
];

function AnimatedBars() {
  const [setIdx, setSetIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSetIdx(i => (i + 1) % BAR_SETS.length), 1800);
    return () => clearInterval(t);
  }, []);
  const heights = BAR_SETS[setIdx];
  return (
    <div className="bar-chart-container">
      {heights.map((h, i) => (
        <div
          key={i}
          className="bar"
          style={{
            height: `${h}%`,
            backgroundColor: `rgba(255,122,0,${(h / 100) * 0.7 + 0.15})`,
            transition: 'height 0.6s ease, background-color 0.6s ease',
          }}
        />
      ))}
    </div>
  );
}

const PIPELINE_STATES = [
  [
    { id: 'UNDERSTANDING', status: 'DONE',   cls: 'thread-active'  },
    { id: 'MATCHING',      status: 'DONE',   cls: 'thread-active'  },
    { id: 'ANALYSIS',      status: 'ACTIVE', cls: 'thread-waiting' },
    { id: 'LLM_ORCH',      status: 'QUEUED', cls: 'thread-idle'    },
  ],
  [
    { id: 'UNDERSTANDING', status: 'DONE',   cls: 'thread-active'  },
    { id: 'MATCHING',      status: 'DONE',   cls: 'thread-active'  },
    { id: 'ANALYSIS',      status: 'DONE',   cls: 'thread-active'  },
    { id: 'LLM_ORCH',      status: 'ACTIVE', cls: 'thread-waiting' },
  ],
  [
    { id: 'UNDERSTANDING', status: 'DONE',   cls: 'thread-active'  },
    { id: 'MATCHING',      status: 'DONE',   cls: 'thread-active'  },
    { id: 'ANALYSIS',      status: 'DONE',   cls: 'thread-active'  },
    { id: 'LLM_ORCH',      status: 'DONE',   cls: 'thread-active'  },
  ],
  [
    { id: 'UNDERSTANDING', status: 'ACTIVE', cls: 'thread-waiting' },
    { id: 'MATCHING',      status: 'QUEUED', cls: 'thread-idle'    },
    { id: 'ANALYSIS',      status: 'QUEUED', cls: 'thread-idle'    },
    { id: 'LLM_ORCH',      status: 'QUEUED', cls: 'thread-idle'    },
  ],
];

function AnimatedPipeline() {
  const [stateIdx, setStateIdx] = useState(0);
  const [progress, setProgress] = useState(42);

  useEffect(() => {
    const t = setInterval(() => {
      setStateIdx(i => (i + 1) % PIPELINE_STATES.length);
      setProgress(p => {
        const next = p + Math.floor(Math.random() * 18) + 8;
        return next > 100 ? 12 : next;
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const layers = PIPELINE_STATES[stateIdx];
  return (
    <>
      <div className="thread-list">
        {layers.map(t => (
          <div key={t.id} className="thread-row">
            <span className="thread-label">{t.id}</span>
            <span className={t.cls}>{t.status}</span>
          </div>
        ))}
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%`, transition: 'width 0.8s ease' }}
        />
      </div>
    </>
  );
}

function Header({ isMobile }) {
  return (
    <header className={`header${isMobile ? ' header--mobile' : ''}`}>
      <div className="header-nav">
        <Link to="/" className="header-logo" aria-label="CorePilot home">
          <span className="header-logo-icon">
            <img src="../corepilot.png" alt="CorePilot Logo" loading="eager" height={200} />
          </span>
          <div className="header-logo-text-wrapper">
            <span className="header-logo-text">
              CORE<span className="header-logo-accent">PILOT</span>
            </span>
          </div>
        </Link>
        <div className="header-links">
          <Link to="/" className="header-link-active">Platform</Link>
          <Link to="/documentation" className="header-link">Docs</Link>
          <Link to="/contact" className="header-link">Contact</Link>
        </div>
        <div className="header-actions">
          <button className="btn-login" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}>Login</button>
          <button
            className="btn-get-access"
            onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Access
          </button>
        </div>
      </div>
      <div className="header-divider" />
    </header>
  );
}

function Hero() {
  const tripled = [...TERMINAL_LINES, ...TERMINAL_LINES];
  return (
    <section className="hero-section terminal-grid">
      <div className="hero-bg-overlay">
        <div className="hero-bg-text animate-scroll-terminal">
          {tripled.map((line, i) => (
            <div key={i} className="hero-bg-line">{line}</div>
          ))}
        </div>
      </div>
      <div className="hero-gradient-overlay" />

      <div className="hero-content">
        {/* Status badge — IN PROGRESS */}
        <div className="hero-badge">
          <span className="hero-badge-dot hero-badge-dot--pulse" />
          <span className="hero-badge-text">In Progress · Coming Very Soon</span>
        </div>

        <h1 className="hero-title">
          Engineering, <span className="hero-title-accent">Elevated</span>
        </h1>
        <p className="hero-subtitle">
          CorePilot connects to GitHub, Jira, Slack and Confluence — ingesting every PR, ticket and decision through an AI engine that detects risk, maps ownership and delivers fixes in real time.
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request Early Access
          </button>
          <button
            className="btn-secondary"
            onClick={() => (window.location.href = '/documentation')}
          >
            View Documentation
          </button>
        </div>
      </div>

      {/* Floating terminal windows */}
      <div className="hero-terminal-side hero-terminal-right">
        <div className="hero-terminal-window">
          <div className="hero-terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
          </div>
          <div className="hero-terminal-body">
            <div className="hero-terminal-scroll">
              {tripled.map((line, i) => <div key={i} className="hero-terminal-line">{line}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-terminal-side hero-terminal-left">
        <div className="hero-terminal-window hero-terminal-small">
          <div className="hero-terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
          </div>
          <div className="hero-terminal-body">
            <div className="hero-terminal-scroll hero-terminal-scroll-slow">
              {tripled.map((line, i) => <div key={i} className="hero-terminal-line">{line}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-terminal-side hero-terminal-bottom-left">
        <div className="hero-terminal-window hero-terminal-tiny">
          <div className="hero-terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
          </div>
          <div className="hero-terminal-body">
            <div className="hero-terminal-scroll hero-terminal-scroll-fast">
              {tripled.map((line, i) => <div key={i} className="hero-terminal-line">{line}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-terminal-side hero-terminal-top-right">
        <div className="hero-terminal-window hero-terminal-tiny">
          <div className="hero-terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
          </div>
          <div className="hero-terminal-body">
            <div className="hero-terminal-scroll hero-terminal-scroll-medium">
              {tripled.map((line, i) => <div key={i} className="hero-terminal-line">{line}</div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-inner">
        <div className="features-header">
          <div>
            <h2 className="features-title">System Capabilities</h2>
            <p className="features-subtitle">COREPILOT_ENGINE_MODULES_STABLE_V1.0</p>
          </div>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.mod} className="feature-card">
              <div className="feature-card-top">
                <span className="material-symbols-outlined feature-icon">{f.icon}</span>
                <span className="feature-mod">{f.mod}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <div className="feature-protocol">
                <span className="feature-protocol-dot" />
                {f.protocol}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Agent Status ──────────────────────────────────────────────────────────────
function AgentStatusSection() {
  return (
    <section className="agent-section">
      <div className="agent-grid">

        {/* Card 1 — Risk Engine with animated bars */}
        <div className="agent-card">
          <div className="agent-card-top">
            <div>
              <h3 className="agent-card-title">PR_Risk_Engine</h3>
              <p className="agent-card-id-primary">MODULE: 3.5_RISK_DETECTION</p>
            </div>
            <span className="material-symbols-outlined agent-icon-primary material-symbols-filled">security</span>
          </div>
          <AnimatedBars />
          <div className="agent-stats-row">
            <span>STATUS: IN PROGRESS</span>
            <span>COMING SOON</span>
          </div>
          <div className="agent-terminal-log">
            &gt; Building risk detection engine...<br />
            &gt; LLM integration in progress...<br />
            &gt; ETA: very soon.
          </div>
        </div>

        {/* Card 2 — AI Pipeline with animated layers */}
        <div className="agent-card">
          <div className="agent-card-top">
            <div>
              <h3 className="agent-card-title">Intelligence_Engine</h3>
              <p className="agent-card-id-tertiary">MODULE: 3.0_AI_PIPELINE</p>
            </div>
            <span className="material-symbols-outlined agent-icon-tertiary material-symbols-filled">psychology</span>
          </div>
          <AnimatedPipeline />
        </div>

        {/* Card 3 — Kafka ingestion */}
        <div className="agent-card">
          <div className="agent-card-top">
            <div>
              <h3 className="agent-card-title">Event_Ingestion</h3>
              <p className="agent-card-id-error">MODULE: 2.0_KAFKA_STREAM</p>
            </div>
            <span className="material-symbols-outlined agent-icon-error material-symbols-filled">hub</span>
          </div>
          <div className="data-ingress-visual">
            <img
              className="data-ingress-img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZYVRWLj-6aV8dH68KCDJIs_Ai4VOySXsQE2ip1_sYSLMLlYnzotQKG2KE5plIompL6DSsw-33jjTOLht1fiiXaMTKwPC0ZAADJnSPc0uZv9H7TK1M2o9O9c2-lLY9ZlCcbSHHBBBg1fZRduFtMFNXWc5xgPG-tBpTk5MisSAhRCLMsMp8hGVeJAk7MeRbks70w2-FnWDRjyH8XPkTNVLCur-kENvv58ZYbqaC1vXKnR78wknKkobyBfEV97Enq-S9ef0hKKl-BxA"
              alt="abstract technical schematic of server clusters"
              loading="lazy"
              width="300"
              height="128"
            />
            <div className="data-ingress-overlay">
              <div className="data-ingress-stat">
                <span className="data-ingress-number">5 Topics</span>
                <span className="data-ingress-label">pr · jira · slack · doc · user</span>
              </div>
            </div>
          </div>
          <div className="data-badges">
            <span className="data-badge">KAFKA: ONLINE</span>
            <span className="data-badge">FLINK: ACTIVE</span>
          </div>
        </div>

      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="pricing-section">
      <div className="pricing-inner">
        <div className="pricing-terminal">
          <div className="pricing-terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
            <span className="terminal-title">corepilot_licensing_v1.terminal</span>
            <div style={{ width: '3rem' }} />
          </div>
          <div className="pricing-body">
            <div className="pricing-grid">
              <div>
                <h2 className="pricing-plan-title">Pro License</h2>
                <p className="pricing-desc">
                  Full access to the CorePilot AI engine — connect GitHub, Jira, Slack and Confluence, get real-time risk detection, ownership insights and suggested fixes on every PR.
                </p>
                <ul className="pricing-features">
                  {PRICING_FEATURES.map((feat) => (
                    <li key={feat} className="pricing-feature-item">
                      <span className="material-symbols-outlined pricing-check-icon">check</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blurred price block */}
              <div className="pricing-right">
                <div className="pricing-price-block" style={{ position: 'relative' }}>
                  <span className="pricing-tier-label">Tier Pricing</span>
                  <div className="pricing-price-row" style={{ filter: 'blur(8px)', userSelect: 'none' }}>
                    <span className="pricing-amount">$299</span>
                    <span className="pricing-period">/MO</span>
                  </div>
                  <span
                    className="pricing-annual-note"
                    style={{ filter: 'blur(6px)', userSelect: 'none' }}
                  >
                    BILLED ANNUALLY (SAVE 20%)
                  </span>
                  {/* Coming Soon overlay on top of blurred price */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    paddingTop: '1.2rem',
                  }}>
                    <span style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#FF7A00',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>Coming Soon</span>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '9px',
                      color: 'rgba(226,226,226,0.45)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}>Pricing TBD · Join waitlist</span>
                  </div>
                </div>

                <button
                  className="btn-purchase"
                  disabled
                  style={{ opacity: 0.35, cursor: 'not-allowed' }}
                >
                  Purchase Authorization
                </button>
                <p className="pricing-disclaimer">
                  PRICING WILL BE ANNOUNCED AT LAUNCH. JOIN THE WAITLIST BELOW TO GET NOTIFIED FIRST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [email, setEmail]           = useState('');
  const [status, setStatus]         = useState('idle'); // idle | loading | success | duplicate | error
  const [message, setMessage]       = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef                = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!captchaToken) {
      setStatus('error');
      setMessage('Please complete the reCAPTCHA verification.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/waitlist`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, recaptchaToken: captchaToken }),
        }
      );

      const data = await res.json();

      // Reset captcha regardless of outcome
      recaptchaRef.current?.reset();
      setCaptchaToken(null);

      if (res.status === 201) {
        setStatus('success');
        setMessage("You're on the waitlist! Check your inbox — we've sent you a confirmation. We'll notify you the moment CorePilot launches.");
        setEmail('');
      } else if (res.status === 409) {
        setStatus('duplicate');
        setMessage("You're already on the waitlist! We'll be in touch very soon.");
      } else if (res.status === 429) {
        setStatus('error');
        setMessage('Too many attempts. Please wait 15 minutes and try again.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please try again later.');
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  const statusColor = {
    success:   '#22c55e',
    duplicate: '#FF7A00',
    error:     '#ffb4ab',
    loading:   'rgba(226,226,226,0.5)',
  };

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <section className="cta-section" id="cta-section">
      <h2 className="cta-title">
        Ready to <span className="cta-accent">Ship Safer?</span>
      </h2>
      <p className="cta-subtitle">
        Connect CorePilot to your GitHub org in minutes. Every PR gets instant AI-powered risk analysis, ownership mapping and suggested fixes — no workflow changes required.
      </p>
      <div className="cta-form-wrapper">
        <div className="cta-gradient-border">
          <form className="cta-form-inner" onSubmit={handleSubmit} noValidate>
            <span className="cta-form-label">Request early access</span>
            <div className="cta-input-group">
              <input
                type="email"
                className="cta-input"
                placeholder="USER@DOMAIN.COM"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); setMessage(''); }}
                disabled={isDisabled}
              />
              <button
                type="submit"
                className="cta-submit"
                disabled={isDisabled}
                style={status === 'loading' ? { opacity: 0.6, cursor: 'wait' } : {}}
              >
                {status === 'loading' ? '...' : status === 'success' ? '✓ Done' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* reCAPTCHA widget */}
      {status !== 'success' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
            theme="dark"
            onChange={token => { setCaptchaToken(token); setStatus('idle'); setMessage(''); }}
            onExpired={() => { setCaptchaToken(null); }}
          />
        </div>
      )}

      {/* Feedback message */}
      {message && (
        <p style={{
          marginTop: '1rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: statusColor[status] || 'rgba(226,226,226,0.6)',
          textAlign: 'center',
          maxWidth: '32rem',
          margin: '1rem auto 0',
          lineHeight: 1.6,
        }}>
          {status === 'success' && '✓  '}
          {status === 'error'   && '✗  '}
          {message}
        </p>
      )}
    </section>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">COREPILOT</Link>
          <div className="footer-copyright">
            © {new Date().getFullYear()} CorePilot. All rights reserved.
          </div>
        </div>
        <div className="footer-links">
          {[
            { label: 'Privacy', to: '/privacy' },
            { label: 'Terms', to: '/terms' },
            { label: 'Security', to: '/security' },
            { label: 'Documentation', to: '/documentation' },
            { label: 'Contact', to: '/contact' },
          ].map(({ label, to }) => (
            to.startsWith('/') ? (
              <Link key={label} to={to} className="footer-link">{label}</Link>
            ) : (
              <a key={label} href={to} className="footer-link" rel="noopener noreferrer">{label}</a>
            )
          ))}
        </div>
        <div className="footer-socials">
          {['terminal', 'code'].map((icon) => (
            <button key={icon} className="footer-social-btn">
              <span className="material-symbols-outlined footer-social-icon">{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    let timeoutId;
    const onResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <PageMeta title="CorePilot" description="CorePilot connects to GitHub, Jira, Slack and Confluence — ingesting events and delivering AI-powered risk analysis, ownership insights and suggested fixes." image="/corepilot.png" />
      <Header isMobile={isMobile} />
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <Hero />
        <FeaturesSection />
        <AgentStatusSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
