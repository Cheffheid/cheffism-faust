import { gql } from "@apollo/client";
import Link from "next/link";

export default function ArchiveProjects(props) {
  const { label, contentNodes } = props.data.nodeByUri;

  return (
    <>
      <h1>{label} Archive</h1>

      <ul>
        {contentNodes.nodes.map((node) => (
          <li>
            <Link href={node.uri}>{node.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

ArchiveProjects.variables = ({ uri }) => {
  return { uri };
};

ArchiveProjects.query = gql`
  query ProjectArchive($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on ContentType {
        label
        description
        contentNodes {
          nodes {
            databaseId
            uri
            ... on NodeWithTitle {
              title
            }
          }
        }
      }
    }
  }
`;
