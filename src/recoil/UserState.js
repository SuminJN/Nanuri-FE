import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserState = atom({
    key: "userState",
    default: {},
    effects_UNSTABLE: [persistAtom],
});