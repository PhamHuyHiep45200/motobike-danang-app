import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Image } from "antd";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const center = {
    lat: 16.047079,
    lng: 108.20623,
  };
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={{ clickableIcons: false }}
    >
      <Marker position={center} onClick={handleMarkerClick} />
      {showInfoWindow && (
        <InfoWindow position={center} onCloseClick={handleInfoWindowClose}>
          <div>
            <h3 className="text-[#111] font-bold text-[16px]">
              Motobike Đà Nẵng
            </h3>
            <p className="text-[14px] font-medium">Trung tâm cho thuê xe máy</p>
            <p className="text-[14px] text-[red] mb-[10px] font-medium">Địa chỉ: 80 Cao Bá Quát</p>
            <Image
              alt=""
              width={200}
              height={150}
              src="/image/Thue-xe-Da-Nang-gia-re.jpg"
            />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
