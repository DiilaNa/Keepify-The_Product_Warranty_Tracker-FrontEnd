import { useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Skeleton,
  Stack,
} from "@mui/material";
import type { IAnnouncement } from "@/services/announcements";

interface ActionAreaCardProps {
  announcement: IAnnouncement;
}

export default function ActionAreaCard({ announcement }: ActionAreaCardProps) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const role = localStorage.getItem("role");

  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  const handleUpdate = async () => {
    // await updateAnnouncementAPI(announcement._id, editData);
    setOpen(false);
  };

  return (
    <>
      {/* ================= DIALOG ================= */}
      {/* <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#0d0f12",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", fontWeight: 700 }}>
          {announcement.title}
        </DialogTitle>

        <DialogContent sx={{ color: "#cfcfcf" }}>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {announcement.description}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          {role === "ADMIN" && (
            <Stack direction="row" spacing={1} sx={{ mr: "auto" }}>
              <Stack spacing={2}>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    background: "#111318",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />

                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    background: "#111318",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    resize: "none",
                  }}
                />
              </Stack>
             
             
              <Button variant="outlined" color="secondary"
                onClick={handleUpdate}
              >
                Save changes
              </Button>
           
            </Stack>
          )}
          <Button variant="contained" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#0d0f12",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", fontWeight: 700 }}>
          {role === "ADMIN" ? "Edit Announcement" : announcement.title}
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {/* ===== ADMIN EDIT MODE ===== */}
          {role === "ADMIN" ? (
            <Stack spacing={2}>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                placeholder="Title"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#111318",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  outline: "none",
                  fontSize: "15px",
                }}
              />

              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                rows={5}
                placeholder="Description"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#111318",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  resize: "none",
                  outline: "none",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              />
            </Stack>
          ) : (
            /* ===== USER VIEW MODE ===== */
            <Typography
              variant="body1"
              sx={{ color: "#cfcfcf", lineHeight: 1.7 }}
            >
              {announcement.description}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ color: "#aaa", borderColor: "#444" }}
          >
            Cancel
          </Button>

          {role === "ADMIN" && (
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #6a5acd, #8a7bff)",
              }}
            >
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* ================= CARD ================= */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 460,
          height: 480,
          backgroundColor: "#111318",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
          transition: "transform .3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
          },
        }}
      >
        <Box sx={{ position: "relative", height: "65%" }}>
          {!imgLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ bgcolor: "#1a1c22" }}
            />
          )}

          <CardMedia
            component="img"
            image={announcement.img_url}
            alt={announcement.title}
            onLoad={() => setImgLoaded(true)}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              display: imgLoaded ? "block" : "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))",
            }}
          />

          {/* TITLE */}
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              bottom: 20,
              left: 16,
              right: 16,
              color: "#fff",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {announcement.title}
          </Typography>

          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              display: "flex",
              gap: 1,
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            p: 2,
            textAlign: "center",
            height: "32%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#b8b8b8",
              lineHeight: 1.6,
              mb: 1,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {announcement.description}
          </Typography>

          {role === "USER" && (
            <Box sx={{ mt: "auto" }}>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 999,
                  fontWeight: 600,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #6a5acd, #8a7bff)",
                  boxShadow: "0 8px 20px rgba(138,123,255,0.35)",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 28px rgba(138,123,255,0.55)",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          )}

          {/* ADMIN BUTTONS */}
          {role === "ADMIN" && (
            <Stack
              direction="row"
              spacing={1.2}
              justifyContent="center"
              sx={{ mt: "auto" }}
            >
              <Button size="small" variant="contained" color="warning">
                Unpublish
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setEditData({
                    title: announcement.title,
                    description: announcement.description,
                  });
                  setOpen(true);
                }}
              >
                Edit
              </Button>
              <Button size="small" variant="contained" color="error">
                Delete
              </Button>
            </Stack>
          )}
        </Box>
      </Card>
    </>
  );
}
