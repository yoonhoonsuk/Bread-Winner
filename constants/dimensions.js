import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_SCREEN_HEIGHT = 844;
const SCALE = Math.min(SCREEN_HEIGHT / BASE_SCREEN_HEIGHT, 1.08); // cap scaling for large devices

export const ROW_HEIGHT = Math.round(48 * SCALE);
export const BORDER_RADIUS = Math.round(24 * SCALE);
export const BORDER_WIDTH = 1.5; // rarely needs scaling
export const SPACING_BETWEEN = Math.round(8 * SCALE);

export const HEADER_TOP_MARGIN = Math.round(SCREEN_HEIGHT * 0.04); // About 4% of screen height
export const TAB_BAR_FLOAT_MARGIN = Math.round(50 * SCALE);
export const ICON_SIZE = Math.round(38 * SCALE);            // 38 on iPhone 13/14, scales for others
export const TAB_BAR_BORDER_WIDTH = 2;

export const PADDING_HORIZONTAL = Math.round(16 * SCALE);   // Dynamic for padding, adjust base as needed
