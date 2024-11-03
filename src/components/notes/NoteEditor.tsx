import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastModified: string;
}

export function NoteEditor() {
  const [title, setTitle] = useState('Untitled Note');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your note here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none',
      },
    },
  });

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-xl font-semibold text-gray-900 dark:text-white focus:outline-none"
          placeholder="Note title..."
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={addTag}
            placeholder="Add tag..."
            className="inline-flex h-6 items-center rounded-full bg-gray-100 px-2.5 text-xs focus:outline-none dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="border-b border-gray-200 p-2 dark:border-gray-800">
        <div className="flex space-x-2">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={cn(
              'p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800',
              editor?.isActive('bold') && 'bg-gray-100 dark:bg-gray-800'
            )}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={cn(
              'p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800',
              editor?.isActive('italic') && 'bg-gray-100 dark:bg-gray-800'
            )}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={cn(
              'p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800',
              editor?.isActive('bulletList') && 'bg-gray-100 dark:bg-gray-800'
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <EditorContent editor={editor} />
      </div>

      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <button className="inline-flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
          <Save className="h-4 w-4" />
          <span>Save Note</span>
        </button>
      </div>
    </div>
  );
}