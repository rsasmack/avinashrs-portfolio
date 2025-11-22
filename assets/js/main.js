document.addEventListener('DOMContentLoaded', () => {
    fetchProfileData();
    updateCopyright();
});

async function fetchProfileData() {
    try {
        const response = await fetch(`data/profile.json?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error('Failed to load profile data');
        const data = await response.json();
        renderProfile(data);
    } catch (error) {
        console.error('Error loading profile:', error);
        document.body.innerHTML = '<p style="text-align:center; padding: 2rem; color: white;">Error loading profile data. Please check console.</p>';
    }
}

function renderProfile(data) {
    const { profile, skills, experience, projects, education, certifications } = data;

    // --- Hero Section ---
    document.getElementById('hero-name').textContent = profile.name;
    document.getElementById('hero-headline').textContent = profile.headline;
    document.getElementById('hero-subheadline').textContent = profile.subHeadline;

    // --- About Section ---
    // --- About Section ---
    const aboutContainer = document.getElementById('about-content');
    if (Array.isArray(profile.about)) {
        const ul = document.createElement('ul');
        ul.className = 'about-list';
        profile.about.forEach(point => {
            const li = document.createElement('li');
            // Parse bold markdown-like syntax **text**
            li.innerHTML = point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            ul.appendChild(li);
        });
        aboutContainer.innerHTML = '';
        aboutContainer.appendChild(ul);
    } else {
        aboutContainer.textContent = profile.about;
    }

    // --- Skills Section ---
    const skillsContainer = document.getElementById('skills-grid');
    skillsContainer.innerHTML = '';
    for (const [category, items] of Object.entries(skills)) {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-category';
        skillCard.innerHTML = `
            <h3>${category}</h3>
            <div class="skill-tags">
                ${items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        skillsContainer.appendChild(skillCard);
    }

    // --- Experience Section ---
    const experienceContainer = document.getElementById('experience-timeline');
    experienceContainer.innerHTML = '';
    experience.forEach(job => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-header">
                <div>
                    <div class="role">${job.role}</div>
                    <div class="company">${job.company}</div>
                </div>
                <div class="date">${job.duration} | ${job.location}</div>
            </div>
            <p>${job.description}</p>
        `;
        experienceContainer.appendChild(item);
    });

    // --- Projects Section ---
    const projectsContainer = document.getElementById('projects-grid');
    projectsContainer.innerHTML = '';
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <div class="project-tech">
                ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
            <div class="project-desc">
                <p>${project.description}</p>
            </div>
            <a href="${project.link}" target="_blank" class="project-link">
                View on GitHub &rarr;
            </a>
        `;
        projectsContainer.appendChild(card);
    });

    // --- Education Section ---
    const educationContainer = document.getElementById('education-list');
    educationContainer.innerHTML = '';
    education.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'timeline-item'; // Reusing timeline style
        item.innerHTML = `
            <div class="timeline-header">
                <div>
                    <div class="role">${edu.degree}</div>
                    <div class="company">${edu.institution}</div>
                </div>
                <div class="date">${edu.year}</div>
            </div>
        `;
        educationContainer.appendChild(item);
    });

    // --- Certifications (Optional, appended to Education for now) ---
    if (certifications && certifications.length > 0) {
        const certSection = document.createElement('div');
        certSection.style.marginTop = '2rem';
        certSection.innerHTML = '<h3>Certifications</h3><ul style="list-style: disc; padding-left: 1.5rem; color: var(--secondary-color);">' +
            certifications.map(c => {
                if (typeof c === 'object' && c.url) {
                    return `<li><a href="${c.url}" target="_blank" style="color: var(--secondary-color); text-decoration: none; border-bottom: 1px dotted var(--secondary-color);">${c.name}</a></li>`;
                }
                return `<li>${c}</li>`;
            }).join('') + '</ul>';
        educationContainer.appendChild(certSection);
    }

    // --- Contact / Footer ---
    document.getElementById('contact-email').href = profile.social.email;
    document.getElementById('contact-email').textContent = profile.email;

    document.getElementById('footer-linkedin').href = profile.social.linkedin;
    document.getElementById('footer-github').href = profile.social.github;
}

function updateCopyright() {
    const year = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = year;
    document.getElementById('last-updated').textContent = new Date().toLocaleDateString();
}
