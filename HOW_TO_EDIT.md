# How to Edit Your Portfolio

This guide explains how to update the content of your portfolio website.

## 1. Updating Content (Text, Skills, Projects)
All the content is stored in a single file: `data/profile.json`. You do **not** need to edit HTML for most changes.

1.  Open `data/profile.json` in a text editor (VS Code, Notepad, or directly on GitHub).
2.  Locate the section you want to change.

### Examples:
*   **Update Headline:** Change the `"headline"` value under `"profile"`.
*   **Add a Skill:** Add a new string to the appropriate list under `"skills"`.
    ```json
    "skills": {
      "AI & Gen AI": [..., "New Skill"],
      ...
    }
    ```
*   **Add a Project:** Add a new object to the `"projects"` array.
    ```json
    {
      "title": "New Project Name",
      "tech": ["Python", "New Tech"],
      "description": "Description of the project.",
      "link": "https://github.com/..."
    }
    ```

## 2. Updating the "Last Updated" Date
The site automatically shows the current date when the page loads. You don't need to update this manually.

## 3. Publishing Changes
Once you have edited `data/profile.json`:

1.  **Commit** your changes:
    ```bash
    git add data/profile.json
    git commit -m "Update portfolio content"
    ```
2.  **Push** to GitHub:
    ```bash
    git push origin main
    ```
3.  **Wait:** GitHub Pages will automatically rebuild and update the live site (usually takes 1-2 minutes).

## 4. Changing Colors / Styles
To change the visual theme, edit `assets/css/styles.css`.
*   Look for the `:root` section at the top to change colors:
    ```css
    :root {
        --primary-color: #38bdf8; /* Change this hex code */
        ...
    }
    ```
