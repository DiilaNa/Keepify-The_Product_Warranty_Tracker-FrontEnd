import api from "./api";

export const saveAnnouncementsService = async (formData: FormData) => {
  const res = await api.post("/announcements/saveAnnouncement", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const loadAnnouncementsService = async ({
  page,
  limit,
  admin,
}: {
  page?: number;
  limit?: number;
  admin?: boolean;
}) => {
  const url = admin ? "/announcements/admin" : "/announcements";

  const res = await api.get(url, { params: { page, limit } });
  return {
    data: res.data.data,
    page: res.data.page,
    totalPages: res.data.totalPages,
  };
};

export const editAnnouncementService = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await api.put(`/announcements/edit/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

export const unpublishAnnouncementService = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const res = await api.patch(`/announcements/status/${id}`, { status });
  return res.data;
};

export const deleteAnnouncementsService = async(id:string) => {
  const res = await api.patch(`/announcements/deleteAnnouncements/${id}`);
  return res.data;
};
