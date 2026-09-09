/* ══════════════════════════════════════
   HERO VIDEO — auto switch mobile / desktop
   (mobile ≤ 640px → hero_video_mobile.mp4)
   (desktop  > 640px → hero_video2.mp4)
══════════════════════════════════════ */
(function () {
  const heroVideo   = document.getElementById("heroVideo");
  if (!heroVideo) return;

  const MOBILE_SRC  = "images/hero_video_mobile.mp4";
  const DESKTOP_SRC = "images/hero_video2.mp4";
  const BREAKPOINT  = 640; // px, matches CSS breakpoint

  let currentMode = null; // "mobile" | "desktop"

  function setHeroVideo(forceReload) {
    const isMobile = window.innerWidth <= BREAKPOINT;
    const mode = isMobile ? "mobile" : "desktop";

    if (mode === currentMode && !forceReload) return; // already correct, avoid reload flicker

    currentMode = mode;
    const src = isMobile ? MOBILE_SRC : DESKTOP_SRC;
    const wasPlaying = !heroVideo.paused;

    heroVideo.src = src;
    heroVideo.load();

    if (wasPlaying || heroVideo.autoplay) {
      heroVideo.play().catch(() => {
        /* autoplay may be blocked until user interacts — safe to ignore */
      });
    }
  }

  /* Set correct video immediately on first load */
  setHeroVideo(true);

  /* Re-check on resize (debounced) and on orientation change */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => setHeroVideo(false), 200);
  });
  window.addEventListener("orientationchange", () => setHeroVideo(true));
})();

/* ── Click ANYWHERE outside the navbar → close dropdown ── */
document.addEventListener('click', function (e) {
  const navbar   = document.querySelector('.choc-navbar');
  const collapse = document.getElementById('chocNav');
  if (!navbar.contains(e.target) && collapse.classList.contains('show')) {
    bootstrap.Collapse.getInstance(collapse)?.hide();
  }
});

