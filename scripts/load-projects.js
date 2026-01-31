async function loadProjects() {
  const projectsContainer = document.getElementById("projects-list");
  if (!projectsContainer) return;

  // Get list of project files
  const response = await fetch("/content/projects/");
  const text = await response.text();

  // Extract .md filenames
  const files = [...text.matchAll(/href="([^"]+\.md)"/g)].map(m => m[1]);

  for (const file of files) {
    const md = await fetch(`/content/projects/${file}`).then(r => r.text());

    // Simple markdown → HTML converter
    const html = md
      .replace(/^# (.*$)/gim, "<h2>$1</h2>")
      .replace(/^## (.*$)/gim, "<h3>$1</h3>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n$/gim, "<br>");

    const item = document.createElement("div");
    item.className = "project-item";
    item.innerHTML = html;

    projectsContainer.appendChild(item);
  }
}

loadProjects();
