import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Folder, FileBox, UploadCloud as CloudUpload, Check, X, Loader2 } from 'lucide-react';
import { useStore } from '../store';
import { FileItem } from '../types';
import ExtractedFiles from './ExtractedFiles';

const FileUpload: React.FC = () => {
  const { addMboxFiles, setTargetFolder, mboxFiles, processingStatus } = useStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        selected: false,
        status: 'processing' as FileItem['status'],
      }));
      addMboxFiles(newFiles);
    },
    [addMboxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/mbox': ['.mbox'],
    },
    multiple: true,
  });

  const handleFolderSelect = () => {
    // In a real app, we'd use the File System Access API
    setTargetFolder('/example/path');
  };

  const handleExtractAttachments = () => {
    // This would trigger the extract.py script
    console.log('Extracting attachments...');
  };

  const getStatusIcon = (status?: FileItem['status']) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" />;
      case 'extracted':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'uploading':
        return <CloudUpload className="h-5 w-5 text-indigo-500 animate-pulse" />;
      case 'uploaded':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2">
          Process MBOX Files
        </h1>
        <p className="text-gray-600 mb-6">
          Upload your MBOX files to extract attachments and prepare them for Google Drive
        </p>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all bg-white/50 backdrop-blur-sm ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50 scale-[0.99]'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-white/80'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <Upload
              className={`h-16 w-16 ${
                isDragActive ? 'text-indigo-500' : 'text-gray-400'
              }`}
            />
            <p className="mt-4 text-xl font-medium text-gray-900">
              Drop your .mbox files here
            </p>
            <p className="mt-2 text-sm text-gray-500">
              or click to select files to upload
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Target Folder
              </h3>
              <p className="text-sm text-gray-500">
                Select where to save extracted attachments
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleFolderSelect}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Folder className="h-5 w-5 mr-2 text-gray-400" />
                Choose Folder
              </button>
              {mboxFiles.length > 0 && (
                <button
                  onClick={handleExtractAttachments}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <FileBox className="h-5 w-5 mr-2" />
                  Extract Attachments
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Files ({mboxFiles.length})
            </h3>
            {processingStatus !== 'idle' && (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                <span className="text-sm text-gray-600">
                  {processingStatus === 'extracting'
                    ? 'Extracting attachments...'
                    : processingStatus === 'uploading'
                    ? 'Uploading to Drive...'
                    : 'Processing...'}
                </span>
              </div>
            )}
          </div>
          <div className="divide-y divide-gray-200">
            {mboxFiles.map((file) => (
              <div
                key={file.id}
                className="py-3 flex items-center justify-between group hover:bg-gray-50 rounded-lg px-3 transition-colors"
              >
                <div className="flex items-center">
                  <FileBox className="h-5 w-5 text-indigo-400" />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {file.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  {getStatusIcon(file.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ExtractedFiles />
    </div>
  );
};

export default FileUpload;