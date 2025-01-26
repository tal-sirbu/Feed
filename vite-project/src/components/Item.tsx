import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import { Feed } from "../routes/index.lazy";
import { useEffect, useRef, useState } from "react";

const FeedItem = ({ feed }: { feed: Feed }) => {
  const { username, avatar, shopName, text, images, likes, comments, id } =
    feed;
  const [clicked, setClicked] = useState(false);
  const viewedItemsRef = useRef(new Set<string>());
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.dataset.id;

            if (itemId && !viewedItemsRef.current.has(itemId)) {
              sendImpression(itemId);
              viewedItemsRef.current.add(itemId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    return () => observer.current.disconnect();
  }, []);

  const sendImpression = async (itemId) => {
    try {
      await fetch(`https://backend.tedooo.com/?itemId=${itemId}`, {
        method: "GET",
      });
      console.log(`Impression sent for item ID: ${itemId}`);
    } catch (error) {
      console.error(`Failed to send impression for item ID: ${itemId}`, error);
    }
  };
  const handleClick = () => {
    setClicked(!clicked);
  };

  const attachObserver = (element) => {
    if (element) observer?.current?.observe(element);
  };

  return (
    <Box
      data-id={id}
      ref={attachObserver}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 5,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "77vw",
          boxShadow: " 0px 1px 7px 0px rgba(40, 47, 45, 0.07)",
          opacity: "0px",
          background: "#FFFFFF",
          margin: 0,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="User Avatar"
              src={avatar}
            />
          }
          title={username}
          subheader={shopName}
        />
        <CardContent>
          <Typography variant="body2">{text}</Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          {images.map(
            (image, index) =>
              index <= 1 && (
                <CardMedia
                  component="img"
                  sx={{
                    width: "547px",
                    height: "517px",
                    gap: "0px",
                    opacity: "0px",
                  }}
                  image={image}
                />
              )
          )}
        </Box>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {" "}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="src\assets\like.png"
                style={{
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                }}
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {clicked ? likes + 1 : likes} {likes === 1 ? "Like" : "Likes"}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {comments} {comments === 1 ? "Comment" : "Comments"}
            </Typography>
          </Box>
        </CardContent>
        <Divider sx={{ marginX: 2 }} />
        <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            onClick={handleClick}
            sx={{ textTransform: "none", color: clicked ? "#0A66C2" : "black" }}
            startIcon={
              <Box
                component="img"
                src="src\assets\likeButton.png"
                alt="heart"
                sx={{
                  filter: clicked
                    ? "invert(22%) sepia(95%) saturate(5800%) hue-rotate(206deg) brightness(93%) contrast(105%)"
                    : "none",
                }}
              />
            }
          >
            Like
          </Button>
          <Button
            sx={{ textTransform: "none", color: "black" }}
            startIcon={<img src="src\assets\comment.png" />}
          >
            Comment
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
export default FeedItem;