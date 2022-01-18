import { gql } from "@apollo/client";
export const SINGLE_LAUNCH = gql`
  query ($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name
      }
      links {
        article_link
        wikipedia
        reddit_campaign
        reddit_launch
        mission_patch
        presskit
        flickr_images
      }
      ships {
        name
        image
      }
      rocket {
        rocket_name
        rocket_type
      }
      details
      launch_success
    }
  }
`;

export const ALL_LAUNCHES = gql`
  {
    launchesPast(limit: 12) {
      mission_name
      launch_date_local
      links {
        flickr_images
      }
      rocket {
        rocket_name
      }
      ships {
        name
        image
      }
      launch_site {
        site_name
      }
      id
    }
  }
`;
