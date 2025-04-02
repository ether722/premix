import Loader from './Loaders/1'
import BouncingBalls from './3d/BouncingBalls'
import CustomModal from './Modal'
import Uploader from './Upload'
import { useState, useRef, useCallback } from 'react'
import Image from './Image/params';
import { message } from 'antd'
import { Web3Provider } from './web3/providers/Web3Provider';
import { ConnectButton } from './web3/components/ConnectButton';
import { useWeb3 } from './web3/hooks/useWeb3';
import type { Web3Config, Web3ContextType, Web3Error } from './web3/types';
import type { Chain } from './web3/types';
import type { ContractConfigs } from './web3/types/contracts';

interface CropResult {
  cropperSize: number;
  cropperBase64: string;
}

interface CropperData {
  imgUrl: string;
  cropperSize?: number;
  cropperArea?: [string, string];
}

interface EditorDataCropperProps {
  data: CropperData;
  callBack: (result: CropResult) => void;
}

const EditorDataCropper: React.FC<EditorDataCropperProps> = ({ data, callBack }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 裁剪比例
  const cropperSize = data.cropperSize || 16 / 9;
  // 裁剪图片地址
  const cropperBase64 = data.imgUrl;
  // 裁剪弹窗宽高
  const cropperArea = data.cropperArea || ['778px', '540px'];

  // 检查图片类型
  const imgType = data.imgUrl.substring(data.imgUrl.lastIndexOf('.'), data.imgUrl.length);
  if (imgType.includes('i')) {
    alert('gif格式图片不支持裁剪，请选择其他格式！');
    return null;
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || 
                      (iframeRef.current.contentWindow?.document);
      
      if (!iframeDoc) {
        console.error('无法访问 iframe 文档');
        return;
      }

      const getCroppedCanvas = iframeDoc.getElementById('getCroppedCanvas');
      if (getCroppedCanvas) {
        getCroppedCanvas.click();
      }

      const Base64Img = iframeDoc.getElementById('Base64Img') as HTMLImageElement;
      if (!Base64Img || !Base64Img.src) {
        alert('图片加载未完成');
        return;
      }

      try {
        callBack({
          cropperSize,
          cropperBase64,
        });
        closeModal();
      } catch (error) {
        console.log('文件上传失败', error);
      }
    }
  };

  return (
    <div>
      <button onClick={openModal}>打开裁剪弹窗</button>
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        title="图片裁剪"
        width={cropperArea[0]}
        height={cropperArea[1]}
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <iframe
              ref={iframeRef}
              src="./plug/cropper/index.html"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button 
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              确定
            </button>
            <button 
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              关闭
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export {
  Loader,
  BouncingBalls,
  CustomModal,
  Uploader,
  EditorDataCropper,
  Image,
  Web3Provider,
  ConnectButton,
  useWeb3,
  type Web3Config,
  type Web3ContextType,
  type Web3Error,
  type Chain,
  type ContractConfigs,
};
