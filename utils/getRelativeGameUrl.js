import { CHANNEL, GAME_DOMAIN, GAME_PATH } from "@/lib/constants";

export default function getGameRelativeUrl(id) {
  return `/newgames/minigame.html?platform=${CHANNEL}&appid=${id}`;
}
