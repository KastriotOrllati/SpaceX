import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Row, Col, Grid, Divider, Spin, Space, Image } from "antd";
import { ALL_LAUNCHES } from "../GraphQL/Queries";
import styles from "../styles/Homepage.module.css";
import Card from "../Components/Card/Card";
import Link from "next/link";

const { useBreakpoint } = Grid;

export default function Home() {
  const { data, error, loading } = useQuery(ALL_LAUNCHES);
  const [launches, setLaunches] = useState([]);
  const screens = useBreakpoint();

  useEffect(() => {
    if (data) {
      setLaunches(data.launchesPast);
    }
  }, [data]);

  if (error) return <div>Ooops....something went wrong !</div>;
  if (loading)
    return (
      <Space size="middle" className={styles.loader}>
        <Spin size="large" />{" "}
      </Space>
    );
  return (
    <div className={styles.mainContainer}>
      <Divider orientation="center">
        <h1 style={{ fontSize: "64px" }}>
          <Image
            width={900}
            height={150}
            preview={false}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1920px-SpaceX-Logo.svg.png"
            alt="SpaceX Logo"
          />
        </h1>
      </Divider>
      <Divider orientation="center">
        <p style={{ fontSize: 40 }}>
          Information and details about SpaceX launches.
        </p>
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
