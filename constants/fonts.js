import { Tenor_Sans, EB_Garamond } from "next/font/google";

const tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tenor",
});

const eb_garamond = EB_Garamond({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

export { tenor, eb_garamond };
