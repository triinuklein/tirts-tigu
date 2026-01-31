CMS.registerEventListener({
  name: 'entry-published',
  handler: ({ entry }) => {
    if (entry.get('collection') !== 'projects') return;

    const slug = entry.get('slug');
    const manifestPath = '/content/projects.json';

    fetch(manifestPath)
      .then(r => r.json())
      .catch(() => [])
      .then(list => {
        if (!list.includes(slug)) list.push(slug);

        return fetch(manifestPath, {
          method: 'PUT',
          body: JSON.stringify(list, null, 2),
        });
      });
  }
});
