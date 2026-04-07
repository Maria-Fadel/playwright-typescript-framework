# playwright-typescript-framework
# 🎭 Playwright TypeScript Test Framework

Ein skalierbares End-to-End Testframework basierend auf **Playwright** und **TypeScript**, mit strukturierter Testorganisation, Page Object Model und automatisierter Ausführung über **GitHub Actions**.

---

## 🚀 Features

* ⚡ Schnelle und stabile E2E-Tests mit Playwright
* 🧩 Page Object Model (POM) für wartbaren Code
* 📁 Strukturierte Test-Suiten (Smoke, Regression, Integration, etc.)
* 🔁 Parallele Testausführung
* 🌍 Cross-Browser Testing (Chromium, Firefox, WebKit)
* 📊 Automatische HTML Reports
* 🤖 CI/CD Integration über GitHub Actions
* 🔐 Environment-Konfiguration

---

## 📂 Projektstruktur

```
.
├── .github/              # GitHub Actions (CI Pipeline)
├── e2e/                 # E2E Test Setup / zusätzliche Specs
├── locators/            # Selektoren / Locator-Definitionen
├── pages/               # Page Objects (POM)
├── test-data/           # Testdaten
├── test-results/        # Testergebnisse (auto-generiert)
├── playwright-report/   # HTML Reports
├── tests/
│   ├── E2E/
│   ├── IntegrationTests/
│   ├── ProductTest/
│   ├── RegressionTests/
│   ├── SmokeTests/
│   ├── cartPageTest.spec.ts
│   ├── checkoutOverviewTest.spec.ts
│   ├── checkoutPageTest.spec.ts
│   ├── loginTest.spec.ts
│   └── productPageTest.spec.ts
├── utils/
│   └── envConfig.ts     # Environment Konfiguration
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🛠️ Installation

```bash
# Repository klonen
git clone https://github.com/Maria-Fadel/playwright-typescript-framework.git

cd playwright-typescript-framework

# Abhängigkeiten installieren
npm install

# Playwright Browser installieren
npx playwright install
```

---

## ▶️ Tests ausführen

```bash
# Alle Tests
npx playwright test

# Bestimmte Suite (z.B. Smoke Tests)
npx playwright test tests/SmokeTests

# Einzelner Test
npx playwright test tests/loginTest.spec.ts

# UI Mode
npx playwright test --ui

# Debug Mode
npx playwright test --debug
```

---

## 📊 Reports anzeigen

```bash
npx playwright show-report
```

Der Report wird im Ordner `playwright-report/` generiert.

---

## 🤖 CI/CD mit GitHub Actions

Dieses Projekt nutzt **GitHub Actions**, um Tests automatisch auszuführen:

* ✔️ Bei jedem Push / Pull Request
* ✔️ Headless Browser Execution
* ✔️ Automatische Testreports
* ✔️ Schnelles Feedback für Builds

Workflow befindet sich in:

```
.github/workflows/
```

---

## ⚙️ Konfiguration

Die zentrale Konfiguration befindet sich in:

```
playwright.config.ts
```

Beispiel:

```ts
use: {
  baseURL: process.env.BASE_URL,
  headless: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

---

## 🧱 Architektur

Das Framework verwendet das **Page Object Model (POM)**:

```ts
export class LoginPage {
  async login(username: string, password: string) {
    // Login Logik
  }
}
```

---

## 🧪 Teststruktur

Tests sind nach Zweck gruppiert:

* **SmokeTests** → Schnelle Validierung kritischer Funktionen
* **RegressionTests** → Vollständige Testabdeckung
* **IntegrationTests** → Zusammenspiel mehrerer Komponenten
* **E2E** → End-to-End Szenarien
* **ProductTest** → Produktspezifische Tests

---

## 🔐 Environment Variablen

Konfiguration über:

```
utils/envConfig.ts
```

Optional kannst du `.env` verwenden:

```env


## 🧑‍💻 Best Practices

* Tests unabhängig halten
* Page Objects konsequent nutzen
* Testdaten auslagern (`test-data/`)
* Keine Hardcodierten Werte
* Klare Trennung von Logik und Tests

---

## 🤝 Contributing

1. Fork erstellen
2. Feature Branch erstellen
3. Änderungen committen
4. Pull Request öffnen

---