/* ── Clicking a nav link / Order btn also closes menu ── */
document.querySelectorAll('#chocNav .nav-link, #chocNav .nav-order-btn').forEach(el => {
  el.addEventListener('click', () => {
    const collapse = document.getElementById('chocNav');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});

/* ── Press Escape to close ── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const collapse = document.getElementById('chocNav');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  }
});

/* ── About section scroll reveal ── */
const aboutContent = document.querySelector('.about-content');
const aboutPillars = document.querySelectorAll('.about-pillars li');

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

if (aboutContent) aboutObserver.observe(aboutContent);

const pillarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

aboutPillars.forEach(el => pillarObserver.observe(el));

/* ══════════════════════════════════════
   MENU SECTION
══════════════════════════════════════ */

/* Replace with the brand's actual WhatsApp number, country code first, no + or spaces */
const WHATSAPP_NUMBER = "8903466217";

const MENU_DATA = [
  {
    id: "regulars",
    label: "Regulars",
    note: "",
    groups: [
      {
        name: "Nut collection",
        note: "Dark · Milk · White",
        items: [
          { name: "Nut bites", variants: [{ label: "4 pcs", price: 240 }, { label: "6 pcs", price: 330 }, { label: "9 pcs", price: 460 }], flavours: ["Dark", "Milk", "White", "Mixed"] },
          { name: "Classic nut bar", variants: [{ label: "1 pc", price: 380 }], flavours: ["Dark", "Milk", "White", "Mixed"] },
          { name: "Duo nut slabs", variants: [{ label: "2 pcs", price: 620 }], flavours: ["Dark", "Milk", "White", "Mixed"] },
          { name: "Nut heart bites", variants: [{ label: "4 pcs", price: 280 }, { label: "6 pcs", price: 380 }], flavours: ["Dark", "Milk", "White", "Mixed"] },
          { name: "Nut heart bar", variants: [{ label: "1 pc", price: 420 }], flavours: ["Dark", "Milk", "White", "Mixed"] }
        ]
      },
      {
        name: "Bonbon",
        note: "Rich coconut filling · Dark · Milk · White",
        items: [
          { name: "Classic bonbon", variants: [{ label: "4 pcs", price: 300 }, { label: "6 pcs", price: 420 }], flavours: ["Dark", "Milk", "White", "Mixed"] },
          { name: "Bonbon blocks", variants: [{ label: "3 pcs", price: 480 }], flavours: ["Dark", "Milk", "White", "Mixed"] }
        ]
      },
      {
        name: "Plain bar",
        note: "1 pc",
        items: [
          { name: "Plain bar", variants: [{ label: "Dark", price: 180 }, { label: "Milk", price: 145 }, { label: "White", price: 135 }, { label: "Triple flavour", price: 199 }] }
        ]
      }
    ]
  },
  {
    id: "treat-boxes",
    label: "Treat boxes",
    note: "",
    groups: [
      {
        name: "Strawberry treat box",
        items: [
          { name: "Classic — 9 pcs", variants: [{ label: "Dark", price: 980 }, { label: "Milk", price: 950 }, { label: "White", price: 950 }, { label: "Triple flavour", price: 1050 }] },
          { name: "Petite — 4 pcs", variants: [{ label: "Dark", price: 450 }, { label: "Milk", price: 420 }, { label: "White", price: 420 }] }
        ]
      },
      {
        name: "Pomegranate treat box",
        items: [
          { name: "Classic — 6 pcs", variants: [{ label: "Dark", price: 550 }, { label: "Milk", price: 520 }, { label: "White", price: 520 }, { label: "Triple flavour", price: 580 }] },
          { name: "Petite — 4 pcs", variants: [{ label: "Dark", price: 400 }, { label: "Milk", price: 380 }, { label: "White", price: 360 }] }
        ]
      }
    ]
  },
  {
    id: "luxury",
    label: "Luxury launch",
    note: "The house's most elaborate pieces — arranged, not just boxed.",
    badge: true,
    groups: [
      {
        name: "Crown royale",
        items: [
          { name: "Iconic crown", note: "Single flavour selection", variants: [{ label: "Dark", price: 4199 }, { label: "Milk", price: 3799 }, { label: "White", price: 3999 }] },
          { name: "Classic crown", note: "Dual flavour · choose an arrangement", variants: [{ label: "White – Milk – White", price: 3699 }, { label: "Milk – White – Milk", price: 3699 }, { label: "Dark – Milk – Dark", price: 3699 }, { label: "Milk – Dark – Milk", price: 3699 }] },
          { name: "Signature crown", note: "Triple flavour", variants: [{ label: "Dark – White – Milk", price: 3899 }] }
        ]
      },
      {
        name: "Bouquet",
        note: "Dark · Milk · White",
        items: [
          { name: "Signature bouquet", variants: [{ label: "Dark", price: 1299 }, { label: "Milk", price: 1199 }, { label: "White", price: 1299 }] },
          { name: "Classic bouquet", variants: [{ label: "Dark", price: 2599 }, { label: "Milk", price: 2399 }, { label: "White", price: 2199 }] },
          { name: "Petite bouquet", variants: [{ label: "Dark", price: 1299 },{label: "Milk", price: 1299}, {label: "White", price: 1299}] }
        ]
      }
    ]
  },
  {
    id: "valentine",
    label: "Valentine's special",
    note: "Fresh roses and coco-strawberries, boxed for the occasion.",
    badge: true,
    valentine: true,
    groups: [
      {
        name: "Gift box",
        note: "Roses available in red, baby pink, blue, or white",
        items: [
          { name: "Classic box", note: "Single flavour selection", variants: [{ label: "Dark", price: 2699 }, { label: "Milk", price: 2499 }, { label: "White", price: 2399 }] },
          { name: "Blend box", note: "Dual flavour selection", variants: [{ label: "Dark and milk", price: 2399 }, { label: "Dark and white", price: 2499 }] },
          { name: "Signature box", note: "Triple flavour", variants: [{ label: "Standard", price: 3299 }] }
        ]
      }
    ]
  }
];

let menuActiveCategory = MENU_DATA[0].id;
const menuSelections = {};
const menuFlavourSelections = {};
let menuRowObserver = null;

function menuItemKey(catId, groupName, itemName) {
  return catId + "|" + groupName + "|" + itemName;
}

function menuFlavourKey(catId, groupName, itemName) {
  return catId + "|" + groupName + "|" + itemName + "|flavour";
}

function renderMenuTabs() {
  const tabsEl = document.getElementById("menuTabs");
  if (!tabsEl) return;
  tabsEl.innerHTML = MENU_DATA.map(cat =>
    `<button class="menu-tab ${cat.id === menuActiveCategory ? "active" : ""}" data-cat="${cat.id}">${cat.label}</button>`
  ).join("");
  tabsEl.querySelectorAll(".menu-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      menuActiveCategory = btn.dataset.cat;
      renderMenuTabs();
      renderMenuContent();
    });
  });
}

