# Raptor Maps Software Engineering - Full-Stack Coding Challenge
This challenge comprises two parts: Mapping and Notification. We recognize that you have a busy week ahead with various commitments. If you believe this challenge will take more than 4 hours, it is perfectly acceptable to partially complete it, but please be prepared to explain how you allocated your time and prioritized tasks.

## Part 1: Mapping

The Raptor Maps Product Team talked to many solar maintenance companies and crunched some numbers. It was determined that managers of solar maintenance teams want the ability to know where all of their technicians are on a solar farm at any given time on a web application. The manager is our primary user. This tool is critical for safety and near-real time collaboration. In order to accomplish this feature we want to show each technician’s “live” location on a map interface.

The attached JSON file contains mock location data of technicians in a list format, which you can download here:

https://www.dropbox.com/s/wiex18jj0hetfvg/api_techician_response_data.json?dl=0

This data simulates roughly 15 minutes of technician activity. The “bearing” field indicates the direction the technician is facing as defined by the degrees from true north in the clockwise direction. The “tsecs” field indicates the time in epoch seconds when the location was last updated. The coordinates are WGS 84 [longitude, latitude].

Build out an API endpoint that returns the current location of technicians at a particular solar farm. The API should return JSON and looks like this for each request:


    /api/v1/solar_farms/<solar_farm_id>/technicians
    {
    "features": [
      { "type": "Feature", "properties": { "id": 1,  "name": "Tech 3", "tsecs": 1592078400, "bearing": 0 }, "geometry": { "type": "Point", "coordinates": [ -115.606391900599817, 32.673693943392962 ] } },
      { "type": "Feature", "properties": { "id": 1,  "name": "Tech 1", "bearing": 87.0, "tsecs": 1592078400  }, "geometry": { "type": "Point", "coordinates": [ -115.585908073767968, 32.679083641964432 ] } },
      { "type": "Feature", "properties": { "id": 1,   "name": "Tech 2", "bearing": 270, "tsecs": 1592078400 }, "geometry": { "type": "Point", "coordinates": [ -115.590876702138573, 32.676567128293193 ] } }
    ]}


If you were to poll the API once a minute for roughly 15 minutes, you would return all of the provided mock data one item at a time.

In addition to creating a backend API endpoint, let’s now go full-stack! Please build a frontend application using React.js along with Mapbox GL JS to display the locations of the technicians on a map. 

Your frontend should periodically request or receive data from the API endpoint so the technicians locations update on the map as they move around. 

## Part 2: Notification

It was determined that an advanced “notification” feature was needed to notify the manager when any two technicians were going to be close to each other in space and time. This allows the manager to help coordinate what supplies, spare parts, or tools can be transferred to complete other work later in the day.

Use the position and time information either on the backend or the frontend to determine if and when two or more technicians come within 1000 feet (304.8 meters) of each other. Please incorporate this functionality into your “live” map view from Part 1. If two or more technicians do get nearby and meet this criteria, trigger a notification to display on the frontend user interface to indicate that the technicians are near each other. 
