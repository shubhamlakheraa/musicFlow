import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontSize: "1rem",
          background:
            "linear-gradient(108.18deg, #201606 2.46%, #000000 99.84%)",
          color: "white",
        },
      },
    },
  },
});

export default function TDrawer({ musicData, setSingleSong }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleClick = (res) => {
    setSingleSong(res);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {musicData
          ? musicData.data.map((song) => (
              <div
                onClick={() => handleClick(song)}
                className="flex items-center justify-between m-4 p-2 hover:bg-[#FFFFFF14] rounded-lg cursor-pointer"
              >
                <div>
                  <p className="" key={song.id}>
                    {song.name}
                  </p>
                  <p className="opacity-[60%] text-sm" key={song.id}>
                    {song.artist}
                  </p>
                </div>
                <p className="opacity-[60%]">4:37</p>
              </div>
            ))
          : ""}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className="text-white float-right mr-[2rem]"
            onClick={toggleDrawer(anchor, true)}
          >
            <img src="/dots.png" className="" />
          </button>
          <ThemeProvider theme={theme}>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </ThemeProvider>
        </React.Fragment>
      ))}
    </div>
  );
}
