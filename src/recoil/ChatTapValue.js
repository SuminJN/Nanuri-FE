import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const ChatTabValue = atom({
  key: "ChatTabValue",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
