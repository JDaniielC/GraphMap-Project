import React, {useState, useRef, useMemo} from 'react';
import { Marker } from "react-leaflet";
import { Icon } from './icons'

const center = {
    lat: -10,
    lng: -54,
}
  
export function DraggableMarker() {
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
  
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={Icon}
        >
      </Marker>
    )
}