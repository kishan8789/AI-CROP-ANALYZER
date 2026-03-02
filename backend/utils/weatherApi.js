// const axios = require('axios');

exports.fetchLiveWeather = async (location) => {
    try {
        // FUTURE: const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`);
        // return response.data;
        
        // Mock data for Render deployment testing
        return {
            temperature: 32,
            humidity: 65,
            condition: 'Cloudy',
            rainProbability: 20
        };
    } catch (error) {
        console.error("Weather API Error:", error);
        return null;
    }
};