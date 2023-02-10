import Link from "next/link";
import Image from "./Image";
import Stars from "./Stars";
import AdSense from "./AdSense";
import { ADS_SLOT_ID, SHOW_AD } from "@/lib/constants";
import getIconUrl from "@/utils/getIconUrl";
// import getGameUrl from "@/utils/getGameUrl";
import getFormatedNum from "@/utils/getFormatedNum";
import getGameRelativeUrl from "@/utils/getRelativeGameUrl";

export default function GameDetail({ item }) {
  const i = item;
  const randomKey = `${i.appid}-${Math.random()}`;
  return (
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
        <button className="play-btn">
          <a title={`Play "${i.title}" Now`} href={getGameRelativeUrl(i.appid)}>
            Play Now
          </a>
        </button>
      </div>
      <div className="desc">{i.description}</div>
    </div>
  );
}
