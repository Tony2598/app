import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FileList } from './components/files/FileList';
import { NoteEditor } from './components/notes/NoteEditor';
import { LinkManager } from './components/links/LinkManager';
import { useSidebarStore } from './store/sidebar';
import { cn } from './lib/utils';

function App() {
  const { isOpen } = useSidebarStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <Header />
      
      <main
        className={cn(
          'pt-16 transition-all duration-300',
          isOpen ? 'ml-64' : 'ml-16'
        )}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8">
            <FileList />
            <NoteEditor />
            <LinkManager />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;