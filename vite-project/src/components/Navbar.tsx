import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useLocation } from "@tanstack/react-router";
import { Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const location = useLocation();
  const links = [
    { label: "Home", href: "/", src: "src/assets/home.png" },
    {
      label: "Messaging",
      href: "/messaging",
      src: "src/assets/message-circle.png",
    },
    {
      label: "Notification",
      href: "/notification",
      src: "src/assets/bell.png",
    },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        height: "58px",
        background: "#FFFFFF",
        boxShadow: "0px 7px 7px 0px #6D6D6D0A",
      }}
    >
      <Toolbar
        sx={{
          marginX: "10vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <img style={{ width: "50px" }} src={"src/assets/TEDOOO LOGO.png"} />
          <Paper
            elevation={0}
            component="form"
            sx={{
              p: "2px 4px",
              borderRadius: 8,
              mx: 1,
              display: "flex",
              alignItems: "center",
              width: 250,
              backgroundColor: "rgba(244, 245, 245, 1)",
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </Box>
        <Box sx={{ display: "flex" }}>
          {links.map((link, index) => (
            <Button
              startIcon={
                <img
                  // style={{  objectFit: 'cover',
                  // filter:  location.pathname === link.href  ?
                  // 'invert(23%) sepia(60%) saturate(300%) hue-rotate(140deg) brightness(95%) contrast(120%)' : 'none'}}
                  src={link.src}
                />
              }
              key={index}
              component={Link}
              to={link.href}
              sx={{
                height: "54px",
                borderRadius: 0,
                borderBottom:
                  location.pathname === link.href
                    ? "2px solid #2DB8A1"
                    : "none",
                textTransform: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",

                  textAlign: "left",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  color:
                    location.pathname === link.href
                      ? "#2DB8A1"
                      : "rgba(148, 151, 150, 1)",
                }}
              >
                {" "}
                {link.label}
              </Typography>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
