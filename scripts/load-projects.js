// Add your project slugs here
const projectSlugs = [
  "test2",
  "test3"
  // Add more slugs as you create new projects
];

async function loadProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  for (const slug of projectSlugs) {
    const raw = await fetch(`/content/projects/${slug}/index.md`).then(r => r.text());

    // --- 1. Extract front‑matter ---
    const frontMatterMatch = raw.match(/^---([\s\S]*?)---/);
    let frontMatter = {};
    let body = raw;

    if (frontMatterMatch) {
      const yaml = frontMatterMatch[1].trim();
      body = raw.replace(frontMatterMatch[0], "").trim();

      yaml.split("\n").forEach(line => {
        const [key, ...rest] = line.split(":");
        frontMatter[key.trim()] = rest.join(":").trim();
      });
    }

    // --- 2. Convert Markdown body to simple HTML ---
    const htmlBody = body
      .replace(/^# (.*$)/gim, "<h2>$1</h2>")
      .replace(/^## (.*$)/gim, "<h3>$1</h3>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n/g, "<br>");

    // --- 3. Build your project card ---
    const item = document.createElement("article");
    item.className = "project-card";

    item.innerHTML = `
      <img src="/content/projects/${slug}/${frontMatter.image}" alt="${frontMatter.title}">
      <div class="project-card-content">
        <h3>${frontMatter.title}</h3>
        <p>${htmlBody}</p>
        ${frontMatter.pdf ? `
          <button class="pdf-open" data-pdf="/content/projects/${slug}/${frontMatter.pdf}">
            Ava PDF
          </button>
        ` : ""}
      </div>
    `;

    container.appendChild(item);
  }
}

loadProjects();
