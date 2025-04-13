import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserId = atom({
  key: "UserId",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