function renderMenuContent() {
  const cat = MENU_DATA.find(c => c.id === menuActiveCategory);
  const noteEl = document.getElementById("menuCategoryNote");
  if (noteEl) noteEl.textContent = cat.note || "";

  const contentEl = document.getElementById("menuContent");
  if (!contentEl) return;

  let itemIndex = 0;

  contentEl.innerHTML = cat.groups.map(group => {
    const itemsHtml = group.items.map((item, idxInGroup) => {
      const key = menuItemKey(cat.id, group.name, item.name);
      if (!(key in menuSelections)) menuSelections[key] = 0;
      const selectedIdx = menuSelections[key];
      const variant = item.variants[selectedIdx];
      const hasMultiple = item.variants.length > 1;

      itemIndex++;
      const number = String(itemIndex).padStart(2, "0");

      const optionsHtml = item.variants.map((v, i) =>
        `<div class="menu-variant-option ${i === selectedIdx ? "selected" : ""}" data-idx="${i}" role="option" aria-selected="${i === selectedIdx}">${v.label}</div>`
      ).join("");

      const dropdownHtml = `
        <div class="menu-variant-dropdown" data-key="${key}" data-type="pcs">
          <button type="button" class="menu-variant-toggle" data-key="${key}" data-type="pcs" aria-haspopup="listbox" aria-expanded="false">
            <span class="menu-variant-toggle-label">${variant.label}</span>
            <svg viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 5L8 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="menu-variant-menu" role="listbox" data-key="${key}">${optionsHtml}</div>
        </div>
      `;

      const hasFlavours = Array.isArray(item.flavours) && item.flavours.length > 0;
      let flavourDropdownHtml = "";
      let flavourKey = "";
      if (hasFlavours) {
        flavourKey = menuFlavourKey(cat.id, group.name, item.name);
        if (!(flavourKey in menuFlavourSelections)) menuFlavourSelections[flavourKey] = 0;
        const selectedFlavourIdx = menuFlavourSelections[flavourKey];
        const flavourLabel = item.flavours[selectedFlavourIdx];

        const flavourOptionsHtml = item.flavours.map((f, i) =>
          `<div class="menu-variant-option ${i === selectedFlavourIdx ? "selected" : ""}" data-idx="${i}" role="option" aria-selected="${i === selectedFlavourIdx}">${f}</div>`
        ).join("");

        flavourDropdownHtml = `
          <div class="menu-variant-dropdown" data-key="${flavourKey}" data-type="flavour">
            <button type="button" class="menu-variant-toggle" data-key="${flavourKey}" data-type="flavour" aria-haspopup="listbox" aria-expanded="false">
              <span class="menu-variant-toggle-label">${flavourLabel}</span>
              <svg viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 5L8 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="menu-variant-menu" role="listbox" data-key="${flavourKey}">${flavourOptionsHtml}</div>
          </div>
        `;
      }

      const itemClasses = ["menu-item"];
      if (cat.badge) itemClasses.push("is-luxury");
      if (cat.valentine) itemClasses.push("is-valentine");

      return `
        <div class="${itemClasses.join(" ")}" data-item-key="${key}">
          <div class="menu-item-head">
            <span class="menu-item-number">${number}</span>
            <div class="menu-item-titleblock">
              <h4 class="menu-item-name">${item.name}${cat.badge ? `<span class="lux-dot"></span>` : ""}</h4>
            </div>
            <div class="menu-item-preview">
              <span class="menu-item-price-tag" data-price-key="${key}">₹${variant.price.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div class="menu-item-body">
            <div class="menu-item-body-inner">
              ${item.note ? `<p class="menu-item-note">${item.note}</p>` : ""}
              <div class="menu-item-controls">
                <div class="menu-item-selectors">
                  ${hasMultiple ? dropdownHtml : ""}
                  ${hasFlavours ? flavourDropdownHtml : ""}
                  ${!hasMultiple && !hasFlavours ? `<span></span>` : ""}
                </div>
                <button class="menu-cta" data-order-key="${key}">Order <i class="bi bi-arrow-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="menu-group">
        <div class="menu-group-header">
          <h3 class="menu-group-name">${group.name}</h3>
        </div>
        ${group.note ? `<p class="menu-group-note">${group.note}</p>` : ""}
        <div class="menu-columns">${itemsHtml}</div>
      </div>
    `;
  }).join("");

  attachMenuHandlers(cat);
  observeMenuRows();
}

function menuCloseAllDropdowns(exceptKey) {
  document.querySelectorAll(".menu-variant-dropdown.open").forEach(dd => {
    if (dd.dataset.key === exceptKey) return;
    dd.classList.remove("open");
    const toggle = dd.querySelector(".menu-variant-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    dd.closest(".menu-item")?.classList.remove("dropdown-active");
  });
}

function attachMenuHandlers(cat) {
  /* ── Premium custom pcs / flavour / variant dropdown ── */
  document.querySelectorAll(".menu-variant-dropdown").forEach(dropdown => {
    const key = dropdown.dataset.key;
    const type = dropdown.dataset.type; // "pcs" | "flavour"
    const toggle = dropdown.querySelector(".menu-variant-toggle");

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open");
      menuCloseAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        dropdown.closest(".menu-item")?.classList.add("dropdown-active");
      }
    });

    dropdown.querySelectorAll(".menu-variant-option").forEach(optionEl => {
      optionEl.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(optionEl.dataset.idx, 10);
        const { item } = menuFindGroupAndItemByKey(cat, key);

        dropdown.querySelectorAll(".menu-variant-option").forEach(o => o.classList.remove("selected"));
        optionEl.classList.add("selected");

        if (type === "flavour") {
          menuFlavourSelections[key] = idx;
          toggle.querySelector(".menu-variant-toggle-label").textContent = item.flavours[idx];
        } else {
          menuSelections[key] = idx;
          const variant = item.variants[idx];
          toggle.querySelector(".menu-variant-toggle-label").textContent = variant.label;

          const priceEl = document.querySelector(`.menu-item-price-tag[data-price-key="${key}"]`);
          priceEl.classList.add("fade");
          setTimeout(() => {
            priceEl.textContent = "₹" + variant.price.toLocaleString("en-IN");
            priceEl.classList.remove("fade");
          }, 140);
        }

        menuCloseAllDropdowns();
      });
    });
  });

  document.querySelectorAll("[data-order-key]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const key = btn.dataset.orderKey;
      const { item } = menuFindGroupAndItemByKey(cat, key);
      const variant = item.variants[menuSelections[key]];

      let flavourLabel = "";
      if (Array.isArray(item.flavours) && item.flavours.length > 0) {
        const flavourKey = key + "|flavour";
        const flavourIdx = menuFlavourSelections[flavourKey] || 0;
        flavourLabel = item.flavours[flavourIdx];
      }

      openOrderModal({
        itemName: item.name,
        pcsLabel: variant.label,
        flavour: flavourLabel,
        amount: variant.price,
        categoryId: cat.id
      });
    });
  });
}

