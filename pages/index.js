import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "../Components/Card/Card";
import Link from "next/link";
import { Row, Col, List, Grid, Tag, Divider } from "antd";

const LaunchQuery = gql`
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

const { useBreakpoint } = Grid;
//, background: "#00a0e9"

export default function Home() {
  const { data, error, loading } = useQuery(LaunchQuery);
  const [launches, setLaunches] = useState([]);
  const screens = useBreakpoint();

  useEffect(() => {
    if (data) {
      setLaunches(data.launchesPast);
    }
  }, [data]);
  //  style={{ width: "100%", backgroundColor: "red" }}
  console.log("screens", screens);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <Divider orientation="center">
        <h1 style={{ fontSize: "64px" }}>SpaceX Launches</h1>
      </Divider>
      <Divider orientation="center">
        <p>Information and details about SpaceX past launches</p>
      </Divider>
      <Row
        justify="center"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ width: "70%" }}
      >
        {launches?.map((launch) => (
          <Col
            key={launch.id}
            span={screens.xs ? 24 : 6}
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <Link
              key={launch.id}
              href={{
                pathname: `/launches/${launch.id}`,
              }}
              passHref
            >
              <a>
                <Card
                  missionName={launch.mission_name}
                  launchDate={launch.launch_date_local}
                  image={launch.links?.flickr_images[0]}
                  ships={launch.ships}
                  rocketName={launch.rocket.rocket_name}
                />
              </a>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
