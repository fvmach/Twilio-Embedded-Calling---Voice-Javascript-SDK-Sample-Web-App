exports.handler = async function (context, event, callback) {
    const twilio = require('twilio');
    const client = twilio(context.ACCOUNT_SID, context.AUTH_TOKEN);

    try {
        const { callSid, conferenceName } = event;

        if (!callSid || !conferenceName) {
            throw new Error("Call SID and conference name are required.");
        }

        const response = await client.conferences(conferenceName).participants.create({
            callSid: callSid,
            endConferenceOnExit: false
        });

        callback(null, { success: true, conferenceName });

    } catch (error) {
        console.error("Error in conference-call:", error.message);
        callback(null, { success: false, error: error.message });
    }
};
