exports.handler = async function (context, event, callback) {
    const twilio = require('twilio');

    // Ensure Twilio API credentials exist
    if (!context.TWILIO_API_KEY || !context.TWILIO_API_SECRET || !context.ACCOUNT_SID) {
        console.error("Error: Missing Twilio API credentials.");
        return callback(null, JSON.stringify({ error: "Twilio API credentials are missing." }));
    }

    const client = twilio(context.TWILIO_API_KEY, context.TWILIO_API_SECRET, { accountSid: context.ACCOUNT_SID });

    console.log("Received call-control request:", JSON.stringify(event, null, 2));

    if (!event.callSid || !event.action) {
        console.error("Error: Missing callSid or action");
        return callback(null, JSON.stringify({ error: "Missing callSid or action" }));
    }

    try {
        let response;
        switch (event.action) {
            case "mute":
                response = await client.calls(event.callSid).update({ muted: true });
                break;
            case "unmute":
                response = await client.calls(event.callSid).update({ muted: false });
                break;
            case "end":
                response = await client.calls(event.callSid).update({ status: "completed" });
                break;
            case "transfer":
                if (!event.targetClient) {
                    throw new Error("Missing targetClient for transfer");
                }
                response = await client.calls(event.callSid).update({
                    twiml: `<Response><Dial><Client>${event.targetClient}</Client></Dial></Response>`
                });
                break;
            case "conference":
                response = await client.calls(event.callSid).update({
                    twiml: `<Response><Dial><Conference>${event.conferenceName || "SupportRoom"}</Conference></Dial></Response>`
                });
                break;
            default:
                return callback(null, JSON.stringify({ error: "Invalid action" }));
        }

        console.log("Call Control Success:", response);
        callback(null, JSON.stringify({ success: true, action: event.action }));

    } catch (error) {
        console.error("Error in call-control:", error);
        callback(null, JSON.stringify({ error: error.message }));
    }
};
