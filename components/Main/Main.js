import classNames from "classnames/bind";
import * as SELECTORS from "../../constants/selectors";
import styles from "./Main.module.scss";
import { eb_garamond } from "../../constants/fonts";

let cx = classNames.bind(styles);

export default function Main({ children, className, ...props }) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={cx(["component", className, eb_garamond.variable])}
      {...props}
    >
      {children}
    </main>
  );
}
