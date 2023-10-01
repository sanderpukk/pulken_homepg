export const eestiNimed: { [key: string]: string } = {
    windSpeed: 'Tuule kiirus',
    precipitation: 'Sademed',
    phenomen: 'Pilvisus',
    temperature: 'Temperatuur',
};

export const keyToValueMap: { [key: string]: string } = {
    phenomen: 'et',
    precipitation: 'value',
    windSpeed: 'mps',
    temperature: 'value'
};

export const getCorrectValueForKey = (key: string, object: { [key: string]: string }) => {
    const mappedKey = keyToValueMap[key];
    const mappedValue: { [key: string]: string } = object['@attributes'] as unknown as { [key: string]: string };

    if (mappedKey !== undefined && mappedValue !== undefined) {
        return mappedValue[mappedKey];
    }
    return null;
};

export const pathToWeatherIcon: { [key: string]: string } = {
    moderate_rain: 'keskmine_vihma.svg',
    light_rain: 'natukene_vihma.svg',
    heavy_rain:'palju_vihma.svg',
    cloudy: 'pilves.svg',
    overcast_day: 'vahelduv_v2ike_p2ike.svg',
    overcast_night: 'vahelduv_v2ike_kuu.svg',
    few_clouds_day: 'vahelduv_suur_p2ike.svg',
    few_clouds_night: 'vahelduv_suur_kuu.svg',
    clear_day:'p2ike.svg',
    clear_night:'kuu.svg',
    cloudy_with_clear_spells: 'pilves.svg'

};