import axios from "axios";
import { Request } from "express";
import terser from "terser";

export async function fetchLocationData(req: Request) {
  // Retrieve the client IP address
  const clientIP =
  req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // Use the first IP in the X-Forwarded-For header
  req.connection.remoteAddress ||
  req.socket.remoteAddress || // Fallback to the socket's remote address
  "";

  let locationData: LocationData;

  try {
    // Call the external API to get location data
    const locationResponse = await axios.get(
      `http://ip-api.com/json/${clientIP}`
    );

    // Check if the API response indicates a failure
    if (locationResponse.data.status === "fail") {
      throw new Error(`IP lookup failed: ${locationResponse.data.message}`);
    }

    // Map the API response to the LocationData type
    locationData = {
      ip: clientIP,
      city: locationResponse.data.city,
      country: locationResponse.data.country,
      region: locationResponse.data.regionName,
      lat: locationResponse.data.lat,
      lon: locationResponse.data.lon,
      isp: locationResponse.data.isp,
      org: locationResponse.data.org,
      timezone: locationResponse.data.timezone,
      zip: locationResponse.data.zip,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);

    // Fallback to default location data
    locationData = {
      ip: clientIP,
      city: "Unknown",
      country: "Unknown",
    };
  }

  return locationData;
}

export async function minify(script: string) {
  const minified = await terser.minify(script, { ecma: 2020 });
  return minified;
}
