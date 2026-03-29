// Visitor Counter
let visits = localStorage.getItem("playfuloutings_visits") || 0;
visits = Number(visits) + 1;
localStorage.setItem("playfuloutings_visits", visits);
document.getElementById("visitorCount").textContent = visits.toLocaleString();

// Smooth Scroll for all internal links
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

// Active link highlighting on scroll
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

// GAME CATEGORY FILTER 
const subLinks = document.querySelectorAll('.sub-link');
const gameCategories = document.querySelectorAll('.game-category');

function showCategory(selectedId) {
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


subLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    showCategory(targetId);
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
  });
});


document.querySelectorAll('.dropdown-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    showCategory(targetId);
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
  });
});
// END FILTER 

// Ticker
const tickerEl = document.getElementById("tickerContent");
const locEl = document.getElementById("userLocation");

function updateTicker() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let locationText = locEl.textContent.trim();
  if (locationText === "Detecting...") locationText = "Location: detecting...";
  else if (locationText.includes("denied") || locationText.includes("not available")) locationText = "Location: unavailable";
  else locationText = `Location: ${locationText}`;
  const baseMessage = `Today: ${dateStr} • ${timeStr} • ${locationText}  •  Enjoy your outing!  •  Games create memories  •  Picnic with friends & family!  •  Try a new game today!  •  `;
  tickerEl.textContent = baseMessage + baseMessage;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      locEl.textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)}`;
      updateTicker();
    },
    () => {
      locEl.textContent = "Location access denied";
      updateTicker();
    }
  );
} else {
  locEl.textContent = "Geolocation not available";
  updateTicker();
}

setInterval(updateTicker, 1000);
updateTicker();

//  YOUTUBE LAZY LOAD 
document.querySelectorAll('.yt-lazy').forEach(wrapper => {
  wrapper.addEventListener('click', function () {
    const videoId = this.getAttribute('data-videoid');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media'); 
    this.innerHTML = '';
    this.appendChild(iframe);
  });
});

