# ☕ Aroma Blend Coffee — Endterm Web Project

A modern, responsive, and performance-optimized specialty coffeehouse web application built for the **Web Technologies 1 (Front End)** course at Astana IT University (AITU).

🌐 **Live Website:** [https://zhanibek-aitu.github.io/CoffeeShop/](https://zhanibek-aitu.github.io/CoffeeShop/)

---

## 📖 Project Overview
Aroma Blend Coffee is an 8-page commercial-grade web application featuring:
- **Semantic Structure & Layouts:** Pure HTML5 semantics, custom Box Model styling, and hybrid layouts using both **CSS Grid** and **Flexbox** without external framework dependencies for core components.
- **Responsive Framework Integration:** Fully responsive mobile-first UI powered by **Bootstrap 5.3**, utilizing the 12-column grid system, collapsing navbar toggler, and custom media queries (`@media`).
- **Client-Side Interactivity (Vanilla JS):** Real-time form validation with RegEx and whitespace sanitation, persistent Day/Night theme toggling via `localStorage`, smooth FAQ accordion transitions, dynamic date/time formatting, and native browser **Web Audio API** sound synthesis.
- **Advanced Dynamic Features (jQuery):** Real-time catalog filtering with live keyword highlighting (`<mark>`), autocomplete search suggestions, animated number counters (`.animate()`), floating toast notifications, and image lazy loading (`data-src`).

---

## 🚀 Key Features & Implementations

### 1. Responsive Layout & Modern CSS
* **12-Column Grid Architecture:** Fluid layouts using `col-12`, `col-md-6`, and `col-lg-4` adapting seamlessly across mobile (<576px), tablet (768px–991px), and desktop (>=992px) screens.
* **Persistent Dark Mode:** Theme switch saved in `localStorage`, maintaining consistent high-contrast colors across all 8 pages.
* **Pure CSS Media Queries:** Custom breakpoint demonstrations adjusting typography and card flex orientations without frameworks.

### 2. Client-Side Logic & Form Security
* **Production-Grade Form Validation:** Real-time input checking blocking whitespace-only submissions, strict email pattern matching, password length constraints ($\ge 6$ chars), and confirm-password matching.
* **Whitespace & Input Sanitation:** Space keys are proactively restricted on sensitive credential inputs.
* **Form Loading State:** Submit buttons display a loading spinner (`Please wait...`) and disable repeated clicks during simulated server processing.

### 3. Dynamic UX & Performance Optimizations
* **Real-time Live Search & Highlighting:** Instantly filters products and highlights matching terms in titles and descriptions with a fallback message when no results are found.
* **Image Lazy Loading:** Images load only when entering the viewport using `data-src` and scroll event listeners.
* **Scroll Progress Bar:** Gradient indicator tracking scroll depth fixed to the top of the viewport.
* **Interactive Rating:** 5-star rating system with event-driven CSS scale animations.

---

## 👥 Team Vertex (Group SE-2505)

| Member | Role & Key Contributions |
| :--- | :--- |
| **Zhanibek Abilkhan** | **Project Lead:** Setup, Home & About Us pages, Bootstrap Navbar, Day/Night Theme with `localStorage`, Scroll Progress Bar, Number Counters. |
| **Madiyar Kosaman** | **UI/Data Specialist:** Menu & Services pages, Pure CSS Media Queries, Live Search Filter, Autocomplete Suggestions, Keyword Highlighting. |
| **Ersaiyn Taiteliyev** | **Content & Interactions:** Portfolio & Blog pages, CSS Grid Areas layout, Bootstrap Carousel, 5-Star Rating System, Toast Notifications. |
| **Yersin Sarsengali** | **Forms & Performance:** Contact & Careers pages, Strict Form Validation, Web Audio API Sound Effects, Image Lazy Loading. |

---

## 🛠️ Tech Stack
* **Markup:** HTML5 (Semantic elements)
* **Styling:** CSS3, Flexbox, CSS Grid, Bootstrap 5.3
* **Scripting:** Vanilla JavaScript (ES6+), jQuery 3.7.1
* **Hosting & Version Control:** Git, GitHub Pages
