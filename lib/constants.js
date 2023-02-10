/* 1. 网站基本信息 */
export const SITE_META = {
  NAME: `Alpaca Game`, // 网站名称
  DOMAIN: `supereasygame.com`, // 网站域名
  URL: `https://www.supereasygame.com`, // 网站主网址
  DESCRIPTION: `Join us at Alpaca Game and have fun playing the latest online casual games for free!`, // 网站描述
};

/* 2. 数据获取设置 */
export const RENEW_DATA_FROM_REMOTE = false; // 设置为 true 强制获取远程源最新数据。需要获取远程数据时使用
export const RENEW_DATA_LOCAL = false; // 设置为 true 强制更新本地数据。需要修改本地数据时使用

/* 3. 统计参数 */
export const GA_ID = `G-HKWHVF87LB`; // Google Analytics ID

/* 4. 广告参数 / 设置 */
export const DEV_MODE = false; // 设置 data-adtest="on", 构建正式版本前需设置为 false
export const SHOW_AD = true; // 总体控制全站广告是否显示

export const ADSENSE_ID = `ca-pub-9209477879340784`; // Google AdSense ID,必须与域名匹配
// 广告ID
export const ADS_SLOT_ID = {
  HOME: `3407315823`, // 首页广告ID
  CATEGORY: `6874135153`, // 分类页(含全部游戏页)广告ID
  DETAIL: `8468070817`, // 详情页广告IDcd
};
// export const ADS_SLOT_ID = {
//   HOME: `4879065891`, // 首页广告ID
//   CATEGORY: `3565984228`, // 分类页(含全部游戏页)广告ID
//   DETAIL: `6216198298`, // 详情页广告ID
// };

/* 5. 游戏链接参数 */
export const CHANNEL = `gpbox5`; // 渠道参数
export const GAME_DOMAIN = `https://cdn2.supereasygame.com`; // 游戏域名
export const GAME_PATH =
  GAME_DOMAIN + `/newgames/minigame.html?platform=` + CHANNEL + `&appid=`; // 游戏路径

/* 6. 游戏图片参数 */
export const IMAGE_PATH = `https://cdn.iwantalipstick.com/gameicon2/`; // 图片基础域名+路径
export const IMAGE_FORMAT = `webp`; // 图片默认格式,目前支持jpg/png/webp/avif

/* 7. 游戏选项 */
export const SELECTED_GAMES = []; // 选取游戏
export const EXCLUDED_GAMES = []; // 排除游戏，这个情况很少，应该改成真假判断
// 推荐游戏
export const FEATURED_GAMES = []; // 在主要列表中优先显示
export const TOP_GAMES = [
  "RoofRunner",
  "SkyRunning3D",
  "DressUpRun",
  "FrozenFamilyDressUp",
  "CrazyMoto",
  "HighHeelsOnline",
  "MakeupFashionSalon",
  "PhotoDressUp",
  "BallPaint3D",
  "SkatingMaster",
  "FireTheGun",
  "TrafficRun",
  "JumpSmash",
  "SuperSoccer",
  "AceMan",
  "BoardTheTrain",
  "CrazyKnife",
  "BatterKing",
]; // 首推游戏

/* 8. A/B测试选项 */
// 没有实现
// 考虑的是随机替换图片路径参数
