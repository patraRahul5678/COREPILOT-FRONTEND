import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import "./documentationPage.css";
import PageMeta from '../components/PageMeta';

const NAV_LINKS = ["Docs", "Contact"];

const SIDEBAR_LINKS = [
  { icon: "info", label: "Introduction" },
  { icon: "account_tree", label: "Architecture" },
  { icon: "category", label: "Integrations" },
  { icon: "lock", label: "Security" },
  { icon: "map", label: "Roadmap" },
];

const SIDEBAR_BOTTOM = [
  { icon: "help", label: "Support", href: "/contact" },
];


const PAGES = {
  Introduction: {
    breadcrumb: "Introduction",
    heroTitle: ["AI-POWERED CODE", "INTELLIGENCE &"],
    heroHighlight: "CONTEXT PLATFORM",
    heroDesc:
      "CorePilot triggers on a GitHub PR open, fetches context from Jira, Slack, Docs and Confluence, and posts risk detection, suggested fixes and reviewer recommendations as a PR comment.",
    section: {
      num: "01",
      heading: "WHAT IS COREPILOT?",
      body:
        "CorePilot is an AI engine that fires on PR open events. It fetches context from your tools, runs it through the Intelligence Engine, and posts structured insights back to GitHub. No dashboards. Insights land where the code is.",
    },
    code: null,
    codeLabel: null,
    statusItems: [
      { label: "Current MVP", value: "1 — PR Chat", accent: "tertiary" },
      { label: "Trigger", value: "PR Opened", accent: "" },
      { label: "Output", value: "GitHub Comment", accent: "primary" },
    ],
    principles: [
      {
        icon: "hub",
        title: "Context First",
        desc: "CorePilot fetches matched Jira tickets, Slack threads, Confluence pages and design docs before analysis. Insights reflect team decisions, not just the diff.",
      },
      {
        icon: "rate_review",
        title: "Insights In The PR",
        desc: "One structured GitHub comment per PR: risky files with line numbers, suggested fixes, impacted services and reviewer recommendations.",
      },
    ],
  },

  Architecture: {
    breadcrumb: "Architecture",
    heroTitle: ["SYSTEM", ""],
    heroHighlight: "ARCHITECTURE",
    heroDesc:
      "Six-layer event-driven pipeline: Trigger → Ingestion → Context Fetch → Intelligence Engine → Output Generation → GitHub Delivery.",
    section: {
      num: "01",
      heading: "END-TO-END FLOW",
      body:
        "PR opens → webhook validated and queued → Jira, Slack, Confluence and Git fetchers run in parallel → Intelligence Engine analyses all context → structured insights posted as a GitHub PR comment.",
    },
    code: `TRIGGER
  Pull Request Opened
        ↓
EVENT INGESTION
  Webhook → Validation → Queue
        ↓
CONTEXT FETCHER  (parallel)
  Git · Jira · Slack · Confluence / Docs
        ↓
INTELLIGENCE ENGINE
  Code Analyzer · Risk Detector
  Conversation Analyzer · Historical Analyzer
        ↓
OUTPUT GENERATION
  Risky Files · Suggested Fixes
  Impacted Areas · Recommendations
        ↓
DELIVERY — GitHub PR Comment`,
    codeLabel: "// PIPELINE",
    statusItems: [
      { label: "Input", value: "PR Opened", accent: "tertiary" },
      { label: "Context Sources", value: "4", accent: "" },
      { label: "Output", value: "PR Comment", accent: "primary" },
    ],
    principles: [
      {
        icon: "bolt",
        title: "Parallel Fetch",
        desc: "All four context fetchers run concurrently. No sequential waiting.",
      },
      {
        icon: "memory",
        title: "Intelligence Engine",
        desc: "Runs code analysis, risk detection (High/Medium/Low), conversation analysis and historical comparison to produce one structured output per PR.",
      },
    ],
  },

  Integrations: {
    breadcrumb: "Integrations",
    heroTitle: ["CONTEXT FROM", "YOUR"],
    heroHighlight: "TOOLS",
    heroDesc:
      "GitHub is the trigger and the only output channel in MVP 1. Jira, Slack, Confluence and Docs are read-only context sources that feed the Intelligence Engine.",
    section: {
      num: "01",
      heading: "INTEGRATION ROLES — MVP 1",
      body:
        "GitHub fires the event and receives the comment. Jira tickets are matched by ticket ID, file path keywords and semantic similarity. Slack fetches from developer-selected channels. Confluence and Docs provide architecture and decision context. None of the non-GitHub sources receive write-back in MVP 1.",
    },
    code: `GitHub      — Trigger + Output (PR comment)
Jira        — Context  (read-only)
Slack       — Context  (read-only, selected channels)
Confluence  — Context  (read-only)
Google Docs — Context  (read-only)`,
    codeLabel: "// MVP 1 ROLES",
    statusItems: [
      { label: "Trigger", value: "GitHub PR", accent: "tertiary" },
      { label: "Context", value: "Jira · Slack · Docs", accent: "" },
      { label: "Output", value: "GitHub Only", accent: "primary" },
    ],
    principles: [
      {
        icon: "search",
        title: "Smart Jira Matching",
        desc: "Matches by ticket ID in commit/PR/branch, file path keywords and semantic similarity.",
      },
      {
        icon: "forum",
        title: "Selective Slack Access",
        desc: "Only channels and DMs the developer explicitly connects are read. No broad workspace access.",
      },
    ],
  },

  Security: {
    breadcrumb: "Security",
    heroTitle: ["SECURITY &", ""],
    heroHighlight: "COMPLIANCE",
    heroDesc:
      "CorePilot is built with security as a first-class concern — OAuth authentication, encrypted transport, RBAC, data isolation and PII masking are standard.",
    section: {
      num: "01",
      heading: "SECURITY MODEL",
      body:
        "All connections use OAuth / App authentication. Data in transit is encrypted via TLS 1.2+. Tokens are encrypted at rest (AES-256). Access is controlled per workspace with role-based permissions. PII and secrets in code or conversations are masked before processing. Audit logs capture all activity.",
    },
    code: `Authentication   OAuth / GitHub App
Encryption       AES-256 at rest · TLS 1.2+ in transit
Access Control   RBAC — per user / team / role
Data Isolation   Per workspace / organisation
PII Handling     Sensitive data masked before AI processing
Audit Logs       All events logged for compliance`,
    codeLabel: "// SECURITY OVERVIEW",
    statusItems: [
      { label: "Auth", value: "OAuth / App", accent: "tertiary" },
      { label: "Encryption", value: "AES-256 · TLS", accent: "" },
      { label: "Access", value: "RBAC", accent: "primary" },
    ],
    principles: [
      {
        icon: "shield",
        title: "Data Isolation",
        desc: "Each workspace's data is fully isolated. No cross-tenant data access is possible.",
      },
      {
        icon: "visibility_off",
        title: "PII & Secret Masking",
        desc: "Sensitive data — tokens, keys, personal information — is detected and masked before being passed to any AI provider.",
      },
    ],
  },


  Roadmap: {
    breadcrumb: "Roadmap",
    heroTitle: ["WHAT COMES", "AFTER"],
    heroHighlight: "MVP 1",
    heroDesc:
      "MVP 1 is live as GitHub PR comments. MVP 2 is the VS Code extension. MVP 3 is the CorePilot IDE.",
    section: {
      num: "01",
      heading: "THREE-PHASE ROADMAP",
      body:
        "MVP 1 posts insights to GitHub on every PR open. MVP 2 brings the same insights into VS Code — inline annotations, sidebar panel, chat assistant, one-click fixes. MVP 3 is a fully AI-native IDE with PR/ticket view, risk dashboard and agent mode.",
    },
    code: `MVP 1  PR Chat Integration     ✓ In Progress
  GitHub PR Comment on every PR open

MVP 2  VS Code Extension         coming next
  Inline annotations · Sidebar · Chat · Fix apply

MVP 3  CorePilot IDE             future
  AI-native editor · Risk dashboard · Agent mode`,
    codeLabel: "// ROADMAP",
    statusItems: [
      { label: "MVP 1", value: "In Progress", accent: "primary" },
      { label: "MVP 2", value: "VS Code Ext.", accent: "tertiary" },
      { label: "MVP 3", value: "CorePilot IDE", accent: "" },
    ],
    principles: [
      {
        icon: "extension",
        title: "MVP 2 — VS Code",
        desc: "Inline risky-line annotations, sidebar insights panel, chat assistant and one-click fix application — all inside VS Code.",
      },
      {
        icon: "terminal",
        title: "MVP 3 — CorePilot IDE",
        desc: "AI-native editor with built-in PR/ticket view, risk dashboard, knowledge graph and autonomous agent mode.",
      },
    ],
  },
};