function menuFindGroupAndItemByKey(cat, key) {
  const [, groupName, itemName] = key.split("|");
  const group = cat.groups.find(g => g.name === groupName);
  const item = group.items.find(i => i.name === itemName);
  return { group, item };
}

function observeMenuRows() {
  if (menuRowObserver) menuRowObserver.disconnect();
  menuRowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        menuRowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".menu-item").forEach((item, i) => {
    item.style.transitionDelay = (i % 6) * 60 + "ms";
    menuRowObserver.observe(item);
  });
}

if (document.getElementById("menuTabs")) {
  renderMenuTabs();
  renderMenuContent();
}

/* ── Close variant dropdowns on outside click / Escape ── */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-variant-dropdown")) menuCloseAllDropdowns();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") menuCloseAllDropdowns();
});

/* ── Menu heading scroll reveal ── */
const menuHeadingBlock = document.querySelector(".menu-heading-block");
if (menuHeadingBlock) {
  const menuHeadingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  menuHeadingObserver.observe(menuHeadingBlock);
}

/* -- Footer: auto-update copyright year -- */
const footerYearEl = document.getElementById("footerYear");
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear();
}
/* ══════════════════════════════════════
   ORDER FORM MODAL — open, pre-fill, submit
══════════════════════════════════════ */
let currentOrderData = null; // holds the item being ordered

