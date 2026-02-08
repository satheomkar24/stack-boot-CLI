# 🚀 Stack Boot CLI

**Stack Boot CLI** is a modular, production-focused command-line tool that helps developers scaffold modern applications using clean, scalable templates.

Instead of generating bloated boilerplate, Stack Boot CLI follows a **Base + Variant** architecture, allowing features like base setup and authentication to be layered cleanly on top of a solid foundation.

> Built to save time. Designed to scale.

✨ **Zero magic. Full control. Clean DX.**

🌐 Website: https://stackbootcli.netlify.app
📦 npm: https://www.npmjs.com/package/@stackboot/cli  
⭐ GitHub: https://github.com/satheomkar24/stack-boot-CLI

---

## 🎯 Why Stack Boot CLI?

**Stack Boot** is a project generator CLI that helps you create real‑world starter projects for multiple tech stacks with a consistent, professional workflow.

It focuses on:

- Predictable folder structures
- Minimal assumptions
- Stack‑aware configuration
- Clean templates you can understand and extend

No bloated abstractions. No hidden generators. Just solid scaffolding.

---

## 🧱 Supported Stacks

| Stack              | Status | Notes                           |
| ------------------ | ------ | ------------------------------- |
| React (Vite)       | ✅     | Versioned, variant support      |
| Node.js            | ✅     | Simple backend template         |
| FastAPI            | 🛑     | Will be added in future release |
| Java (Spring Boot) | 🛑     | Will be added in future release |

---

## ✨ Core Features

### 🧱 Modular Template System

- Base template + optional variants
- Variants are merged cleanly (no hacks, no flags everywhere)
- Resulting code looks like _hand-written_ code

### ⚡ Interactive CLI

- Guided prompts using a clean UX
- Safe defaults
- No configuration overload

### ⚛️ React Scaffolding (Vite)

- Latest React version resolved automatically
- Clean folder structure
- Zero unnecessary abstractions

### 🔐 Authentication Variant

- Authentication-ready project structure
- Clean separation of routes, services, and models
- Easy to extend with JWT / OAuth

### 📦 Smart Dependency Handling

- Fetches latest stable versions from npm
- Updates `package.json` correctly
- No hardcoded versions

### 📝 Dynamic Project Metadata

- Project name injected automatically
- `index.html` title updated
- README prepared for customization

---

## 📦 Installation

### Recommended (no install required)

```bash
npx @stackboot/cli create react@18 my-app auth
```

Or install globally and use:

```bash
npm install -g @stackboot/cli
```

---

## 🛠 Usage

### Create a project

Replace `stackboot` with `npx @stackboot/cli` if using without install

```bash
stackboot create <stack> [options]
```

### Examples

```bash
# React
stackboot create react@18 my-react-app auth

# Node.js
stackboot create node my-api base

```

### Without options

```bash
stackboot create
```

or

```bash
stackboot create react
```

> 💡 Don’t worry about passing all options upfront.
> The CLI will interactively prompt you for the remaining configuration step by step.

---

## 🎯 Developer Experience Features

- Colored logs
- Step‑by‑step progress output
- Friendly error messages
- Safe conflict handling
- Clear next‑steps after generation

---

## ✅ After Generation (Next Steps)

Each stack prints tailored instructions, for example:

### React / Node

```bash
cd my-app
npm install
npm run dev
```

### Java

```bash
cd my-service
mvn spring-boot:run
```

---

## 🧪 Philosophy

Stack Boot is built with one simple rule:

> **The generated code should be understandable without reading the generator.**

If you know the stack, you should feel at home immediately.

---

## 🤝 Contributing

Contributions are welcome!

- Fork the repo
- Create a feature branch
- Open a PR with a clear description

---

## 📄 License

MIT License

---

✨ Built with care to make project setup boring again.

---

## Built By

- **Author:** Omkar Sathe
- **GitHub:** https://github.com/satheomkar24
- **Repository:** https://github.com/satheomkar24/stack-boot-CLI

---
