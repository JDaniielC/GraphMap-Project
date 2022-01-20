import React, { useState, useRef, useMemo } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import edit from '../../assets/edit.png'
import { Link } from 'react-router-dom'
import { Location, Icon } from '../../components/Icons';
import "leaflet/dist/leaflet.css";
import './styles.css';

const center = {
    lat: -10,
    lng: -40,
}
const maxBounds = [[0, -60],[-35, -30]]

const address = {
    pais: '',
    estado: '',
    cidade: '',
    municipio: '',
}

const locais = [];

function Page() {
    const [home, setHome] = useState(address);

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

    const handleRegister = async () => {
        const { data } = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`);
        const { 
            city,
            town, 
            state, 
            country, 
            municipality, 
        } = data.address;
        const municipio = municipality ? municipality.split(' ').slice(4).join(' ') : '';
        const cidade = town ? town : city;
        setHome({
            pais: country,
            estado: state, 
            municipio: municipio,
            cidade: cidade
        }); 
        locais.push(position);
    }
    return (
    <div id='page-map'>
    <MapContainer maxBounds={maxBounds} center={center} zoom={6} minZoom={7} style={{ height: "100%", width: '100%' }}>
        <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJnZW50ZSIsImEiOiJja3RrcWZyMXExb3ZiMnZxbnJvODltYXU2In0.nHPgAT-Jyn7Rb5-5E4_x8Q"
        />
        <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={Icon}
        >
        </Marker>
        { locais.map((local) => (
            <Marker position={local} icon={Location}>
                <Popup>
                    <h4>Localização atual:</h4>
                    <p> {home.municipio}, {home.cidade} 
                    <br />{home.estado}, {home.pais}</p>
                </Popup>
            </Marker>
        ))}
    </MapContainer>

    <div 
    style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        top: '500px',
        right: '10px',
        zIndex: 99
    }}>
        <button onClick={handleRegister}> Atualizar localização </button>
        </div>
        <Link to="/flow"><img className='edit' src={edit} alt="Cadastro" /></Link>
    </div>
    );
};

export default Page;