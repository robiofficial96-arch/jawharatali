/**
 * Jawharat Ali Manpower Solutions - Main Application Logic
 * Supports: 3-language switching, RTL layout, category filtering,
 * URL sector pre-selection, and direct WhatsApp quote dispatcher.
 */

function initApp() {
  // 1. Language Dropdown Toggle Logic
  const langContainers = document.querySelectorAll('.lang-dropdown-container');
  langContainers.forEach(container => {
    const toggleBtn = container.querySelector('.lang-dropdown-btn');
    const menu = container.querySelector('.lang-dropdown-menu');
    const chevron = container.querySelector('.chevron-icon');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = menu.classList.contains('hidden');

        // Close all language menus first
        document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.chevron-icon').forEach(c => c.classList.remove('rotate-180'));
        document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));

        if (willOpen) {
          menu.classList.remove('hidden');
          if (chevron) chevron.classList.add('rotate-180');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-dropdown-container')) {
      document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.add('hidden'));
      document.querySelectorAll('.chevron-icon').forEach(c => c.classList.remove('rotate-180'));
      document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.add('hidden'));
      document.querySelectorAll('.chevron-icon').forEach(c => c.classList.remove('rotate-180'));
      document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });

  // Bind language item buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang) {
        setLanguage(selectedLang);
      }
    });
  });

  // Initial Language setup
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  const defaultLang = urlLang || localStorage.getItem('jawharat_lang') || 'en';
  setLanguage(defaultLang);

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('mobileMenuDrawer');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Category Filter Tabs in Services Section
  const filterBtns = document.querySelectorAll('.category-filter-btn, .cat-filter-btn');
  const categoryCards = document.querySelectorAll('.category-card, .service-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-brand-red', 'text-white');
          b.classList.add('bg-slate-100', 'text-slate-700');
        });

        btn.classList.remove('bg-slate-100', 'text-slate-700');
        btn.classList.add('bg-brand-red', 'text-white');

        const filterValue = btn.getAttribute('data-filter');

        categoryCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCat === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 4. URL Parameter Handling for Quote Sector
  const preselectedSector = urlParams.get('sector');
  const sectorSelect = document.getElementById('workerSector') || document.getElementById('formSector');

  if (sectorSelect && sectorSelect.options && preselectedSector) {
    for (let i = 0; i < sectorSelect.options.length; i++) {
      if (sectorSelect.options[i].value.toLowerCase().includes(preselectedSector.toLowerCase())) {
        sectorSelect.selectedIndex = i;
        break;
      }
    }
  }

  // 5. Contact / Quote Form WhatsApp Dispatch
  const quoteForm = document.getElementById('quoteForm') || document.getElementById('manpowerQuoteForm');
  const directWhatsAppBtn = document.getElementById('whatsappBtn');

  function generateWhatsAppMessage() {
    const company = (document.getElementById('companyName') || document.getElementById('formCompany') || {}).value || '';
    const person = (document.getElementById('contactPerson') || document.getElementById('formPerson') || {}).value || '';
    const phone = (document.getElementById('phone') || document.getElementById('formPhone') || {}).value || '';
    const email = (document.getElementById('email') || document.getElementById('formEmail') || {}).value || '';
    const sector = (document.getElementById('workerSector') || document.getElementById('formSector') || {}).value || 'All';
    const count = (document.getElementById('headcount') || document.getElementById('formCount') || {}).value || '10+';
    const duration = (document.getElementById('contractDuration') || document.getElementById('formDuration') || {}).value || '1 Year';
    const message = (document.getElementById('projectDetails') || document.getElementById('formNotes') || {}).value || '';

    const currentLang = document.documentElement.lang || 'en';
    let text = '';

    if (currentLang === 'ar') {
      text = `*طلب توريد عمالة - شركة جوهرة علي*%0A` +
             `----------------------------------%0A` +
             `*المنشأة:* ${encodeURIComponent(company || 'غير محدد')}%0A` +
             `*المسؤول:* ${encodeURIComponent(person || 'غير محدد')}%0A` +
             `*الجوال:* ${encodeURIComponent(phone || 'غير محدد')}%0A` +
             `*البريد:* ${encodeURIComponent(email || 'غير محدد')}%0A` +
             `*المهنة:* ${encodeURIComponent(sector)}%0A` +
             `*العدد المطلوب:* ${encodeURIComponent(count)}%0A` +
             `*مدة العقد:* ${encodeURIComponent(duration)}%0A` +
             `*تفاصيل المشروع:* ${encodeURIComponent(message || 'لا يوجد')}%0A` +
             `----------------------------------%0A` +
             `تم الإرسال عبر الموقع الإلكتروني`;
    } else if (currentLang === 'bn') {
      text = `*ম্যানপাওয়ার রিকুয়েস্ট - জাওহরাত আলী*%0A` +
             `----------------------------------%0A` +
             `*কোম্পানি:* ${encodeURIComponent(company || 'নেই')}%0A` +
             `*যোগাযোগকারী:* ${encodeURIComponent(person || 'নেই')}%0A` +
             `*ফোন:* ${encodeURIComponent(phone || 'নেই')}%0A` +
             `*ইমেইল:* ${encodeURIComponent(email || 'নেই')}%0A` +
             `*ক্যাটাগরি:* ${encodeURIComponent(sector)}%0A` +
             `*সংখ্যা:* ${encodeURIComponent(count)}%0A` +
             `*মেয়াদ:* ${encodeURIComponent(duration)}%0A` +
             `*প্রজেক্টের বিবরণ:* ${encodeURIComponent(message || 'নেই')}%0A` +
             `----------------------------------%0A` +
             `ওয়েবসাইট থেকে প্রেরিত`;
    } else {
      text = `*Manpower Request - Jawharat Ali*%0A` +
             `----------------------------------%0A` +
             `*Company:* ${encodeURIComponent(company || 'N/A')}%0A` +
             `*Contact Person:* ${encodeURIComponent(person || 'N/A')}%0A` +
             `*Phone:* ${encodeURIComponent(phone || 'N/A')}%0A` +
             `*Email:* ${encodeURIComponent(email || 'N/A')}%0A` +
             `*Category:* ${encodeURIComponent(sector)}%0A` +
             `*Quantity:* ${encodeURIComponent(count)}%0A` +
             `*Duration:* ${encodeURIComponent(duration)}%0A` +
             `*Project Details:* ${encodeURIComponent(message || 'None')}%0A` +
             `----------------------------------%0A` +
             `Sent from official website`;
    }

    return `https://wa.me/966501234567?text=${text}`;
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const waUrl = generateWhatsAppMessage();
      window.open(waUrl, '_blank');
    });
  }

  if (directWhatsAppBtn) {
    directWhatsAppBtn.addEventListener('click', () => {
      const waUrl = generateWhatsAppMessage();
      window.open(waUrl, '_blank');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/**
 * Switch system language across entire DOM
 * @param {string} lang - 'en' | 'ar' | 'bn'
 */
function setLanguage(lang) {
  const trans = window.translations || (typeof translations !== 'undefined' ? translations : null);
  if (!trans || !trans[lang]) return;

  // Persist preference
  localStorage.setItem('jawharat_lang', lang);

  // Set HTML root attributes
  const htmlRoot = document.documentElement;
  htmlRoot.lang = lang;
  htmlRoot.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  // Apply translations to all elements with data-i18n
  const dict = trans[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      if (dict[key].includes('<')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Apply placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Apply translations to select option text
  document.querySelectorAll('option[data-i18n]').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      opt.textContent = dict[key];
    }
  });

  // Update button text labels
  const langLabelsDesktop = {
    en: 'English',
    ar: 'العربية',
    bn: 'বাংলা'
  };
  const langLabelsMobile = {
    en: 'EN',
    ar: 'عربي',
    bn: 'বাং'
  };

  document.querySelectorAll('.desktop-lang-text').forEach(el => {
    el.textContent = langLabelsDesktop[lang] || lang.toUpperCase();
  });

  document.querySelectorAll('.mobile-lang-text').forEach(el => {
    el.textContent = langLabelsMobile[lang] || lang.toUpperCase();
  });

  // Update active states on language dropdown items
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const bLang = btn.getAttribute('data-lang');
    const isSelected = (bLang === lang);
    const checkEl = btn.querySelector('.lang-check');
    const dotEl = btn.querySelector('.lang-indicator-dot');

    if (isSelected) {
      btn.classList.add('bg-red-50', 'text-brand-red', 'font-bold');
      btn.classList.remove('text-slate-700', 'font-semibold');
      if (checkEl) checkEl.classList.remove('hidden');
      if (dotEl) {
        dotEl.classList.add('bg-brand-red');
        dotEl.classList.remove('bg-slate-300');
      }
    } else {
      btn.classList.remove('bg-red-50', 'text-brand-red', 'font-bold');
      btn.classList.add('text-slate-700', 'font-semibold');
      if (checkEl) checkEl.classList.add('hidden');
      if (dotEl) {
        dotEl.classList.remove('bg-brand-red');
        dotEl.classList.add('bg-slate-300');
      }
    }
  });

  // Close all language dropdown menus after selection
  document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.add('hidden'));
  document.querySelectorAll('.chevron-icon').forEach(c => c.classList.remove('rotate-180'));
  document.querySelectorAll('.lang-dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
}
