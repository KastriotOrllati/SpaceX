import React from "react";
import { Card as AntCard } from "antd";
const { Meta } = AntCard;
const defaultImage =
  "https://cdn.vox-cdn.com/thumbor/aHXO6jv95xIgZPboFI8oJGvXQR4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8592199/531752474.jpg";
const Card = ({
  missionName,
  rocketName,
  launchDate,
  siteName,
  image,
  ships,
}) => {
  return (
    <AntCard
      hoverable
      cover={
        <img
          alt={missionName}
          src={image ? image : defaultImage}
          style={{ height: "300px " }}
        />
      }
    >
      <Meta title={missionName} description="www.instagram.com" />
    </AntCard>
  );
};
// <div>
//   <h5>{missionName}</h5>
//   <div>Launched at: {launchDate}</div>
//   <img
//     src={image ? image : defaultImage}
//     style={{ width: "100px", height: "100px" }}
//     alt={missionName}
//   />
//   <div>Rocket name: {rocketName}</div>
// </div>

export default Card;
// {ships.map((ship, i) => (
//   <div key={i}>
//     <div>Ship name: {ship.name}</div>
//     <img
//       src={ship.image}
//       alt={ship.name}
//       style={{ width: "100px", height: "100px" }}
//     />
//   </div>
// ))}
