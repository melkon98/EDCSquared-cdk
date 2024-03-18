export const bestPracticesByStatus = /* GraphQL */ `
  query BestPracticesByActive(
    $active: String!
    $sortDirection: ModelSortDirection
    $filter: ModelBestPracticesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bestPracticesByActive(
      active: $active
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        headLine
        description
        urlPath
        active
        id
        createdAt
        updatedAt
        userProfileBestPracticesId
      }
      nextToken
    }
  }
`;
