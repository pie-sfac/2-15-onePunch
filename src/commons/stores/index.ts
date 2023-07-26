import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const accessTokenStateForAdmin = atom({
  key: 'accessTokenStateForAdmin',
  default: null,
});

export const accessTokenStateForStaffs = atom({
  key: 'accessTokenStateForStaffs',
  default: null,
});

export const maxServiceCountState = atom({
  key: 'maxServiceCountState',
  default: 0, 
});
