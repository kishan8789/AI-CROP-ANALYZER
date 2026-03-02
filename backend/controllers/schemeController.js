exports.getSchemes = async (req, res) => {
    const schemes = [
        // 🌾 Aapke purane Central Government wale schemes
        { 
            id: 1, 
            state: "Central (All India)",
            name: "PM-Kisan Samman Nidhi", 
            benefit: "₹6000/year", 
            eligibility: "Small/Marginal Farmers", 
            deadline: "Active",
            link: "https://pmkisan.gov.in/" 
        },
        { 
            id: 2, 
            state: "Central (All India)",
            name: "Pradhan Mantri Fasal Bima Yojana", 
            benefit: "Crop Insurance", 
            eligibility: "All Farmers", 
            deadline: "Apply before sowing",
            link: "https://pmfby.gov.in/"
        },
        
        // 🚜 Naye State-wise schemes
        {
            id: 3,
            state: "Bihar",
            name: "Kisan Krishi Yantra Yojana",
            benefit: "Up to 80% Subsidy on Machinery",
            eligibility: "All Farmers of Bihar",
            deadline: "Check Portal",
            link: "https://dbtagriculture.bihar.gov.in/"
        },
        {
            id: 4,
            state: "Punjab",
            name: "Agriculture Machinery Subsidy",
            benefit: "Subsidy on Tractors & Crop Residue Mgt",
            eligibility: "Farmers of Punjab",
            deadline: "Active",
            link: "https://agrimachinerypb.com/"
        },
        {
            id: 5,
            state: "Uttar Pradesh",
            name: "UP Krishi Yantra Subsidy",
            benefit: "Grant on Farming Equipments",
            eligibility: "Farmers of UP",
            deadline: "Active",
            link: "http://upagriculture.com/"
        },
        {
            id: 6,
            state: "Haryana",
            name: "Haryana Agriculture Subsidy",
            benefit: "Financial help for big machines",
            eligibility: "Farmers of Haryana",
            deadline: "Check Portal",
            link: "https://agriharyana.gov.in/"
        }
    ];
    res.status(200).json(schemes);
};