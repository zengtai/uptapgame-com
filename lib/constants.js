export const MODE = `dev`; // 广告模式，设置为 dev 则启用 adtest="on"

export const SITE_META = {
  NAME: `UpTapGame`, // 网站名称
  URL: `https://www.uptapgame.com`, // 网站网址
  DOMAIN: `uptapgame.com`, // 网站域名
  TAGLINE: `Free Online Games to Play`, // 网站标语或口号
};

export const IMAGE_FORMAT = `webp`; // 游戏图标图片格式
export const IMAGE_PATH = `https://cdn.iwantalipstick.com/gameicon2/${IMAGE_FORMAT}/`; // 游戏图标路径

export const PLATFORM = `uptapgame`; // 平台名
export const GAME_DOMAIN = `cdn.uptapgame.com`; // 游戏链接域名

export const GAME_PATH = `https://${GAME_DOMAIN}/newgames/minigame.html?platform=${PLATFORM}&appid=`; // 游戏链接路径

export const GA_ID = `G-L2E7FV0F5M`; // Google Analytics ID

export const ADSENSE_ID = `ca-pub-4975852181579567`; // Google Adsense ID
export const ADS_SLOTS_ID = {
  home: `3630570624`, // 首页广告ID
  categorgy: `2034132514`, // 分类页广告ID
  detail: `9812835592`, // 详情页广告ID
};

export const SELECTED_GAMES = []; //选择游戏
export const EXCLUED_GAMES = ["HouseLink"]; //排除游戏
export const FEATURED_GAMES = ["FireTheGun", "CrazyKnife", "CrazyMoto"]; // 首页推荐游戏
