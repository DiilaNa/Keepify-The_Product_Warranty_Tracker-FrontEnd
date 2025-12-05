import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Button } from "@mui/material";

export default function ActionAreaCard() {
  return (
    <Card
      sx={{
        maxWidth: 455,
        marginBottom:3,
        borderRadius: 3, // rounded corners
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)", // soft shadow
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardActionArea>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="180"
            image="https://imgs.search.brave.com/O9Aa_px-IXGUzI9yGK1hZ9j1pDYiM7rLvwhxnxuFfQ4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzA1LzY3Lzg2/LzM2MF9GXzE1MDU2/Nzg2OTFfZ0ZQd0pr/MFdxa3VLdnpTYWNj/V2tMamZwRWdZZUx1/emwuanBn"
            alt="green iguana"
            sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          />
          {/* Optional gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
        </Box>

        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            Modern Card Title
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica.
          </Typography>
          <Button variant="contained" size="small" color="primary">
            Learn More
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