const orderModalOverlay   = document.getElementById("orderModalOverlay");
const orderModalClose     = document.getElementById("orderModalClose");
const orderDetailsForm    = document.getElementById("orderDetailsForm");
const orderItemNameEl     = document.getElementById("orderItemName");
const orderItemPcsEl      = document.getElementById("orderItemPcs");
const orderItemFlavourEl  = document.getElementById("orderItemFlavour");
const orderFlavourRowEl   = document.getElementById("orderFlavourRow");
const orderItemAmountEl   = document.getElementById("orderItemAmount");
const orderNameplateField = document.getElementById("orderNameplateField");
const orderNameplateChips = document.getElementById("orderNameplateChips");
const orderRoseField      = document.getElementById("orderRoseField");
const orderRoseChips      = document.getElementById("orderRoseChips");

let selectedNameplateValue = "Happy Birthday"; // default
let selectedRoseValue      = "Red rose";       // default

function setupChipGroup(groupEl, onSelect) {
  groupEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".order-chip");
    if (!chip) return;
    groupEl.querySelectorAll(".order-chip").forEach(c => c.classList.remove("selected"));
    chip.classList.add("selected");
    onSelect(chip.dataset.value);
  });
}

setupChipGroup(orderNameplateChips, (val) => { selectedNameplateValue = val; });
setupChipGroup(orderRoseChips, (val) => { selectedRoseValue = val; });

function resetChipGroup(groupEl, defaultValue) {
  groupEl.querySelectorAll(".order-chip").forEach(c => {
    c.classList.toggle("selected", c.dataset.value === defaultValue);
  });
}

function openOrderModal(data) {
  // data = { itemName, pcsLabel, flavour, amount }
  currentOrderData = data;

  orderItemNameEl.textContent = data.itemName;
  orderItemPcsEl.textContent  = data.pcsLabel;
  orderItemAmountEl.textContent = "₹" + data.amount.toLocaleString("en-IN");

  if (data.flavour) {
    orderFlavourRowEl.style.display = "flex";
    orderItemFlavourEl.textContent = data.flavour;
  } else {
    orderFlavourRowEl.style.display = "none";
  }

  // Show category-specific customization: nameplate for Luxury, rose colour for Valentine's
  orderNameplateField.style.display = data.categoryId === "luxury" ? "flex" : "none";
  orderRoseField.style.display = data.categoryId === "valentine" ? "flex" : "none";

  if (data.categoryId === "luxury") {
    resetChipGroup(orderNameplateChips, "Happy Birthday");
    selectedNameplateValue = "Happy Birthday";
  }
  if (data.categoryId === "valentine") {
    resetChipGroup(orderRoseChips, "Red rose");
    selectedRoseValue = "Red rose";
  }

  if (orderModalOverlay) {
    orderModalOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // prevent background scroll
  }
}

