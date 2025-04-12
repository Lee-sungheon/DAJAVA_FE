import { useEffect, useState } from 'react';

export const useImageUrl = (base64Data: string | undefined) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (base64Data) {
      try {
        if (base64Data.startsWith('data:image')) {
          setImageUrl(base64Data);
          return;
        }

        const base64String = base64Data.startsWith('data:image/png;base64,') ? base64Data.split(',')[1] : base64Data;

        const byteCharacters = atob(base64String);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);

        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error('이미지 변환 중 오류 발생:', error);
        setImageUrl('');
      }
    }
  }, [base64Data]);

  return imageUrl;
};
