const PORT: number = parseInt(process.env.PORT as string) || 3001;
const API_KEY = process.env.API_KEY;
export { PORT, API_KEY};

console.log(API_KEY);