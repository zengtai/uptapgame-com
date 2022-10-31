import { IMAGE_PATH, IMAGE_FORMAT, GAME_PATH } from "./constants";

// 通过 title 生成图片路径，可选图片格式
export const getImageUrl = (title, format = IMAGE_FORMAT) => {
  return IMAGE_PATH + format + `/` + title.replace(/ /g, ``) + `.` + format;
};

// 通过 title 生成游戏路径
export const getGameUrl = (title) => {
  return GAME_PATH + title.replace(/ /g, ``);
};

export const getOriginalData = async () => {
  const json = await fetch(process.env.NEXT_PUBLIC_API_URL).then((res) =>
    res.json()
  );

  let data = [];

  json.gamelist.map((i) => {
    let fixedCategory = i.category
      .trim()
      .toLowerCase()
      .replace(/sport/g, `Sports`)
      .replace(/gril/g, `Girl`)
      .replace(/match3/g, `Match 3`)
      .replace(/^\S/, (s) => s.toUpperCase())
      .replace(/Io/, `.IO`);

    data.push({
      id: i.id,
      appid: i.name,
      creation_date: new Date(i.time).toISOString(),
      description: i.description,
      category: {
        name: fixedCategory,
        slug: fixedCategory.toLowerCase().replace(/\s+/g, `-`),
      },
    });
  });

  console.log(`OriginalData: `, json);

  return data;
};
