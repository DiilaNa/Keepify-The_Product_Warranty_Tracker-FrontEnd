import api from "./api"

export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  status: "PUBLISHED" | "UNPUBLISHED";
  createdAt: string;
  updatedAt?: string;
  img_url: string;
  ownerId: string;
  category: {
    _id: string;
    name: string;
  };
}

export const saveAnnouncementsService = async(formData:FormData) => {
    const res = await api.post("/announcements/saveAnnouncement", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data
}

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