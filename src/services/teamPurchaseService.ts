import { apiClientWithCredentials } from './apiClient';

import { PurchasesResponse } from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

export const TEAM_PURCHASE_LIST_API_URL =
  '/api/users/meetings/{meetingId}/team-order';
// export const TEAM_PURCHASE_API_URL =
//   '/api/users/meetings/{meetingId}/team-purchases/{purchaseId}';

export const getTeamPurchaseList = async ({
  page = 0,
  size = 10,
  meetingId,
}: GetListParams & { meetingId: number }): Promise<PurchasesResponse> => {
  try {
    const url = TEAM_PURCHASE_LIST_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    );
    const response = await apiClientWithCredentials.get<PurchasesResponse>(
      url,
      {
        params: {
          size,
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching team purchase:', error);
    throw new Error(
      '공통 메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

// export const getTeamPurchaseInfo = async (
//   meetingId: number,
//   purchaseId: number,
// ): Promise<TeamPurchaseType> => {
//   try {
//     const url = TEAM_PURCHASE_API_URL.replace(
//       '{meetingId}',
//       meetingId.toString(),
//     ).replace('{purchaseId}', purchaseId.toString());
//     const response = await apiClient.get<TeamPurchaseType>(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching team purchase info:', error);
//     throw new Error(
//       '공통 메뉴 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
//     );
//   }
// };
