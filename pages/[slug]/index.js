import { getGameDataBySlug, getAllGamesWithSlug } from "@/lib/api";
import Head from "next/head";
import Image from "@/components/Image";
import getIconUrl from "@/utils/getIconUrl";
import getFormatedNum from "@/utils/getFormatedNum";
import Stars from "@/components/Stars";
import Link from "next/link";
import GameListItem from "@/components/GameListItem";
import getGameUrl from "@/utils/getGameUrl";
import AdSense from "@/components/AdSense";
import { ADS_SLOT_ID, SITE_META } from "@/lib/constants";
import { basePath } from "@/next.config";

export default function Game({ data }) {
  console.log(`data`, data);
  const i = data?.game;
  const categoryName = i?.category?.name;
  const categorySlug = i?.category?.slug;
  const categoryDesc = i?.category?.description;
  const star = () => (
    <svg
      width="20"
      height="20"
      id="__star"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.19429 1.51565C9.51142 0.828115 10.4886 0.828117 10.8057 1.51565L12.796 5.83064C12.9253 6.11086 13.1908 6.30379 13.4973 6.34012L18.2161 6.89962C18.968 6.98876 19.2699 7.9181 18.7141 8.43217L15.2253 11.6585C14.9987 11.868 14.8973 12.1802 14.9575 12.4828L15.8835 17.1436C16.0311 17.8862 15.2406 18.4606 14.5799 18.0908L10.4334 15.7698C10.1641 15.619 9.83588 15.619 9.56661 15.7698L5.42013 18.0908C4.75944 18.4606 3.9689 17.8862 4.11646 17.1436L5.04255 12.4828C5.10269 12.1802 5.00126 11.868 4.7747 11.6585L1.28594 8.43217C0.730055 7.9181 1.03202 6.98876 1.7839 6.89962L6.50274 6.34012C6.80917 6.30379 7.07473 6.11085 7.20398 5.83064L9.19429 1.51565Z"
        fill="currentColor"
      />
    </svg>
  );
  return (
    <>
      <Head>
        <title>{`${i.title} | ${SITE_META.NAME}`}</title>

        <link
          rel="canonical"
          href={`${SITE_META.URL}${basePath || ``}/${i.slug}/`}
        />

        <meta name="description" content={i.description} />

        <meta
          name="keywords"
          content={`${i.title}, play ${i.title}, ${i.title} game, ${i.title} games`}
        />
      </Head>
      <div className="hidden">{star()}</div>
      <div className="container">
        {/* <AdSense slot={ADS_SLOT_ID.DETAIL} /> */}
        <div className="mx-auto max-w-3xl">
          <div className="m-4 flex xl:my-8 xl:flex-row-reverse xl:justify-between">
            <Image
              src={getIconUrl(i.appid)}
              alt={i.title}
              width={`100`}
              height={`100`}
              className={`w-28 rounded-2xl object-cover shadow-md xl:w-48`}
            />
            <div className="meta ml-3 xl:ml-0">
              <h1 className="mb-2 text-xl font-black leading-5 text-rose-500 xl:text-5xl">
                {i.title}
              </h1>
              <div className="mb-2 text-xs font-bold uppercase text-red-900 xl:text-base">
                <Link href={`/category/${i?.category.slug}`}>
                  {i?.category?.name}
                </Link>
              </div>
              <div className="rating mb-2 -ml-1 flex items-center">
                <Stars rating={i?.rating} />
                <span className="ml-1 text-lg font-black text-orange-600">
                  {(i?.rating === 5 ? i?.rating - 0.1 : i?.rating).toFixed(1)}
                </span>
              </div>{" "}
              <div className="played text-sm text-gray-400">
                {getFormatedNum(i.played) + ` played`}
              </div>
            </div>
          </div>
          <div className="mx-4 flex justify-center">
            <button className="w-full max-w-sm rounded-full bg-rose-400 px-4 py-2 text-lg font-black uppercase text-white  shadow-lg shadow-rose-100">
              <a href={getGameUrl(i.appid)}>Play Now</a>
            </button>
          </div>
          <div className="m-4 text-sm text-gray-500 xl:text-base">
            {i.description}
          </div>
          <AdSense className={`mt-4`} slot={ADS_SLOT_ID.DETAIL} />
        </div>
        <div className="m-4 border-t-2 border-rose-100 pt-4 text-lg font-bold text-rose-500 xl:mx-8">
          Related Games
        </div>
        <ul className="m-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:mx-8 xl:mt-4 xl:mb-12 xl:grid-cols-6 xl:gap-4">
          {data.related.map((i) => (
            <GameListItem key={i.appid} item={i} />
          ))}
        </ul>
      </div>
    </>
  );
}
export const getStaticProps = async (ctx) => {
  const data = await getGameDataBySlug({ slug: ctx.params.slug });
  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const games = await getAllGamesWithSlug();
  const paths = games.map((i) => ({ params: { slug: i.slug } }));
  return {
    paths,
    fallback: false,
  };
};
