// Mocking weather API for now. You can replace with Axios + OpenWeatherMap later.
exports.getWeatherInsights = async (req, res) => {
    res.status(200).json({
        temp: "32°C",
        humidity: "65%",
        forecast: "Light rain expected tomorrow evening.",
        irrigationAdvice: "Delay irrigation by 2 days due to upcoming rain."
    });
};