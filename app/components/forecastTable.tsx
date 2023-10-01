'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ClimateData, ClimateHour } from '../interfaces/iClimateData';
import { getCorrectValueForKey, keyToValueMap, pathToWeatherIcon } from '../utils/nameMapping';
import Image from 'next/image';



const groupByDay = (hours: ClimateHour[]) => {
    const grouped = hours.reduce((acc: Record<string, ClimateHour[]>, hour) => {
        const day = hour['@attributes'].from.split('T')[0];
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(hour);
        return acc;
    }, {});

    return Object.entries(grouped);
};

const ForecastTable = ({ climateData }: { climateData: ClimateData }) => {
    const groupedByDay = groupByDay(climateData.forecast.tabular.time);

    const [openDay, setOpenDay] = useState<string | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    const openModal = (day: string) => {
        setOpenDay(day);
    };

    const closeModal = () => {
        setOpenDay(null);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const modal = openDay && (
        <>
            <div className="fixed z-10 inset-0 overflow-y-hidden">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <div
                        className="inline-block mt-[10vh] rounded-lg text-left overflow-y-auto overflow-visible 
                          transform transition-all"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                        ref={modalRef}
                        style={{ maxHeight: '80vh', backgroundColor: '#ff9999' }}
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 opacity-80">
                            <h3 className="text-lg font-medium leading-6 opacity-80" id="modal-headline">
                                {openDay}
                            </h3>
                            <div className="mt-2">
                                <table className="min-w-full divide-y divide-gray-200 bg-white">
                                    <thead className="bg-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-medium text-black uppercase tracking-wider">
                                                Kell
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-medium text-black uppercase tracking-wider">
                                                Sademed
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-medium text-black uppercase tracking-wider">
                                                Temperatuur
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-medium text-black uppercase tracking-wider">
                                                Tuulekiirus
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-medium text-black uppercase tracking-wider">
                                                Olukord
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {groupedByDay.find(([day]) => day === openDay)?.[1].map((hour) => (
                                            <tr key={hour['@attributes'].from} className='text-black border-dotted border-b-4'>
                                                <td className="px-6 py-1 whitespace-nowrap">
                                                    {hour['@attributes'].from.split('T')[1].split(':')[0]}
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap">
                                                    {hour.precipitation['@attributes'].value} mm
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap">
                                                    {hour.temperature['@attributes'].value} °C
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap">
                                                    {hour.windSpeed['@attributes'].mps} m/s
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap">
                                                    {hour.phenomen['@attributes'].et}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 
                              bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 
                              focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );

    const lineForDay = (day: string, climateHours: ClimateHour[]) => {

        const hourValue = climateHours[0]['@attributes'].from.split('T')[1].split(':')[0];
        console.log(day)
        console.log(hourValue)
        console.log(climateHours[0])
        let percipitation = 0;
        const tempArray: number[] = [];
        const hourPhenomena: { [hour: string]: string } = {};

        climateHours.forEach(climateHour => {
            percipitation = percipitation + parseFloat(climateHour.precipitation['@attributes'].value)
            const temp = parseFloat(climateHour.temperature['@attributes'].value)
            tempArray.push(Math.round(temp));

            const hourValue = parseFloat(climateHour['@attributes'].from.split('T')[1].split(':')[0]);
            let phenomenaName = climateHour.phenomen['@attributes'].className
            if (phenomenaName == 'overcast' && (hourValue < 6 || hourValue >= 22)) phenomenaName = 'overcast_night';
            if (phenomenaName == 'overcast' && (hourValue >= 6 || hourValue < 22)) phenomenaName = 'overcast_day';

            if (phenomenaName == 'few_clouds' && (hourValue < 6 || hourValue >= 22)) phenomenaName = 'few_clouds_night';
            if (phenomenaName == 'few_clouds' && (hourValue >= 6 || hourValue < 22)) phenomenaName = 'few_clouds_day';

            if (phenomenaName == 'clear' && (hourValue < 6 || hourValue >= 22)) phenomenaName = 'clear_night';
            if (phenomenaName == 'clear' && (hourValue >= 6 || hourValue < 22)) phenomenaName = 'clear_day';

            const phenomenaIcon = pathToWeatherIcon[phenomenaName];
            hourPhenomena[hourValue] = phenomenaIcon ? phenomenaIcon : '';

        });

        const basePathToImage = (imageName: string) => {

            return <Image
                src={'/assets/' + imageName}
                width={35}
                height={25}
                alt="phenomen_icon"
            />
        }

        return <>
            <div className='mr-[13px]'><h3>{day}</h3></div>
            {/* Night icon */}
            <div className="text-md align-self-end">
                {hourPhenomena[1] ?
                    basePathToImage(hourPhenomena[1])
                    :
                    <div className='w-[35px] h-[25px]'></div>
                }
            </div>
            {/* Morning icon*/}
            <div className="text-md align-self-end">
                {hourPhenomena[9] ?
                    basePathToImage(hourPhenomena[9])
                    :
                    <div className='w-[35px] h-[25px]'></div>
                }
            </div>
            {/* Day icon */}
            <div className="text-md align-self-end">
                {hourPhenomena[13] ?
                    basePathToImage(hourPhenomena[13])
                    :
                    <div className='w-[35px] h-[25px]'></div>
                }
            </div>
            {/* Evening icon */}
            <div className="text-md align-self-end">
                {hourPhenomena[22] || hourPhenomena[23]
                    ? basePathToImage(hourPhenomena[22] || hourPhenomena[23])
                    : <div className='w-[35px] h-[25px]'></div>}
            </div>
            <div className="text-md align-self-end">{Math.min(...tempArray)}/{Math.max(...tempArray)} °C</div>
            <div className="text-md align-self-end">{Math.round(percipitation * 10) / 10} mm</div>
            <div className="text-md align-self-end">{climateHours[0].windSpeed['@attributes'].mps} m/s</div>
            <div className="text-md align-self-end"></div>
        </>
    }



    return (
        <div>
            <div style={{ marginLeft: '120px', maxWidth: '500px' }} className="flex flex-wrap flex-shrink justify-items-center gap-5">
                <div className="text-xs">Öö</div>
                <div className="text-xs">Hommik</div>
                <div className="text-xs">Päev</div>
                <div className="text-xs">Õhtu</div>
                <div className="text-xs">Max/Min temp</div>
                <div className="text-xs">Sademed</div>
                <div className="text-xs">Tuul</div>
                <div className="text-xs"></div>
            </div>
            {groupedByDay.map(([day, data]) => (
                <div key={day} className='border-2 mb-4 opacity-80'>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => openModal(day)}
                    >
                        <div style={{ marginLeft: '1px', maxWidth: '600px' }} className="flex flex-wrap flex-shrink justify-items-center gap-4 align-items-center justify-content-center">
                            {lineForDay(day, data)}
                        </div>
                    </div>
                </div>
            ))}
            {modal}
        </div>
    );
};
export default ForecastTable;