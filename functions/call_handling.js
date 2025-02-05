exports.handler = function (context, event, callback) {
    const twilio = require('twilio');
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();

    if (!event.To) {
        response.say("Missing destination identity.");
    } else {
        const dial = response.dial();
        dial.client(event.To); // Dial another web user by Client identity
    }

    callback(null, response);
};
