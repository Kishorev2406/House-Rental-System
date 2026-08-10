// ================================================================
// HOUSE RENTAL MANAGEMENT SYSTEM — DATA & UTILITIES
// ================================================================

// Tamil Nadu Districts
const TN_DISTRICTS = [
  "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore",
  "Dharmapuri","Dindigul","Erode","Kallakurichi","Kanchipuram",
  "Kanyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai",
  "Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai",
  "Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi",
  "Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli",
  "Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur",
  "Vellore","Viluppuram","Virudhunagar"
];

const PROPERTY_TYPES = ["Apartment","Independent House","Villa","PG/Hostel","Studio","Shop","Office Space"];
const FURNISH_TYPES  = ["Fully Furnished","Semi Furnished","Unfurnished"];
const AMENITY_TYPES  = ["College","Hospital","School","Company","Bus Stop","Railway Station","Market","Temple","Park","Pharmacy"];

// ================================================================
// SEED DATA
// ================================================================
function seedData() {
  if (localStorage.getItem('hrms_seeded')) return;

  const properties = [];

  const owners = [];

  const users = [];

  const bookings = [];

  const payments = [];

  const reviews = [];

  const notifications = [];

  localStorage.setItem('hrms_properties', JSON.stringify(properties));
  localStorage.setItem('hrms_owners', JSON.stringify(owners));
  localStorage.setItem('hrms_users', JSON.stringify(users));
  localStorage.setItem('hrms_bookings', JSON.stringify(bookings));
  localStorage.setItem('hrms_payments', JSON.stringify(payments));
  localStorage.setItem('hrms_reviews', JSON.stringify(reviews));
  localStorage.setItem('hrms_notifications', JSON.stringify(notifications));
  localStorage.setItem('hrms_admin', JSON.stringify({ id:1, username:"117", email:"117", password:"2406", name:"System Admin" }));
  localStorage.setItem('hrms_seeded', '1');
}

// Force update admin credentials
function updateAdminCredentials() {
  localStorage.setItem('hrms_admin', JSON.stringify({ id:1, username:'117', email:'117', password:'2406', name:'System Admin' }));
  // Reset seed so clean data loads on next visit
  if (!localStorage.getItem('hrms_v2')) {
    localStorage.removeItem('hrms_seeded');
    localStorage.setItem('hrms_v2','1');
  }
}

// ================================================================
// GETTERS / SETTERS
// ================================================================
const DB = {
  get: (key) => JSON.parse(localStorage.getItem('hrms_' + key) || (key === 'admin' ? '{}' : '[]')),
  set: (key, val) => localStorage.setItem('hrms_' + key, JSON.stringify(val)),
  getById: (key, id) => DB.get(key).find(i => i.id == id),
  add: (key, item) => { const d = DB.get(key); d.push(item); DB.set(key, d); },
  update: (key, id, updates) => {
    const d = DB.get(key);
    const idx = d.findIndex(i => i.id == id);
    if (idx > -1) { d[idx] = { ...d[idx], ...updates }; DB.set(key, d); }
  },
  remove: (key, id) => DB.set(key, DB.get(key).filter(i => i.id != id))
};

// ================================================================
// AUTH
// ================================================================
const Auth = {
  getUser:  () => JSON.parse(sessionStorage.getItem('hrms_user')  || 'null'),
  getOwner: () => JSON.parse(sessionStorage.getItem('hrms_owner') || 'null'),
  getAdmin: () => JSON.parse(sessionStorage.getItem('hrms_admin') || 'null'),
  setUser:  (u) => sessionStorage.setItem('hrms_user',  JSON.stringify(u)),
  setOwner: (o) => sessionStorage.setItem('hrms_owner', JSON.stringify(o)),
  setAdmin: (a) => sessionStorage.setItem('hrms_admin', JSON.stringify(a)),
  logoutUser:  () => { sessionStorage.removeItem('hrms_user');  window.location.href = 'login.html'; },
  logoutOwner: () => { sessionStorage.removeItem('hrms_owner'); window.location.href = 'login.html'; },
  logoutAdmin: () => { sessionStorage.removeItem('hrms_admin'); window.location.href = 'login.html'; },
  requireUser:  () => { if (!Auth.getUser())  window.location.href = 'login.html'; },
  requireOwner: () => { if (!Auth.getOwner()) window.location.href = 'login.html'; },
  requireAdmin: () => { if (!Auth.getAdmin()) window.location.href = 'login.html'; }
};

// ================================================================
// POPULATE HELPERS
// ================================================================
function populateSelect(id, options, placeholder = 'Select', addAll = false) {
  const sel = document.getElementById(id);
  if (!sel) return;
  sel.innerHTML = addAll
    ? `<option value="">All ${placeholder}</option>`
    : `<option value="">${placeholder}</option>`;
  options.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o; opt.textContent = o;
    sel.appendChild(opt);
  });
}

