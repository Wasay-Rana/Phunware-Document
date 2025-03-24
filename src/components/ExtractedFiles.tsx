import React from 'react';
import { FileText, Upload, Check, X, Loader2 } from 'lucide-react';
import { useStore } from '../store';

const ExtractedFiles: React.FC = () => {
  const { extractedFiles, toggleFileSelection } = useStore();

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" />;
      case 'uploaded':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const handleUploadToDrive = () => {
    // This would trigger the transfer.py script
    console.log('Uploading selected files to Google Drive...');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Extracted Files
            </h3>
            <p className="text-sm text-gray-500">
              Select files to upload to Google Drive
            </p>
          </div>
          <button
            onClick={handleUploadToDrive}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload to Drive
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="divide-y divide-gray-200">
          {extractedFiles.map((file) => (
            <div
              key={file.id}
              className="py-3 flex items-center justify-between group hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={file.selected}
                  onChange={() => toggleFileSelection(file.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                />
                <FileText className="h-5 w-5 ml-3 text-indigo-400" />
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">From: {file.sourceFile}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
                {getStatusIcon(file.uploadStatus)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtractedFiles;