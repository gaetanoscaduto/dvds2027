/*
 * Shared header, navigation and footer for dvds2027.nl
 * ----------------------------------------------------
 * Edit the navigation and contact details HERE (one place for all pages).
 *
 * Each page declares in its <html> tag:
 *   lang="nl" or lang="en"   – language of the page
 *   data-page="home"         – id of the page (see PAGES below)
 * Dutch pages live in the site root, English pages in /en/.
 */

const PAGES = [
  { id: "home",         nl: ["index.html",       "Home"],        en: ["index.html",        "Home"] },
  { id: "call",         nl: ["oproep.html",      "Call for Papers &amp; Panels"],       en: ["call.html",         "Call for Papers &amp; Panels"] },
  { id: "registration", nl: ["registratie.html", "Registratie"],  en: ["registration.html", "Registration"] },
  { id: "sessions",     nl: ["sessies.html",     "Sessies"],      en: ["sessions.html",     "Sessions"] },
  { id: "programme",    nl: ["programma.html",   "Programma"],    en: ["programme.html",    "Programme"] },
  { id: "practical",    nl: ["praktisch.html",   "Praktisch"],    en: ["practical.html",    "Practical"] },
];

const CONTACT = {
  email: "dvds2027@tilburguniversity.edu",
};

const TEXT = {
  nl: {
    org: "Georganiseerd door de afdeling Sociologie van Tilburg University, in samenwerking met de NSV.",
    contact: "Contact",
    menu: "Menu",
    switchLabel: "English",
    switchTitle: "Switch to English",
    lustrum: "Tilburg University: 100 jaar samen",
  },
  en: {
    org: "Organised by the Department of Sociology at Tilburg University, in collaboration with the NSV.",
    contact: "Contact",
    menu: "Menu",
    switchLabel: "Nederlands",
    switchTitle: "Schakel naar Nederlands",
    lustrum: "Tilburg University: 100 years together",
  },
};

(function () {
  const html = document.documentElement;
  const lang = html.lang === "en" ? "en" : "nl";
  const pageId = html.dataset.page || "home";
  const page = PAGES.find((p) => p.id === pageId) || PAGES[0];
  const t = TEXT[lang];
  const root = lang === "en" ? "../" : "";

  // Link to the same page in the other language
  const other = lang === "en" ? "nl" : "en";
  const switchHref = lang === "en" ? "../" + page.nl[0] : "en/" + page.en[0];

  const links = PAGES.map((p) => {
    const [href, label] = p[lang];
    const current = p.id === pageId ? ' aria-current="page"' : "";
    return `<li><a href="${href}"${current}>${label}</a></li>`;
  }).join("");

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="bar">
        <a class="brand" href="index.html">
          <img class="tiu-logo" src="${root}assets/img/tilburg-university-logo-white.svg" alt="Tilburg University" width="141" height="36">
          <span class="divider" aria-hidden="true"></span>
          <span>DvdS <strong>2027</strong></span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">${t.menu}</button>
        <nav id="site-nav" aria-label="${t.menu}">
          <ul class="nav-main">${links}</ul>
          <ul class="nav-side">
            <li><a class="lang" href="${switchHref}" hreflang="${other}" lang="${other}" title="${t.switchTitle}">${t.switchLabel}</a></li>
            <li><a href="https://www.nsv-sociologie.nl/" target="_blank" rel="noopener">NSV</a></li>
          </ul>
        </nav>
      </div>`;
    const btn = header.querySelector(".nav-toggle");
    btn.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="wrap footer-grid">
        <div>
          <a href="https://www.tilburguniversity.edu/" target="_blank" rel="noopener">
            <img class="tiu-logo" src="${root}assets/img/tilburg-university-logo-white.svg" alt="Tilburg University" width="189" height="48">
          </a>
          <p class="footer-title">Dag van de Sociologie 2027</p>
          <p>${t.org}</p>
        </div>
        <div>
          <p class="footer-title">${t.contact}</p>
          <p><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
        </div>
        <div class="footer-logos">
          <a href="https://www.nsv-sociologie.nl/" target="_blank" rel="noopener">NSV</a>
          <a href="https://www.tilburguniversity.edu/" target="_blank" rel="noopener">Tilburg University</a>
        </div>
      </div>`;
  }

  // Tilburg University 100-years pennant, hanging from the top of the banner on every page
  const band = document.querySelector(".hero, .page-head");
  if (band) {
    const img = document.createElement("img");
    img.className = "lustrum";
    img.src = `${root}assets/img/lustrum-${lang}.png`;
    img.alt = t.lustrum;
    band.appendChild(img);
  }

  // Fill any <a data-contact-email> on the page with the contact address
  document.querySelectorAll("[data-contact-email]").forEach((a) => {
    a.href = "mailto:" + CONTACT.email;
    a.textContent = CONTACT.email;
  });
})();
