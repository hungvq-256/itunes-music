import React, { useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MusicNoteTwoToneIcon from "@mui/icons-material/MusicNoteTwoTone";
import {
  fetchSongList,
  setSearchText,
  setSongList,
} from "@/reduxSlice/mainSlice";
import { useDispatch, useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const { searchText } = useSelector((state) => state.mainSlice);
  const [textSearch, setTextSearch] = useState(searchText);
  let typingTimeOutRef = useRef(null);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    let inputVal = e.target.value;
    setTextSearch(inputVal);
    debounce(() => {
      dispatch(setSearchText(inputVal));
      if (inputVal) {
        dispatch(fetchSongList(inputVal));
        return;
      }
      dispatch(setSongList([]));
    });
  };
  const debounce = (callback) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      callback();
    }, 400);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              textAlign: "left",
              alignItems: "center",
            }}
          >
            Itunes
            <MusicNoteTwoToneIcon />
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{
                "aria-label": "search",
                "data-testid": "test-input-id",
              }}
              onChange={handleSearch}
              value={textSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
