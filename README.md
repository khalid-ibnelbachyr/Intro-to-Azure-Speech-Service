# Intro-to-Azure-Speech-Service

## What is this repo about

This repo contains an example Speech Service sdk implementation in a React Vite app

This repo was made as presentation material to be used for https://www.meetup.com/microsoft-reactor-london/events/292530417/

![speech service workshop image](https://user-images.githubusercontent.com/56083944/232788314-d430f69a-039b-4b36-bd11-ab232f4916c7.png)

And also contains the slides and code for this YouTube video: 

[A practical guide to Azure Speech Service](https://www.youtube.com/embed/EjtVUbljNjM)

![intro to speech service thumbnail](https://user-images.githubusercontent.com/56083944/232787347-44eb0639-59f1-4021-85dd-81d1440741af.png)

### App functionality details

This is a template of how you can get started with Azure Speech Services with React.
It contains a basic frontend interface for Speech to text and Text to speech, and an api backend for getting auth tokens, watch the video for more detailed explanations

![SpeechInterface](https://user-images.githubusercontent.com/56083944/232786591-1d615ed8-49b0-4591-aa7a-cb5c0a6e6a6f.png)

### App structure

Basically this is a modern React stack with the modern tooling, I used

- React Vite for a basic frontend app
- Azure Functions as a backend
- Tailwind and DaisyUI for styling

```typescript
// Directory
- speech-intro-app
  - api (for proper implementation)
  - components
    - basic (for simple implementation)
    - proper (for proper implementation)
  - App.tsx (entrypoint)
```

> Putting the api inside of the project would allow you to configure an api for your Static Web App

## Use this as a template
> Note: I did not add any authorization token expiry monitoring and refetching logic

- You can find examples online to implement simple token refetching logic on your frontend, I am just storing them as a state for demo purposes but you can store them in local storage, session storage, cookies etc

### How to start

- Run app and functions
  - speech starter app 
    ```powershell
    cd intro-speech-app
    pnpm install
    pnpm dev
    ```
  - functions api
    - use visual studio code functions extension and click on F5 
- Use the Static Web App CLI tool
  - would need some manual changes, I didn't run my setup using this but this demo was deployed to Azure Static Web Apps, so it is definitely possible to configure it

### Notes on deployment

- Make sure to change your api endpoints called from the React app when deploying, if you use SWA they should share the same domain

## Credits

Demo was based of this: https://github.com/Azure-Samples/AzureSpeechReactSample, you can find an example of token refetching logic here
