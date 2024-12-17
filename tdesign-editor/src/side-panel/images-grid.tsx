import React from 'react';
import styled from 'styled-components';

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
  &:hover .credit {
    opacity: 1;
  }
`;

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
  getCredit?: (image: ImageType) => any;
  getImageClassName?: (image: ImageType) => string;
  rowsNumber?: number;
  crossOrigin?: string;
  shadowEnabled?: boolean;
  itemHeight?: number;
  error?: any;
};
export const ImagesGrid = () => {};
