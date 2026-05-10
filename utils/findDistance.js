// /utils/findDistance.js

/**
this finds distance between points on earth based on lat and long
considering the curvature instead of normal pythogoras
which would be incorrect (inaccurate)
*/
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // radius of earth in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

module.exports = { haversineDistance };
