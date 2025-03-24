import { create } from 'zustand';
import { FileItem, ExtractedFile, ChatMessage } from './types';

interface AppState {
  mboxFiles: FileItem[];
  extractedFiles: ExtractedFile[];
  chatMessages: ChatMessage[];
  targetFolder: string | null;
  processingStatus: 'idle' | 'extracting' | 'uploading' | 'error';
  addMboxFiles: (files: FileItem[]) => void;
  setTargetFolder: (path: string) => void;
  addExtractedFiles: (files: ExtractedFile[]) => void;
  toggleFileSelection: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearFiles: () => void;
  updateFileStatus: (id: string, status: FileItem['status']) => void;
  updateUploadStatus: (id: string, status: ExtractedFile['uploadStatus']) => void;
  setProcessingStatus: (status: AppState['processingStatus']) => void;
}

export const useStore = create<AppState>((set) => ({
  mboxFiles: [],
  extractedFiles: [],
  chatMessages: [],
  targetFolder: null,
  processingStatus: 'idle',
  addMboxFiles: (files) =>
    set((state) => ({ mboxFiles: [...state.mboxFiles, ...files] })),
  setTargetFolder: (path) => set({ targetFolder: path }),
  addExtractedFiles: (files) =>
    set((state) => ({ extractedFiles: [...state.extractedFiles, ...files] })),
  toggleFileSelection: (id) =>
    set((state) => ({
      extractedFiles: state.extractedFiles.map((file) =>
        file.id === id ? { ...file, selected: !file.selected } : file
      ),
    })),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  clearFiles: () => set({ mboxFiles: [], extractedFiles: [], chatMessages: [] }),
  updateFileStatus: (id, status) =>
    set((state) => ({
      mboxFiles: state.mboxFiles.map((file) =>
        file.id === id ? { ...file, status } : file
      ),
    })),
  updateUploadStatus: (id, status) =>
    set((state) => ({
      extractedFiles: state.extractedFiles.map((file) =>
        file.id === id ? { ...file, uploadStatus: status } : file
      ),
    })),
  setProcessingStatus: (status) => set({ processingStatus: status }),
}));