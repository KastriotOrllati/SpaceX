import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Image, Typography, Row, Col, Space, Spin } from "antd";
import { DEFAULTPHOTOS, TEXT } from "../../../assets/images";
import { SINGLE_LAUNCH } from "../../../GraphQL/Queries";
import styles from "../../../styles/Index.module.css";
const { Text } = Typography;

function Launches() {
  const [launch, setLaunch] = useState({});
  const router = useRouter();
  const launchesId = router.query.launchesId;
  const info = launch.launch;
  const { data, loading, error } = useQuery(SINGLE_LAUNCH, {
    variables: { id: launchesId },
  });

  useEffect(() => {
    if (data) {
      setLaunch(data);
    }
  }, [data]);

  if (loading)
    return (
      <Space size="middle" className={styles.loader}>
        <Spin size="large" />{" "}
      </Space>
    );
  if (error) return <div>Ooops....something went wrong</div>;

  return (
    <div className={styles.mainContainer}>
      <Row justify="center" className={styles.centerContainer}>
        <Col span={10} xs={24} className={styles.leftContainer}>
          <h1> {info?.mission_name}</h1>

          <p className={styles.textContainer}>
            {info?.details ? launch.launch.details : TEXT}
          </p>
          <div className={styles.textContainer}>
            <h2>Extra info</h2>
            <ul className={styles.list}>
              <li>
                Launch:{" "}
                <Text type={info?.launch_success ? "success" : "danger"}>
                  {info?.launch_success ? "Success" : "Failure"}
                </Text>{" "}
              </li>
              <li>
                Rocket Name: {info?.rocket.rocket_name} -{" "}
                {info?.rocket.rocket_type}
              </li>
              <li>Launch Date : {info?.launch_date_local}</li>
              <li></li>
              Read More:{" "}
              <a
                href={info?.links?.reddit_campaign}
                target="_blank"
                rel="noreferrer"
              >
                Reddit
              </a>
              {"  "}
              <a href={info?.links?.wikipedia}>Wikipedia</a>
            </ul>
          </div>
        </Col>
        <Col span={8} xs={24} className={styles.rightContainer}>
          <Row wrap gutter={[0, 0]} className={styles.gallery}>
            {info?.links?.flickr_images.length !== 0 ? (
              <Col span={8} xs={24} className={styles.rightContainer}>
                <Row wrap gutter={[0, 0]}>
                  <Image.PreviewGroup>
                    {info?.links?.flickr_images?.map((photo, index) => (
                      <Col span={12} flex key={index}>
                        <Image
                          src={photo}
                          alt={info?.mission_name}
                          width={230}
                          height={200}
                          className={styles.gallery}
                        />
                      </Col>
                    ))}
                  </Image.PreviewGroup>
                </Row>
              </Col>
            ) : (
              <Col span={8} xs={24} className={styles.rightContainer}>
                <Row wrap gutter={[0, 0]}>
                  <Image.PreviewGroup>
                    {DEFAULTPHOTOS.map((photo, index) => (
                      <Col
                        span={12}
                        flex
                        key={index}
                        className={styles.galleryCol}
                      >
                        <Image
                          width={230}
                          height={200}
                          src={photo}
                          alt={index}
                          className={styles.gallery}
                        />
                      </Col>
                    ))}
                  </Image.PreviewGroup>
                </Row>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Launches;
