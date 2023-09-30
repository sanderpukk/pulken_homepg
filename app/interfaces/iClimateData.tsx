export interface ClimateData {
  forecast: {
    tabular: {
      time: ClimateHour[];
    };
  };
  location: string;
  warnings: string[];
};

export type AttributeInfo = {
  '@attributes': {
    [key: string]: string;
  };
};

export interface ClimateHour {
  '@attributes': {
    from: string;
    to: string;
  };
  phenomen: AttributeInfo;
  precipitation: AttributeInfo;
  pressure: AttributeInfo;
  temperature: AttributeInfo;
  windDirection: AttributeInfo;
  windSpeed: AttributeInfo;
}

