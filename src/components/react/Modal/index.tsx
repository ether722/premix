import React from 'react';
import Modal from 'react-modal';

// 定义接口
interface CropperData {
  imgUrl: string;
  cropperSize?: number;
  cropperArea?: [string, string];
}

interface EditorDataCropperProps {
  data: CropperData;
  callBack: (result: { cropperSize: number; cropperBase64: string }) => void;
}

// 设置 react-modal 的样式
Modal.setAppElement('body'); // 改为使用 body 作为根元素

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export default ({ isOpen, onClose, title, width = '778px', height = '540px', children }: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        content: {
          position: 'relative',
          width: width,
          height: height,
          margin: 'auto',
          inset: 'auto',
          padding: '20px',
          border: 'none',
          borderRadius: '8px',
          background: '#fff',
          overflow: 'auto'
        },
      }}
    >
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      )}
      {children}
    </Modal>
  );
};
