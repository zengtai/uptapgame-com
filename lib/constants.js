export const ADTEST = true; // 广告模式，设置为 true 则启用 adtest="on"

export const SITE_META = {
  NAME: `PlayGames.mobi`, // 网站名称
  URL: `https://www.playgames.mobi`, // 网站网址
  DOMAIN: `playgames.mobi`, // 网站域名
  TAGLINE: `Free Online Games on PlayGames.mobi`, // 网站标语或口号
};

export const IMAGE_FORMAT = `webp`; // 游戏图标图片格式
export const IMAGE_PATH = `https://cdn.iwantalipstick.com/gameicon2/${IMAGE_FORMAT}/`; // 游戏图标路径

export const PLATFORM = `tpal`; // 平台名
export const GAME_DOMAIN = `cdn.playgames.mobi`; // 游戏链接域名

export const GAME_PATH = `https://${GAME_DOMAIN}/newgames/minigame.html?platform=${PLATFORM}&appid=`; // 游戏链接路径

export const GA_ID = `G-JFVK2YP1HZ`; // Google Analytics ID

export const ADSENSE_ID = `ca-pub-9062459637265650`; // Google Adsense ID
export const ADS_SLOTS_ID = {
  HOME: `4970224950`, // 首页广告ID
  CATEGORY: `3151491220`, // 分类页广告ID
  DETAIL: `7264381652`, // 详情页广告ID
};

export const SELECTED_GAMES = []; //选择游戏
export const EXCLUED_GAMES = ["HouseLink"]; //排除游戏
export const FEATURED_GAMES = ["FireTheGun", "CrazyKnife", "CrazyMoto"]; // 首页推荐游戏
