import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Component() {
  const [words, setWords] = useState([]);
  const [recognizedLetters, setRecognizedLetters] = useState(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);
  const recognitionCountRef = useRef(0);

  const fetchBasicWords = () => {
    const basicWords = [
      "cat",
      "bat",
      "fit",
      "cold",
      "sand",
      "flat",
      "bold",
      "clot",
      "cast",
      "into",
      "cost",
      "find",
      "load",
      "clad",
      "slot",
      "salt",
      "bond",
      "fast",
      "lint",
      "fold",
    ];

    setWords(basicWords.sort(() => 0.5 - Math.random()).slice(0, 10));
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setRecognizedLetters(new Set());
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam:", err));

    fetchBasicWords();
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning && !isProcessing) {
      intervalId = setInterval(() => {
        recognizeSign();
      }, 500); // Increased interval to 500ms
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, isProcessing, currentWordIndex, currentLetterIndex]);

  const getPositionKey = (wordIdx, letterIdx) => `${wordIdx}-${letterIdx}`;

  const moveToNextPosition = () => {
    const currentWord = words[currentWordIndex];
    if (currentLetterIndex < currentWord.length - 1) {
      setCurrentLetterIndex((prev) => prev + 1);
    } else if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentLetterIndex(0);
    } else {
      setIsRunning(false);
    }
  };

  const recognizeSign = async () => {
    if (!videoStream || currentWordIndex >= words.length || isProcessing)
      return;

    setIsProcessing(true);
    recognitionCountRef.current += 1;
    const currentRecognitionCount = recognitionCountRef.current;

    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.scale(-1, 1);
      ctx.drawImage(
        video,
        -video.videoWidth,
        0,
        video.videoWidth,
        video.videoHeight
      );

      const imageData = canvas.toDataURL("image/jpeg");

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

      // Check if this recognition is still relevant
      if (currentRecognitionCount !== recognitionCountRef.current) {
        setIsProcessing(false);
        return;
      }

      const data = await response.json();
      const recognizedChar = data.prediction || "No hand detected";

      const currentWord = words[currentWordIndex];
      const currentChar = currentWord[currentLetterIndex].toUpperCase();

      console.log(
        `Predicted: ${recognizedChar}, Target: ${currentChar}, Word: ${currentWord}, Position: ${currentWordIndex}:${currentLetterIndex}`
      );

      if (recognizedChar === currentChar) {
        const positionKey = getPositionKey(
          currentWordIndex,
          currentLetterIndex
        );

        setRecognizedLetters((prev) => {
          const newSet = new Set(prev);
          newSet.add(positionKey);
          return newSet;
        });

        // Add a small delay before moving to next position
        await new Promise((resolve) => setTimeout(resolve, 200));

        if (currentRecognitionCount === recognitionCountRef.current) {
          moveToNextPosition();
        }
      }
    } catch (error) {
      console.error("Error recognizing sign:", error);
    } finally {
      if (currentRecognitionCount === recognitionCountRef.current) {
        setIsProcessing(false);
      }
    }
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
    recognitionCountRef.current = 0;
  };

  const getLetterClassName = (wordIndex, letterIndex) => {
    const positionKey = getPositionKey(wordIndex, letterIndex);

    if (wordIndex === currentWordIndex && letterIndex === currentLetterIndex) {
      return "text-gray-500 bg-gray-200";
    } else if (recognizedLetters.has(positionKey)) {
      return "text-green-500";
    }
    return "text-black";
  };

  return (
    <div className="bg-white min-h-screen flex flex-col p-4">
      <main className="flex-grow flex flex-col items-center justify-center space-y-4">
        <Card className="text-center w-full max-w-3xl p-6">
          <div className="mb-4">
            <Badge variant="secondary">english</Badge>
            <span className="text-sm ml-2">Sign Language Practice</span>
          </div>
          <div className="text-xl font-mono leading-normal mb-4 overflow-x-auto whitespace-nowrap">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-2">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className={getLetterClassName(wordIndex, letterIndex)}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <Button onClick={handleStartStop}>
            {isRunning ? "Stop" : "Start"} Recognition
          </Button>
        </Card>
        <div className="w-full max-w-3xl aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover transform scale-x-[-1]"
            autoPlay
            muted
            playsInline
          />
        </div>
      </main>
    </div>
  );
}
