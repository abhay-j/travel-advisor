import React from "react";
import GoogleMapReact from "google-map-react";

import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
const Map = ({
  coordinates,
  setCoordinates,
  setBounds,
  places,
  // setClickedChild,
}) => {
  const classes = useStyles();

  const isMobile = useMediaQuery("(min-wdth:600px)");
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 0, lng: 0 }}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          console.log(
            "this comes from the onChange callBack, this is the event object :",
            e
          );
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={isNaN(Number(place.latitude)) ? 0 : Number(place.latitude)}
            lng={isNaN(Number(place.longitude)) ? 0 : Number(place.longitude)}
            key={i}
          >
            {isMobile ? (
              <LocationOnOutlined key={i} color="primary" fontSize="large" />
            ) : (
              <Paper key={i} elevarion="3" className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle1">
                  {place.name}
                </Typography>
                <img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  className={classes.pointer}
                  alt={
                    "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
