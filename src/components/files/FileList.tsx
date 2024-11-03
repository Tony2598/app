import React from 'react';
import { File, Folder, Image, FileText, MoreVertical } from 'lucide-react';
import { cn, formatBytes } from '../../lib/utils';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image' | 'document';
  size?: number;
  modified: string;
}

const demoFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', modified: '2024-03-15' },
  { id: '2', name: 'report.pdf', type: 'document', size: 2500000, modified: '2024-03-14' },
  { id: '3', name: 'profile.jpg', type: 'image', size: 1500000, modified: '2024-03-13' },
];

const FileIcon = ({ type }: { type: FileItem['type'] }) => {
  switch (type) {
    case 'folder':
      return <Folder className="h-5 w-5 text-blue-500" />;
    case 'image':
      return <Image className="h-5 w-5 text-green-500" />;
    case 'document':
      return <FileText className="h-5 w-5 text-orange-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

export function FileList() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Files</h2>
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            Upload
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {demoFiles.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex items-center space-x-3">
              <FileIcon type={file.type} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {file.name}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {file.size && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatBytes(file.size)}
                </span>
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {file.modified}
              </span>
              <button className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
                <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}