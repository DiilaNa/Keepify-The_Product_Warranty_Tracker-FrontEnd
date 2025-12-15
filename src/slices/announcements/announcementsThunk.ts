import { deleteAnnouncementsService, editAnnouncementService, loadAnnouncementsService, saveAnnouncementsService, unpublishAnnouncementService } from "@/services/announcements";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveAnnouncementsThunk = createAsyncThunk(
  "/announcements/saveAnnouncement",
  async (formData: FormData, thunkAPI) => {
    try {
      return await saveAnnouncementsService(formData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save announcements"
      );
    }
  }
);

export const loadAnnouncementsThunk = createAsyncThunk(
  "/announcements/load",
  async (
    {
      page = 1,
      limit = 10,
      admin = false,
    }: { page?: number; limit?: number; admin?: boolean },
    thunkAPI
  ) => {
    try {
      return await loadAnnouncementsService({ page, limit, admin });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load announcements"
      );
    }
  }
);

export const editAnnouncement = createAsyncThunk(
  "announcements/edit",
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      return await editAnnouncementService({id,data})
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const unPublishAnnouncementThunk = createAsyncThunk(
  "announements/updateUnpublish",
  async({id,status}:{id: string; status:string},{rejectWithValue}) => {
    try{
        return await unpublishAnnouncementService({id,status});
    }catch(err:any){
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const deleteAnnouncementsThunk = createAsyncThunk(
  "announcements/deleteAnnouncements",
  async(id:string,{rejectWithValue}) => {
    try{
       return await deleteAnnouncementsService(id);
    }catch(err:any){
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);
