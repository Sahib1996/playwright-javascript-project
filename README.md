# Playwright JS + POM Demo (Sauce Demo)

A small, clean end-to-end UI test suite using **Playwright (JavaScript, ESM)** and the **Page Object Model**.  
Target site: **https://www.saucedemo.com**

> **Why this repo?**  
> To demonstrate practical UI automation skills: robust selectors, basic assertions, POM structure, environment handling, and CI with artifacts (report/trace/video).

---

## ✅ What’s covered (basic scenarios)

**Login page**
- Submit with nothing → `Username is required`
- Username only (no password) → `Password is required`
- Incorrect password → `Username and password do not match…`
- Successful login → lands on `/inventory.html`

**Inventory page**
- Exactly **6** products are listed
- Every product has a **name** and a **price**
- **Add 4 items** → cart badge shows **4**
- **Remove 1 item** → badge shows **3**

**Cart page**
- Header **Your Cart** and **Checkout** button are visible
- Cart lists the **3 selected items** with names

**Checkout flow (basic)**
- Step One: enter first/last name + ZIP → Overview shows **3 items**
- Finish → **Thank you for your order!**
- Back Home → returns to inventory
- Cart badge is **cleared**

**Product details**
- Open first product → name/price visible → back to inventory

---

## 🧱 Tech & design choices

- **Playwright + JavaScript (ESM)** with `playwright.config.mjs`
- **Page Object Model** in `/pages`
- **Stable selectors** (roles, data-test, semantic locators)
- **.env-driven credentials & data** (no hardcoding)
- **Centralized test data** in `data/testData.js`
- **Tags** for quick targeted runs (`@login`, `@cart`, `@checkout`, etc.)
- **GitHub Actions CI** with HTML report + traces/videos as artifacts

---

## 🗂️ Project structure
├─ .github/
│ └─ workflows/
│ └─ playwright.yml
├─ data/
│ └─ testData.js
├─ pages/
│ ├─ LoginPage.js
│ ├─ InventoryPage.js
│ ├─ CartPage.js
│ ├─ CheckoutStepOnePage.js
│ ├─ CheckoutOverviewPage.js
│ ├─ CheckoutCompletePage.js
│ └─ ProductDetailsPage.js
├─ tests/
│ ├─ login.spec.js
│ ├─ inventory.spec.js
│ ├─ cart.spec.js
│ ├─ checkout.spec.js
│ └─ product-details.spec.js
├─ .env # local only (ignored)
├─ package.json
└─ playwright.config.mjs

##
---

## 🚀 Quick start (local)


##Create .env in the repo root (local only):

ini
Copy
Edit

SAUCE_USER=standard_user
SAUCE_PASS=secret_sauce
FIRST_NAME=John
LAST_NAME=Doe
ZIP=12345

npm run test:headed              # all tests, headed
npm run test:chromium:headed     # chromium only, headed
npm run test:login               # by tag
npm run test:cart
npm run test:checkout





