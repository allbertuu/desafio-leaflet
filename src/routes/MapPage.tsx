import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { onValue, ref } from "firebase/database";
import { database } from "../services/firebase";
import { useEffect, useState } from "react";

function MapPage() {

  const [markerList, setMarkerList] = useState({});

  useEffect(() => {
    function getMarkerList() {
      const markerListRef = ref(database, 'markers/');
      onValue(markerListRef, async (snapshot) => {
        const data = await snapshot.val();
        setMarkerList(data);
      })
    }

    getMarkerList();
  }, [])

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.keys(markerList).map((marker) => (
          // @ts-ignore 
          <Marker position={[markerList[marker]['latitude'], markerList[marker]['longitude']]} key={markerList[marker]['name']}>
            <Popup>
              {// @ts-ignore 
              markerList[marker]['name']}
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      <Link to="/" className="text-lg block w-fit mx-auto mt-4 hover:font-bold">Voltar</Link>
    </>
  );
}

export default MapPage;