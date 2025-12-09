import api from "./api"

export const saveAnnouncementsService = async(formData:FormData) => {
    const res = await api.post("/announcements/saveAnnouncement", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data
}