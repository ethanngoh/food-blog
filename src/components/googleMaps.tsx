import styled from "@emotion/styled";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual, deepEqual } from "fast-equals";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapContainer = styled.div`
  display: flex;
  aspect-ratio: 1 / 1;
`;

export const MapView = ({
  center,
  zoom,
  marker
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  marker: google.maps.LatLngLiteral;
}) => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [z, setZoom] = useState(zoom);
  const [c, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: center.lat,
    lng: center.lng
  });

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const APIKEY = "";
  return (
    <MapContainer>
      <Wrapper apiKey={APIKEY} render={render}>
        <Map center={c} onIdle={onIdle} zoom={z} style={{ flexGrow: "1", height: "100%" }} disableDefaultUI={true}>
          <Marker key={"pos"} position={marker} />
        </Map>
      </Wrapper>
    </MapContainer>
  );
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map & Partial<unknown>>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  const x = new google.maps.places.PlacesService(map as google.maps.Map);
  const y = x.getDetails({ placeId: "ChIJzWfj-acNkFQRYToIg4hbqBA" }, (place) => {
    if (
      !place ||
      !place.geometry ||
      !place.geometry.location ||
      !place.opening_hours ||
      !place.opening_hours.weekday_text
    ) {
      return;
    }

    // Create marker
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    // Center map on place location
    map!.setCenter(place.geometry.location);
  });

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { map });
        }
      })}
    </>
  );
};

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

const deepCompareEqualsForMaps = createCustomEqual(() => ({
  areObjectsEqual: (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    return deepEqual(a, b);
  }
}));

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(callback: React.EffectCallback, dependencies: any[]) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
