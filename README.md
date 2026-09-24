# 🏛️ MIZEN Studio & Systems — Web Atelier & Platform

> **Sistemas Digitales Nacidos para Operar.**  
> Atelier boutique de ingeniería de software a medida, desarrollo web de alto rendimiento y arquitectura de interfaces para grupos de restauración y operaciones críticas.

[![Version](https://img.shields.io/badge/version-v0.1.0-blue.svg)](package.json)
[![Linter](https://img.shields.io/badge/linter-oxlint-green.svg)](.oxlintrc.json)
[![Tests](https://img.shields.io/badge/tests-vitest%20%7C%20100%25%20passing-brightgreen.svg)](src/test)
[![Design](https://img.shields.io/badge/design%20system-Warm%20Industrial-amber.svg)](DESIGN.md)
[![Security](https://img.shields.io/badge/security-OWASP%20Hardened-emerald.svg)](firebase.json)

---

## 1. Filosofía & Doctrina Operativa: El «Mise en Place» Digital

MIZEN traslada la disciplina gastronómica del *mise en place* —orden estricto, preparación matemática de elementos y eliminación de movimientos superfluos— a la arquitectura de software.

1. **La Realidad Ocurre Lejos de la Pantalla**: Diseñamos para la imperfección física del entorno real: dedos apresurados, poca luz o reflejos intensos, vapor y fatiga de turno.
2. **La Jerarquía Espacial Precede al Estilo**: Proporciones limpias, retícula técnica de 24px y bordes sólidos de 1px resuelven la claridad cognitiva antes de aplicar color.
3. **La Velocidad es una Necesidad Psicológica**: Microinteracciones en menos de 80-100ms y render constante a 60 FPS (<16ms). La latencia engendra desconfianza en el operador.
4. **El Diseño Defensivo Salva Operaciones**: Vistas separadas por rol (operario vs analítica), separación física de acciones destructivas y dobles confirmaciones que protegen la caja y el stock.
5. **El Código Invisible Refleja la Belleza Visible**: Tipado estricto en TypeScript, validación en frontera y arquitectura robusta como base del orden estético.

---

## 2. Especificación Visual: Warm Industrial Design System

El diseño rechaza tanto el minimalismo clínico hospitalario como los degradados y glassmorphism comerciales de marketing. Se rige por el documento maestro [`DESIGN.md`](./DESIGN.md) y la norma **MIZEN DOC 5**:

* **Tokens Cromáticos Duales**:
  * **Modo Claro (*Daylight Service*)**: Canvas `--canvas-bg: #F4F4F6`, Tarjetas `--surface-card: #FFFFFF`, Bordes `--border-industrial: #E2E4E9`, Ámbar `--accent-amber: #D97706`.
  * **Modo Oscuro (*Night Shift / Hierro Colado*)**: Canvas `--canvas-bg: #0E1117`, Tarjetas `--surface-card: #161922`, Bordes `--border-industrial: #2B313E`, Ámbar `--accent-amber: #F59E0B`.
* **Retícula Técnica de Fondo**: Cuadrícula milimétrica vectorial de 24px x 24px al 4% (claro) y 6% (oscuro) con marcadores cartesianos discretos (`SYS_24:84 // NORTE`).
* **Geometría de Contenedores**: Bordes de **1px sólido estricto**, radio de **6px** en paneles y **4px** en botones/controles (cero radios píldora de 9999px).
* **Tipografía Dual**:
  * `Geist Sans`: Prosa editorial, titulares de sección y controles de acción.
  * `Geist Mono`: Métricas, badges, telemetría y referencias de arquitectura.

---

## 3. Arquitectura del Proyecto

```
mizenLandingPage/
├── .agents/                 # Agentes y skills especializados de Antigravity
│   ├── agents/              # Subagentes locales (backend-firebase-architect, etc.)
│   └── skills/              # Habilidades instaladas bajo demanda
├── .github/
│   └── workflows/
│       └── deploy.yml       # Pipeline CI/CD para testing, build y despliegue Firebase
├── functions/               # Backend Serverless en Google Cloud Functions v2
│   ├── src/
│   │   ├── leads/
│   │   │   └── leadHandler.ts # Validación Zod, anti-bot, rate limit y Firestore
│   │   ├── notifications/
│   │   │   └── googleNotificationService.ts # Google Chat Webhooks & Gmail API
│   │   └── index.ts         # Endpoint /api en región europe-west1
│   ├── package.json         # Dependencias Cloud Functions (firebase-admin, express, zod)
│   └── tsconfig.json        # TypeScript Node 20
├── public/                  # Assets estáticos servidos en raíz
│   ├── assets/              # Isotipos, marcas, esquemáticos y previews vectoriales
│   ├── llms.txt             # Resumen canónico para modelos de lenguaje (AEO)
│   ├── llms-full.txt        # Especificación técnica exhaustiva para asistentes IA
│   ├── robots.txt           # Configuración de rastreo para crawlers y bots de IA
│   └── sitemap.xml          # Mapa del sitio canónico
├── src/
│   ├── components/          # Componentes modulares desacoplados
│   │   ├── Navbar.tsx       # Cabecera adhesiva con selector de tema resiliente
│   │   ├── Hero.tsx         # Posicionamiento estratégico y ribbon de rendimiento
│   │   ├── FutureSystemsShowcase.tsx # Galería interactiva de sistemas (TPV, KDS, etc.)
│   │   ├── Manifesto.tsx    # Manifiesto operativo y las 5 Leyes del Mise en Place
│   │   ├── Services.tsx     # Fichas de servicio con entregables explícitos
│   │   ├── FAQ.tsx          # Acordeón accesible de resolución de objeciones B2B
│   │   ├── Authority.tsx    # Biografía y garantías del fundador (Claudio Ceppi)
│   │   ├── ClosingFunnel.tsx# Formulario de diagnóstico con honeypot y RGPD
│   │   ├── PrivacyModal.tsx # Modal accesible de confidencialidad B2B in situ
│   │   ├── ErrorBoundary.tsx# Contención defensiva de excepciones en caliente
│   │   └── Footer.tsx       # Telemetría, canales corporativos y navegación
│   ├── services/
│   │   └── leadService.ts   # Conexión Same-Origin con /api/leads y cola offline
│   ├── test/                # Suite de pruebas automatizadas (19 tests)
│   │   ├── setup.ts         # Mocks de entorno y matchers de testing-library
│   │   ├── leadService.test.ts
│   │   ├── ClosingFunnel.test.tsx
│   │   ├── ErrorBoundary.test.tsx
│   │   └── ThemePersistence.test.ts
│   ├── App.tsx              # Ensamblador principal de la aplicación
│   ├── index.css            # Tokens de diseño Warm Industrial y estilos globales
│   └── main.tsx             # Punto de entrada de React envuelto en ErrorBoundary
├── .firebaserc              # Proyecto exclusivo mizen-studio-os-21dd9
├── firebase.json            # Hosting CDN, rewrites /api/** a Functions y emuladores
├── firestore.rules          # Reglas declarativas de privilegio mínimo (Día 1)
├── storage.rules            # Reglas de contención de Cloud Storage
├── package.json             # Dependencias frontend, scripts y metadatos SemVer
├── tsconfig.json            # Configuración TypeScript estricta
└── vite.config.ts           # Configuración de compilación Vite y Vitest runner
```

---

## 4. Ciberseguridad & Hardening (OWASP Compliance)

* **Defensa en Cabeceras HTTP ([`firebase.json`](./firebase.json))**:
  * `Content-Security-Policy (CSP)` estricta (`default-src 'self'`).
  * `X-Frame-Options: DENY` (prevención de Clickjacking).
  * `X-Content-Type-Options: nosniff` (mitigación de MIME sniffing).
  * `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`.
  * `Strict-Transport-Security` con preload habilitado.
* **Seguridad Declarativa en Base de Datos ([`firestore.rules`](./firestore.rules))**:
  * Acceso directo desde cliente denegado por defecto (`allow read, write: if false;`).
  * Privilegio mínimo: únicamente Cloud Functions v2 mediante Firebase Admin SDK puede persistir datos.
* **Seguridad en Capa Aplicación & Serverless Backend**:
  * Doble validación Honeypot (cliente invisible + descarte silencioso en servidor).
  * Validación Zod estricta en servidor con estándar RFC 5321.
  * Rate-limiting defensivo por IP en Cloud Functions (máx. 5 peticiones por ventana de 10 min).
  * Hashing criptográfico de IPs para estricto cumplimiento RGPD.
  * Same-Origin Rewrites: `/api/**` se sirve bajo el mismo dominio que el hosting, eliminando vectores de ataque CORS.

---

## 5. Scripts de Desarrollo, Backend & Verificación

```bash
# Iniciar servidor de desarrollo local de frontend
npm run dev

# Ejecutar suite de pruebas unitarias defensivas frontend
npm test

# Ejecutar pruebas unitarias de Cloud Functions backend
cd functions && npm test

# Análisis estático y linter ultra-rápido (Oxlint)
npm run lint

# Verificación de tipos TypeScript y compilación de producción
npm run build
cd functions && npm run build

# Iniciar suite de emuladores locales de Firebase (Hosting + Functions + Firestore)
firebase emulators:start --only hosting,functions,firestore
```

---

## 6. Convenciones de Código y Flujo Git

* **Commits Semánticos**: Uso estricto de [Conventional Commits](https://www.conventionalcommits.org/):
  * `feat:` Nuevas capacidades o módulos de interfaz.
  * `fix:` Correcciones de bugs o ajustes defensivos.
  * `docs:` Modificaciones en especificaciones o documentación.
  * `refactor:` Mejoras internas sin alteración de comportamiento.
  * `test:` Adición o actualización de pruebas unitarias e integración.
* **Control de Versiones**:
  * Versión inicial de partida: `v0.1.0`.
  * Rama principal de producción: `main`.

---

© 2026 MIZEN Studio & Systems. Todos los derechos reservados.  
Tolerancia Cero a la Fricción Operativa.
