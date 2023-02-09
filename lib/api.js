// Fetcher
export async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { errors, data } = await res.json();
  if (errors) {
    console.error(errors);
  }

  return data;
}

// 首页数据（全部游戏列表）
export const getDataForHome = async (params) => {
  const { page, limit } = params;
  const { games, total } = await fetchAPI(
    `
    query dataForHome ($page: Int, $limit: Int) {
      games: Games (page: $page, limit: $limit, sort: "-featured") {
        title
        slug
        category { name, slug }
        played,
        rating,
        appid
      }
      total: Games_aggregated {
        countDistinct { appid }
      }
    }
  `,
    { variables: { limit, page } }
  );
  return { games, total: total[0].countDistinct.appid };
};

// 获取所有分类名
export const getAllCategoryWithSlug = async () => {
  const { categories } = await fetchAPI(`
    query {
      categories: Categories {
        slug
      }
    }
  `);
  return categories;
};

export const getDataByCategorySlug = async (params) => {
  const { slug, page, limit } = params;
  const { category, games, total } = await fetchAPI(
    `
      query dataByCategorySlug ($slug: String, $page: Int, $limit: Int) {
        category: Categories (filter: { slug: { _eq: $slug } }) {
          name
          slug
          description
        },
        games: Games (page: $page, limit: $limit, sort: "-featured", filter: { category: { slug: { _eq: $slug } } }) {
          title
          slug
          appid
          played
          rating
        },
        total: Games_aggregated (filter: { category: { slug: { _eq: $slug } } }){
          countDistinct { appid }
        }
      }
    `,
    { variables: { slug, limit, page } }
  );

  return {
    category,
    games,
    total: total[0].countDistinct.appid,
  };
};

// 按游戏 id 获取详情数据和相关游戏列表
export const getGameDataById = async (params) => {
  const { id, limit = 6 } = params;
  const { game, related } = await fetchAPI(
    `
    query dataByIdAndRelated ($id: String, $limit: Int) {
    game: Games (filter: { appid: { _eq: $id } }) {
        title
        appid
        slug
        category { name, slug }
        description
        rating
        played
    }
    related: Games (filter: { appid: { _neq: $id }, featured: { _eq: true } }, limit: $limit) {
        title
        slug
        appid
        category { name, slug }
        rating
        played
    }
}
  `,
    {
      variables: {
        id,
        limit,
      },
    }
  );
  return { game: game?.[0], related };
};
// 按游戏 slug 获取详情数据和相关游戏列表
export const getGameDataBySlug = async (params) => {
  const { slug, limit = 6 } = params;
  const { game, related } = await fetchAPI(
    `
    query dataByIdAndRelated ($slug: String, $limit: Int) {
    game: Games (filter: { slug: { _eq: $slug } }) {
        title
        appid
        slug
        category { name, slug }
        description
        rating
        played
    }
    related: Games (filter: { slug: { _neq: $slug }, featured: { _eq: true } }, limit: $limit) {
        title
        slug
        appid
        category { name, slug }
        rating
        played
    }
}
  `,
    {
      variables: {
        slug,
        limit,
      },
    }
  );
  return { game: game?.[0], related };
};

// 所有游戏Id
// export const getAllGamesWithId = async () => {
//   const limit = await getTotalCount();
//   const { games } = await fetchAPI(
//     `
//     query getAllGamesWithId ($limit: Int){
//       games: Games (limit: $limit, filter: { status: { _eq: "published" } }) {
//         appid
//         category {
//           slug
//         }
//       }
//     }
//     `,
//     {
//       variables: {
//         limit,
//       },
//     }
//   );
//   return games;
// };
// 所有游戏slug
export const getAllGamesWithSlug = async () => {
  const limit = await getTotalCount();
  const { games } = await fetchAPI(
    `
    query getAllGamesWithId ($limit: Int){
      games: Games (limit: $limit) {
        slug
        category {
          slug
        }
      }
    }
    `,
    {
      variables: {
        limit,
      },
    }
  );
  return games;
};

// 获取总游戏数量或者总分类数量

export const getTotalCount = async (category) => {
  let data;
  data = category
    ? await fetchAPI(
        `query ($slug: String) { total: Games_aggregated (filter: { category: { slug: { _eq: $slug } } }) { countDistinct { appid } } }`,
        { variables: { slug: category } }
      )
    : await fetchAPI(
        `query { total: Games_aggregated { countDistinct { appid } } }`
      );
  return data?.total[0].countDistinct.appid;
};

// 获取用于检索的搜索结果数据

export const getSearchResult = async () => {
  const total = await getTotalCount();
  const { games } = await fetchAPI(
    `
    query ($limit: Int) {
      games: Games (limit: $total) {
        title
        slug
        appid
        category { name }
      }
    }
  `,
    {
      variables: {
        limit: total,
      },
    }
  );
  return games;
};
