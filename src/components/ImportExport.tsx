import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';

interface ImportExportProps {
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
}

export function ImportExport({ onExport, onImport }: ImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = React.useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImporting(true);
      try {
        await onImport(file);
        alert('✅ Tasks imported successfully!');
      } catch (error) {
        alert(`❌ Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        title="Export tasks as JSON"
      >
        <Download size={18} />
        Export
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors disabled:opacity-50"
        title="Import tasks from JSON"
      >
        <Upload size={18} />
        {isImporting ? 'Importing...' : 'Import'}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}
