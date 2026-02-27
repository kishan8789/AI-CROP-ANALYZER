exports.getSchemes = async (req, res) => {
    const schemes = [
        { id: 1, name: "PM-Kisan Samman Nidhi", benefit: "₹6000/year", eligibility: "Small/Marginal Farmers", deadline: "Active" },
        { id: 2, name: "Pradhan Mantri Fasal Bima Yojana", benefit: "Crop Insurance", eligibility: "All Farmers", deadline: "Apply before sowing" }
    ];
    res.status(200).json(schemes);
};