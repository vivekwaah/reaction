# ⚛️ Reaction – React + Vite + Tailwind + TypeScript

A modern React project built with:

- **React 18** and **React Router 6**
- **Vite** (blazing-fast build tool)
- **Tailwind CSS** + plugins
- **TypeScript**
- **Redux Toolkit**, **Axios**, **AG Grid**
- **SweetAlert2**, **HeroIcons**, and more

> 🔄 Fully containerized using **Docker**, with support for **Hot Module Replacement (HMR)** in development.

---

## 🚀 Features

- ⚛️ React 18 + TypeScript
- ⚡ Vite for fast builds
- 🎨 Tailwind CSS with typography, forms, aspect-ratio plugins
- 🧠 State management with Redux Toolkit
- 🔧 ESLint + Jest + ts-jest + Prettier (optional)
- 🐳 Dockerized for zero local setup

---

## 📦 Getting Started (No Node Required)

You do **NOT need to install Node.js** locally. Just use Docker:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/reaction.git
cd reaction
```

---

## 🛠 Development with Docker + HMR

**Start Dev Server (from PowerShell):**

```powershell
docker-compose up
```

Then open your browser at:  
[http://localhost:5173](http://localhost:5173)  
_HMR (hot reload) is enabled by default!_

---

## 🐳 Docker Files

### `docker-compose.yml`

If you want to change the development server port, update the `ports:` and the `npm run dev -- --host --port 5173` command in your `docker-compose.yml` file.

### `Dockerfile` (for production)

If you want to change the production port, update the `EXPOSE 80` line and the `docker run -p` argument accordingly.

---

## ⚙️ vite.config.ts

To change the dev server port, update the `port: 5173` line

---

## 🧪 Run Node/NPM Commands in Docker

To access a Docker-based Node terminal (e.g. to install/update packages):

```powershell
docker run --rm -it -v ${PWD}:/app -w /app node:20 sh
```

Once inside:

```bash
npm install
npm update
npm run lint
npm run build
```

Exit with `exit`.

---

## 🔧 Build for Production

```bash
docker build -t reaction-app .
docker run -d -p 3000:80 reaction-app
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🗑 Reset Node Modules (if needed)

If you hit permissions errors inside Docker, clean up from PowerShell:

```powershell
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
```
