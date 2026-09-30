export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#main">
        <span className="brand-mark" aria-hidden="true">≋</span>
        REP<span className="brand-dot">.</span>
      </a>
      <span className="topbar-label">YOUR PERSONAL WORKOUT SPACE</span>
      <span className="session-badge"><span />Session ready</span>
    </header>
  )
}
