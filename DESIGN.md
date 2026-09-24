# 🎨 DESIGN.md — MIZEN Studio Official Website Design System & Screen Blueprint

> **Norma Visual de Producción (Vibe Design First & Warm Industrial System)**  
> **Proyecto**: MIZEN Studio Official Website (`v0.1.0`)  
> **Naturaleza del Proyecto**: Sitio web corporativo e informativo del estudio (Landing B2B para captación y presentación de servicios de diseño de software e ingeniería a medida). **NO es un producto SaaS.**  
> **Firma**: MIZEN Studio (Diseño Estratégico & UI/UX de Producto) / MIZEN Systems (Ingeniería de Software Operativo)  
> **Dirección**: Claudio Ceppi  
> **Documento Canónico**: [`MIZEN DOC 5_ Reporte de Especificaciones Visuales.pdf`](file:///home/erceppidev/Documentos/proyectos/MIZEN%20Studio/DOCS/MIZEN%20DOC%205_%20Reporte%20de%20Especificaciones%20Visuales.pdf)  
> **Manual Maestro**: [`MIZEN.md`](file:///home/erceppidev/Documentos/proyectos/MIZEN%20Studio/DOCS/MIZEN.md)

---

## 1. Filosofía, Posicionamiento & Arquetipo de Marca

* **Posicionamiento**: Atelier especializado en el diseño de interfaces de alta ergonomía y desarrollo de sistemas digitales a medida para operaciones críticas (hostelería de alto volumen, logística, retail técnico y empresas que no toleran fricción).
* **Arquetipo**: *"El Conductor de Trinchera"* (The Operational Architect). Combina el rigor de la *mise en place* de alta cocina con la arquitectura de software sin sobrecarga cosmética (*zero bloat*).
* **Concepto Estético**: *Warm Industrial System*. Rechaza tanto el minimalismo clínico hospitalario como los degradados multicolores, sombras difusas y glassmorphism de las agencias comerciales convencionales. Transmite precisión matemática, superficies pulidas y serenidad operativa.

---

## 2. Sistema Cromático & Tokens de Color (Norma DOC 5)

El contraste se resuelve mediante valores tonales planos; queda expresamente prohibido el uso de degradados multicolores, texturas difusas o desenfoques tipo glassmorphism.

| Token Semántico | Modo Claro (*Daylight Service*) | Modo Oscuro (*Night Shift / Hierro Colado*) | Aplicación en la Web |
| :--- | :--- | :--- | :--- |
| **`--canvas-bg`** | `#F4F4F6` *(Warm Canvas)* | `#0E1117` *(Hierro Colado)* | Fondo de página general (evita el blanco puro #FFFFFF). |
| **`--surface-card`** | `#FFFFFF` *(Pure Surface)* | `#161922` *(Grafito Pizarra)* | Fondo de tarjetas modulares, paneles y navbar. |
| **`--surface-hover`** | `#ECEEF2` *(Superficie Táctil)* | `#212631` *(Superficie Elevada)* | Estados hover de tarjetas y listados interactivos. |
| **`--border-industrial`** | `#E2E4E9` *(Línea 1px Neutra)* | `#2B313E` *(Borde Técnico 1px)* | Trazos estructurales de separación y delimitadores de módulos. |
| **`--text-primary`** | `#111827` *(Obsidian)* | `#F3F4F6` *(Blanco Tiza)* | Encabezados (H1, H2), logotipos y titulares principales. |
| **`--text-secondary`** | `#4B5563` *(Muted Steel)* | `#9CA3AF` *(Gris Ceniza)* | Textos de apoyo, microcopy explicativo y etiquetas auxiliares. |
| **`--accent-amber`** | `#D97706` *(Kitchen Amber)* | `#F59E0B` *(Amber Bright)* | Botón primario institucional y detalle focal del isotipo. |
| **`--status-online`** | `#16A34A` *(Olive Terminal)* | `#22C55E` *(Signal Green)* | Indicador LED de estado de la firma y confirmaciones de sistema. |

---

## 3. Retícula Técnica de Fondo (Blueprint Grid)

* **Patrón de Rejilla**: Cuadrícula milimétrica técnica vectorial de **24px x 24px** sobre `--canvas-bg`.
* **Trazo de Retícula**: Líneas de 1px sólido al **4% de opacidad en modo claro** (`rgba(17, 24, 39, 0.04)`) y al **6% de opacidad en modo oscuro** (`rgba(255, 255, 255, 0.06)`).
* **Marcadores Cartesianos**: Coordenadas discretas en las esquinas de los contenedores principales (`SYS_24:84 // NORTE`, `SYS_24:84 // SUR`) renderizadas en `--text-secondary` con tamaño de **10px monoespaciado**.

---

## 4. Arquitectura Tipográfica Dual

Cero fuentes manuscritas, decorativas o con remates serif (eliminación estricta de Space Grotesk).

### A. UI & Prose Font: `Geist Sans` (Alternativa de reserva: `Inter`)
* **Uso exclusivo**: Prosa editorial, titulares de sección, textos del manifiesto y botones institucionales.
* **Escala y Pesos**:
  * **H1 Hero**: `48px` (desktop) / `32px` (mobile), peso `600` (Semibold), interlineado `1.1`, letter-spacing `-0.02em`.
  * **H2 Títulos de Sección**: `24px`, peso `600` (Semibold), interlineado `1.2`, letter-spacing `-0.01em`.
  * **H3 Cabecera de Tarjeta**: `16px`, peso `500` (Medium), interlineado `1.3`.
  * **Body / Párrafos**: `14px`, peso `400` (Regular), interlineado `1.6`, color `--text-secondary`.
  * **Labels de Botones**: `13px`, peso `500` (Medium), interlineado `1.0`.

### B. Data & Architecture Font: `Geist Mono` (Alternativa de reserva: `JetBrains Mono`)
* **Uso exclusivo**: Índices de tarjetas (`LAW_01`, `LAW_02`), referencias de sistema (`SYS_STATUS: ONLINE`), indicadores de rol (`LÍNEA 01: OPS`), telemetría y metadatos de prototipos.
* **Escala y Pesos**:
  * **Microetiquetas / Badges**: `11px`, peso `500` (Medium), letter-spacing `+0.05em`, transformación `uppercase`.
  * **Métricas / Códigos Técnicos**: `13px` a `14px`, peso `600` (Semibold).

---

## 5. Geometría de Contenedores, Bordes y Elevación

* **Grosor Estructural**: **1px sólido estricto** (`--border-industrial`). Queda prohibido el uso de bordes de 2px o variables.
* **Radios de Esquina (Border Radius)**:
  * Paneles grandes, tarjetas modulares (cards) y ventanas de código: **`6px` fijos**.
  * Botones de acción, inputs de texto y badges técnicos: **`4px` fijos**.
  * **Restricción visual**: Prohibidos radios mayores a 8px o esquinas píldora (`full-rounded` / `9999px`).
* **Elevación y Profundidad**:
  * `box-shadow: none` en estado base. La separación de planos se resuelve mediante la superposición de `--surface-card` sobre `--canvas-bg`, delimitada por el borde de 1px.
  * En estado hover de tarjetas de servicio y módulos interactivos: elevación táctica sutil opcional: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)`.

---

## 6. Microinteracciones y Estados de Componentes

* **Tiempos de Transición**: Estandarizados estrictamente entre **80ms y 100ms** (`transition: all 80ms ease-out`). Cero transiciones lentas o elásticas de marketing.
* **Botón Primario (`[ Contactar ]` / `[ Iniciar Conversación ]` / `[ Resolver mi Operativa ]`)**:
  * Fondo: `--accent-amber` (`#D97706` / `#F59E0B`).
  * Texto: **Blanco puro (`#FFFFFF`)**, peso `500`.
  * Padding: `8px 16px` (escritorio) o `10px 18px` (móvil).
  * Hover: Cambio inmediato a Amber Bright (`#F59E0B`) en modo claro o aumento leve de brillo en modo oscuro.
  * Active: Reducción de escala sutil a `scale(0.98)` para respuesta física instantánea.
* **Botón Secundario / Outline**:
  * Fondo: Transparente.
  * Borde: 1px sólido `--border-industrial`.
  * Texto: `--text-primary`.
  * Hover: Fondo `--canvas-bg`.

---

## 7. Arquitectura de Secciones del Sitio Web (Estructura Informativa B2B)

### 7.1. Barra de Control Superior (Header)
* Altura: `56px` fija, adhesiva (*sticky*).
* Contenido:
  * **Izquierda**: Isotipo MIZEN (`/assets/brand/mizen-symbol-*.svg`) + Logotipo + Badge de estado `[SYS_STATUS: ONLINE // Q3 2026]` con punto verde oliva (`#16A34A`).
  * **Centro**: Descriptor técnico: `OPERATIONAL SOFTWARE & WEB DEVELOPMENT ATELIER` (visible en `>768px`).
  * **Derecha**: Selector de iluminación Daylight/Night Shift + Botón primario ámbar `[ Iniciar Conversación ]` con texto en blanco puro `#FFFFFF`.

### 7.2. Hero Section (Posicionamiento Estratégico)
* Etiqueta técnica: `[ LÍNEA 01 // ATELIER DE ARQUITECTURA DIGITAL ]` en `Geist Mono` 11px uppercase.
* Titular Principal: **«SISTEMAS DIGITALES NACIDOS PARA OPERAR.»**
* Subtítulo: *«Aplicamos la disciplina del 'mise en place' a la ingeniería web y de software. Diseñamos y construimos plataformas, herramientas internas y dashboards de misión crítica para negocios que no pueden permitirse errores ni tiempos muertos.»*
* Acciones: Botón primario ámbar `[ Iniciar Conversación ]` + Botón secundario `[ Explorar Prototipos ]`.

### 7.3. Showcase Interactivo de Sistemas & Prototipos Futuros *(Sustituto de Benchmark)*
* **Propósito**: Muestra visual interactiva de los tipos de sistemas, plataformas web y herramientas que MIZEN Studio diseña y programa a medida para clientes.
* **Navegación de Prototipos (Pestañas / Switcher)**:
  1. `[ 01. TPV // SALA & BARRA ]`: Interfaz táctil de alta velocidad con botones de 48px, adición de pedidos en 2 clics y diseño defensivo contra toques erróneos. (*Assets: `cash-register-*.svg`, `preview-cash-audit-*.svg`*).
  2. `[ 02. KDS // PASE & COCINA ]`: Pantalla de pase con tickets modulares ordenados por tiempo de espera y telemetría de mesa sin retrasos. (*Assets: `kds-screen-*.svg`, `preview-kds-card-*.svg`*).
  3. `[ 03. AUDITORÍA // CONTROL DIRECTIVO ]`: Dashboard financiero y operativo con cálculo en tiempo real de escandallos, márgenes y rotación de inventario. (*Assets: `analytics-chart-*.svg`, `recipe-costing-*.svg`, `preview-dish-margin-*.svg`*).
  4. `[ 04. RESERVAS // PLANO ESPACIAL ]`: Plano interactivo de distribución de mesas, turnos y aforos con cero latencia. (*Assets: `table-layout-*.svg`, `table-reservation-*.svg`*).
* **Contenedor**: Tarjeta modular de 6px de radio con marco de 1px `--border-industrial`, visualizador central de alta resolución e indicadores técnicos laterales en `Geist Mono`.

### 7.4. Manifiesto Tipográfico Editorial
* Disposición: 2 columnas con columna izquierda adhesiva (*sticky*).
* Columna Izquierda: Titular fijo `«El software debe servir. Nunca estorbar.»`
* Columna Derecha: Prosa editorial de trinchera que expone la diferencia entre herramientas convencionales y el estándar MIZEN:
  * Tabla comparativa: *El Defecto Habitual* (clics superfluos, congelamientos, menús confusos) vs. *El Estándar MIZEN* (respuestas <100ms, ergonomía por rol, blindaje defensivo).

### 7.5. Fichas Técnicas de Servicios (Sin Plazos Temporales)
Tres tarjetas modulares de servicio que detallan el problema que resuelven, qué hace MIZEN y entregables exactos, **sin incluir plazos de entrega**:
* **01. Auditoría de Fricción & Optimización de Software**: Detección de cuellos de botella in situ, simplificación de flujos y blueprint de reingeniería.
* **02. Arquitectura UI/UX & Sistemas de Diseño**: Segmentación estricta por roles, diseño defensivo y design system tokenizado exportable a código.
* **03. Desarrollo de Software y Web a Medida**: Construcción full-stack de herramientas operativas en React y TypeScript con estándares Google/Clean Code.

### 7.6. Bloque de Autoridad & Dirección
* Retrato contemporáneo del fundador utilizando **única y estrictamente** la imagen WebP optimizada:  
  `public/assets/brand/founder-claudio-ceppi.webp`
* Tratamiento del retrato: Enmarcado en contenedor con borde de 1px (`--border-industrial`), radio de 6px y desaturación ligera (85-90% de saturación).
* Declaración del Fundador: *«De la dirección de sala y el control de inventario a la arquitectura de software. No diseño pantallas desde una teoría abstracta; construyo sistemas basados en la realidad de la trinchera.»*
* 3 Reglas Inmutables: *01 // Empatía de Primera Línea*, *02 // Diseño Defensivo*, *03 // Cero Latencia Visual*.

### 7.7. Funnel de Cierre B2B (Sesión Técnica de Diagnóstico)
* Titular: **«Deje de luchar contra su software.»**
* Subtítulo: *«Sabemos exactamente cuánto frustra un sistema que falla o confunde a su equipo en el peor momento. Cuéntenos su operativa en una sesión técnica de 30 minutos: podemos resolverlo con una arquitectura limpia.»*
* Selector de área de intervención:
  * `[ Software o Web a medida ]`
  * `[ Auditar sistema actual ]`
  * `[ Interfaz / UI Architecture ]`
* Botón de confirmación en Ámbar Cálido: `[ Solicitar Diagnóstico de 30 Minutos ]` con texto en `#FFFFFF`.

### 7.8. Pie de Página Técnico (Footer)
* Borde superior de 1px (`--border-industrial`), fondo `--surface-card`.
* Datos del despacho MIZEN Studio & Systems en Barcelona, telemetría de infraestructura, enlaces a secciones y copyright legal.
