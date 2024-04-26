import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from "../components";

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;

  const socialMenu = data?.socialMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Main className="full-height flex-column">
        <Container className="flex-column flex-column-container">
          <Hero title={"Jeffrey de Wit"} level="h1">
            <div className="text-center">
              <p>
                <em>{siteDescription}</em>
              </p>
            </div>
          </Hero>
          <NavigationMenu menuItems={socialMenu} />
        </Container>
        <Footer title={siteTitle} />
      </Main>
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData($socialLocation: MenuLocationEnum) {
    generalSettings {
      ...BlogInfoFragment
    }
    socialMenuItems: menuItems(where: { location: $socialLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    socialLocation: MENUS.SOCIAL_LOCATION,
  };
};
