import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "@/utils/index";
import "./style.scss";

const SongInformation = () => {
  const { songInfo } = useSelector((state) => state.mainSlice);
  return (
    <div className="song-infor-wrapper">
      <div
        className="song-infor-wrapper__main-image"
        style={{
          backgroundImage: songInfo.artworkUrl100
            ? `url(${songInfo.artworkUrl100?.replace("100x100", "500x500")})`
            : "unset",
        }}
      >
        <audio
          className="inner-audio"
          src={songInfo.previewUrl}
          controls={true}
        ></audio>
      </div>
      {!!Object.keys(songInfo).length && (
        <div className="song-infor-wrapper__infor-box">
          <h2 className="title">{songInfo.trackName ?? ""}</h2>
          <p className="sub-text">
            Collection Name: {songInfo.collectionName ?? ""}
          </p>
          <p className="sub-text">
            Release Date: {formatDate(songInfo.releaseDate ?? "")}
          </p>
          <p className="sub-text">Artist: {songInfo.artistName ?? ""}</p>
          <div className="price-box">
            <p>
              Collection Price:{" "}
              {songInfo.collectionPrice
                ? `${songInfo.collectionPrice}${songInfo.currency}`
                : ""}
            </p>
            <p>
              Track Price:{" "}
              {songInfo.collectionPrice
                ? `${songInfo.trackPrice}${songInfo.currency}`
                : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongInformation;
