import { graphql } from "../../graphql/gql";

export const sidebarCharactersQuery = graphql(`
  query SidebarCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        name
        species
        image
      }
    }
  }
`);

export const characterDetailQuery = graphql(`
  query CharacterDetail($id: ID!) {
    character(id: $id) {
      name
      species
      type
      gender
      status
      image
      origin {
        name
        dimension
      }
    }
  }
`);

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
