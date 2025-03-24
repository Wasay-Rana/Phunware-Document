export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  selected: boolean;
  status?: 'processing' | 'extracted' | 'uploading' | 'uploaded' | 'error';
}

export interface ExtractedFile {
  id: string;
  name: string;
  path: string;
  size: number;
  selected: boolean;
  sourceFile: string;
  type: string;
  uploadStatus?: 'pending' | 'uploading' | 'uploaded' | 'error';
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  context?: {
    files: string[];
    relevantText?: string;
  };
  loading?: boolean;
}