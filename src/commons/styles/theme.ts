export const calcRem = (size: any) => `${size / 16}rem`;
const fontSizes = {
  headLint: calcRem(45),
  title: calcRem(30),
  display: calcRem(28),
  subTitle1: calcRem(20),
  subTitle2: calcRem(24),
  paragraph1: calcRem(14),
  paragraph2: calcRem(16),
  paragraph3: calcRem(18),
  caption: calcRem(12),
  page: calcRem(10),
};
const colors = {
  white: "#FFFFFF",
  black: "#212121",
  dark: "#3C454C",
  grey: "#A7ADBF",
  grey2: "#F1F4F7",
  grey3: "#767676",
  orangeMain: "#FC9400",
  orangeDark: "#593A00",
  orangeBright: "#D9A305",
  yellow: "#F2CA04",
  gray: "#B8B8B8",
  lightGray: "#F1F4F7",
};

const deviceSizes = {
  tablet: "768px",
  mobile: "360px",
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
};

const a11yHidden = {
  overflow: "hidden",
  position: "absolute",
  clip: "rect(0, 0, 0, 0)",
  "clip-path": "circle(0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  border: 0,
  padding: 0,
  "white-space": "nowrap",
};

const theme = {
  calcRem,
  fontSizes,
  colors,
  deviceSizes,
  device,
  a11yHidden,
};

export default theme;
