import React, { useMemo, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { setSongInfo } from "@/reduxSlice/mainSlice";
import { millisToMinutesAndSeconds } from "@/utils/index";
import CircularProgress from "@mui/material/CircularProgress";
import { filterStatusNum, filterStatus } from "@/constants";
import "./style.scss";

const columns = [
  { id: "image", label: "", minWidth: 80, colSpan: 1 },
  { id: "trackName", label: "TrackName", minWidth: 250, colSpan: 1 },
  {
    id: "collectionName",
    label: "CollectionName",
    minWidth: 170,
    align: "left",
    colSpan: 0,
  },
  {
    id: "trackTimeMillis",
    label: "TrackTimeMillis",
    minWidth: 80,
    align: "left",
    colSpan: 0,
  },
];

export default function SongList() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { songList, loading, filterValue } = useSelector(
    (state) => state.mainSlice
  );
  const dispatch = useDispatch();

  const handleClickSong = (song) => {
    dispatch(setSongInfo(song));
  };
  const songListData = useMemo(() => {
    if (filterValue == filterStatusNum.EXPLICIT) {
      return songList.filter(
        (song) => song.trackExplicitness === filterStatus.EXPLICIT
      );
    }
    if (filterValue == filterStatusNum.NOT_EXPLICIT) {
      return songList.filter(
        (song) => song.trackExplicitness === filterStatus.NOT_EXPLICIT
      );
    }
    return songList;
  }, [songList, filterValue]);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    dispatch(setSongInfo(songListData.length ? songListData[0] : {}));
  }, [songListData]);
  return (
    <Paper sx={{ width: "100%", maxHeight: 440, position: "relative" }}>
      <TableContainer sx={{ maxHeight: 440, minHeight: 270 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={1} />
              <TableCell align="left">Name of Song</TableCell>
              <TableCell align="left">Albums</TableCell>
              <TableCell align="left">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell sx={{ borderBottom: "unset" }}>
                  <CircularProgress
                    className="circular-progress"
                    color="inherit"
                  />
                </TableCell>
              </TableRow>
            ) : songListData.length ? (
              songListData.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.trackId}
                    onClick={() => handleClickSong(row)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return column.id === "image" ? (
                        <TableCell
                          key={column.id}
                          sx={{
                            width: "80px",
                          }}
                        >
                          <div
                            className="sub-image"
                            style={{
                              backgroundImage: `url(${row.artworkUrl100})`,
                            }}
                          ></div>
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          colSpan={column.colSpan}
                        >
                          {column.id === "trackTimeMillis" &&
                          row.trackTimeMillis
                            ? millisToMinutesAndSeconds(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="no-data">
                <TableCell sx={{ borderBottom: "unset" }}>
                  There is no data to show
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