// ================================================================
// TOAST
// ================================================================
function showToast(msg, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:8px';
    document.body.appendChild(container);
  }
  const colors = { success:'#10b981', error:'#ef4444', warning:'#f59e0b', info:'#2563eb' };
  const icons  = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const toast = document.createElement('div');
  toast.style.cssText = `background:${colors[type]||colors.success};color:#fff;padding:12px 18px;border-radius:10px;font-size:13.5px;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,0.15);min-width:260px;display:flex;align-items:center;gap:8px;animation:slideIn 0.3s ease`;
  toast.innerHTML = `<span>${icons[type]||icons.success}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ================================================================
// STAR RATING RENDER
// ================================================================
function renderStars(rating, size = 14) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<i class="bi bi-star${i <= Math.floor(rating) ? '-fill' : i - 0.5 <= rating ? '-half' : ''}" style="color:#f59e0b;font-size:${size}px"></i>`;
  }
  return html;
}

// ================================================================
// FORMAT CURRENCY
// ================================================================
function formatINR(n) { return '₹' + Number(n).toLocaleString('en-IN'); }

// ================================================================
// GENERATE TRANSACTION ID
// ================================================================
function genTxnId() { return 'TXN' + Date.now() + Math.floor(Math.random()*1000); }

// ================================================================
// ADD NOTIFICATION
// ================================================================
function addNotification(userId, type, title, message) {
  const notifs = DB.get('notifications');
  notifs.push({ id: Date.now(), userId, type, title, message, date: new Date().toLocaleDateString('en-IN'), read: false });
  DB.set('notifications', notifs);
}

// ================================================================
// PROPERTY CARD HTML
// ================================================================
function propertyCardHTML(p, showWish = true) {
  const statusClass = p.status === 'Available' ? 'badge-available' : 'badge-rented';
  const wishlist = Auth.getUser() ? (Auth.getUser().wishlist || []) : [];
  const isWished = wishlist.includes(p.id);
  return `
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="property-card">
      <div class="img-wrap">
        <img src="${p.images[0]}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x220?text=Property'"/>
        <span class="${statusClass} badge-status">${p.status}</span>
        ${showWish ? `<button class="wish-btn" onclick="toggleWishlist(${p.id},this)" title="Save"><i class="bi bi-heart${isWished?'-fill':''}" style="color:${isWished?'#ef4444':'#666'}"></i></button>` : ''}
      </div>
      <div class="card-body">
        <div class="price">${formatINR(p.rent)}<span>/month</span></div>
        <h5 class="prop-title">${p.name}</h5>
        <p class="prop-location"><i class="bi bi-geo-alt"></i>${p.address}</p>
        <div class="prop-features">
          <span><i class="bi bi-door-open"></i>${p.bedrooms} Bed</span>
          <span><i class="bi bi-droplet"></i>${p.bathrooms} Bath</span>
          <span><i class="bi bi-tag"></i>${p.furnished}</span>
          ${p.parking ? '<span><i class="bi bi-p-circle"></i>Parking</span>' : ''}
        </div>
        ${p.rating > 0 ? `<div class="mt-2">${renderStars(p.rating)} <small class="text-muted">(${p.reviews})</small></div>` : ''}
      </div>
      <div class="card-footer-btns">
        <a href="property-detail.html?id=${p.id}" class="btn btn-primary btn-sm flex-fill">View Details</a>
        ${Auth.getUser() ? `<a href="booking.html?id=${p.id}" class="btn btn-secondary btn-sm flex-fill">Book Now</a>` : ''}
      </div>
    </div>
  </div>`;
}

// ================================================================
// WISHLIST TOGGLE
// ================================================================
function toggleWishlist(propId, btn) {
  const user = Auth.getUser();
  if (!user) { window.location.href = 'user-login.html'; return; }
  const users = DB.get('users');
  const idx = users.findIndex(u => u.id === user.id);
  if (!users[idx].wishlist) users[idx].wishlist = [];
  const wi = users[idx].wishlist.indexOf(propId);
  if (wi > -1) {
    users[idx].wishlist.splice(wi, 1);
    btn.querySelector('i').className = 'bi bi-heart';
    btn.querySelector('i').style.color = '#666';
    showToast('Removed from wishlist', 'info');
  } else {
    users[idx].wishlist.push(propId);
    btn.querySelector('i').className = 'bi bi-heart-fill';
    btn.querySelector('i').style.color = '#ef4444';
    showToast('Added to wishlist ❤️');
  }
  DB.set('users', users);
  Auth.setUser(users[idx]);
}

// ================================================================
// DARK MODE
// ================================================================
function initDarkMode() {
  const dark = localStorage.getItem('hrms_dark') === '1';
  if (dark) document.body.classList.add('dark-mode');
  const btn = document.getElementById('darkModeBtn');
  if (btn) {
    btn.innerHTML = dark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
    btn.onclick = () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('hrms_dark', isDark ? '1' : '0');
      btn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
    };
  }
}

// ================================================================
// SIDEBAR TOGGLE (mobile)
// ================================================================
function initSidebar() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar   = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.onclick = () => sidebar.classList.toggle('open');
  }
}

// ================================================================
// INIT
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  seedData();
  updateAdminCredentials();
  initDarkMode();
  initSidebar();
});

// CSS animation for toast
const style = document.createElement('style');
style.textContent = `@keyframes slideIn { from { transform: translateX(100%); opacity:0; } to { transform: translateX(0); opacity:1; } }`;
document.head.appendChild(style);
