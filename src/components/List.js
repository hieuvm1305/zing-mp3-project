import React from "react";
import icons from "../assets/icons";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { setCurSongId } from "../redux/musicSlice";
import { setPlaying } from "../redux/playSlice";
import { useNavigate } from "react-router-dom";
import ArtistName from "./ArtistName";
const { BsMusicNoteBeamed } = icons;

function List({ songData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#e4dde3]">
      <div className="flex items-center gap-2 flex-1">
        <div className="flex flex-row items-center gap-3 w-1/2">
          <span>
            <BsMusicNoteBeamed />
          </span>
          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="rounded-md cursor-pointer"
            onClick={() => {
              dispatch(setCurSongId(songData?.encodeId));
              dispatch(setPlaying(true));
            }}
          ></img>
          <span className="flex flex-col">
            <span className="text-sm font-semibold">
              {songData?.title?.length > 30
                ? `${songData?.title?.slice(0, 30)}...`
                : songData?.title}
            </span>
            <ArtistName artists={songData?.artists} />
          </span>
        </div>
        <div className="flex w-[30%]">
          <span className="cursor-pointer hover:border-b-[0.5px] hover:border-b-main-500 hover:text-main-500"
           onClick={() => {navigate(`${songData?.album.link}`)}}>
            {songData?.album?.title}
          </span>
        </div>

        <span className="w-1/5 text-right">
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </span>
      </div>
    </div>
  );
}

export default List;
