# Instructions to follow

## Create Speech Service Resource

1. There is a free tier

## Add Text to Speech Component

1. Create the component
2. Add needed states
   - A state for "isRecording"
   - A state for storing transcripts
3. Add the UI first
   - A pair of buttons to start/stop recording, display according to state
   - Another button for clearing transcriptions
   - A div for showing transcriptions
4. Add button handlers
   - Start recording handler
     - Add recognizer event handlers here
       - On recognized, we add it to our transcript
     - Call recognizer.startContinuousRecognitionAsync() function
   - Stop recording handler
     - Call recognizer.stopContinuousRecognitionAsync()
   - Clear transcriptions handler
     - Set transcriptions to be empty
5. Test it out

## Add Speech to Text Component

1. Create component
2. Create textarea for input, use a ref or state to handle input
3. Add a button to trigger the speech synthesis
4. Add a button handler just using speechTextAsync
5. Test it out
