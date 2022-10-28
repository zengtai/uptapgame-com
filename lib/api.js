import { IMAGE_PATH, IMAGE_FORMAT, GAME_PATH } from "./constants";

export const getImageUrl = (title, format = IMAGE_FORMAT) => {
  return IMAGE_PATH + format + `/` + title.replace(/ /g, ``) + `.` + format;
};

export const getGameUrl = (title) => {
  return GAME_PATH + title.replace(/ /g, ``);
};
