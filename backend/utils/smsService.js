exports.sendSMSAlert = (mobileNumber, message) => {
    // FUTURE: Integrate Twilio API here
    console.log(`[SMS MOCK] Sending to ${mobileNumber}: ${message}`);
    return true;
};