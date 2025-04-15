import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const NicknameState = atom({
  key: "NicknameState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
