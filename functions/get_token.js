exports.handler = async function (context, event, callback) {
    const twilio = require('twilio');
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    try {
        const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, TWIML_APP_SID } = context;

        if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET || !TWIML_APP_SID) {
            throw new Error("Missing Twilio environment variables.");
        }

        // Ensure identity is retrieved correctly
        const identity = event.identity || event.queryStringParameters?.identity || `user_${Math.floor(Math.random() * 10000)}`;

        console.log('Identity is: ' + identity);
        
        if (!identity) {
            throw new Error("Identity is required but not provided.");
        }

        const token = new AccessToken(
            TWILIO_ACCOUNT_SID, 
            TWILIO_API_KEY, 
            TWILIO_API_SECRET,
            { identity: identity }
        );

        const voiceGrant = new VoiceGrant({
            outgoingApplicationSid: TWIML_APP_SID,
            incomingAllow: true
        });

        token.addGrant(voiceGrant);

        return callback(null, { token: token.toJwt(), identity });

    } catch (error) {
        console.error("Error generating token:", error.message);
        return callback(null, { error: error.message });
    }
};
