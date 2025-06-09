import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const HistoryTabValue = atom({
  key: "HistoryTabValue",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
