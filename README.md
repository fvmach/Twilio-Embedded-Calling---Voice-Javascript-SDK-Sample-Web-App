# Twilio WebRTC Calling App

This is a sample **Twilio Voice WebRTC** application that allows users to make **web-to-web calls** using Twilio’s **Voice SDK**. The app consists of:

- A **Help Center Article Mockup Interface** for initiating calls.
- An **Account Manager VoIP Interface** for receiving and handling calls.
- **Call Controls** to manage ongoing calls (Mute, Unmute, End, Transfer, Conference).
- **Twilio** **Functions** for token generation, call handling, and call control.

---

## Features

- WebRTC-based voice calling between two clients.
- Outbound call initiation from the Help Center.
- Incoming call handling in the Account Manager interface.
- Call controls: **Mute, Unmute, End Call, Transfer, and Conference**.
- Uses **Twilio Functions** as the backend.

---

## Project Structure

```
twilio-webrtc-sample-app
│-- assets/                             # Static frontend files
│   │-- help_center_article.html        # Help Center UI (Caller)
│   │-- account_manager_interface.html  # Account Manager UI (Receiver)
│-- functions/                          # Twilio Functions (Backend)
│   │-- get_token.js                    # Generates Twilio Voice SDK token
│   │-- call_handling.js                # Handles call initiation
│   │-- call_control.js                 # Manages call actions (mute, end, transfer, conference)
│-- README.md                           # Documentation
```

---

## Prerequisites

- A **Twilio account** ([Sign up](https://www.twilio.com/try-twilio) if you do not have one).
- A **Twilio Voice-capable number**.
- A **Twilio API Key and Secret** (for secure API authentication).
- A **TwiML App SID** (to route calls).

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/twilio-webrtc-sample-app.git
cd twilio-webrtc-sample-app
```

### 2. Configure Twilio Environment Variables

Set the following variables in **Twilio Functions → Environment Variables**:

```
ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_API_KEY=<your_twilio_api_key>
TWILIO_API_SECRET=<your_twilio_api_secret>
TWIML_APP_SID=<your_twiml_app_sid>
```

### 3. Deploy Twilio Functions

Deploy the **Twilio Functions** to handle authentication and call actions.

```bash
twilio serverless:deploy --service-name=webrtc-calling
```

### 4. Host the Frontend

Upload `help_center_article.html` and `account_manager_interface.html` as **Twilio Assets** or use a local server:

```bash
npx serve .
```

Alternatively, you can use Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

Then open your browser and navigate to:

```
http://localhost:8000/help_center_article.html
http://localhost:8000/account_manager_interface.html
```
```

---

## Usage Guide

### Open the Web Interfaces

- **Caller UI** → Open `help_center_article.html`
- **Receiver UI** → Open `account_manager_interface.html`

### Make a Call

1. Click **"Call Account Manager Now"** in the Help Center.
2. The Account Manager should receive an incoming call notification.
3. Click **Accept** to connect the call.

### Use Call Controls

- **Mute/Unmute** → Toggles local audio.
- **End Call** → Disconnects the call.
- **Transfer** → Prompts for a new recipient and transfers the call.
- **Start Conference** → Moves the call into a conference.

---

## Troubleshooting

### Issue: Call Controls Not Working

**Solution:**

- Open **DevTools → Console** and check if `CallSid` is logged.
- Ensure `/call-control` requests return `200 OK` in **Network tab**.
- If mute/unmute is not working, check that `connection.mute(true/false)` is applied locally.

### Issue: 401 Unauthorized on Twilio API

**Solution:**

- Ensure `TWILIO_API_KEY` and `TWILIO_API_SECRET` are set correctly.
- Use **Twilio API Key authentication** instead of Account SID + Auth Token.

### Issue: Calls Are Not Connecting

**Solution:**

- Check that `TWIML_APP_SID` is linked to a valid TwiML App.
- Verify Twilio **Voice SDK token generation** logs.

---

## References

- [Twilio Voice SDK for JavaScript](https://www.twilio.com/docs/voice/sdks/javascript)
- [Twilio Functions Documentation](https://www.twilio.com/docs/runtime/functions)
- [Managing Calls with Twilio](https://www.twilio.com/docs/voice/api/call)

