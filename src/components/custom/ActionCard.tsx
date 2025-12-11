import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import type { IAnnouncement } from "@/services/announcements";

interface ActionAreaCardProps {
  announcement: IAnnouncement;
}

export default function ActionAreaCard({ announcement}: ActionAreaCardProps) {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role")

  return (
    <>
      {/* POPUP */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Announcement Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {announcement.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {announcement.content}
          </Typography>
        </DialogContent>

        <DialogActions>
          {role === "ADMIN" && (
            <>
              <Button color="warning">Unpublish</Button>
              <Button color="secondary">Edit</Button>
              <Button color="error">Delete</Button>
            </>
          )}
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* CARD */}
      <Card
        sx={{
          maxWidth: 455,
          marginBottom: 3,
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardActionArea onClick={() => role === "USER" && setOpen(true)}>
          <Box sx={{ position: "relative" }}>
            {/* IMAGE */}
            <CardMedia
              component="img"
              height="200"
              image={announcement.img_url}
              alt={announcement.title}
              sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />

            {/* DARK GRADIENT */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
                borderRadius: "12px 12px 0 0",
              }}
            />

            {/* TEXT ON TOP OF IMAGE */}
            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                left: 12,
                color: "white",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {announcement.title}
              </Typography>
              <CardContent>
                <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                  {announcement.content?.slice(0, 80) ??
                    "No description available"}
                  ...
                </Typography>

                {/* BUTTONS BASED ON ROLE */}
                {role === "USER" && (
                  <Button
                    component="div"
                    variant="contained"
                    size="small"
                    onClick={() => setOpen(true)}
                  >
                    Learn More
                  </Button>
                )}

                {role === "ADMIN" && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="contained" color="warning">
                      Unpublish
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpen(true)}
                    >
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
}
