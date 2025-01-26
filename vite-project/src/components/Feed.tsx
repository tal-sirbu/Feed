import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import FeedItem from "../components/Item";
import { FEED_URL, SKIP_NUMBER } from "./consts";
import { FeedType } from "./types";

const Feed = () => {
  const [feed, setFeed] = useState<FeedType[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    if (hasMore && !loading) {
      setLoading(true);
      try {
        const response = await axios.get(`${FEED_URL}?skip=${skip}`);
        const data = response.data;
        setFeed((prevFeed) => [...prevFeed, ...data.data]);
        setHasMore(data.hasMore);
        setSkip(skip + SKIP_NUMBER);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [skip]);

  return (
    <Box
      sx={{
        background: "#F6F7F7",
        marginTop: "58px",
        overflowY: "auto",
        height: "calc(100vh - 58px)",
      }}
    >
      {feed.length > 0 &&
        feed.map((item, index) => <FeedItem key={index} feed={item} />)}
    </Box>
  );
};
export default Feed;