function closeOrderModal() {
  if (orderModalOverlay) {
    orderModalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (orderDetailsForm) orderDetailsForm.reset();
  if (orderScreenshotInput) orderScreenshotInput.value = "";
  if (orderFileNameEl) orderFileNameEl.textContent = "No file chosen";
  if (orderFileClearBtn) orderFileClearBtn.style.display = "none";
  orderStepPayment.style.display = "none";
  orderStepDetails.style.display = "block";
}

if (orderModalClose) {
  orderModalClose.addEventListener("click", closeOrderModal);
}

if (orderModalOverlay) {
  orderModalOverlay.addEventListener("click", (e) => {
    if (e.target === orderModalOverlay) closeOrderModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && orderModalOverlay?.classList.contains("open")) {
    closeOrderModal();
  }
});

// ⚠️ Replace this with your actual business UPI ID
const BUSINESS_UPI_ID = "lilcocolates@upi";

let latestFullOrder = null; // holds the completed order once details are submitted

const orderStepDetails   = document.getElementById("orderStepDetails");
const orderStepPayment   = document.getElementById("orderStepPayment");
const orderPayAmountEl   = document.getElementById("orderPayAmount");
const orderQrCanvas      = document.getElementById("orderQrCanvas");
const orderUpiIdText     = document.getElementById("orderUpiIdText");
const orderCopyUpiBtn    = document.getElementById("orderCopyUpiBtn");
const orderScreenshotInput = document.getElementById("orderScreenshotInput");
const orderFileChooseBtn = document.getElementById("orderFileChooseBtn");
const orderFileClearBtn  = document.getElementById("orderFileClearBtn");
const orderFileNameEl    = document.getElementById("orderFileName");
const orderBackToDetails = document.getElementById("orderBackToDetails");
const orderPlaceOrderBtn = document.getElementById("orderPlaceOrderBtn");

if (orderDetailsForm) {
  orderDetailsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const customerName    = document.getElementById("orderCustomerName").value.trim();
    const customerPhone   = document.getElementById("orderCustomerPhone").value.trim();
    const customerAddress = document.getElementById("orderCustomerAddress").value.trim();
    const customerPincode = document.getElementById("orderCustomerPincode").value.trim();

    latestFullOrder = {
      ...currentOrderData,
      customerName,
      customerPhone,
      customerAddress,
      customerPincode,
      nameplateDesign: currentOrderData.categoryId === "luxury" ? selectedNameplateValue : null,
      roseColour: currentOrderData.categoryId === "valentine" ? selectedRoseValue : null,
      tempRef: "TMP" + Date.now() // internal only, real Order ID assigned when order is actually placed
    };

    goToPaymentStep(latestFullOrder);
  });
}

function goToPaymentStep(order) {
  orderStepDetails.style.display = "none";
  orderStepPayment.style.display = "block";

  orderPayAmountEl.textContent = "₹" + order.amount.toLocaleString("en-IN");
  orderUpiIdText.textContent = BUSINESS_UPI_ID;

  // Build the UPI intent link with the exact order amount
  const upiURL =
    `upi://pay?pa=${encodeURIComponent(BUSINESS_UPI_ID)}` +
    `&pn=${encodeURIComponent("Lil Cocolates")}` +
    `&am=${order.amount}` +
    `&cu=INR` +
    `&tn=${encodeURIComponent(order.tempRef)}`;

  QRCode.toCanvas(orderQrCanvas, upiURL, { width: 200, margin: 1 }, (err) => {
    if (err) console.error("QR generation failed:", err);
  });
}

if (orderFileChooseBtn) {
  orderFileChooseBtn.addEventListener("click", () => {
    orderScreenshotInput.click();
  });
}

if (orderScreenshotInput) {
  orderScreenshotInput.addEventListener("change", () => {
    if (orderScreenshotInput.files && orderScreenshotInput.files.length > 0) {
      orderFileNameEl.textContent = orderScreenshotInput.files[0].name;
      orderFileClearBtn.style.display = "flex";
    } else {
      orderFileNameEl.textContent = "No file chosen";
      orderFileClearBtn.style.display = "none";
    }
  });
}

if (orderFileClearBtn) {
  orderFileClearBtn.addEventListener("click", () => {
    orderScreenshotInput.value = "";
    orderFileNameEl.textContent = "No file chosen";
    orderFileClearBtn.style.display = "none";
  });
}

if (orderCopyUpiBtn) {  orderCopyUpiBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(BUSINESS_UPI_ID).then(() => {
      orderCopyUpiBtn.textContent = "Copied!";
      setTimeout(() => { orderCopyUpiBtn.textContent = "Copy"; }, 1500);
    });
  });
}

if (orderBackToDetails) {
  orderBackToDetails.addEventListener("click", () => {
    orderStepPayment.style.display = "none";
    orderStepDetails.style.display = "block";
  });
}

