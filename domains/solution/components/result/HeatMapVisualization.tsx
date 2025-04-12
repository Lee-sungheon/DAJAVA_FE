'use client';

import { create } from 'heatmap.js';
import Cookies from 'js-cookie';
import { useEffect, useRef } from 'react';

import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { css } from '@dajava/styled-system/css';
import { decrypt } from '@dajava/utils/crypto';

import { useGetSolutionHeatmap } from '../../apis/application/getSolutionHeatmap';
import { useGetSolutionPageCapture } from '../../apis/application/getSolutionPageCapture';
import { useHeatmapData } from '../../hooks/useHeatmapData';
import { useHeatmapHover } from '../../hooks/useHeatmapHover';
import { THeatmapType } from '../../types/solution';

import HeatMapError from './HeatMapError';
import HeatMapOverlay from './HeatMapOverlay';
import HeatMapSkeleton from './HeatMapSkeleton';

interface HeatMapVisualizationProps {
  type: THeatmapType;
}

export const HeatMapVisualization = ({ type }: HeatMapVisualizationProps) => {
  const token = Cookies.get(COOKIE_KEY.SOLUTION_AUTH_TOKEN);
  const decryptedPassword = decrypt(token ?? '');
  const serialNumber = Cookies.get(COOKIE_KEY.SOLUTION_UUID);
  const {
    data: heatmapData,
    isLoading: isHeatmapLoading,
    error: heatmapError,
    refetch: refetchHeatmap,
  } = useGetSolutionHeatmap(serialNumber ?? '', decryptedPassword ?? '', type);

  const pageUrl = heatmapData?.pageCapture;
  const {
    data: pageCapture,
    isLoading: isPageCaptureLoading,
    error: pageCaptureError,
  } = useGetSolutionPageCapture(pageUrl ?? '');

  const createImageUrl = (blobData: Blob) => {
    try {
      return URL.createObjectURL(blobData);
    } catch (error) {
      console.error('이미지 URL 생성 중 오류 발생:', error);
      return '';
    }
  };

  const imageUrl = createImageUrl(pageCapture ?? new Blob());

  const refCallback = useHeatmapData(heatmapData);
  const { hoveredCell, handleMouseMove, handleMouseLeave } = useHeatmapHover(heatmapData);
  const prevTypeRef = useRef<THeatmapType>(type);

  useEffect(() => {
    if (type !== prevTypeRef.current) {
      prevTypeRef.current = type;
      refetchHeatmap();
    }
  }, [type, refetchHeatmap]);

  if (isHeatmapLoading || isPageCaptureLoading) {
    return <HeatMapSkeleton />;
  }

  if (heatmapError || pageCaptureError || !heatmapData) {
    return <HeatMapError />;
  }

  return (
    <div
      ref={refCallback}
      className={css({
        backgroundColor: 'gray.100',
        borderRadius: 'lg',
        position: 'relative',
        width: '100%',
        height: '100%',
      })}
      style={{
        aspectRatio: `${heatmapData.pageWidth}/${heatmapData.pageHeight}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={imageUrl}
        alt={'히트맵'}
        className={css({
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: 0,
          left: 0,
        })}
      />

      {hoveredCell && (
        <HeatMapOverlay
          x={hoveredCell.x}
          y={hoveredCell.y}
          data={{
            intensity: hoveredCell.data.intensity,
            count: hoveredCell.data.count,
          }}
        />
      )}
    </div>
  );
};

HeatMapVisualization.displayName = 'HeatMapVisualization';

export default HeatMapVisualization;
