import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

export default function Component() {
  const [words, setWords] = useState([]);
  const [recognizedLetters, setRecognizedLetters] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [predictedChar, setPredictedChar] = useState("");
  const videoRef = useRef(null);

  // Function to fetch basic words
  const fetchBasicWords = () => {
    const basicWords = [
      "cat",
      "dog",
      "run",
      "jump",
      "play",
      "eat",
      "sleep",
      "book",
      "tree",
      "sun",
      "moon",
      "star",
      "fish",
      "bird",
      "car",
      "house",
      "ball",
      "boy",
      "girl",
      "happy",
    ];
    setWords(basicWords.sort(() => 0.5 - Math.random()).slice(0, 10));
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setRecognizedLetters([]);
    setIsCompleted(false);
    setPredictedChar("");
  };

  // Initialize webcam
  useEffect(() => {
    if (isRunning) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setVideoStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    } else if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  }, [isRunning]);

  // Start the recognition process every 1 second when the game is running
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        recognizeSign();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, currentWordIndex, currentLetterIndex]);

  // Function to capture image and recognize sign from API
  const recognizeSign = async () => {
    if (videoStream && currentWordIndex < words.length) {
      // Capture frame from video
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.scale(-1, 1); // Mirror the image horizontally
      ctx.drawImage(
        video,
        -video.videoWidth,
        0,
        video.videoWidth,
        video.videoHeight
      );

      // Convert to data URL
      const imageData = canvas.toDataURL("image/jpeg");

      try {
        // Send image to API
        const response = await fetch(
          "https://warm-strictly-walrus.ngrok-free.app/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageData }),
          }
        );
        const data = await response.json();
        const recognizedChar = data.prediction || "No hand detected";

        setPredictedChar(recognizedChar);

        const currentWord = words[currentWordIndex];
        const currentChar = currentWord[currentLetterIndex].toUpperCase();

        if (recognizedChar === currentChar) {
          setRecognizedLetters((prev) => [...prev, recognizedChar]);
          if (currentLetterIndex < currentWord.length - 1) {
            setCurrentLetterIndex((prev) => prev + 1);
          } else {
            if (currentWordIndex === words.length - 1) {
              setIsCompleted(true);
              setIsRunning(false);
            } else {
              setCurrentWordIndex((prev) => prev + 1);
              setCurrentLetterIndex(0);
            }
          }
        }
      } catch (error) {
        console.error("Error recognizing sign:", error);
      }
    }
  };

  const handleStartStop = () => {
    if (!isRunning) {
      fetchBasicWords();
    } else {
      setIsCompleted(false);
      setPredictedChar("");
    }
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col p-4">
      <main className="flex-grow flex flex-col items-center justify-center space-y-4">
        <Card className="text-center w-full max-w-3xl p-6">
          <div className="mb-4">
            <Badge variant="secondary">english</Badge>
            <span className="text-sm ml-2">Sign Language Practice</span>
          </div>
          {isCompleted ? (
            <Alert>
              <AlertTitle>Congratulations!</AlertTitle>
              <AlertDescription>
                You've successfully completed all the words!
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="text-xl font-mono leading-normal mb-4 overflow-x-auto whitespace-nowrap">
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="mr-2">
                    {word.split("").map((letter, letterIndex) => (
                      <span
                        key={`${wordIndex}-${letterIndex}`}
                        className={
                          wordIndex === currentWordIndex &&
                          letterIndex === currentLetterIndex
                            ? "text-gray-500 bg-gray-200" // current letter
                            : wordIndex < currentWordIndex ||
                              (wordIndex === currentWordIndex &&
                                letterIndex < currentLetterIndex)
                            ? "text-green-500" // correct letter
                            : "text-black" // untested letters
                        }
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
              <div className="text-2xl font-bold mb-4">
                Predicted: {predictedChar || "Waiting..."}
              </div>
            </>
          )}
          <Button onClick={handleStartStop}>
            {isRunning ? "Stop" : "Start"} Recognition
          </Button>
        </Card>
        {isRunning && (
          <div className="w-full max-w-3xl aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover transform scale-x-[-1]"
              autoPlay
              muted
              playsInline
            />
          </div>
        )}
      </main>
    </div>
  );
}
