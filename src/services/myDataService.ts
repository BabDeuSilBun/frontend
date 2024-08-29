import { apiClientWithCredentials } from './apiClient';

import { UpdateUserProfileParams } from '@/types/myDataTypes';
import {
  CampusResponse,
  EvaluateType,
  InquiryResponse,
  MyDataType,
  NicknameType,
  PointsResponse,
} from '@/types/myDataTypes';
import { GetListParams } from '@/types/types';

export const ACCOUNT_API_URL = '/api/users/account';
export const ADDRESS_API_URL = `/api/users/address`;
export const EVALUATE_LIST_API_URL = '/api/users/evaluates';
export const INQUIRY_LIST_API_URL = `/api/users/inquires`;
export const MY_PROFILE_API_URL = '/api/users/my-page';
export const UPDATE_PROFILE_API_URL = '/api/users';
export const UPDATE_NICKNAME_API_URL = '/api/randomNickname';
export const POINT_LIST_API_URL = '/api/users/points';
export const CAMPUS_LIST_API_URL = '/api/campus';

export const getMyData = async (): Promise<MyDataType> => {
  try {
    const response =
      await apiClientWithCredentials.get<MyDataType>(MY_PROFILE_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching my data:', error);
    throw new Error(
      '내 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getCampusList = async ({
  page = 0,
  schoolId = undefined,
  size = 10,
}: GetListParams): Promise<CampusResponse> => {
  try {
    const response = await apiClientWithCredentials.get<CampusResponse>(
      CAMPUS_LIST_API_URL,
      {
        params: {
          schoolId,
          size,
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching university lists:', error);
    throw new Error(
      '캠퍼스 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const postAccount = async (
  owner: string,
  bankAccount: number,
  selectedBank: string,
) => {
  await apiClientWithCredentials.put(ADDRESS_API_URL, {
    owner: owner.trim(),
    bankAccount: bankAccount?.toString(),
    selectedBank,
  });
};

export const postNewAddress = async (
  postal: string,
  streetAddress: string,
  detailAddress: string,
) => {
  await apiClientWithCredentials.put(ADDRESS_API_URL, {
    postal: postal.trim(),
    streetAddress,
    detailAddress,
  });
};

export const getRandomNickname = async (): Promise<NicknameType> => {
  try {
    const response = await apiClientWithCredentials.get<NicknameType>(
      UPDATE_NICKNAME_API_URL,
    );
    return response.data;
  } catch (error) {
    console.error('Error creating new nickname:', error);
    throw new Error(
      '새로운 닉네임을 받아오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const updateUserProfile = async ({
  nickname = null,
  password = null,
  image = null,
  phoneNumber = null,
  majorId = null,
  schoolId = null,
}: UpdateUserProfileParams) => {
  try {
    const formData = new FormData();

    // 이미지 파일 추가 (이미지 삭제를 원할 경우 빈 문자열 전송)
    if (image instanceof File) {
      // 이미지 파일이 제공된 경우
      formData.append('image', image);
    } else if (image === '') {
      // 이미지 삭제를 원할 경우 빈 문자열을 추가
      formData.append('image', '');
    } else {
      formData.append('image', 'null');
    }

    // 다른 데이터들을 JSON 문자열로 추가
    formData.append('nickname', nickname !== null ? nickname : 'null');
    formData.append('password', password !== null ? password : 'null');
    formData.append('phoneNumber', phoneNumber !== null ? phoneNumber : 'null');
    formData.append('majorId', majorId !== null ? majorId.toString() : 'null');
    formData.append(
      'schoolId',
      schoolId !== null ? schoolId.toString() : 'null',
    );

    const response = await apiClientWithCredentials.patch(
      UPDATE_PROFILE_API_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('변경 실패:', error);
    throw error;
  }
};

export const getMyEvaluates = async (): Promise<EvaluateType> => {
  try {
    const response = await apiClientWithCredentials.get<EvaluateType>(
      EVALUATE_LIST_API_URL,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching my evaluates:', error);
    throw new Error(
      '내 평가 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getPointDetailList = async ({
  page = 0,
  size = 10,
  sortCriteria = 'earn',
}: GetListParams): Promise<PointsResponse> => {
  try {
    const response = await apiClientWithCredentials.get<PointsResponse>(
      POINT_LIST_API_URL,
      {
        params: {
          sortCriteria,
          size,
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching points detail lists:', error);
    throw new Error(
      '포인트 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getInquiries = async ({
  page = 0,
  size = 10,
}: GetListParams): Promise<InquiryResponse> => {
  try {
    const response = await apiClientWithCredentials.get<InquiryResponse>(
      INQUIRY_LIST_API_URL,
      {
        params: {
          size,
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching inquiry lists:', error);
    throw new Error(
      '문의 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getInquiryImages = async (inquiryId: number) => {
  try {
    const response = await apiClientWithCredentials.get(
      `${INQUIRY_LIST_API_URL}/${inquiryId}/images`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching inquiry data:', error);
    throw new Error(
      '문의 상세 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
