import classNames from "classnames/bind";
import { gql } from "@apollo/client";
import Link from "next/link";
import * as ICONS from "../../constants/icons";
import styles from "./NavigationMenu.module.scss";
import stylesFromWP from "./NavigationMenuClassesFromWP.module.scss";
import { flatListToHierarchical } from "@faustwp/core";

let cx = classNames.bind(styles);

export default function NavigationMenu({ menuItems, className, iconMenu }) {
  if (!menuItems) {
    return null;
  }

  // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);
  const icons = Object.keys(ICONS.SOCIAL_ICONS);

  function renderMenu(items) {
    return (
      <ul className={cx("menu")}>
        {items.map((item) => {
          const { id, path, label, children, cssClasses, target } = item;
          const isExternal = "_blank" === target;

          let linkText = label ?? "";

          // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
          if (!item.hasOwnProperty("__typename")) {
            return null;
          }

          // Bail if we are trying to render an icon menu, but no icon classes exist on the link.
          if (iconMenu && !cssClasses.includes("icon")) {
            return null;
          }

          if (iconMenu) {
            const icon = cssClasses.filter((item) => icons.includes(item));

            // Only override the linkText with the icon if we actually have it.
            if (ICONS.SOCIAL_ICONS.hasOwnProperty(icon)) {
              linkText = ICONS.SOCIAL_ICONS[icon];
            }
          }

          return (
            <li key={id} className={cx(cssClasses)}>
              {isExternal ? (
                <a href={path ?? ""} target={target}>
                  {linkText}
                </a>
              ) : (
                <Link href={path ?? ""}>{linkText}</Link>
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