const SEARCH_INDEX = Object.entries(PAGES).map(([key, p]) => ({
  key,
  label: key,
  text: [
    p.breadcrumb,
    p.heroTitle.join(" "),
    p.heroHighlight,
    p.heroDesc,
    p.section.heading,
    p.section.body,
    p.code ?? "",
    ...p.principles.map((pr) => pr.title + " " + pr.desc),
  ]
    .join(" ")
    .toLowerCase(),
}));

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("Introduction");
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const searchResults = searchQuery.trim()
    ? SEARCH_INDEX.filter((item) => item.text.includes(searchQuery.trim().toLowerCase()))
    : [];

  const page = PAGES[activeSection];

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
        setFooterCollapsed(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  //CTRL+K focuses search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.closest(".go-search-wrap")?.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleCopy = () => {
    if (!page.code) return;
    navigator.clipboard.writeText(page.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSectionChange = (label) => {
    if (PAGES[label]) {
      setActiveSection(label);
      setFeedback(null);
      setCopied(false);
      setSidebarOpen(false);
    }
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="go-root">
      <PageMeta title={`Docs · ${page.breadcrumb}`} description={page.heroDesc} image="/corepilot.png" />
      {/* TopNavBar */}
      <header className="go-header">
        <div className="go-header-left">
          <button
            className="go-hamburger go-icon-btn material-symbols-outlined"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? "close" : "menu"}
          </button>
          <Link to="/" className="go-logo">COREPILOT</Link>
          {isMobile && (
            <Link to="/" className="go-back-home" title="Back to Home">
              <span className="material-symbols-outlined">home</span>
            </Link>
          )}
          <nav className="go-top-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                to={link === 'Contact' ? '/contact' : '/doct'}
                className="go-top-nav-link"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
        <div className="go-header-right">
          <div className="go-search-wrap">
            <div className="go-search-box">
              <span className="material-symbols-outlined go-search-icon">search</span>
              <input
                ref={searchRef}
                type="text"
                placeholder="SEARCH DOCS..."
                className="go-search-input"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
              />
              <span className="go-search-kbd">CTRL+K</span>
            </div>
            {searchOpen && searchQuery.trim() && (
              <div className="go-search-dropdown">
                {searchResults.length === 0 ? (
                  <div className="go-search-empty">NO RESULTS FOR "{searchQuery.toUpperCase()}"</div>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.key}
                      className="go-search-result"
                      onClick={() => {
                        handleSectionChange(item.key);
                        setSearchQuery("");
                        setSearchOpen(false);
                      }}
                    >
                      <span className="material-symbols-outlined go-search-result-icon">article</span>
                      <span>{item.label}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          <button className="go-icon-btn go-icon-btn--disabled material-symbols-outlined" disabled title="Terminal (coming soon)">terminal</button>
        </div>
      </header>

      <div className="go-body">
        {/* Overlay — only rendered on mobile when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div className="go-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* SideNavBar */}
        <aside className={`go-sidebar${sidebarOpen ? " go-sidebar--open" : ""}`}>
          <div className="go-sidebar-brand">
            <div className="go-sidebar-brand-row">
              <div className="go-brand-dot" />
              <span className="go-sidebar-title">DOCUMENTATION</span>
            </div>
            <span className="go-sidebar-version">v1.0.0-stable</span>
          </div>

          <nav className="go-sidebar-nav">
            {SIDEBAR_LINKS.map(({ icon, label }) => (
              <button
                key={label}
                onClick={() => handleSectionChange(label)}
                className={`go-sidebar-link${activeSection === label ? " active" : ""}`}
                style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
              >
                <span className="material-symbols-outlined go-sidebar-icon">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="go-sidebar-bottom">
            {SIDEBAR_BOTTOM.map(({ icon, label, href }) => (
              <Link key={label} to={href} className="go-sidebar-link">
                <span className="material-symbols-outlined go-sidebar-icon">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="go-main">
          {/* Breadcrumbs */}
          <nav className="go-breadcrumb">
            <Link to="/doct">Docs</Link>
            <span className="material-symbols-outlined go-breadcrumb-chevron">chevron_right</span>
            <span>{page.breadcrumb}</span>
          </nav>

          {/* Hero */}
          <section className="go-hero">
            <div className="go-hero-accent" />
            <h1 className="go-hero-title">
              {page.heroTitle[0]}<br />
              {page.heroTitle[1] && <>{page.heroTitle[1]}<br /></>}
              <span className="go-hero-highlight">{page.heroHighlight}</span>
            </h1>
            <p className="go-hero-desc">{page.heroDesc}</p>
            {/* last-updated removed from UI; kept in meta via PageMeta when needed */}
          </section>

          {/* Bento Grid */}
          <div className="go-bento">
            {/* Main card */}
            <div className="go-bento-main">
              <h2 className="go-section-heading">
                <span className="go-section-num">{page.section.num}</span>{" "}
                {page.section.heading}
              </h2>
              <p className="go-section-body">{page.section.body}</p>

              {page.code && (
                <div className="go-code-block">
                  <div className="go-code-label">{page.codeLabel}</div>
                  <button
                    className={`go-copy-btn material-symbols-outlined${copied ? " copied" : ""}`}
                    onClick={handleCopy}
                    title="Copy"
                  >
                    {copied ? "check" : "content_copy"}
                  </button>
                  <pre className="go-pre">
                    <code>{page.code}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Status card */}
            <div className="go-bento-status">
              <div className="go-status-label">STATUS_REPORT</div>
              <div className="go-status-list">
                {page.statusItems.map(({ label, value, accent }) => (
                  <div key={label} className="go-status-row">
                    <span className="go-status-key">{label}</span>
                    <span className={`go-status-val${accent ? ` go-val-${accent}` : ""}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="go-status-image">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4QuipcKGfblNBGYbzfKrIdZEbtVG-7Hx3PTLv0a7ltrgt8fhcDS8A1fToYoJ48NrLHtCbfhnk1Ky99F4ktCA5DpHvr8W2reNZpfpDtd-rvBml_w1udleQFZk18T_BDghq_3vpdeLhBWAjIFZmpKZ2wghq0NzTkA2DDEgz9vDgThwjNHMBn5wDTxT_OYs-5EGt0Q8LjC5qlBfZduuQS6UluwGy4alQMWfqwRpfJ5PYHDhxQpRne_euiFWHUlCz1epl4PhV-fy6068"
                  alt="Server circuit board"
                />
                <div className="go-status-image-fade" />
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <section className="go-principles">
            <h2 className="go-principles-title">CORE PRINCIPLES</h2>
            <div className="go-principles-grid">
              {page.principles.map(({ icon, title, desc }) => (
                <div key={title} className="go-principle-item">
                  <div className="go-principle-header">
                    <div className="go-principle-icon-box">
                      <span className="material-symbols-outlined go-principle-icon">{icon}</span>
                    </div>
                    <h3 className="go-principle-title">{title}</h3>
                  </div>
                  <p className="go-principle-desc">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Feedback */}
          <section className="go-feedback">
            <div className="go-feedback-card">
              {!feedback ? (
                <>
                  <div>
                    <h4 className="go-feedback-title">WAS THIS PAGE HELPFUL?</h4>
                    <p className="go-feedback-sub">
                      Your feedback helps us improve the CorePilot documentation.
                    </p>
                  </div>
                  <div className="go-feedback-btns">
                    <button
                      className="go-feedback-btn"
                      onClick={() => handleFeedback("yes")}
                    >
                      <span className="material-symbols-outlined">thumb_up</span> YES
                    </button>
                    <button
                      className="go-feedback-btn"
                      onClick={() => handleFeedback("no")}
                    >
                      <span className="material-symbols-outlined">thumb_down</span> NO
                    </button>
                  </div>
                </>
              ) : (
                <div className="go-feedback-thanks">
                  <span className="material-symbols-outlined go-feedback-check">check_circle</span>
                  <div>
                    <h4 className="go-feedback-title">
                      {feedback === "yes" ? "THANK YOU!" : "THANKS FOR YOUR FEEDBACK"}
                    </h4>
                    <p className="go-feedback-sub">
                      {feedback === "yes" 
                        ? "We're glad this page was helpful."
                        : "We'll work on improving this page."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className={`go-footer${isMobile && footerCollapsed ? " go-footer--collapsed" : ""}`}>
        <div className="go-footer-top">
          <span className="go-footer-copy">
            © {new Date().getFullYear()} COREPILOT. ALL RIGHTS RESERVED.
          </span>
          {isMobile && (
            <button
              className="go-footer-toggle go-icon-btn material-symbols-outlined"
              onClick={() => setFooterCollapsed((c) => !c)}
              aria-label="Toggle footer"
            >
              {footerCollapsed ? "expand_less" : "expand_more"}
            </button>
          )}
        </div>
        <div className="go-footer-links">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Security", href: "/security" },
          ].map(({ label, href }) => (
            <Link key={label} to={href} className="go-footer-link">
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
