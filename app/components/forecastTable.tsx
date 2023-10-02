'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ClimateData, ClimateHour } from '../interfaces/iClimateData';
import { getCorrectValueForKey, getPhenomenIcon, keyToValueMap, pathToWeatherIcon } from '../utils/nameMapping';
import Image from 'next/image';
import { parseDateToDay } from '../utils/dayDateMapping';
import { colorTempValue } from '../utils/colorTempValue';



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

    const basePathToImage = (imageName: string) => {

        return <Image
            src={'/assets/' + imageName}
            width={35}
            height={25}
            alt="phenomen_icon"
        />
    }

    const getImagePath = (hour:string, phenomen:string) => {
        const toNumber = parseFloat(hour);
        const phenomenIcon = getPhenomenIcon(toNumber,phenomen)

        return basePathToImage(phenomenIcon);
    }

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
                          transform transition-all bg-[#330000]"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                        ref={modalRef}
                        style={{ maxHeight: '80vh', backgroundColor: '#330000' }}
                    >
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 opacity-90 bg-[#330000]">
                            <h3 className="pl-[20px] text-lg font-medium leading-6 opacity-90 text-gray-200 bg-[#330000]" id="modal-headline">
                                {parseDateToDay(openDay, true) + ". "+ climateData.location } 
                            </h3>
                            <div className="mt-2">
                                <table className="min-w-full divide-y divide-gray-200 bg-[#330000]">
                                    <thead className="bg-[#330000]">
                                        <tr>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-bold text-gray-200 uppercase tracking-wider">
                                                Kell
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-bold text-gray-200 uppercase tracking-wider">
                                                Sademed
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-bold text-gray-200 uppercase tracking-wider">
                                                Temperatuur
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-bold text-gray-200 uppercase tracking-wider">
                                                Tuulekiirus
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-bold text-gray-200 uppercase tracking-wider">
                                                Olukord
                                            </th>
                                            <th scope="col" className="px-6 py-1 text-left text-md font-bold text-gray-200 uppercase tracking-wider">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {groupedByDay.find(([day]) => day === openDay)?.[1].map((hour) => (
                                            <tr key={hour['@attributes'].from} className='text-gray-200 border-dashed border-b-2 opacity-100 text-[18px] '>
                                                <td className="px-6 py-1 whitespace-nowrap" style={{fontWeight: 'bold'}}>
                                                    {hour['@attributes'].from.split('T')[1].split(':')[0]}
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap opacity-100 font-bold" style={{color:'#006EDB'}}>
                                                    {parseFloat(hour.precipitation['@attributes'].value) > 0 ? hour.precipitation['@attributes'].value + " mm" : ''}
                                                </td>
                                                {parseFloat(hour.temperature['@attributes'].value) >= 0 ?
                                                    <td className="px-6 py-2 whitespace-nowrap opacity-100 font-bold" style={{color:'#c60000'}}>
                                                        {hour.temperature['@attributes'].value} °C
                                                    </td>
                                                    :
                                                    <td className="px-6 py-2 whitespace-nowrap opacity-100 font-bold" style={{color:'#006EDB'}}>
                                                        {hour.temperature['@attributes'].value} °C
                                                    </td>
                                                }

                                                <td className="px-6 py-2 whitespace-nowrap opacity-100">
                                                    {hour.windSpeed['@attributes'].mps} m/s
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap opacity-100">
                                                    {hour.phenomen['@attributes'].et}
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap opacity-100">
                                                    { getImagePath(hour['@attributes'].from.split('T')[1].split(':')[0], hour.phenomen['@attributes'].className) }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-[#330000] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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

    const lineForDay = (index:number, day: string, climateHours: ClimateHour[]) => {

        let percipitation = 0;
        const tempArray: number[] = [];
        const hourPhenomena: { [hour: string]: string } = {};

        const windArray: number[] = [];

        climateHours.forEach(climateHour => {
            percipitation = percipitation + parseFloat(climateHour.precipitation['@attributes'].value)
            const temp = parseFloat(climateHour.temperature['@attributes'].value)
            tempArray.push(Math.round(temp));
            windArray.push(parseFloat(climateHour.windSpeed['@attributes'].mps));

            const hourValue = parseFloat(climateHour['@attributes'].from.split('T')[1].split(':')[0]);
            const phenomenaIcon = getPhenomenIcon(hourValue, climateHour.phenomen['@attributes'].className)

            hourPhenomena[hourValue] = phenomenaIcon ? phenomenaIcon : '';

        });

        const avgWind = windArray.reduce((accumulator, currentValue) => accumulator + currentValue) / windArray.length;


        return <>
            <div className='pl-2 min-w-[90px] pt-[7px]' style={{bottom:0, inset: 0, position: 'relative'}}>
                <h3 >{index == 0 ? 'Täna' : parseDateToDay(day, false)}</h3>
            </div>
            {/* Night icon */}
            <div className="text-md">
                {hourPhenomena[1] ?
                    basePathToImage(hourPhenomena[1])
                    :
                    <div className='w-[35px] h-[25px]'></div>
                }
            </div>
            {/* Morning icon*/}
            <div className="text-md">
                {hourPhenomena[9] ?
                    basePathToImage(hourPhenomena[9])
                    :
                    <div className='w-[35px] h-[25px]'></div>
                }
            </div>
            {/* Day icon */}
            <div className="text-md ">
                {hourPhenomena[13] ?
                    basePathToImage(hourPhenomena[13])
                    :
                    <div className='w-[35px] h-[25px]'></div>
                }
            </div>
            {/* Evening icon */}
            <div className="text-md">
                {hourPhenomena[22] || hourPhenomena[23]
                    ? basePathToImage(hourPhenomena[22] || hourPhenomena[23])
                    : <div className='w-[35px] h-[25px]'></div>}
            </div>
            <div className="text-base pt-[5px]" style={{fontWeight: 'bold'}} >{colorTempValue(Math.min(...tempArray), Math.max(...tempArray))} °C</div>
            <div className="text-md pt-[5px]" style={{color:'#66b3ff'}}>{percipitation > 0 ? Math.round(percipitation * 10) / 10 + " mm" : ''}</div>
            <div className="text-md pt-[5px]">{Math.round(avgWind * 10) / 10} m/s</div>
            <div className="text-md pt-[5px]"></div>
        </>
    }



    return (
        <div className='' style={{boxShadow:"0 6px 6px hsl(0deg 0% 0% / 0.3)"}}>
            <div style={{ marginLeft: '112px'}} className="grid grid-cols-8 gap-[63px]">
                <div className="text-xs">Öö</div>
                <div className="text-xs">Hommik</div>
                <div className="text-xs">Päev</div>
                <div className="text-xs">Õhtu</div>
                <div className="text-xs">Max/Min temp</div>
                <div className="text-xs">Sademed</div>
                <div className="text-xs">Tuul</div>
            </div>
            {groupedByDay.map(([day, data], index) => (
                <div key={day} className=' opacity-80 hover:bg-red-900/30' style={{boxShadow:"0 6px 6px hsl(0deg 0% 0% / 0.4)"}}>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => openModal(day)}
                    >
                        <div style={{ marginLeft: '1px', maxWidth: '680px' }} className="grid grid-cols-8 gap-0 justify-items-center align-items-center justify-content-center">
                            {lineForDay(index, day, data)}                            
                        </div>
                        <div id="test" className='border-b-2 mr-2 ml-2 '></div>
                    </div>
                </div>
            ))}
            {modal}
        </div>
    );
};
export default ForecastTable;