import React, { useState } from 'react';
import { Link, ExternalLink, Tag, Trash2 } from 'lucide-react';

interface SavedLink {
  id: string;
  url: string;
  title: string;
  tags: string[];
  createdAt: string;
}

const demoLinks: SavedLink[] = [
  {
    id: '1',
    url: 'https://example.com',
    title: 'Example Website',
    tags: ['reference', 'web'],
    createdAt: '2024-03-15',
  },
];

export function LinkManager() {
  const [links, setLinks] = useState<SavedLink[]>(demoLinks);
  const [newLink, setNewLink] = useState({ url: '', title: '', tags: '' });

  const addLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.url && newLink.title) {
      setLinks([
        ...links,
        {
          id: Date.now().toString(),
          url: newLink.url,
          title: newLink.title,
          tags: newLink.tags.split(',').map((tag) => tag.trim()),
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewLink({ url: '', title: '', tags: '' });
    }
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Saved Links</h2>
        <form onSubmit={addLink} className="mt-4 space-y-4">
          <div>
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="Enter URL..."
              className="w-full rounded-lg border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-800"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              placeholder="Enter title..."
              className="w-full rounded-lg border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-800"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={newLink.tags}
              onChange={(e) => setNewLink({ ...newLink, tags: e.target.value })}
              placeholder="Enter tags (comma-separated)..."
              className="w-full rounded-lg border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-800"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            <Link className="h-4 w-4" />
            <span>Add Link</span>
          </button>
        </form>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {links.map((link) => (
          <div key={link.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                >
                  <span className="font-medium">{link.title}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <div className="mt-1 flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-1">
                    {link.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteLink(link.id)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}