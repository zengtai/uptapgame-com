import { IMAGE_PATH, IMAGE_FORMAT, GAME_PATH } from "./constants";

export const getImageUrl = (title) => {
  return IMAGE_PATH + title.replace(/ /g, ``) + `.` + IMAGE_FORMAT;
};

export const getGameUrl = (title) => {
  return GAME_PATH + title.replace(/ /g, ``);
};
