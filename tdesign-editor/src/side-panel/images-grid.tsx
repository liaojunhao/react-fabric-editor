import React, { useRef } from 'react';
import styled from 'styled-components';
import { getName } from '../utils/l10n';
import { Spinner } from '@blueprintjs/core';

const ImagesListContainer = styled.div`
  height: 100%;
  overflow: auto;
`;
const ImagesRow = styled.div`
  width: 33%;
  float: left;
`;
const ImgWrapDiv = styled.div`
  padding: 5px;
  width: 100%;
  &:hover .extra {
    opacity: 1;
  }
`;
const ImgContainerDiv = styled.div<{ 'data-shadowenabled': boolean }>`
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  box-shadow: ${(e) => (e['data-shadowenabled'] ? '0 0 5px rgba(16, 22, 26, 0.3)' : '')};
`;
const Img = styled.img`
  width: 100%;
  cursor: pointer;
  display: block;
  max-height: 300px;
  min-height: 50px;
  object-fit: contain;
`;

const ExtraWrap = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  font-size: 10px;
  padding: 3px;
  padding-top: 10px;
  text-align: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  width: 100%;
  opacity: 0;
  color: white;
`;

const NoResults = styled.p`
  text-align: center;
  padding: 30px;
`;

const Image = ({ url, onSelect, extra, crossOrigin, shadowEnabled, itemHeight, className, onLoad }) => {
  const d = null == shadowEnabled || shadowEnabled;
  return (
    <ImgWrapDiv className="tdesign-close-panel" onClick={onSelect}>
      <ImgContainerDiv data-shadowenabled={d}>
        <Img
          className={className}
          style={{ height: itemHeight ? itemHeight : 'auto' }}
          src={url}
          draggable={true}
          loading="lazy"
          crossOrigin={crossOrigin}
          onDragStart={() => {}}
          onDragEnd={() => {}}
          onLoad={onLoad}
        ></Img>
        {extra && <ExtraWrap className={'extra'}>{extra}</ExtraWrap>}
      </ImgContainerDiv>
    </ImgWrapDiv>
  );
};

type Props<ImageType> = {
  images: ImageType[] | undefined;
  onSelect: (
    image: ImageType,
    pos?: {
      x: number;
      y: number;
    },
    element?: any | undefined,
    event?: any,
  ) => void;
  isLoading: boolean;
  getPreview: (image: ImageType) => string;
  loadMore?: false | undefined | null | (() => void);
  getExtra?: (image: ImageType) => any;
  getImageClassName?: (image: ImageType) => string;
  rowsNumber?: number;
  crossOrigin?: string;
  shadowEnabled?: boolean;
  itemHeight?: number;
  error?: any;
};
export const ImagesGrid: React.FC<Props<{ url: string; type: string }>> = ({
  images,
  isLoading,
  rowsNumber,
  getPreview,
  onSelect,
  crossOrigin = 'anonymous',
  shadowEnabled,
  itemHeight,
  getImageClassName,
  getExtra,
  error,
}) => {
  const g = rowsNumber || 2;
  const m = useRef(null);
  const p = [];
  for (var f = 0; f < g; f++) {
    p.push((images || []).filter((e, t) => t % g === f));
  }
  const _ = useRef(null);
  const h = () => {};
  const v = () => {
    h();
  };
  return (
    <ImagesListContainer
      ref={m}
      onScroll={(e) => {
        console.log(e);
      }}
    >
      {p.map((e, l) => {
        return (
          <ImagesRow key={l} style={{ width: 100 / g + '%' }}>
            {e.map((e, r) => {
              return (
                <Image
                  url={getPreview(e)}
                  onSelect={(r, a, l) => {
                    onSelect(e, r, a, l);
                  }}
                  key={r}
                  crossOrigin={crossOrigin}
                  shadowEnabled={shadowEnabled}
                  itemHeight={itemHeight}
                  className={getImageClassName && getImageClassName(e)}
                  onLoad={v}
                  extra={getExtra && getExtra(e)}
                />
              );
            })}
            {isLoading && (
              <div style={{ padding: 30 }}>
                <Spinner></Spinner>
              </div>
            )}
          </ImagesRow>
        );
      })}
      {!isLoading && (!images || !images.length) && !error && <NoResults>{getName('sidePanel.noResults')}</NoResults>}
      {error && <NoResults>{getName('sidePanel.error')}</NoResults>}
    </ImagesListContainer>
  );
};
