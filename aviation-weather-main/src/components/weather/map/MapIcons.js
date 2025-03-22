import * as L from "leaflet";

export const rainyIcon = new L.Icon({
  iconUrl: require("./weatherIcons/rainGif.gif"),
  iconSize: [50, 56],
});
export const sunnyIcon = new L.Icon({
  iconUrl: require("./weatherIcons/sunGif.gif"),
  iconSize: [50, 56],
});
