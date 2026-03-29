// ==================== VISITOR COUNTER ====================
let visits = localStorage.getItem("playfuloutings_visits") || 0;
visits = Number(visits);
if (isNaN(visits)) visits = 0; // Guard against corrupted localStorage
visits += 1;
localStorage.setItem("playfuloutings_visits", visits);
document.getElementById("visitorCount").textContent = visits.toLocaleString();

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==================== ACTIVE NAV ON SCROLL ====================
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ==================== GAME CATEGORY FILTER ====================
const subLinks = document.querySelectorAll('.sub-link');
const gameCategories = document.querySelectorAll('.game-category');

function showCategory(selectedId) {
  // Guard: only act if the category actually exists
  const target = document.getElementById(selectedId);
  if (!target || !target.classList.contains('game-category')) return;

  gameCategories.forEach(cat => {
    cat.style.display = (cat.id === selectedId) ? 'block' : 'none';
  });
  subLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + selectedId) {
      link.classList.add('active');
    }
  });
}

// Hide all categories first, then show indoor by default
gameCategories.forEach(cat => { cat.style.display = 'none'; });
showCategory('indoor');

// Sub-nav clicks
subLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    showCategory(targetId);
    const gamesSection = document.getElementById('games');
    if (gamesSection) gamesSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Dropdown link clicks
document.querySelectorAll('.dropdown-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    showCategory(targetId);
    const gamesSection = document.getElementById('games');
    if (gamesSection) gamesSection.scrollIntoView({ behavior: 'smooth' });
  });
});
// ==================== END FILTER ====================

// ==================== TICKER ====================
const tickerEl = document.getElementById("tickerContent");
const locEl = document.getElementById("userLocation");

function updateTicker() {
  if (!tickerEl || !locEl) return; // Guard: elements must exist
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let locationText = locEl.textContent.trim();
  if (!locationText || locationText === "Detecting your location...") locationText = "Location: detecting...";
  else if (locationText.includes("denied") || locationText.includes("not available")) locationText = "Location: unavailable";
  else locationText = `Location: ${locationText}`;
  const baseMessage = `Today: ${dateStr} • ${timeStr} • ${locationText}  •  Enjoy your outing!  •  Games create memories  •  Picnic with friends & family!  •  Try a new game today!  •  `;
  tickerEl.textContent = baseMessage + baseMessage;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      if (locEl) locEl.textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)}`;
      updateTicker();
    },
    () => {
      if (locEl) locEl.textContent = "Location access denied";
      updateTicker();
    }
  );
} else {
  if (locEl) locEl.textContent = "Geolocation not available";
  updateTicker();
}

setInterval(updateTicker, 1000);
updateTicker();

// ==================== YOUTUBE LAZY LOAD ====================
document.querySelectorAll('.yt-lazy').forEach(wrapper => {
  wrapper.addEventListener('click', function () {
    // Guard: prevent double-click creating multiple iframes
    if (this.querySelector('iframe')) return;
    const videoId = this.getAttribute('data-videoid');
    if (!videoId) return; // Guard: no video ID, do nothing
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    this.innerHTML = '';
    this.appendChild(iframe);
  });
});
// ==================== END YOUTUBE LAZY LOAD ====================
