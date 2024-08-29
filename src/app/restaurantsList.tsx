'use client';

import { useState } from 'react';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { SmallCustomDropdown } from '@/components/common/dropdown';
import BigRestaurantItem from '@/components/listItems/bigRestaurantItem';
import CategoryItem from '@/components/listItems/categoryItem';
import BigRestaurantItemSkeleton from '@/components/listItems/skeletons/bigRestaurantSkeleton';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getRestaurantsList } from '@/services/restaurantService';

const ListContainer = styled.section`
  margin: 110px 0 20px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  padding: 1rem 1rem 0 0;
  justify-content: right;
`;

const options = [
  { value: 'delivery-fee', name: '배달비가 낮은 순' },
  { value: 'min-price', name: '최소주문금액이 낮은 순' },
  { value: 'delivery-time', name: '배송시간이 짧은 순' },
];

function RestaurantsList() {
  const [isOpen, setIsOpen] = useState(false);
  // const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string>('deadline');
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [schoolId, setSchoolId] = useState<number | null>(null);

  // useEffect(() => {
  //   const storedSchoolId = localStorage.getItem('selectedSchoolId');
  //   const parsedStoredSchoolId = storedSchoolId ? Number(storedSchoolId) : null;

  //   if (parsedStoredSchoolId && !isNaN(parsedStoredSchoolId)) {
  //     setSchoolId(parsedStoredSchoolId);
  //   }

  //   const schoolIdParam = searchParams.get('schoolId');
  //   const parsedSchoolIdParam = schoolIdParam ? Number(schoolIdParam) : null;

  //   if (parsedSchoolIdParam && !isNaN(parsedSchoolIdParam)) {
  //     if (parsedSchoolIdParam !== schoolId) {
  //       setSchoolId(parsedSchoolIdParam);
  //       localStorage.setItem(
  //         'selectedSchoolId',
  //         parsedSchoolIdParam.toString(),
  //       );
  //     }
  //   }
  // }, [searchParams]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['restaurantsList', selectedSort, schoolId],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        page: pageParam,
        sortCriteria: selectedSort,
        schoolId: schoolId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedSort(value);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ListContainer>
      <CategoryItem />
      <Divider />
      <DropDownWrapper>
        <SmallCustomDropdown
          options={options}
          selectedValue={selectedSort}
          onSelect={handleSelect}
          isOpen={isOpen}
          onToggle={handleToggle}
        />
      </DropDownWrapper>

      {status === 'pending' ? (
        <>
          <BigRestaurantItemSkeleton />
          <BigRestaurantItemSkeleton />
        </>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : data && data.pages.length > 0 ? (
        <>
          {data.pages.map((page) =>
            page.content.map((item, index) => (
              <div
                key={item.storeId}
                ref={index === page.content.length - 1 ? lastElementRef : null}
              >
                <BigRestaurantItem item={item} key={item.storeId} />
              </div>
            )),
          )}
        </>
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
    </ListContainer>
  );
}

export default RestaurantsList;
