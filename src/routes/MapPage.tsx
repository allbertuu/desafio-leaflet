import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { onValue, ref } from "firebase/database";
import { database } from "../services/firebase";
import { useEffect, useState } from "react";

function MapPage() {

  const [markersList, setMarkersList] = useState({});

  useEffect(() => {
    function getMarkersList() {
      const markersRef = ref(database, 'markers/');
      onValue(markersRef, (snapshot) => {
        const data = snapshot.val();
        setMarkersList(data);
      })
    }

    getMarkersList();
  }, [])

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.keys(markersList).map((localObj, index) => (
          // @ts-ignore 
          <Marker position={[markersList[localObj]['latitude'], markersList[localObj]['longitude']]} key={index}>
            <Popup>
              {// @ts-ignore 
              markersList[localObj]['name']}
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      <Link to="/" className="text-lg block w-fit mx-auto mt-4 hover:font-bold">Voltar</Link>
    </>
  );
}

export default MapPage;