// Resizes + compresses the screenshot in the browser, then returns it as a
// base64 JPEG string small enough to fit inside a Firestore document (max 1MB).
function compressImageToBase64(file, maxWidth = 800, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load the selected image."));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Generates sequential order IDs like LC0001, LC0002... using a Firestore
// transaction so two customers placing orders at the same time never collide.
async function getNextOrderId() {
  const { doc, runTransaction } = window.firebaseUtils;
  const db = window.firebaseDb;
  const counterRef = doc(db, "counters", "orders");

  const nextNumber = await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    const currentNumber = counterDoc.exists() ? (counterDoc.data().lastOrderNumber || 0) : 0;
    const updated = currentNumber + 1;
    transaction.set(counterRef, { lastOrderNumber: updated }, { merge: true });
    return updated;
  });

  return "LC" + String(nextNumber).padStart(4, "0"); // LC0001, LC0002, ...
}

// ⚠️ Use the SAME topic name you subscribed to in the ntfy app
const NTFY_TOPIC = "lil_cocolates";

function notifyAdminViaNtfy(order) {
  const message =
    `${order.itemName} (${order.pcsLabel}) — ₹${order.amount}\n` +
    `Customer: ${order.customerName} | ${order.customerPhone}`;

  fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
    method: "POST",
    body: message,
    headers: {
      "Title": `New Order: ${order.orderId}`,
      "Priority": "high",
      "Tags": "chocolate_bar"
    }
  }).catch((err) => console.error("ntfy notification failed:", err)); // never blocks order placement
}

if (orderPlaceOrderBtn) {
  orderPlaceOrderBtn.addEventListener("click", async () => {
    if (!orderScreenshotInput.files || orderScreenshotInput.files.length === 0) {
      alert("Please upload your payment screenshot before placing the order.");
      return;
    }

    const screenshotFile = orderScreenshotInput.files[0];

    orderPlaceOrderBtn.disabled = true;
    document.getElementById("orderBtnSpinner").style.display = "inline-block";
    document.getElementById("orderBtnText").textContent = "Placing Order...";

    try {
      // 1. Get the next sequential order ID (LC0001, LC0002, ...)
      const orderId = await getNextOrderId();

      // 2. Compress the screenshot and convert it to base64 (no Storage needed)
      const screenshotBase64 = await compressImageToBase64(screenshotFile);

      if (screenshotBase64.length > 900000) {
        throw new Error("Screenshot is too large even after compression. Please try a smaller image.");
      }

      // 3. Save the full order (including the screenshot) to Firestore
      const { doc, setDoc, serverTimestamp } = window.firebaseUtils;
      const db = window.firebaseDb;

      const orderDoc = {
        orderId,
        itemName: latestFullOrder.itemName,
        pcsLabel: latestFullOrder.pcsLabel,
        flavour: latestFullOrder.flavour || null,
        amount: latestFullOrder.amount,
        categoryId: latestFullOrder.categoryId,
        nameplateDesign: latestFullOrder.nameplateDesign,
        roseColour: latestFullOrder.roseColour,
        customerName: latestFullOrder.customerName,
        customerPhone: latestFullOrder.customerPhone,
        customerAddress: latestFullOrder.customerAddress,
        customerPincode: latestFullOrder.customerPincode,
        screenshotBase64,
        status: "Pending Verification",
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, "orders", orderId), orderDoc);

      // 4. Notify admin's phone via ntfy.sh (fire-and-forget, never blocks the customer)
      notifyAdminViaNtfy({ ...latestFullOrder, orderId });

      // 5. Show success step with the real order ID
      document.getElementById("orderSuccessId").textContent = orderId;
      orderStepPayment.style.display = "none";
      document.getElementById("orderStepSuccess").style.display = "block";

    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Something went wrong while placing your order. Please try again.");
    } finally {
      orderPlaceOrderBtn.disabled = false;
      document.getElementById("orderBtnSpinner").style.display = "none";
      document.getElementById("orderBtnText").textContent = "Place Order";
    }
  });
}

const orderSuccessDoneBtn = document.getElementById("orderSuccessDoneBtn");
if (orderSuccessDoneBtn) {
  orderSuccessDoneBtn.addEventListener("click", () => {
    document.getElementById("orderStepSuccess").style.display = "none";
    closeOrderModal();
  });
}
