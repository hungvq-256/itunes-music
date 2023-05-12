import React from "react";
import SongInformation from "@/components/SongInformation";
import SongList from "@/components/SongList";
import Select from "@/components/Select";

const MainPage = () => {
  return (
    <div className="container">
      <Select />
      <div className="main-content">
        <SongInformation />
        <SongList />
      </div>
    </div>
  );
};

export default MainPage;
