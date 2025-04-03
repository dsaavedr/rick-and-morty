import { graphql } from "../../graphql/gql";

export const allCharactersQuery = graphql(`
  query AllCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        species
        type
        image
        status
        origin {
          name
          dimension
        }
      }
    }
  }
`);
