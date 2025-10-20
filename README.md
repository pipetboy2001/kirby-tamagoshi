
<div align="center">
  <h1>
    <img src="https://kirby.nintendo.com/assets/img/kirby-logo.png" width="80px"><br/>
    Tamagotchi Kirby
  </h1>
  <p><i>Un pequeño homenaje al héroe rosado, hecho con cariño y buenas prácticas 💖</i></p>
  <a href="https://kirby-tamagoshi.vercel.app/" target="_blank">
    🎮 <b>Jugar ahora</b>
  </a>
</div>

---

## 🧩 Descripción

**Tamagotchi Kirby** es un juego web inspirado en el clásico Tamagotchi, protagonizado por nuestro querido Kirby.  
Fue desarrollado con **React**, usando componentes de **Shadcn/ui** y estilos de **TailwindCSS**.

👉 Es una **versión modernizada** de uno de mis primeros proyectos, pero ahora aplicando **buenas prácticas, testing, y herramientas** para mantener el código limpio y escalable.

> ⚠️ Este proyecto no está afiliado ni tiene relación con Nintendo®.  
> Es un trabajo personal con fines educativos y demostrativos.

---

## 🎮 Características

- Alimentar, jugar y dormir con tu Kirby virtual.  
- Barra de vida que disminuye con el tiempo.  
- El Kirby puede morir si su vida llega a 0 (💀 cuidado con eso).  
- Animaciones suaves y diseño responsive.  
- Código limpio y organizado bajo estándares modernos (Biome + Vitest).

---

## 🖼️ Screenshots

<div align="center">
  <img src="https://i.imgur.com/alwP5AJ.png" width="600px" alt="Gameplay de Tamagotchi Kirby">
</div>

---

## 🧠 Tecnología utilizada

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) [![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com) ![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B) [![Biome](https://img.shields.io/badge/biome-7C3AED.svg?style=for-the-badge&logo=biome&logoColor=white)](https://biomejs.dev) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ⚙️ Instalación local

Si quieres ejecutarlo en tu máquina:

1. Clona el repo:
   ```bash
   git clone https://github.com/pipetboy2001/Kirby-Tamagoshi
2.  Instala dependencias (usa `pnpm`, recomendado):
    
    `pnpm install` 
    
3.  Levanta el servidor de desarrollo:
    
    `pnpm dev` 
    
4.  Abre [http://localhost:5173](http://localhost:5173) en tu navegador 🎯
    

----------

## 🧪 Testing

Este proyecto usa **Vitest** para pruebas unitarias.

-   Ejecutar todos los tests:
    
    `pnpm test` 
    
-   Ver cobertura:
    
    `pnpm coverage` 
    

----------


## 🧹 Linter — Biome

El proyecto usa **[Biome](https://biomejs.dev)** para mantener el código limpio, formateado y ordenado.  
Reemplaza a ESLint + Prettier + import-sort en un solo paso ⚡  

### 🔧 Comandos principales

| Acción | Comando | Descripción breve |
|--------|----------|-------------------|
| 🔍 Ver errores sin modificar | `pnpm lint` | Muestra advertencias y errores de lint. |
| 🧠 Lint + auto-fix seguro | `pnpm lint:write` | Aplica correcciones seguras automáticamente. |
| 🪞 Mostrar formato sugerido | `pnpm format` | Muestra qué archivos cambiaría el formateador. |
| ✨ Formatear archivos | `pnpm format:write` | Aplica formato a todo el proyecto. |
| 🧩 Check completo sin modificar | `pnpm check` | Ejecuta lint + format + imports sin escribir. |
| 🚀 Check completo con escritura | `pnpm check:write` | Hace todo (lint, format, imports) en un paso. |

💡 **Tip:** también puedes pasar un archivo específico,  
por ejemplo:

    pnpm lint src/app.ts
    pnpm format:write src/utils/

----------

## 🧩 Configuración del IDE

Para que Biome funcione bien en tu editor (VSCode, Cursor, Windsurf, etc.),  
crea un archivo `.vscode/settings.json` con esto:

    {
      "editor.defaultFormatter": "biomejs.biome",
      "editor.codeActionsOnSave": {
        "source.fixAll.biome": "always"
      }
    }
    
Esto permite que Biome:

-   Sea el formateador por defecto.
    
-   Ejecute correcciones automáticas al guardar.
    

> 🧩 Asegúrate de tener instalada la extensión **Biome** en tu editor.
> Instala la extensión oficial de Biome en tu IDE.  
> Así tendrás formato y lint automáticos al guardar 💅

----------

## 🕹️ Uso

-   Usa los botones inferiores para **alimentar**, **jugar** o **dormir** a Kirby.
    
-   Mantén equilibradas sus barras de **hambre**, **felicidad** y **salud**.
    
-   Si lo descuidas demasiado… bueno, ya sabes lo que pasa 👀💀
    

----------

## 👤 Créditos

-   [**Pipetboy**](https://github.com/pipetboy2001) – Desarrollo y diseño del proyecto.
    

----------

## 📜 Licencia

Este proyecto está bajo licencia **MIT**.  
Consulta el archivo LICENSE para más detalles.

----------

<div align="center"> <sub>✨ Proyecto creado por <b>Pipet</b> — lo que imagines puedes crear💫</sub> </div> ```
