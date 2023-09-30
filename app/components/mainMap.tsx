'use client'
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getClimateDataByCoordinates } from '@/app/services/ilmateenistus'; // Update the path to match your project structure
import { ClimateData } from '@/app/interfaces/iClimateData'

const MapComponent = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [climateData, setClimateData] = useState<ClimateData | null>(null); // Use the ClimateData interface to type the state

    useEffect(() => {

        if (!mapContainerRef.current) return;

        mapRef.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://api.maptiler.com/maps/2a7d0dee-a49a-4d2e-8b03-bbbde9b50ea6/style.json?key='+process.env.MAPTILER_API_KEY,
            center: [24.768372, 59.036041],
            zoom: 8,
        });

        const map = mapRef.current;

        map.addControl(new maplibregl.NavigationControl());
        // Add click interaction
        const handleClick = (event: maplibregl.MapMouseEvent) => {
            const { lngLat } = event;
            console.log('Clicked at:', lngLat);
            // Add your custom logic for handling the click event here

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
    const eestiNimed: { [key: string]: string } = {
        windSpeed: 'Tuule kiirus',
        precipitation: 'Sademed',
        phenomen: 'Pilvisus',
        temperature: 'Temperatuur',
    };

    const keyToValueMap: { [key: string]: string } = {
        phenomen: 'et',
        precipitation: 'value',
        windSpeed: 'mps',
        temperature: 'value'
    };

    const getCorrectValueForKey = (key: string, object: { [key: string]: string }) => {
        const mappedKey = keyToValueMap[key];
        const mappedValue: { [key: string]: string } = object['@attributes'] as unknown as { [key: string]: string };

        if (mappedKey !== undefined && mappedValue !== undefined) {
            return mappedValue[mappedKey];
        }
        return null;
    };

    return (
        <>
            <div className="left-0 bg-nav-red opacity-70 w-[30%] h-[65vh] rounded-r-[30px] !absolute top-[15vh] z-10">
                <div className='w-[100%] h-[100%] pl-5 pt-5'>
                    <div className="overflow-x-auto overflow-hidden">
                        {climateData ? (
                            <div className="p-4">
                                <h1 className="mb-4"><strong>{climateData.location}</strong></h1>                                
                                <ul className="list-disc ml-6">
                                    <li>
                                        <strong>Temperatuur:</strong> {climateData.forecast.tabular.time[0].temperature['@attributes'].value} °C
                                    </li>
                                    {Object.entries(climateData.forecast.tabular.time[0]).filter(([key]) => filteredKeys.includes(key)).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{eestiNimed[key]}:</strong> {getCorrectValueForKey(key, value)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>Kliki asukohta</p>
                        )}
                    </div>


                </div>
            </div>
            <div ref={mapContainerRef} className="h-[100vh] w-[100%] !absolute top-0 !cursor-auto"></div>
        </>
    )
};

export default MapComponent;