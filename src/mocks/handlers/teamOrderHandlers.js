import { http, HttpResponse } from 'msw';

import { applyFiltersAndSorting } from '../filteringAndSorting';
import { meetings, paginatedMeetings } from '../mockData/meetings';

import { TEAM_ORDER_LIST_API_URL } from '@/services/teamOrderService';

export const teamOrderHandlers = [
  http.get(TEAM_ORDER_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const keyword = url.searchParams.get('searchMenu');
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');

      const paginatedResponse = paginatedMeetings[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { foodCategoryFilter, keyword, size },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.get('/api/users/meetings/:meetingId', (req) => {
    const meetingId = Number(req.params.meetingId);
    const meeting = meetings.find((m) => m.meetingId === meetingId);
    if (meeting) {
      return HttpResponse.json(meeting);
    }
    return HttpResponse.status(404).json({ message: 'Meeting not found' });
  }),

  http.get('/api/users/meetings/:meetingId/headcount', () => {
    const headcount = {
      headcount: 5,
    };
    return HttpResponse.json(headcount);
  }),
];
