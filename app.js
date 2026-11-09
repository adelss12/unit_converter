/**
 * ==========================================================================
 * محول الوحدات الشامل (Universal Unit Converter) - Mobile Progressive Web App
 * كود منظم، نظيف (Clean Code)، موثق بالكامل ويدعم أفضل ممارسات الويب والجوال
 * ==========================================================================
 */

// هيكل بيانات الفئات والوحدات بدقة متناهية
const UNIT_CATEGORIES = {
  length: {
    id: 'length',
    name: 'الطول والمسافة',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12h20M7 12v-3M12 12v-5M17 12v-3"/></svg>`,
    baseUnit: 'm',
    defaultFrom: 'm',
    defaultTo: 'cm',
    units: {
      m: { id: 'm', name: 'متر', symbol: 'م', en: 'Meter', rate: 1.0 },
      cm: { id: 'cm', name: 'سنتيمتر', symbol: 'سم', en: 'Centimeter', rate: 0.01 },
      mm: { id: 'mm', name: 'مليمتر', symbol: 'مم', en: 'Millimeter', rate: 0.001 },
      km: { id: 'km', name: 'كيلومتر', symbol: 'كم', en: 'Kilometer', rate: 1000.0 },
      in: { id: 'in', name: 'بوصة', symbol: 'بوصة', en: 'Inch', rate: 0.0254 },
      ft: { id: 'ft', name: 'قدم', symbol: 'قدم', en: 'Foot', rate: 0.3048 },
      yd: { id: 'yd', name: 'ياردة', symbol: 'ياردة', en: 'Yard', rate: 0.9144 },
      mi: { id: 'mi', name: 'ميل', symbol: 'ميل', en: 'Mile', rate: 1609.344 }
    }
  },
  mass: {
    id: 'mass',
    name: 'الوزن والكتلة',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="6" r="3"/><path d="M6.2 19a7 7 0 0 1 11.6 0M12 9v10"/></svg>`,
    baseUnit: 'kg',
    defaultFrom: 'kg',
    defaultTo: 'g',
    units: {
      kg: { id: 'kg', name: 'كيلوغرام', symbol: 'كغ', en: 'Kilogram', rate: 1.0 },
      g: { id: 'g', name: 'غرام', symbol: 'غ', en: 'Gram', rate: 0.001 },
      mg: { id: 'mg', name: 'ميليغرام', symbol: 'ملغ', en: 'Milligram', rate: 0.000001 },
      lb: { id: 'lb', name: 'باوند (رطل)', symbol: 'رطل', en: 'Pound', rate: 0.45359237 },
      oz: { id: 'oz', name: 'أونصة', symbol: 'أونصة', en: 'Ounce', rate: 0.028349523125 },
      t: { id: 't', name: 'طن متري', symbol: 'طن', en: 'Metric Ton', rate: 1000.0 }
    }
  },
  area: {
    id: 'area',
    name: 'المساحة',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    baseUnit: 'm2',
    defaultFrom: 'm2',
    defaultTo: 'ft2',
    units: {
      m2: { id: 'm2', name: 'متر مربع', symbol: 'م²', en: 'Square Meter', rate: 1.0 },
      km2: { id: 'km2', name: 'كيلومتر مربع', symbol: 'كم²', en: 'Square Kilometer', rate: 1000000.0 },
      feddan: { id: 'feddan', name: 'فدان', symbol: 'فدان', en: 'Feddan', rate: 4200.833 },
      dunum: { id: 'dunum', name: 'دونم', symbol: 'دونم', en: 'Dunum', rate: 1000.0 },
      ha: { id: 'ha', name: 'هكتار', symbol: 'هكتار', en: 'Hectare', rate: 10000.0 },
      ft2: { id: 'ft2', name: 'قدم مربع', symbol: 'قدم²', en: 'Square Foot', rate: 0.09290304 }
    }
  },
  volume: {
    id: 'volume',
    name: 'الحجم',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 2v7.31a2 2 0 0 1-.37 1.17l-4.26 6.39A2 2 0 0 0 7 20h10a2 2 0 0 0 1.63-3.13l-4.26-6.39A2 2 0 0 1 14 9.31V2"/><path d="M8.5 2h7M7 16h10"/></svg>`,
    baseUnit: 'l',
    defaultFrom: 'l',
    defaultTo: 'ml',
    units: {
      l: { id: 'l', name: 'لتر', symbol: 'ل', en: 'Liter', rate: 1.0 },
      ml: { id: 'ml', name: 'ميليتر', symbol: 'مل', en: 'Milliliter', rate: 0.001 },
      m3: { id: 'm3', name: 'متر مكعب', symbol: 'م³', en: 'Cubic Meter', rate: 1000.0 },
      gal: { id: 'gal', name: 'غالون أمريكي', symbol: 'غالون', en: 'US Gallon', rate: 3.785411784 },
      cup: { id: 'cup', name: 'كوب معياري', symbol: 'كوب', en: 'Cup', rate: 0.24 }
    }
  },
  temperature: {
    id: 'temperature',
    name: 'درجة الحرارة',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`,
    baseUnit: 'c',
    defaultFrom: 'c',
    defaultTo: 'f',
    isNonLinear: true,
    units: {
      c: { id: 'c', name: 'سليزيوس', symbol: '°C', en: 'Celsius' },
      f: { id: 'f', name: 'فهرنهايت', symbol: '°F', en: 'Fahrenheit' },
      k: { id: 'k', name: 'كلفن', symbol: 'K', en: 'Kelvin' }
    }
  },
  time: {
    id: 'time',
    name: 'الوقت والزمن',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    baseUnit: 's',
    defaultFrom: 'h',
    defaultTo: 'min',
    units: {
      s: { id: 's', name: 'ثانية', symbol: 'ث', en: 'Second', rate: 1.0 },
      min: { id: 'min', name: 'دقيقة', symbol: 'د', en: 'Minute', rate: 60.0 },
      h: { id: 'h', name: 'ساعة', symbol: 'س', en: 'Hour', rate: 3600.0 },
      d: { id: 'd', name: 'يوم', symbol: 'يوم', en: 'Day', rate: 86400.0 },
      wk: { id: 'wk', name: 'أسبوع', symbol: 'أسبوع', en: 'Week', rate: 604800.0 },
      mo: { id: 'mo', name: 'شهر (متوسط)', symbol: 'شهر', en: 'Month', rate: 2629800.0 },
      yr: { id: 'yr', name: 'سنة (شمسية)', symbol: 'سنة', en: 'Year', rate: 31557600.0 }
    }
  },
  digital: {
    id: 'digital',
    name: 'البيانات الرقمية',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    baseUnit: 'byte',
    defaultFrom: 'gb',
    defaultTo: 'mb',
    units: {
      bit: { id: 'bit', name: 'بت', symbol: 'b', en: 'Bit', rate: 0.125 },
      byte: { id: 'byte', name: 'بايت', symbol: 'B', en: 'Byte', rate: 1.0 },
      kb: { id: 'kb', name: 'كيلوبايت', symbol: 'KB', en: 'Kilobyte', rate: 1024.0 },
      mb: { id: 'mb', name: 'ميغابايت', symbol: 'MB', en: 'Megabyte', rate: 1048576.0 },
      gb: { id: 'gb', name: 'غيغابايت', symbol: 'GB', en: 'Gigabyte', rate: 1073741824.0 },
      tb: { id: 'tb', name: 'تيرابايت', symbol: 'TB', en: 'Terabyte', rate: 1099511627776.0 }
    }
  }
};

/**
 * مدير حالة التطبيق (Application State)
 */
class AppState {
  constructor() {
    this.currentCategory = 'length';
    this.fromUnit = 'm';
    this.toUnit = 'cm';
    this.inputValue = '1';
    this.precision = 'auto'; // 'auto' | 2 | 4 | 6
    this.isKeypadVisible = false;
    this.theme = this.getInitialTheme();
    this.history = this.loadHistory();
    this.activePickerTarget = null; // 'from' | 'to'
  }

  getInitialTheme() {
    try {
      const savedTheme = localStorage.getItem('uc_theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  saveTheme(theme) {
    this.theme = theme;
    try {
      localStorage.setItem('uc_theme', theme);
    } catch (e) {}
  }

  loadHistory() {
    try {
      const data = localStorage.getItem('uc_history');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('uc_history', JSON.stringify(this.history.slice(0, 30)));
    } catch (e) {}
  }

  addToHistory(entry) {
    // تجنب تكرار نفس الإدخال فوراً
    if (this.history.length > 0) {
      const last = this.history[0];
      if (last.fromVal === entry.fromVal &&
          last.fromUnit === entry.fromUnit &&
          last.toUnit === entry.toUnit &&
          last.category === entry.category) {
        return;
      }
    }
    this.history.unshift(entry);
    if (this.history.length > 30) this.history.pop();
    this.saveHistory();
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
  }
}

/**
 * محرك التحويلات الرياضية (Conversion Engine)
 */
class ConversionEngine {
  static convert(value, categoryId, fromId, toId) {
    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }

    const cat = UNIT_CATEGORIES[categoryId];
    if (!cat) return null;

    if (fromId === toId) {
      return value;
    }

    // فئة درجة الحرارة لها معادلات غير خطية
    if (cat.isNonLinear && categoryId === 'temperature') {
      return this.convertTemperature(value, fromId, toId);
    }

    // باقي الفئات تحويل نسبي بالنسبة للوحدة الأساسية
    const fromUnit = cat.units[fromId];
    const toUnit = cat.units[toId];
    if (!fromUnit || !toUnit) return null;

    const baseValue = value * fromUnit.rate;
    return baseValue / toUnit.rate;
  }

  static convertTemperature(val, from, to) {
    // التحويل إلى سليزيوس أولاً
    let c;
    if (from === 'c') c = val;
    else if (from === 'f') c = (val - 32) * (5 / 9);
    else if (from === 'k') c = val - 273.15;

    // التحويل من سليزيوس إلى الوحدة الهدف
    if (to === 'c') return c;
    if (to === 'f') return (c * (9 / 5)) + 32;
    if (to === 'k') return c + 273.15;
    return c;
  }

  static formatResult(num, precision = 'auto') {
    if (num === null || num === undefined || isNaN(num)) return '0';

    if (precision !== 'auto') {
      const p = parseInt(precision, 10);
      return Number(num.toFixed(p)).toString();
    }

    // التنسيق التلقائي الذكي
    if (Math.abs(num) === 0) return '0';

    // الأرقام شديدة الصغر أو الكبر جداً
    if (Math.abs(num) < 0.000001 || Math.abs(num) >= 1e12) {
      return num.toExponential(4).replace('e+', 'e');
    }

    // تقريب الأرقام العادية مع تنظيف الأصفار الزائدة
    const rounded = Number(Math.round(num + 'e+8') + 'e-8');
    return rounded.toString();
  }

  static getFormulaDescription(categoryId, fromId, toId) {
    const cat = UNIT_CATEGORIES[categoryId];
    const from = cat.units[fromId];
    const to = cat.units[toId];

    if (!from || !to) return '';
    if (fromId === toId) return `1 ${from.name} = 1 ${to.name}`;

    if (categoryId === 'temperature') {
      if (fromId === 'c' && toId === 'f') return `°F = (°C × 9/5) + 32`;
      if (fromId === 'f' && toId === 'c') return `°C = (°F - 32) × 5/9`;
      if (fromId === 'c' && toId === 'k') return `K = °C + 273.15`;
      if (fromId === 'k' && toId === 'c') return `°C = K - 273.15`;
      if (fromId === 'f' && toId === 'k') return `K = (°F - 32) × 5/9 + 273.15`;
      if (fromId === 'k' && toId === 'f') return `°F = (K - 273.15) × 9/5 + 32`;
    }

    const oneInTo = this.convert(1, categoryId, fromId, toId);
    return `1 ${from.symbol} = ${this.formatResult(oneInTo, 4)} ${to.symbol}`;
  }
}

/**
 * وحدة التحكم بالواجهة الرسومية (UI Controller)
 */
class UIController {
  constructor(state) {
    this.state = state;
    this.historyTimer = null;
    this.initElements();
    this.bindEvents();
    this.applyTheme(this.state.theme);
    this.updateCategoryDisplay();
    this.updateActiveUnits();
    this.calculate();
  }

  initElements() {
    this.el = {
      menuBtn: document.getElementById('menuToggleBtn'),
      themeBtn: document.getElementById('themeToggleBtn'),
      historyBtn: document.getElementById('historyToggleBtn'),
      keypadBtn: document.getElementById('keypadToggleBtn'),
      historyDot: document.getElementById('historyBadgeDot'),
      categoryPickerTrigger: document.getElementById('categoryPickerTrigger'),
      activeCategoryIcon: document.getElementById('activeCategoryIcon'),
      activeCategoryName: document.getElementById('activeCategoryName'),
      categoryDirectSelect: document.getElementById('categoryDirectSelect'),
      prevCategoryBtn: document.getElementById('prevCategoryBtn'),
      nextCategoryBtn: document.getElementById('nextCategoryBtn'),
      categoryModal: document.getElementById('categoryModal'),
      catModalCloseBtn: document.getElementById('catModalCloseBtn'),
      categoryModalGrid: document.getElementById('categoryModalGrid'),
      fromPickerBtn: document.getElementById('fromPickerBtn'),
      toPickerBtn: document.getElementById('toPickerBtn'),
      fromUnitName: document.getElementById('fromUnitName'),
      fromUnitBadge: document.getElementById('fromUnitBadge'),
      toUnitName: document.getElementById('toUnitName'),
      toUnitBadge: document.getElementById('toUnitBadge'),
      fromInput: document.getElementById('fromInput'),
      clearInputBtn: document.getElementById('clearInputBtn'),
      toOutput: document.getElementById('toOutput'),
      copyBtn: document.getElementById('copyResultBtn'),
      swapBtn: document.getElementById('swapBtn'),
      formulaText: document.getElementById('formulaText'),
      precisionSelect: document.getElementById('precisionSelect'),
      quickViewGrid: document.getElementById('quickViewGrid'),
      keypadSection: document.getElementById('keypadSection'),
      unitModal: document.getElementById('unitModal'),
      modalSheetTitle: document.getElementById('modalSheetTitle'),
      modalCloseBtn: document.getElementById('modalCloseBtn'),
      unitSearchInput: document.getElementById('unitSearchInput'),
      modalUnitsList: document.getElementById('modalUnitsList'),
      historyDrawer: document.getElementById('historyDrawer'),
      historyCloseBtn: document.getElementById('historyCloseBtn'),
      clearHistoryBtn: document.getElementById('clearHistoryBtn'),
      historyList: document.getElementById('historyList'),
      toast: document.getElementById('appToast'),
      pwaBanner: document.getElementById('pwaInstallBanner'),
      pwaInstallBtn: document.getElementById('pwaInstallActionBtn')
    };
  }

  bindEvents() {
    // تغيير الثيم
    this.el.themeBtn.addEventListener('click', () => {
      const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
      this.state.saveTheme(newTheme);
      this.applyTheme(newTheme);
      this.showToast(newTheme === 'dark' ? 'تم تفعيل الوضع الداكن' : 'تم تفعيل الوضع الفاتح');
    });

    // فتح السجل
    this.el.historyBtn.addEventListener('click', () => { this.closeCategoryModal(); this.openHistory(); this.el.historyCloseBtn.focus(); });
    this.el.historyCloseBtn.addEventListener('click', () => this.closeHistory());
    this.el.historyDrawer.addEventListener('click', (e) => {
      if (e.target === this.el.historyDrawer) this.closeHistory();
    });
    this.el.clearHistoryBtn.addEventListener('click', () => {
      this.state.clearHistory();
      this.renderHistory();
      this.updateHistoryDot();
      this.showToast('تم إفراغ سجل التحويلات');
    });

    // اختيار الفئة
    this.el.menuBtn.addEventListener('click', () => this.openCategoryModal());
    this.el.categoryPickerTrigger.addEventListener('click', () => this.openCategoryModal());
    this.el.categoryPickerTrigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.openCategoryModal(); }
    });
    this.el.categoryModal.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const items = [...this.el.categoryModal.querySelectorAll('button, [tabindex="0"]')].filter(el => !el.disabled);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    this.el.catModalCloseBtn.addEventListener('click', () => this.closeCategoryModal());
    this.el.categoryModal.addEventListener('click', (e) => {
      if (e.target === this.el.categoryModal) this.closeCategoryModal();
    });
    this.el.categoryDirectSelect.addEventListener('change', (e) => {
      this.selectCategory(e.target.value);
    });
    this.el.prevCategoryBtn.addEventListener('click', () => this.stepCategory(-1));
    this.el.nextCategoryBtn.addEventListener('click', () => this.stepCategory(1));

    // تبديل لوحة المفاتيح المدمجة
    this.el.keypadBtn.addEventListener('click', () => {
      this.closeCategoryModal();
      this.state.isKeypadVisible = !this.state.isKeypadVisible;
      this.el.keypadSection.classList.toggle('hidden-keypad', !this.state.isKeypadVisible);
      this.el.keypadBtn.classList.toggle('active', this.state.isKeypadVisible);
    });

    // إدخال الأرقام اللحظي
    this.el.fromInput.addEventListener('input', () => {
      this.state.inputValue = this.el.fromInput.value;
      this.updateClearBtnVisibility();
      this.calculate();
      this.scheduleHistorySave();
    });

    // زر تفريغ الحقل
    this.el.clearInputBtn.addEventListener('click', () => {
      this.el.fromInput.value = '';
      this.state.inputValue = '';
      this.updateClearBtnVisibility();
      this.calculate();
      this.el.fromInput.focus();
    });

    // زر نسخ النتيجة
    this.el.copyBtn.addEventListener('click', () => this.copyResult());

    // زر عكس / تبديل الوحدات
    this.el.swapBtn.addEventListener('click', () => this.swapUnits());

    // اختيار الدقة
    this.el.precisionSelect.addEventListener('change', (e) => {
      this.state.precision = e.target.value;
      this.calculate();
    });

    // فتح نافذة اختيار الوحدة
    this.el.fromPickerBtn.addEventListener('click', () => this.openUnitPicker('from'));
    this.el.toPickerBtn.addEventListener('click', () => this.openUnitPicker('to'));
    this.el.modalCloseBtn.addEventListener('click', () => this.closeUnitPicker());
    this.el.unitModal.addEventListener('click', (e) => {
      if (e.target === this.el.unitModal) this.closeUnitPicker();
    });

    // البحث داخل الوحدات
    this.el.unitSearchInput.addEventListener('input', (e) => {
      this.renderUnitPickerList(e.target.value.trim());
    });

    // أزرار لوحة المفاتيح المدمجة
    document.querySelectorAll('.key-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        this.handleKeypadInput(key);
      });
    });

    // دعم مفتاح الهروب (ESC) لإغلاق النوافذ
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeUnitPicker();
        this.closeCategoryModal();
        this.closeHistory();
      }
    });

    // تحديث النقطة الدلالية للسجل
    this.updateHistoryDot();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    this.el.themeBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }

  renderCategoryGrid() {
    this.el.categoryModalGrid.innerHTML = '';
    Object.values(UNIT_CATEGORIES).forEach(cat => {
      const count = Object.keys(cat.units).length;
      const isActive = cat.id === this.state.currentCategory;

      const card = document.createElement('button');
      card.type = 'button';
      card.setAttribute('aria-pressed', String(isActive));
      card.className = `category-grid-card ${isActive ? 'active' : ''}`;
      card.innerHTML = `
        <div class="cat-card-icon">${cat.icon}</div>
        <div class="cat-card-name">${cat.name}</div>
        <div class="cat-card-units-count">${count} وحدات</div>
      `;

      card.addEventListener('click', () => {
        this.selectCategory(cat.id);
        this.closeCategoryModal();
      });

      this.el.categoryModalGrid.appendChild(card);
    });
  }

  updateCategoryDisplay() {
    const cat = UNIT_CATEGORIES[this.state.currentCategory];
    if (cat) {
      this.el.activeCategoryIcon.innerHTML = cat.icon;
      this.el.activeCategoryName.textContent = cat.name;
      this.el.categoryDirectSelect.value = this.state.currentCategory;
    }
  }

  openCategoryModal() {
    this.drawerOpener = document.activeElement;
    this.renderCategoryGrid();
    this.el.categoryModal.classList.add('active');
    this.el.categoryModal.setAttribute('aria-hidden', 'false');
    this.el.menuBtn.setAttribute('aria-expanded', 'true');
    this.el.categoryPickerTrigger.setAttribute('aria-expanded', 'true');
    document.querySelector('.app-container').inert = true;
    document.body.classList.add('drawer-open');
    this.el.catModalCloseBtn.focus();
  }

  closeCategoryModal() {
    if (!this.el.categoryModal.classList.contains('active')) return;
    this.el.categoryModal.classList.remove('active');
    this.el.menuBtn.setAttribute('aria-expanded', 'false');
    this.el.categoryPickerTrigger.setAttribute('aria-expanded', 'false');
    document.querySelector('.app-container').inert = false;
    document.body.classList.remove('drawer-open');
    (this.drawerOpener || this.el.menuBtn).focus();
    this.el.categoryModal.setAttribute('aria-hidden', 'true');
  }

  stepCategory(direction) {
    const catKeys = Object.keys(UNIT_CATEGORIES);
    const curIdx = catKeys.indexOf(this.state.currentCategory);
    let newIdx = curIdx + direction;
    if (newIdx < 0) newIdx = catKeys.length - 1;
    if (newIdx >= catKeys.length) newIdx = 0;
    this.selectCategory(catKeys[newIdx]);
    const cat = UNIT_CATEGORIES[catKeys[newIdx]];
    this.showToast(`الفئة: ${cat.name}`);
  }

  selectCategory(catId) {
    if (this.state.currentCategory === catId) return;
    this.state.currentCategory = catId;
    const cat = UNIT_CATEGORIES[catId];
    this.state.fromUnit = cat.defaultFrom;
    this.state.toUnit = cat.defaultTo;

    this.updateCategoryDisplay();
    this.updateActiveUnits();
    this.calculate();
  }

  updateActiveUnits() {
    const cat = UNIT_CATEGORIES[this.state.currentCategory];
    const from = cat.units[this.state.fromUnit];
    const to = cat.units[this.state.toUnit];

    if (from) {
      this.el.fromUnitName.textContent = from.name;
      this.el.fromUnitBadge.textContent = from.symbol;
    }
    if (to) {
      this.el.toUnitName.textContent = to.name;
      this.el.toUnitBadge.textContent = to.symbol;
    }
  }

  calculate() {
    const rawVal = this.el.fromInput.value.trim();
    if (rawVal === '' || rawVal === '-' || rawVal === '.') {
      this.el.toOutput.textContent = '0';
      this.el.formulaText.textContent = ConversionEngine.getFormulaDescription(
        this.state.currentCategory,
        this.state.fromUnit,
        this.state.toUnit
      );
      this.renderQuickViewGrid(0);
      return;
    }

    const num = parseFloat(rawVal);
    if (isNaN(num)) {
      this.el.toOutput.textContent = 'خطأ في الرقم';
      return;
    }

    const converted = ConversionEngine.convert(
      num,
      this.state.currentCategory,
      this.state.fromUnit,
      this.state.toUnit
    );

    const formatted = ConversionEngine.formatResult(converted, this.state.precision);
    this.el.toOutput.textContent = formatted;

    this.el.formulaText.textContent = ConversionEngine.getFormulaDescription(
      this.state.currentCategory,
      this.state.fromUnit,
      this.state.toUnit
    );

    this.renderQuickViewGrid(num);
  }

  renderQuickViewGrid(currentVal) {
    const cat = UNIT_CATEGORIES[this.state.currentCategory];
    this.el.quickViewGrid.innerHTML = '';

    Object.values(cat.units).forEach(unit => {
      if (unit.id === this.state.fromUnit) return; // لا نعرض نفس وحدة الإدخال

      const val = ConversionEngine.convert(
        currentVal,
        this.state.currentCategory,
        this.state.fromUnit,
        unit.id
      );
      const formatted = ConversionEngine.formatResult(val, 2);

      const card = document.createElement('div');
      card.className = `grid-unit-card ${unit.id === this.state.toUnit ? 'is-active-target' : ''}`;
      card.innerHTML = `
        <div class="grid-card-header">
          <span class="grid-card-name">${unit.name}</span>
          <span class="grid-card-symbol">${unit.symbol}</span>
        </div>
        <div class="grid-card-value">${formatted}</div>
      `;

      // الضغط على أي بطاقة يجعلها هي الوحدة الهدف "إلى" مباشرة
      card.addEventListener('click', () => {
        this.state.toUnit = unit.id;
        this.updateActiveUnits();
        this.calculate();
        this.showToast(`تم تعيين "${unit.name}" كوحدة هدف`);
      });

      this.el.quickViewGrid.appendChild(card);
    });
  }

  swapUnits() {
    const temp = this.state.fromUnit;
    this.state.fromUnit = this.state.toUnit;
    this.state.toUnit = temp;

    // تدوير أيقونة التبديل كأنيميشن تفاعلي
    this.el.swapBtn.style.transform = 'rotate(180deg) scale(1.1)';
    setTimeout(() => {
      this.el.swapBtn.style.transform = '';
    }, 300);

    // إذا كانت هناك نتيجة محسوبة، نجعلها هي قيمة الإدخال الجديدة لتجربة مستخدم سلسة
    const currentResult = this.el.toOutput.textContent;
    if (currentResult && currentResult !== '0' && currentResult !== 'خطأ في الرقم') {
      this.el.fromInput.value = currentResult;
      this.state.inputValue = currentResult;
      this.updateClearBtnVisibility();
    }

    this.updateActiveUnits();
    this.calculate();
    this.showToast('تم تبديل الوحدات بنجاح');
  }

  copyResult() {
    const textToCopy = this.el.toOutput.textContent;
    if (!textToCopy || textToCopy === '0') {
      this.showToast('القيمة فارغة!');
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => this.showToast(`تم نسخ النتيجة: ${textToCopy}`))
        .catch(() => this.fallbackCopy(textToCopy));
    } else {
      this.fallbackCopy(textToCopy);
    }
  }

  fallbackCopy(text) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast(`تم نسخ النتيجة: ${text}`);
    } catch (e) {
      this.showToast('تعذر النسخ تلقائياً');
    }
  }

  handleKeypadInput(key) {
    if (key === 'done') {
      this.state.isKeypadVisible = false;
      this.el.keypadSection.classList.add('hidden-keypad');
      this.el.keypadBtn.classList.remove('active');
      return;
    }

    let cur = this.el.fromInput.value;

    switch (key) {
      case 'clear':
        cur = '';
        break;
      case 'backspace':
        cur = cur.slice(0, -1);
        break;
      case 'pm': // تفعيل السالب والموجب
        if (cur.startsWith('-')) {
          cur = cur.substring(1);
        } else if (cur !== '') {
          cur = '-' + cur;
        } else {
          cur = '-';
        }
        break;
      case '.':
        if (!cur.includes('.')) {
          cur = (cur === '' || cur === '-') ? cur + '0.' : cur + '.';
        }
        break;
      case '00':
        if (cur === '' || cur === '0') cur = '0';
        else cur += '00';
        break;
      default:
        // إضافة رقم عادي
        if (cur === '0') cur = key;
        else cur += key;
        break;
    }

    this.el.fromInput.value = cur;
    this.state.inputValue = cur;
    this.updateClearBtnVisibility();
    this.calculate();
    this.scheduleHistorySave();
  }

  updateClearBtnVisibility() {
    this.el.clearInputBtn.classList.toggle('visible', this.el.fromInput.value.length > 0);
  }

  openUnitPicker(target) {
    this.state.activePickerTarget = target;
    const cat = UNIT_CATEGORIES[this.state.currentCategory];
    this.el.modalSheetTitle.textContent = target === 'from' ? `اختر وحدة الإدخال (${cat.name})` : `اختر وحدة الإخراج (${cat.name})`;
    this.el.unitSearchInput.value = '';
    this.renderUnitPickerList('');
    this.el.unitModal.classList.add('active');
    setTimeout(() => this.el.unitSearchInput.focus(), 250);
  }

  closeUnitPicker() {
    this.el.unitModal.classList.remove('active');
    this.state.activePickerTarget = null;
  }

  renderUnitPickerList(query = '') {
    const cat = UNIT_CATEGORIES[this.state.currentCategory];
    const currentSelected = this.state.activePickerTarget === 'from' ? this.state.fromUnit : this.state.toUnit;
    const q = query.toLowerCase().trim();

    this.el.modalUnitsList.innerHTML = '';
    let matchCount = 0;

    Object.values(cat.units).forEach(unit => {
      const match = !q ||
        unit.name.toLowerCase().includes(q) ||
        unit.symbol.toLowerCase().includes(q) ||
        unit.en.toLowerCase().includes(q);

      if (match) {
        matchCount++;
        const isSelected = unit.id === currentSelected;
        const btn = document.createElement('button');
        btn.className = `unit-item-btn ${isSelected ? 'selected' : ''}`;
        btn.innerHTML = `
          <div class="unit-item-info">
            <span class="unit-item-name">${unit.name}</span>
            <span class="unit-item-sub">${unit.en}</span>
          </div>
          <span class="unit-item-badge">${unit.symbol}</span>
        `;

        btn.addEventListener('click', () => {
          if (this.state.activePickerTarget === 'from') {
            this.state.fromUnit = unit.id;
          } else {
            this.state.toUnit = unit.id;
          }
          this.updateActiveUnits();
          this.calculate();
          this.closeUnitPicker();
        });

        this.el.modalUnitsList.appendChild(btn);
      }
    });

    if (matchCount === 0) {
      this.el.modalUnitsList.innerHTML = `
        <div class="no-results-msg">
          لا توجد وحدات مطابقة لكلمة البحث "${query}"
        </div>
      `;
    }
  }

  scheduleHistorySave() {
    clearTimeout(this.historyTimer);
    this.historyTimer = setTimeout(() => {
      const val = parseFloat(this.el.fromInput.value);
      if (!isNaN(val) && val !== 0) {
        const cat = UNIT_CATEGORIES[this.state.currentCategory];
        const from = cat.units[this.state.fromUnit];
        const to = cat.units[this.state.toUnit];
        const result = this.el.toOutput.textContent;

        this.state.addToHistory({
          id: Date.now(),
          category: this.state.currentCategory,
          categoryName: cat.name,
          fromVal: val,
          fromUnit: from.symbol,
          fromUnitName: from.name,
          fromUnitId: from.id,
          toVal: result,
          toUnit: to.symbol,
          toUnitName: to.name,
          toUnitId: to.id,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        });
        this.updateHistoryDot();
      }
    }, 1500); // حفظ بعد توقف المستخدم عن الكتابة بـ 1.5 ثانية
  }

  updateHistoryDot() {
    this.el.historyDot.classList.toggle('active', this.state.history.length > 0);
  }

  openHistory() {
    this.renderHistory();
    this.el.historyDrawer.classList.add('active');
  }

  closeHistory() {
    this.el.historyDrawer.classList.remove('active');
  }

  renderHistory() {
    this.el.historyList.innerHTML = '';
    if (this.state.history.length === 0) {
      this.el.historyList.innerHTML = `
        <div class="history-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <p>لا توجد تحويلات سابقة في السجل حتى الآن</p>
        </div>
      `;
      return;
    }

    this.state.history.forEach(item => {
      const card = document.createElement('div');
      card.className = 'history-item';
      card.innerHTML = `
        <div class="history-item-content">
          <div class="history-item-val">${item.fromVal} ${item.fromUnit} ➔ ${item.toVal} ${item.toUnit}</div>
          <div class="history-item-meta">
            <span class="history-category-badge">${item.categoryName}</span>
            <span>•</span>
            <span>${item.time}</span>
          </div>
        </div>
        <button class="icon-btn" title="استعادة التحويل" style="width:32px;height:32px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <path d="M1 4v6h6M23 20v-6h-6"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
          </svg>
        </button>
      `;

      card.addEventListener('click', () => {
        this.state.currentCategory = item.category;
        this.state.fromUnit = item.fromUnitId;
        this.state.toUnit = item.toUnitId;
        this.state.inputValue = item.fromVal.toString();
        this.el.fromInput.value = item.fromVal.toString();

        this.updateCategoryDisplay();
        this.updateActiveUnits();
        this.updateClearBtnVisibility();
        this.calculate();
        this.closeHistory();
        this.showToast('تمت استعادة التحويل من السجل');
      });

      this.el.historyList.appendChild(card);
    });
  }

  showToast(msg) {
    this.el.toast.textContent = msg;
    this.el.toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.el.toast.classList.remove('show');
    }, 2400);
  }
}

/**
 * تهيئة التطبيق عند اكتمال تحميل الصفحة وتسجيل Service Worker
 */
document.addEventListener('DOMContentLoaded', () => {
  const appState = new AppState();
  const ui = new UIController(appState);

  // إعداد PWA Install Prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.classList.add('show');
  });

  const installBtn = document.getElementById('pwaInstallActionBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          ui.showToast('شكراً لتثبيت التطبيق على جهازك!');
        }
        deferredPrompt = null;
        document.getElementById('pwaInstallBanner').classList.remove('show');
      }
    });
  }

  // تسجيل الـ Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('Service Worker Registered successfully:', reg.scope);
        })
        .catch((err) => {
          console.log('Service Worker registration skipped/failed:', err);
        });
    });
  }
});
