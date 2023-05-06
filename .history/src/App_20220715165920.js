import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import "./App.css";
export default function App() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyC76kEvMKF22yF2li8GTufP3h_QoYRTVdo",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    console.log("loaing");
    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" style={{
            width: "100%",
            height: "100vh"
        }}>
            <Marker position={{ lat: 44, lng: -80 }} />
        </GoogleMap>
    );
}