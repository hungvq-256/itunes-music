import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setFilterValue } from "@/reduxSlice/mainSlice";
import { useSelector, useDispatch } from "react-redux";
import { filterStatusNum } from "@/constants";

const dataOptions = [
  {
    value: filterStatusNum.ALL,
    name: "all",
  },
  {
    value: filterStatusNum.EXPLICIT,
    name: "explicitly",
  },
  {
    value: filterStatusNum.NOT_EXPLICIT,
    name: "un-explicitly",
  },
];
export default function SelectSmall() {
  const [filter, setFilter] = useState(-1);
  const { filterValue } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const value = Number(event.target.value);
    setFilter(value);
    dispatch(setFilterValue(value));
  };
  useEffect(() => {
    setFilter(filterValue);
  }, [filterValue]);
  return (
    <FormControl
      sx={{ m: 1, minWidth: 120, maxWidth: 200, display: "flex" }}
      size="small"
    >
      <InputLabel id="demo-select-small-label">Filter test</InputLabel>
      <Select
        inputProps={{ "data-testid": "test-select-id" }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filter}
        onChange={handleChange}
      >
        {dataOptions.map((option, index) => (
          <MenuItem
            data-testid="test-option-id"
            value={option.value}
            key={index}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
