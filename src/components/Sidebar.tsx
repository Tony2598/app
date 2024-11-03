import React from 'react';
import { FileText, Link as LinkIcon, MessageSquare, Settings } from 'lucide-react';
import { useSidebarStore } from '../store/sidebar';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Files', icon: FileText },
  { name: 'Notes', icon: MessageSquare },
  { name: 'Links', icon: LinkIcon },
  { name: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { isOpen } = useSidebarStore();
  const [active, setActive] = React.useState('Files');

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 bottom-0 z-10 border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <nav className="flex h-full flex-col p-2">
        {navigation.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={cn(
              'flex items-center space-x-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
              active === name && 'bg-gray-100 text-blue-500 dark:bg-gray-800 dark:text-blue-400'
            )}
          >
            <Icon className="h-5 w-5" />
            {isOpen && <span className="text-sm font-medium">{name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}