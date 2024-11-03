import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useSidebarStore } from '../store/sidebar';

export function Header() {
  const { toggle } = useSidebarStore();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-full items-center px-4">
        <button
          onClick={toggle}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="ml-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            File Manager
          </h1>
        </div>
        <div className="ml-auto">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}