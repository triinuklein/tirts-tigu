async function loadProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  // Fetch the list of project folders
  const response = await fetch("/content/projects/");
  const text = await response.text();

  // Extract folder names
  const folders = [...text.matchAll(/href="([^"]+)\/"/g)].map(m => m[1]);

  for (const folder of folders) {
    const md = await fetch(`/content/projects/${folder}/index.md`).then(r => r.text());

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
