export interface WeatherObject {
    date: Date;
    weather: {
      main: string;
      description?: string;
    };
    temperature: {
      current?: number;
      average?: number;
      feelslike?: number;
      min: number;
      max: number;
    };
    humidity?: number;
    pressure?: number;
    wind?: {
      speed: number;
      direction: number;
    };
  }