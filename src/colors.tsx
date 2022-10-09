export enum ColorKey {
  PRIMARY = "PRIMARY",
  BACKGROUND = "BACKGROUND",
  HASHTAG_BG = "HASHTAG_BG",
  HASHTAG_FG = "HASHTAG_FG",
  HR = "HR",
  RATING_1 = "RATING_1",
  RATING_2 = "RATING_2",
  RATING_3 = "RATING_3",
  RATING_4 = "RATING_4",
  BUTTON_BG = "BUTTON_BG",
  PRICE = "PRICE"
}

export type ColorPalette = {
  [key in ColorKey]: string;
};

export const COLORS = {
  NAVY: "#15214B",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  BLUE: "#f8fcff",
  GREEN: "#186118"
};

export const COLOR_2B79C7_LIGHT = {
  "0": "#e6f2ff",
  "50": "#def2ff",
  "100": "#d5f1ff",
  "150": "#c8edff",
  "200": "#bae8ff",
  "300": "#9cd5ff",
  "400": "#78bbf9",
  "500": "#519ce3",
  "600": "#2b79c7",
  "700": "#21518b",
  "800": "#152d50",
  "900": "#080e19"
};

export const COLOR_2B79C7_DARK = {
  "0": "#080e1a",
  "50": "#0f1e36",
  "100": "#142e53",
  "150": "#183f72",
  "200": "#1a5190",
  "300": "#2b79c7",
  "400": "#63acf0",
  "500": "#81bef8",
  "600": "#9bccfb",
  "700": "#b5d9fd",
  "800": "#cde6fe",
  "900": "#e6f2ff"
};

export const COLOR_DA5598_LIGHT = {
  "0": "#ffe6f2",
  "50": "#ffdef1",
  "100": "#ffd6f0",
  "150": "#ffc9eb",
  "200": "#ffbbe6",
  "300": "#ff9fd3",
  "400": "#f17bb8",
  "500": "#da5598",
  "600": "#ab3f72",
  "700": "#79294c",
  "800": "#461629",
  "900": "#19080e"
};

export const COLOR_DA5598_DARK = {
  "0": "#1a080e",
  "50": "#2e0d1a",
  "100": "#431226",
  "150": "#591733",
  "200": "#6f1c40",
  "300": "#9d2f63",
  "400": "#da5598",
  "500": "#e674ae",
  "600": "#ed90bf",
  "700": "#f4acd0",
  "800": "#fac8e1",
  "900": "#ffe6f2"
};

export const COLOR_DA5555_LIGHT = {
  "0": "#ffe6e6",
  "50": "#ffdede",
  "100": "#ffd6d6",
  "150": "#ffc9c9",
  "200": "#ffbbbb",
  "300": "#ff9f9f",
  "400": "#f17b7b",
  "500": "#da5555",
  "600": "#ab433f",
  "700": "#792f29",
  "800": "#461b16",
  "900": "#190a08"
};

export const COLOR_DA5555_DARK = {
  "0": "#1a0a08",
  "50": "#2e110d",
  "100": "#431712",
  "150": "#591d17",
  "200": "#6f211c",
  "300": "#9d342f",
  "400": "#da5555",
  "500": "#e67474",
  "600": "#ed9090",
  "700": "#f4acac",
  "800": "#fac8c8",
  "900": "#ffe6e6"
};

export const COLOR_DA9855_LIGHT = {
  "0": "#fff2e6",
  "50": "#fff1de",
  "100": "#ffefd6",
  "150": "#ffe9c9",
  "200": "#ffe3bb",
  "300": "#ffcf9f",
  "400": "#f1b67b",
  "500": "#da9855",
  "600": "#ab793f",
  "700": "#795629",
  "800": "#463316",
  "900": "#191308"
};

export const COLOR_DA9855_DARK = {
  "0": "#1a1308",
  "50": "#2e220d",
  "100": "#433012",
  "150": "#593e17",
  "200": "#6f4c1c",
  "300": "#9d6b2f",
  "400": "#da9855",
  "500": "#e6ad74",
  "600": "#edbf90",
  "700": "#f4d0ac",
  "800": "#fae1c8",
  "900": "#fff2e6"
};

export const COLOR_2BC779_LIGHT = {
  "0": "#e6fff2",
  "50": "#d5ffeb",
  "100": "#c5ffe3",
  "150": "#afffd8",
  "200": "#9affcc",
  "300": "#78f5b4",
  "400": "#51e198",
  "500": "#2bc779",
  "600": "#269d65",
  "700": "#1c6f4b",
  "800": "#12412e",
  "900": "#081913"
};

export const COLOR_2BC779_DARK = {
  "0": "#081a13",
  "50": "#0b2b1f",
  "100": "#0d3c29",
  "150": "#0e5034",
  "200": "#0d633e",
  "300": "#168e56",
  "400": "#2bc779",
  "500": "#4ed792",
  "600": "#71e2a9",
  "700": "#96ecc1",
  "800": "#bdf6d9",
  "900": "#e6fff2"
};

export const GRAY_RANGE = {
  0: "#fff",
  50: "#fcfcfc",
  100: "#f2f0f0",
  200: "#d7d2d2",
  300: "#bcb4b4",
  400: "#a29696",
  500: "#877878",
  600: "#695d5d",
  700: "#4b4343",
  800: "#2d2828",
  900: "#0f0d0d"
};

// export const LIGHT_COLORS: ColorPalette = {
//   PRIMARY: "#15214B",
//   BACKGROUND: "#FFFFFF"
// };

export const DARK_COLORS: ColorPalette = {
  PRIMARY: "#000",
  BACKGROUND: GRAY_RANGE[50],
  HASHTAG_BG: COLOR_2B79C7_DARK[700],
  HASHTAG_FG: "#000",
  HR: GRAY_RANGE[900],
  RATING_1: COLOR_DA5555_DARK[300],
  RATING_2: COLOR_DA9855_DARK[600],
  RATING_3: COLOR_2B79C7_DARK[600],
  RATING_4: COLOR_2BC779_DARK[500],
  BUTTON_BG: COLOR_2B79C7_DARK[800],
  PRICE: COLOR_2BC779_DARK[800]
};

export function getColor(colorKey: keyof ColorPalette) {
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkScheme ? DARK_COLORS[colorKey] : DARK_COLORS[colorKey];
}
