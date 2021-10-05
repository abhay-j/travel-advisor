import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";

import List from "./components/LIst/List";
import getPlacesData from "./api/index";
import { CssBaseline, Grid } from "@material-ui/core";

const App = () => {
  const [filteredPlaces, setfilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(3);
  useEffect(() => {
    const filterd = places.filter((place) => Number(place.rating) > rating);
    setfilteredPlaces(filterd);
  }, [rating, places]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (bounds) {
      getPlacesData(type, bounds.ne, bounds.sw).then((data) => {
        console.log("we are here", data);
        setPlaces(data);
        setfilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [coordinates, bounds, type]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            // clickedChild={clickedChild}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            // setClickedChild={setClickedChild}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;

//todo
//display map :
// use <GoogleMapReact /> component and add relavent props to it
// set the initial value of the center of the map as {lat:0 , lng: 0} using a state variable
// send the setter function to the map component so that center could be updated whenever ther is a change in the map
// set the inital value of bounds as null using a state variable , send the setter function to the map component so that the component can update the state

//display list:
// go to rapid-api and get the relavent axios code and paste that in api/index.js
// check the import statement that imports the axios code
// import  the function that provides data from that file to app component
// use the useEffect hook so that the new data is fetched evertime the center(coordinates) and bounds update
// once the new data is fetechd set that data to a state variable called "places"
// pass the places to list component
// in list component iterate over the places array and output the place-name on the screen with a <placeDetails /> component
