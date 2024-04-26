import classNames from "classnames/bind";
import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavigationMenu.module.scss";
import stylesFromWP from "./NavigationMenuClassesFromWP.module.scss";
import { flatListToHierarchical } from "@faustwp/core";

let cx = classNames.bind(styles);
let cxFromWp = classNames.bind(stylesFromWP);

export default function NavigationMenu({ menuItems, className, iconMenu }) {
  if (!menuItems) {
    return null;
  }

  // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  function renderMenu(items) {
    return (
      <ul className={cx("menu")}>
        {items.map((item) => {
          const { id, path, label, children, cssClasses, target } = item;
          const isExternal = "_blank" === target;
          const icons = ["twitter", "linkedin", "rss", "github"];
          let icon = "";

          // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
          if (!item.hasOwnProperty("__typename")) {
            return null;
          }

          if (iconMenu && !cssClasses.includes("icon")) {
            return null;
          }

          if (iconMenu) {
            icon = cssClasses.filter((item) => icons.includes(item));
          }

          return (
            <li key={id} className={cxFromWp(cssClasses)}>
              {isExternal ? (
                <a href={path ?? ""} target={target}>
                  {iconMenu ? (
                    <Image
                      src={`/img/${icon}.svg`}
                      alt={label}
                      width="25"
                      height="25"
                    />
                  ) : (
                    <>{label}</>
                  )}
                </a>
              ) : (
                <Link href={path ?? ""}>{label ?? ""}</Link>
              )}

              {children.length ? renderMenu(children) : null}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav
      className={cx(["component", className])}
      role="navigation"
      aria-label={`${menuItems[0]?.menu?.node?.name} menu`}
    >
      {renderMenu(hierarchicalMenuItems)}
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      target
      menu {
        node {
          name
        }
      }
    }
  `,
};
