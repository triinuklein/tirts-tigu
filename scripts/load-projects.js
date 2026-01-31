// Add your project slugs here
const projectSlugs = [
  "test2"
  // Add more slugs as you create new projects
];

async function loadProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  for (const slug of projectSlugs) {
    const md = await fetch(`/content/projects/${slug}/index.md`).then(r => r.text());

    const html = md
      .replace(/^# (.*$)/gim, "<h2>$1</h2>")
      .replace(/^## (.*$)/gim, "<h3>$1</h3>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n$/gim, "<br>");

    const item = document.createElement("div");
    item.className = "project-item";
    item.innerHTML = html;

    container.appendChild(item);
  }
}

loadProjects();
