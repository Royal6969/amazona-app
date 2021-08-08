import React, { useEffect, useState } from 'react';
import { 
    LoadScript,
    GoogleMap,
    StandaloneSearchBox,
    Marker, 
} from '@react-google-maps/api';
import LoadingBox from '../components/LoadingBox';
import Axios from 'axios';
import { useRef } from 'react';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';
import { useDispatch } from 'react-redux';

const libs = ['places'];
const defaultLocation = { lat: 40.416719, lng: -3.703480 };

export default function MapScreen(props) {
    const [googleApiKey, setGoogleApiKey] = useState('');
    const [center, setCenter] = useState(defaultLocation);
    const [location, setLocation] = useState(center);

    const mapRef = useRef(null);
    const placeRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const fetch = async() => {
            const { data } = await Axios('/api/config/google');
            setGoogleApiKey(data);
            getUserCurrentLocation();
        };
        fetch();
    }, []);

    const onLoad = (map) => {
        mapRef.current = map;
    };

    const onMarketLoad = (marker) => {
        markerRef.current = marker;
    };

    const onLoadPlaces = (place) => {
        placeRef.current = place;
    };

    const onIdle = () => {
        setLocation({ 
            lat: mapRef.current.center.lat(),
            lng: mapRef.current.center.lng(),
        });
    };

    const onPlacesChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({ lat: place.lat(), lng: place.lng() });
        setLocation({ lat: place.lat(), lng: place.lng() });
    };

    const dispatch = useDispatch();
    const onConfirm = () => {
        const places = placeRef.current.getPlaces();
        if (places && places.length === 1) {
            // dispatch select action
            dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: {
                    lat: location.lat,
                    lng: location.lng,
                    address: places[0].formatted_address,
                    name: places[0].name,
                    vicinity: places[0].vicinity,
                    googleAddressId: places[0].id,
                },
            });
            alert('Location selected successfully');
            props.history.push('/shipping');
        } else {
            alert('Please enter your address');
        }
    };

    const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser'); //hay que tener habilitado la ubicación
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }); // se cogen las coordenadas del dispositivo y se pasan a la funcion position en la que se actualizan los datos de center y location
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    };

    return googleApiKey ? (
    
        <div className="full-container">
            <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
                <GoogleMap
                    id="sample-map"
                    mapContainerStyle={{height:'100%', width:'100%'}}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onIdle={onIdle}
                >
                    <StandaloneSearchBox
                        onLoad={onLoadPlaces}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <div className="map-input-box">
                            <input type="text" placeholder="Enter your address"></input>
                            <button type="button" className="primary" onClick={onConfirm}>
                                Confirm
                            </button>
                        </div>
                    </StandaloneSearchBox>
                    <Marker position={location} onLoad={onMarketLoad}></Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    ) : (
        <LoadingBox></LoadingBox>
    );
}