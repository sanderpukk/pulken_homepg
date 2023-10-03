'use client'
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getClimateDataByCoordinates } from '@/app/services/ilmateenistus'; // Update the path to match your project structure
import { ClimateData } from '@/app/interfaces/iClimateData'
import ForecastTable from './forecastTable';
import { eestiNimed, getCorrectValueForKey } from '../utils/nameMapping';
import pulkenLogo from '@/app/pulken_logo-svg-white.svg'
import Image from 'next/image'
import { Typography } from "@material-tailwind/react";

const MapComponent = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [climateData, setClimateData] = useState<ClimateData | null>(null); // Use the ClimateData interface to type the state
    const [markerLocation, setMarkerLocation] = useState<maplibregl.Marker | null>(null);


    useEffect(() => {

        if (!mapContainerRef.current) return;

        mapRef.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://api.maptiler.com/maps/2a7d0dee-a49a-4d2e-8b03-bbbde9b50ea6/style.json?key=' + process.env.MAPTILER_API_KEY,
            center: [24.420966, 59.045220],
            zoom: 8,
        });

        const map = mapRef.current;

        map.addControl(new maplibregl.NavigationControl());
        // Add click interaction
        const handleClick = (event: maplibregl.MapMouseEvent) => {
            const { lngLat } = event;
            console.log('Clicked at:', lngLat);
            // Add your custom logic for handling the click event here
            console.log()
            // setMarkerLocation(new maplibregl.Marker().setLngLat(lngLat));
            const markerElement = document.querySelector(".maplibregl-marker");
            markerElement?.remove();

            new maplibregl.Marker().setLngLat(lngLat).addTo(map);

            getClimateDataByCoordinates(lngLat.lat, lngLat.lng)
                .then((data) => {
                    setClimateData((prevState) => {
                        return {
                            ...prevState,
                            ...data,
                        };
                    });
                })
                .catch((error) => {
                    console.error(error.message);
                });
        };

        map.on('click', handleClick);

        // Add any additional map configuration or interactivity here

        return () => {
            if (map) {
                map.off('click', handleClick); // Remove the click event listener when the component unmounts
                map.remove(); // Clean up the map instance when the component unmounts
            }
        };
    }, []);

    const filteredKeys = ['windSpeed', 'precipitation', 'phenomen'];

    return (
        <>
            <div className="left-0 bg-nav-red/90 w-[650px] h-[50vh] min-h-[500px] rounded-r-[30px] !absolute top-[15vh] z-10">

                <div className='w-[100%] h-[100%] pl-2 pt-5 pr-2 '>
                    <div className="overflow-x-auto overflow-hidden ">
                        {climateData && climateData.forecast.tabular.time ? (
                            <><div className="p-4 opacity-80 shadow-2xl	">
                                <h1 className="mb-4"><strong>{climateData.location}</strong></h1>
                                <ul className="opacity-90">
                                    <li>
                                        <strong>Temperatuur:</strong> {climateData.forecast.tabular.time[0].temperature['@attributes'].value} °C
                                    </li>
                                    {climateData.forecast.tabular.time[0] ?
                                        Object.entries(climateData.forecast.tabular.time[0]).filter(([key]) => filteredKeys.includes(key)).map(([key, value]) => (
                                            <li key={key}>
                                                <strong>{eestiNimed[key]}:</strong> {getCorrectValueForKey(key, value)}
                                            </li>
                                        ))

                                        :
                                        <></>
                                    }
                                </ul>
                            </div>
                                <br />
                                <ForecastTable climateData={climateData}></ForecastTable></>
                        ) : (
                            <p>Kliki asukohta</p>
                        )}

                    </div>
                    <div className="flex items-center absolute bottom-0">
                        <Image
                            src={pulkenLogo}
                            alt="Logo"
                            height={30}
                            width={30}
                            className="mr-4 py-1.5 font-medium"
                        />
                        <Typography variant="h4" className="font-Maven-Pro  py-1.5 opacity-80">
                            Pulken
                        </Typography>
                    </div>
                </div>

            </div>
            <div ref={mapContainerRef} className="h-[100vh] w-[100%] !absolute top-0 !cursor-auto"></div>
        </>
    )
};

export default MapComponent;