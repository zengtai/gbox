import Link from "next/link";
import Image from "./Image";
import Stars from "./Stars";
import AdSense from "./AdSense";
import { ADS_SLOT_ID, SHOW_AD } from "@/lib/constants";
import getIconUrl from "@/utils/getIconUrl";
// import getGameUrl from "@/utils/getGameUrl";
import getFormatedNum from "@/utils/getFormatedNum";
import getGameRelativeUrl from "@/utils/getRelativeGameUrl";
import { useEffect, useState } from "react";
import Player from "./Player";
import getGameUrl from "@/utils/getGameUrl";

export default function GameDetail({ item }) {
  const [playerShow, setPlayerShow] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [src, setSrc] = useState();

  useEffect(() => {
    const viewPortHeight = window.innerHeight;
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth / viewPortHeight > 1) {
      setScreenHeight(viewPortHeight);
      setScreenWidth((viewPortHeight * 9) / 16);
    } else {
      setScreenWidth(viewPortWidth);
      setScreenHeight((viewPortWidth * 9) / 16);
    }
  }, []);

  function handleClick() {
    console.log(`点击play`);
    document.documentElement.style.overflow = !playerShow ? "hidden" : "";
    document.documentElement.style.height = !playerShow ? "100vh" : "";
    setPlayerShow(true);
    setSrc(i.game_url2 !== null ? i.game_url2 : getGameUrl(i.appid));
    // setSrc(getGameUrl(i.appid));
  }
  function updatePlayerState(newState) {
    setPlayerShow(newState);
    document.documentElement.style.overflow = !playerShow ? "hidden" : "";
    document.documentElement.style.height = !playerShow ? "100vh" : "";
  }

  const i = item;
  const randomKey = `${i.appid}-${Math.random()}`;
  return (
    <>
      <div className="mx-auto max-w-3xl">
        {SHOW_AD && <AdSense slot={ADS_SLOT_ID.DETAIL} key={randomKey} />}
        <div className="info">
          <Image
            src={getIconUrl(i?.appid)}
            alt={i?.title}
            width={`100`}
            height={`100`}
            className={`info-image`}
            loading={`eager`}
          />
          <div className="meta">
            <h1 className="">{i.title}</h1>
            <div className="category">
              <Link href={`/category/${i?.category.slug}`}>
                {i?.category?.name}
              </Link>
            </div>
            <div className="rating">
              <Stars rating={i?.rating} />
              <span className="score">
                {(i?.rating === 5 ? i?.rating - 0.1 : i?.rating).toFixed(1)}
              </span>
            </div>{" "}
            <div className="played">{getFormatedNum(i.played) + ` played`}</div>
          </div>
        </div>
        <div className="mx-4 flex justify-center">
          <button className="play-btn" onClick={handleClick}>
            <span
              title={`Play "${i.title}" Now`}
              // href={getGameRelativeUrl(i.appid)}
            >
              Play Now
            </span>
          </button>
        </div>
        <div className="desc">{i.description}</div>
      </div>
      {playerShow ? (
        <Player
          src={src}
          width={screenWidth}
          height={screenHeight}
          isShow={playerShow}
          updateState={updatePlayerState}
        />
      ) : null}
    </>
  );
}
