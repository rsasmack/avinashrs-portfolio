# Avinash RS - Personal Portfolio

Source code for my personal portfolio website, hosted on GitHub Pages.

## Overview
*   **Type:** Static Website (HTML/CSS/JS)
*   **Data Source:** `data/profile.json` (Single source of truth for content)
*   **Hosting:** GitHub Pages

## Structure
*   `index.html`: Main entry point.
*   `assets/css/styles.css`: Custom styling (Modern/Dark theme).
*   `assets/js/main.js`: Logic to fetch and render profile data.
*   `data/profile.json`: Contains all text, skills, projects, and experience data.

## Local Development
To run this locally, you need a simple HTTP server because the site uses `fetch()` to load JSON data (which is blocked by browsers when using `file://`).

**Using Python:**
1.  Open a terminal in this folder.
2.  Run: `python -m http.server`
3.  Open `http://localhost:8000` in your browser.

## Editing Content
See [HOW_TO_EDIT.md](HOW_TO_EDIT.md) for detailed instructions on updating the portfolio.
