import React from "react";

function MostHeader() {
  return (
    <div>
      {" "}
      <div id="topbar" class="d-flex align-items-center fixed-top">
        <div class="container d-flex justify-content-between">
          <div class="contact-info d-flex align-items-center">
            <i class="bi bi-envelope"></i>{" "}
            <a
              href="https://doh.gov.ph/central-office-directory"
              target="_blank"
            >
              callcenter@doh.gov.ph
            </a>
            <i class="bi bi-phone"></i>(632) 8651-7800; local 5003-5004 (632)
            165-364
          </div>
          <div class="d-none d-lg-flex social-links align-items-center">
            <a
              href="https://twitter.com/DOHgovph"
              target="_blank"
              class="twitter"
            >
              <i class="bi bi-twitter"></i>
            </a>
            <a
              href="https://www.facebook.com/DOHgovPH"
              target="_blank"
              class="facebook"
            >
              <i class="bi bi-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/doh.philippines/"
              target="_blank"
              class="instagram"
            >
              <i class="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostHeader;
