import React from "react";
import Webcam from "react-webcam";

const WebcamStreamCapture = ({question,onSubmit}) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const idVideoPlayer = question._id.replace(/[^a-zA-Z]/g, '');
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      handleDownload();
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        /*
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();
        window.URL.revokeObjectURL(url);

        */
        //

        const recordedVideo = document.querySelector(`video#${idVideoPlayer}`);
      
        recordedVideo.src = null;
        recordedVideo.srcObject = null;

        recordedVideo.src = window.URL.createObjectURL(blob);
        recordedVideo.controls = true;
        recordedVideo.play();
        
        
      }
    }, [recordedChunks, onSubmit(question)]);
  
    return (
      <>
      <video id={idVideoPlayer} playsInline loop></video>
        {
          recordedChunks.length > 0 ? 
          (
            <></>
          ) : <Webcam audio={false} ref={webcamRef} />
        }
         
        
        {
          recordedChunks.length <= 0 ?(
          capturing ? (
              <button onClick={handleStopCaptureClick}>II</button>
            ) : (
              <button onClick={handleStartCaptureClick}>Grabar</button>
            )):<></>
        }
        {
          recordedChunks.length > 0 ? (
            <button onClick={handleDownload}>Ver Video</button> 
            ): <></>
        }
      </>
    );
  };
  export default WebcamStreamCapture;