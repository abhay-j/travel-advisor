import axios from "axios";
// const URL = "https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary";
require("dotenv").config();
const getPlacesData = async (type, ne, sw) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        method: "GET",

        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            process.env.REACT_APP_RAPIDAPI_TRAVEL_ADVISOR_API_key,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getPlacesData;
