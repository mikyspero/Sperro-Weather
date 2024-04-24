export interface RawWeatherObject {
    dt: number; // UNIX timestamp
    main: {
      temp: number; // Temperature in Kelvin
      feels_like: number; // Temperature in Kelvin
      temp_min: number; // Minimum temperature in Kelvin
      temp_max: number; // Maximum temperature in Kelvin
      pressure: number; // Atmospheric pressure in hPa
      sea_level?: number; // Sea-level pressure in hPa
      grnd_level?: number; // Ground-level pressure in hPa
      humidity: number; // Humidity in percentage
      temp_kf: number; // Temperature difference
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number; // Cloudiness in percentage
    };
    wind: {
      speed: number; // Wind speed in meter/sec
      deg: number; // Wind direction in degrees
      gust?: number; // Wind gust speed in meter/sec
    };
    visibility: number; // Visibility in meters
    pop: number; // Probability of precipitation
    sys: {
      pod: string; // Part of the day (e.g., 'n' for night)
    };
    dt_txt: string; // Date and time in text format (YYYY-MM-DD HH:mm:ss)
  }