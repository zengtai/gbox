import Head from "next/head";
import Link from "next/link";

import PaginatedPage, { PER_PAGE } from "./page/[page]";

import { getAllCategoryWithSlug, getDataByCategorySlug } from "@/lib/api";
import GameListItem from "@/components/GameListItem";
import { SITE_META } from "@/lib/constants";
import Pagination from "@/components/Pagination";
import PaginationPage from "@/components/PaginationPage";
import { basePath } from "@/next.config";

export default function Category({ pageInfo, games, currentPage, totalGames }) {
  const categoryName = pageInfo.name;
  return (
    <>
      <Head>
        <title>{`${pageInfo.name} Games | ${SITE_META.NAME}`}</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link
          rel="canonical"
          href={`${SITE_META.URL}${basePath || ``}/category/${pageInfo.slug}/`}
        />
        <meta name="description" content={pageInfo.description} />
        <meta
          name="keywords"
          content={`${categoryName} game, ${categoryName} games, free ${categoryName} game, free ${categoryName} games, ${categoryName} online game, ${categoryName} online games`}
        />
      </Head>

      <PaginationPage
        pageInfo={pageInfo}
        games={games}
        currentPage={currentPage}
        totalGames={totalGames}
        perPage={PER_PAGE}
      />
    </>
  );
}

export async function getStaticProps(ctx) {
  const { category, games, total } = await getDataByCategorySlug({
    slug: ctx.params.slug,
    page: 1,
    limit: PER_PAGE,
  });

  return {
    props: {
      games,
      totalGames: total,
      currentPage: 1,
      pageInfo: category[0],
    },
  };
}

export const getStaticPaths = async () => {
  const data = await getAllCategoryWithSlug();

  const paths = data.map((i) => ({ params: { slug: i.slug } }));

  return {
    paths,
    fallback: false,
  };
};
