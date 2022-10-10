import styled from "@emotion/styled";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { BiWindowOpen } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { ImLocation } from "react-icons/im";
import { IoIosGlobe } from "react-icons/io";
import { ColorKey, getColor } from "../colors";
import { FlexCol, FlexRow } from "../stylePrimitives";

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const Clickable = styled(FlexRow)`
  color: ${getColor(ColorKey.PRIMARY)};
  background-color: ${getColor(ColorKey.BUTTON_BG)};
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
`;

const MapContainer = styled.div`
  display: flex;
  aspect-ratio: 1 / 1;
`;

const TDIcon = styled.td`
  text-align: center;
  vertical-align: middle;
  padding: 0.1rem 0;
  padding-right: 0.5rem;
`;

const TDContent = styled.td`
  text-align: left;
  padding: 0.1rem 0;
`;

export const BusinessInfo = ({
  placeId,
  setBusinessName
}: {
  placeId: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY!
  });

  const [map, setMap] = useState<google.maps.Map & Partial<unknown>>();
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLng | null | undefined>();
  const [addr, setAddr] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>("");
  const [openingHours, setOpeningHours] = useState<google.maps.places.PlaceOpeningHours>();
  const [isPlaceLoaded, setPlaceLoaded] = useState(false);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const places = new google.maps.places.PlacesService(map!);
      places.getDetails({ placeId }, (place) => {
        if (
          !place ||
          !place.geometry ||
          !place.geometry.location ||
          !place.name ||
          !place.url ||
          !place.website ||
          !place.formatted_address
        ) {
          return;
        }

        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        setBusinessName(place.name!);
        setOpeningHours(place.opening_hours);
        setGoogleMapsUrl(place.url!);
        setWebsite(place.website!);
        setAddr(place.formatted_address!);

        setMarkerPosition(marker.getPosition());
        setPlaceLoaded(true);
        map?.fitBounds(place.geometry.viewport!);
      });
      setMap(map);
    },
    [placeId, setBusinessName]
  );

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(undefined);
  }, []);

  return isLoaded ? (
    <FlexCol gap={"0.5em"}>
      <table>
        <tbody>
          <tr>
            <TDIcon>
              <FiClock color={getColor(ColorKey.PRIMARY)} size={20} />
            </TDIcon>
            <TDContent>
              {isPlaceLoaded && openingHours?.isOpen() ? (
                <span style={{ color: "green" }}>Open Now</span>
              ) : (
                <span style={{ color: "red" }}>Closed</span>
              )}
            </TDContent>
          </tr>
          <tr>
            <TDIcon>
              <ImLocation size={20} />
            </TDIcon>
            <TDContent>{addr}</TDContent>
          </tr>
        </tbody>
      </table>
      <FlexRow gap={"3em"} center>
        <a href={website} target="_blank" rel="noreferrer">
          <Clickable gap={"0.5em"}>
            <IoIosGlobe color={getColor(ColorKey.PRIMARY)} size={20} />
            Website
          </Clickable>
        </a>
        <a href={googleMapsUrl} target="_blank" rel="noreferrer">
          <Clickable gap={"0.5em"}>
            <BiWindowOpen color={getColor(ColorKey.PRIMARY)} size={20} />
            Maps
          </Clickable>
        </a>
      </FlexRow>
      <MapContainer>
        <GoogleMap
          mapContainerStyle={{
            flexGrow: "1",
            height: "100%"
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: true
          }}
        >
          <Marker key={"pos"} position={markerPosition} />
        </GoogleMap>
      </MapContainer>
    </FlexCol>
  ) : (
    <></>
  );
};
