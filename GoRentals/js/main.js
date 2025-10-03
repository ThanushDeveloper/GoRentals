/* GoRentals Main JS */
(function () {
  function qs(selector, parent) {
    return (parent || document).querySelector(selector);
  }
  function qsa(selector, parent) {
    return Array.from((parent || document).querySelectorAll(selector));
  }
  function on(el, event, handler) {
    if (el) el.addEventListener(event, handler);
  }
  function getParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  }

  function initBookingForm() {
    const form = qs('#bookingForm');
    if (!form) return;

    const modalEl = qs('#bookingModal');
    const modal = modalEl ? new bootstrap.Modal(modalEl) : null;

    on(form, 'submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const summary = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        vehicle: formData.get('vehicle') || 'Any',
        pickupLocation: formData.get('pickupLocation'),
        dropLocation: formData.get('dropLocation'),
        pickupDate: formData.get('pickupDate'),
        dropDate: formData.get('dropDate')
      };

      const summaryList = `
        <li><strong>Name:</strong> ${summary.name}</li>
        <li><strong>Phone:</strong> ${summary.phone}</li>
        <li><strong>Vehicle:</strong> ${summary.vehicle}</li>
        <li><strong>Pickup:</strong> ${summary.pickupLocation} on ${summary.pickupDate}</li>
        <li><strong>Drop:</strong> ${summary.dropLocation} on ${summary.dropDate}</li>
      `;
      const container = qs('#bookingSummary');
      if (container) container.innerHTML = summaryList;

      if (modal) modal.show();
    });

    const vehicleFromParam = getParam('vehicle');
    if (vehicleFromParam) {
      const vehicleInput = qs('#vehicleName');
      if (vehicleInput) {
        vehicleInput.value = vehicleFromParam;
        vehicleInput.readOnly = true;
      }
    }
  }

  function initVehiclesFilters() {
    const container = qs('#vehiclesContainer');
    if (!container) return;

    const cards = qsa('.vehicle-card', container);
    const searchInput = qs('#vehicleSearch');
    const filterLinks = qsa('[data-filter]');

    function applyFilters() {
      const term = (searchInput?.value || '').trim().toLowerCase();
      const activeFilter = qs('[data-filter].active')?.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const type = card.getAttribute('data-type');
        const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const matchesType = activeFilter === 'all' || type === activeFilter;
        const matchesTerm = !term || title.includes(term);
        card.style.display = (matchesType && matchesTerm) ? '' : 'none';
      });
    }

    filterLinks.forEach(link => {
      on(link, 'click', function (e) {
        e.preventDefault();
        filterLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        applyFilters();
      });
    });

    on(searchInput, 'input', applyFilters);

    const filterParam = getParam('type');
    if (filterParam) {
      const target = qs(`[data-filter="${filterParam}"]`);
      if (target) {
        target.click();
      }
    }
  }

  function initBookButtons() {
    qsa('[data-book]').forEach(btn => {
      on(btn, 'click', function () {
        const vehicle = btn.getAttribute('data-book');
        window.location.href = `booking.html?vehicle=${encodeURIComponent(vehicle)}`;
      });
    });

    const bookThis = qs('#bookThisButton');
    if (bookThis) {
      on(bookThis, 'click', function () {
        const vehicle = bookThis.getAttribute('data-vehicle') || 'Selected Vehicle';
        window.location.href = `booking.html?vehicle=${encodeURIComponent(vehicle)}`;
      });
    }
  }

  function initAuth() {
    const loginForm = qs('#loginForm');
    if (loginForm) {
      on(loginForm, 'submit', function (e) {
        e.preventDefault();
        alert('Login successful. Redirecting to dashboard...');
        setTimeout(() => (window.location.href = 'user-dashboard.html'), 600);
      });
    }
    const registerForm = qs('#registerForm');
    if (registerForm) {
      on(registerForm, 'submit', function (e) {
        e.preventDefault();
        alert('Registration successful. Redirecting to dashboard...');
        setTimeout(() => (window.location.href = 'user-dashboard.html'), 600);
      });
    }
    const logoutBtn = qs('#logoutBtn');
    if (logoutBtn) {
      on(logoutBtn, 'click', function () {
        if (confirm('Are you sure you want to logout?')) {
          window.location.href = 'login.html';
        }
      });
    }
  }

  function initAdmin() {
    const adminLoginForm = qs('#adminLoginForm');
    if (adminLoginForm) {
      on(adminLoginForm, 'submit', function (e) {
        e.preventDefault();
        alert('Welcome, Admin!');
        setTimeout(() => (window.location.href = 'admin-dashboard.html'), 500);
      });
    }

    qsa('.btn-approve').forEach(btn => {
      on(btn, 'click', function () {
        alert('Booking approved');
      });
    });
    qsa('.btn-cancel').forEach(btn => {
      on(btn, 'click', function () {
        if (confirm('Cancel this booking?')) alert('Booking canceled');
      });
    });

    qsa('.btn-delete-vehicle').forEach(btn => {
      on(btn, 'click', function () {
        if (confirm('Delete this vehicle?')) alert('Vehicle deleted');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initBookingForm();
    initVehiclesFilters();
    initBookButtons();
    initAuth();
    initAdmin();
  });
})();
