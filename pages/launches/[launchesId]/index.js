import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Image, Divider, Descriptions } from "antd";
import styles from "../../../styles/Index.module.css";
const singleItem = gql`
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
    }
  }
`;

function Launches() {
  const [launch, setLaunch] = useState({});
  const router = useRouter();
  const launchesId = router.query.launchesId;
  const { data, loading, error } = useQuery(singleItem, {
    variables: { id: launchesId },
  });
  useEffect(() => {
    if (data) {
      setLaunch(data);
    }
  }, [data]);

  console.log(launch);
  if (loading) return <div>Loading...</div>;

  // <div>Hello from launch number: {launchesId}</div>
  //  justifySelf: "center",
  //     justifyContent: "center",
  //     justifyItems: "center",
  //     alignContent: "center",
  //     alignItems: "center",
  //     alignSelf: "center",
  //     width: "80%",

  //working but lame
  //  height: "100vh",
  // width: "40%",
  // display: "flex",
  // flexFlow: "column wrap",
  // alignItems: "center",
  if (loading) return <div>loading....</div>;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.centerContainer}>
        <div className={styles.leftContainer}>
          <Divider orientation="center">
            <h1 style={{ size: 120 }}> {launch?.launch?.mission_name}</h1>
          </Divider>
          <div className={styles.textContainer}>{launch?.launch?.details}</div>
        </div>
        <div className={styles.rightContainer}>
          <Image.PreviewGroup className={styles.gallery}>
            {launch?.launch?.links?.flickr_images?.map((photo, index) => (
              <Image
                width={269}
                height={209}
                src={photo}
                key={index}
                alt={launch.launch.mission_name}
              />
            ))}
          </Image.PreviewGroup>
        </div>
      </div>
    </div>
  );
}

export default Launches;

// <h1> Mission name: {launch?.launch_site.mission_name}</h1>

//working main
// <div
//     style={{
//       display: "flex",
//       flexFlow: "row wrap",
//       flex: "1 1",
//       justifyContent: "center",
//     }}
//   >
//     <div
//       style={{
//         backgroundColor: "red",
//         width: "50%",
//         display: "flex",
//         flexFlow: "column wrap",
//       }}
//     >
//       <Divider orientation="left">
//         <h1 style={{ size: 120 }}> {launch?.launch?.mission_name}</h1>
//       </Divider>

//       <div style={{ paddingTop: "20px" }}>{launch?.launch?.details}</div>
//       <Descriptions
//         title={launch?.launch?.mission_name}
//         style={{ paddingTop: "20px" }}
//       >
//         <Descriptions.Item span={24} label="Launch site">
//           {launch?.launch?.launch_site.site_name}
//         </Descriptions.Item>
//         <Descriptions.Item span={24} label="Launch Date">
//           {launch?.launch?.launch_date_local}
//         </Descriptions.Item>
//         <Descriptions.Item label="Rocket" span={24}>
//           {launch?.launch?.rocket.rocket_name} -{" "}
//           {launch?.launch?.rocket.rocket_type}
//         </Descriptions.Item>

//         <Descriptions.Item
//           span={24}
//           label="Extra Resources for this launch: "
//         >
//           <a href={launch?.launch?.links?.reddit_campaign}>Reddit</a>

//           <a href={launch?.launch?.links?.wikipedia}>Wikipedia</a>
//         </Descriptions.Item>

//         <Descriptions.Item label="Address">
//           No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
//         </Descriptions.Item>
//       </Descriptions>
//     </div>
//     <div style={{ backgroundColor: "blue", width: "40%" }}>
//       <Image.PreviewGroup>
//         {launch?.launch?.links?.flickr_images?.map((photo, index) => (
//           <Image
//             width={200}
//             height={200}
//             src={photo}
//             key={index}
//             alt={launch.launch.mission_name}
//           />
//         ))}
//       </Image.PreviewGroup>
//     </div>
