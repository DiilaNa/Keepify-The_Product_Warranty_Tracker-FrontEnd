import api from "./api";

export interface GetNotificationsResponse {
  success: boolean;
  count: number;
  unreadCount: number;
  data: Notification[];
}

export const fetchNotificationsApi = async () => {
  const res = await api.get<GetNotificationsResponse>(
    "/notifications/test-notifications"
  );
  return res.data;
};

export const markNotificationReadApi = async (id: string) => {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
};
