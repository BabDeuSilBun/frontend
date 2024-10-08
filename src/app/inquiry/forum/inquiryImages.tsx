'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import styled from 'styled-components';

import { ImageType } from '@/types/types';

const ImageWrapper = styled.div`
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: var(--gray200);
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  height: 23rem;
`;

interface InquiryImagesProps {
  images: ImageType[];
  isError: boolean;
}

const InquiryImages: React.FC<InquiryImagesProps> = ({ images, isError }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageURL, setImageURL] = useState('');

  const handleOpenModal = (imageURL: string) => {
    setImageURL(imageURL);
    onOpen();
  };

  if (isError) {
    return (
      <>
        <ImageWrapper>no Image</ImageWrapper>
        <ImageWrapper>no Image</ImageWrapper>
        <ImageWrapper>no Image</ImageWrapper>
      </>
    );
  }

  if (images && images.length > 0) {
    return (
      <>
        {images.map((item: ImageType) => (
          <ImageWrapper
            key={item.imageId}
            onClick={() => handleOpenModal(item.url)}
          >
            <Image
              src={item.url}
              alt={`${item.sequence}번 째 이미지`}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </ImageWrapper>
        ))}

        <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
          <ModalOverlay backdropInvert="80%" />
          <ModalContent>
            <Wrapper>
              <Image
                src={imageURL}
                alt={'확대 이미지'}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </Wrapper>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default InquiryImages;
