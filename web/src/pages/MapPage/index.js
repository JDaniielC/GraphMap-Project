import React, { useState, useRef, useMemo } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import edit from '../../assets/edit.png'
import { Link } from 'react-router-dom'
import { Location, Icon } from '../../components/icons';
import buttonIcon from '../../assets/buttonMarker.png';
import "leaflet/dist/leaflet.css";
import './styles.css';

const center = {
    lat: -10,
    lng: -40,
}
const maxBounds = [[0, -60],[-35, -30]]

const locais = [{
    address: {
        pais: '',
        estado: '',
        cidade: '',
        municipio: '',
    },
    position: {
        lat: 0,
        lng: 0,
    }
}];

function Page() {
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

        locais.push({address: {
            pais: country,
            estado: state, 
            municipio: municipio,
            cidade: cidade
        }, position});
    }

    const setLocation = (address = locais) => {
        console.log(address);
    }

    return (
    <div id='page-map'>
        <div className='mapInformation'>
            <h2>Selecione a localização:</h2>
            <p>Arraste o ponto até o local desejado e clique no botão</p>
            <p>para selecionar a localização e depois confirme.</p>
        </div>
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
            <Marker position={local.position} icon={Location}>
                <Popup>
                    <h4>Localização:</h4>
                    <p> {local.address.municipio}, {local.address.cidade} 
                    <br />{local.address.estado}, {local.address.pais}</p>
                    <button onClick={() => setLocation(local)}>Confirmar</button>
                </Popup>
            </Marker>
        ))}
    </MapContainer>

    <div className='divButtons'>
        <button id='markButton' onClick={handleRegister}> 
            Selecionar localização
        </button>
        </div>
        <Link to="/flow"><img className='edit' src={edit} alt="Cadastro" /></Link>
    </div>
    );
};

export default Page;