import React from "react";

function Header() {
  return (
    <div>
      <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center">
          <h1 class="logo me-auto">
            <a href="index.php">Covid Cases</a>
          </h1>

          <nav id="navbar" class="navbar order-last order-lg-0">
            <ul>
              <li>
                <a class="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#services">
                  Cases (City)
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#departments">
                  Data
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#faq">
                  Prevention
                </a>
              </li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
          {/* <a href="/data" class="appointment-btn scrollto">
            <span class="d-none d-md-inline">Data Table</span>
          </a> */}
        </div>
      </header>
    </div>
  );
}

export default Header;
