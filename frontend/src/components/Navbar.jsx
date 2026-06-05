export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="logo-box"></div>

        <div>
          <h1>VASOSCAN</h1>
          <p>AI Cardiovascular Intelligence</p>
        </div>
      </div>

      <div className="nav-links">
        <a href="#">Technology</a>
        <a href="#">Features</a>
        <a href="#">Research</a>
        <a href="#">About</a>
      </div>
    </nav>
  );
}