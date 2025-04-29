import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const TabValue = atom({
  key: "TabValue",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
