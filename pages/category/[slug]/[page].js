import { SITE_META } from "@/lib/constants";
import Head from "next/head";
import PaginationPage from "@/components/PaginationPage";
import {
  getAllCategoryWithSlug,
  getDataByCategorySlug,
  getTotalCount,
} from "@/lib/api";
// import { basePath } from "@/next.config";

export const PER_PAGE = 18;

export default function PaginatedPage({
  pageInfo,
  games,
  currentPage,
  totalGames,
}) {
  // console.log("🚀 ~ file: [page].js:19 ~ totalGames", totalGames);
  // console.log("🚀 ~ file: [page].js:19 ~ currentPage", currentPage);
  // console.log("🚀 ~ file: [page].js:19 ~ games", games);
  // console.log("🚀 ~ file: [page].js:19 ~ pageInfo", pageInfo);
  const categoryName = pageInfo?.name;
  return (
    <>
      <Head>
        <title>{`${pageInfo?.name} Games - Page ${currentPage} | ${SITE_META.NAME}`}</title>
        {/* <link
          rel="canonical"
          href={`${SITE_META.URL}${basePath || ``}/category/${
            pageInfo.slug
          }/${currentPage}/`}
        />
        <meta name="description" content={pageInfo.description} />
        <meta
          name="keywords"
          content={`${categoryName} game, ${categoryName} games, free ${categoryName} game, free ${categoryName} games, ${categoryName} online game, ${categoryName} online games`}
        /> */}
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
  const page = Number(ctx.params?.page) || 1;
  const slug = ctx.params?.slug;

  const { category, games, total } = await getDataByCategorySlug({
    slug,
    limit: PER_PAGE,
    page,
  });

  if (!games.length) {
    return {
      notFound: true,
    };
  }

  if (page === 1) {
    return {
      redirect: {
        destination: `/category/${slug}/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      games,
      totalGames: total,
      currentPage: page,
      pageInfo: category[0],
    },
    // revalidate: 60 * 60 * 24, // 天
  };
}

export async function getStaticPaths() {
  const categorySlugs = await getAllCategoryWithSlug();

  const slugs = categorySlugs.map((category) => category.slug);
  // const slug = i.slug;
  let paths = [];

  for (const slug of slugs) {
    const total = await getTotalCount(slug);
    const pageCount = Math.ceil(total / PER_PAGE);
    const tmp = Array.from({ length: pageCount }, (_, index) => ({
      params: { slug, page: `${index + 2}` },
    }));
    paths = paths.concat(tmp);
  }

  console.log(`paths: `, paths);

  return {
    // paths: arr,
    paths,
    fallback: `blocking`,
    // fallback: `blocking`,
  };
}
