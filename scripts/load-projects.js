async function loadProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  // Load the manifest
  const manifest = await fetch("/content/projects.json")
    .then(r => r.json())
    .catch(() => []);

  for (const slug of manifest) {
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
