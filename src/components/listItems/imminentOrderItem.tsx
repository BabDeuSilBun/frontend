'use client';

import Image from 'next/image';
import { MeetingSummary } from '@/types/meeting';
import styled from 'styled-components';
import { StoreSummary } from '@/types/store';
import { getRestaurantDetail } from '@/services/restaurantService';
import { getCurrentHeadCount } from '@/services/teamOrderService';
import { useQuery } from '@tanstack/react-query';
import GroupIcon from '../svg/group';

// 스타일 컨테이너
const CardContainer = styled.div`
  flex: 0 0 12rem;
  margin: 1rem 1rem 0 0;
  border-radius: var(--border-radius-default);
  overflow: hidden;
  background-color: white;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  margin-bottom: 1rem;
`;

// 상단 이미지 컨테이너
const ImageSection = styled.div`
  display: flex;
  height: 8rem;
  overflow: hidden;
  background: var(--gray200);
  position: relative;
`;

// 이미지 래퍼
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// 하단 정보 컨테이너
const InfoSection = styled.div`
  display: flex;
  padding: 0.4rem;
  justify-content: space-between;
`;

// 하단 멀티플라이 정보
const InfoOverlay = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  background-color: rgba(128, 128, 128, 0.3); /* 30% 투명도 */
  padding: 0.4rem;
  color: white;
  width: 100%;
  height: fit-content;
`;

// 인원 수 표시
const ParticipantCount = styled.div`
  display: flex;
  gap: 8px;
  justify-content: right;
`;

// 제목
const StoreTitle = styled.h4.attrs({ className: 'bold' })`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// 주문 타입
const OrderTypeText = styled.p.attrs({ className: 'bold sm' })`
  white-space: nowrap;
  color: var(--primary);
`;

const ImminentItem: React.FC<{ item: MeetingSummary }> = ({ item }) => {
  const { data: storeData } = useQuery<StoreSummary>({
    queryKey: ['storeDetails', item.storeId],
    queryFn: () => getRestaurantDetail(item.storeId),
    enabled: !!item.storeId,
  });

  const { data: headCountData } = useQuery<{ currentHeadCount: number }>({
    queryKey: ['headCount', item.meetingId],
    queryFn: () => getCurrentHeadCount(item.meetingId),
    enabled: !!item.meetingId,
  });

  return (
    <CardContainer>
      <ImageSection>
        {storeData?.image[0] && (
          <ImageWrapper>
            <Image
              src={storeData.image[0].url}
              alt="Store Image"
              layout="fill"
              objectFit="cover"
            />
          </ImageWrapper>
        )}
        <InfoOverlay>
          <p className="xs">4분 뒤 마감</p>
          <ParticipantCount>
            <GroupIcon color="white" width={16} height={18} />
            <p className="xs">{`${headCountData?.currentHeadCount} / ${item.participantMax}`}</p>
          </ParticipantCount>
        </InfoOverlay>
      </ImageSection>
      <InfoSection>
        <StoreTitle>{storeData?.name}</StoreTitle>
        <OrderTypeText>{item.orderType}</OrderTypeText>
      </InfoSection>
    </CardContainer>
  );
};

export default ImminentItem;
