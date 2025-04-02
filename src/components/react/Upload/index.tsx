import React, { useState } from 'react';
import { message } from 'antd';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  status?: 'ready' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

interface UploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onFileSelect?: (files: FileItem[]) => void;
  onUpload?: (file: FileItem) => Promise<void>;
  className?: string;
  style?: React.CSSProperties;
}

const Uploader: React.FC<UploaderProps> = ({
  accept = '*',
  multiple = false,
  maxSize = 30 * 1024 * 1024, // 30MB
  maxFiles = 9,
  onFileSelect,
  onUpload,
  className,
  style
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);

  const handleFiles = (files: FileList) => {
    console.log('处理文件:', files); // 调试信息

    const fileItems: FileItem[] = [];
    const fileArray = Array.from(files);

    if (!multiple && fileArray.length > 1) {
      message.warning('只能选择一个文件');
      return;
    }

    if (!multiple && selectedFiles.length > 0) {
      setSelectedFiles([]);
    }

    if (selectedFiles.length + fileArray.length > maxFiles) {
      message.warning(`最多只能选择 ${maxFiles} 个文件`);
      return;
    }

    for (const file of fileArray) {
      if (file.size > maxSize) {
        message.error(`文件 ${file.name} 超过大小限制 ${Math.floor(maxSize / 1024 / 1024)}MB`);
        continue;
      }

      const fileItem: FileItem = {
        id: Math.random().toString(36).slice(2),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        status: 'ready',
        progress: 0
      };

      fileItems.push(fileItem);
      console.log('添加文件:', fileItem); // 调试信息
    }

    if (fileItems.length > 0) {
      const newFiles = [...(multiple ? selectedFiles : []), ...fileItems];
      console.log('更新文件列表:', newFiles);
      setSelectedFiles(newFiles);
      
      // 如果没有提供上传回调，则直接标记为成功
      if (!onUpload) {
        const updatedFiles = newFiles.map(file => ({
          ...file,
          status: 'success' as const,
          progress: 100
        }));
        setSelectedFiles(updatedFiles);
        onFileSelect?.(updatedFiles);
        return;
      }

      // 如果提供了上传回调，则执行上传
      onFileSelect?.(newFiles);
      fileItems.forEach(async (item) => {
        try {
          const fileIndex = newFiles.findIndex(f => f.id === item.id);
          if (fileIndex === -1) return;

          setSelectedFiles(prev => {
            const updated = [...prev];
            updated[fileIndex] = { ...updated[fileIndex], status: 'uploading' as const };
            return updated;
          });

          await onUpload(item);

          setSelectedFiles(prev => {
            const updated = [...prev];
            updated[fileIndex] = { ...updated[fileIndex], status: 'success' as const, progress: 100 };
            return updated;
          });
        } catch (error: any) {
          console.error('上传失败:', error);
          const fileIndex = newFiles.findIndex(f => f.id === item.id);
          if (fileIndex === -1) return;

          setSelectedFiles(prev => {
            const updated = [...prev];
            updated[fileIndex] = {
              ...updated[fileIndex],
              status: 'error' as const,
              error: error.message
            };
            return updated;
          });

          message.error(`文件 ${item.name} 上传失败: ${error.message}`);
        }
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // 重置 input，这样相同文件可以重复选择
      e.target.value = '';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'uploading':
        return 'text-blue-500';
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`space-y-6 ${className || ''}`} style={style}>
      <div
        className="relative group"
        onDragEnter={handleDrag}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className={`p-4 rounded-full transition-colors duration-300 ${
            dragActive 
              ? 'bg-blue-100' 
              : 'bg-gray-100 group-hover:bg-blue-100/50'
          }`}>
            <svg
              className={`w-12 h-12 transition-colors duration-300 ${
                dragActive 
                  ? 'text-blue-500' 
                  : 'text-gray-400 group-hover:text-blue-500'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="mt-4 mb-2 text-base font-medium text-gray-700">
            <span className="font-semibold text-blue-600">点击上传</span> 或拖拽文件到这里
          </p>
          <p className="text-sm text-gray-500">
            {accept === '*' ? '支持任意文件格式' : `支持的格式: ${accept}`}
          </p>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          {selectedFiles.map((file) => (
            <div
              key={file.id}
              className={`flex items-center justify-between p-4 rounded-lg border shadow-sm transition-all duration-300 ${
                file.status === 'error' 
                  ? 'border-red-200 bg-red-50/70 hover:bg-red-50' 
                  : file.status === 'success' 
                    ? 'border-green-200 bg-green-50/70 hover:bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  file.status === 'error'
                    ? 'bg-red-100'
                    : file.status === 'success'
                      ? 'bg-green-100'
                      : file.status === 'uploading'
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                }`}>
                  <svg
                    className={`w-6 h-6 ${getStatusColor(file.status)}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {file.status === 'success' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ) : file.status === 'error' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    )}
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <div className="flex items-center min-w-[120px] justify-end">
                {file.status === 'uploading' && (
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
                {file.status === 'error' && (
                  <span className="text-xs font-medium text-red-500">{file.error}</span>
                )}
                {file.status === 'success' && (
                  <span className="text-xs font-medium text-green-500">上传成功</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Uploader;