"use client";
import React, { useState, useRef, useEffect } from "react";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:'\",.<>/?\\|~";

function getRandomChar() {
  return characters[Math.floor(Math.random() * characters.length)];
}

export default function ScrambleTextOnHover({ text }) {
  const originalText = text.toString();
  const [displayText, setDisplayText] = useState(originalText);
  const [width, setWidth] = useState(null);
  const [shouldScramble, setShouldScramble] = useState(false);
  const spanRef = useRef(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const audioSrc = "/sounds/scramble-sound.mp3";
  const targetVolume = 0.002; // Adjusted volume slightly for subtlety
  const fadeDuration = 100;

  const fadeAudio = (fadeIn) => {
    if (!audioRef.current) return;

    clearInterval(fadeIntervalRef.current);

    const stepTime = 20;
    const steps = fadeDuration / stepTime;
    const volumeStep = steps > 0 ? targetVolume / steps : targetVolume;
    let currentVolume = audioRef.current.volume;

    if (fadeIn) {
      if (audioRef.current.paused) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0;
        audioRef.current.play().catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Audio play failed:", error);
          }
        });
      }
      currentVolume = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        currentVolume += volumeStep;
        if (currentVolume >= targetVolume) {
          audioRef.current.volume = targetVolume;
          clearInterval(fadeIntervalRef.current);
        } else {
          audioRef.current.volume = Math.min(currentVolume, targetVolume);
        }
      }, stepTime);
    } else {
      currentVolume = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        currentVolume -= volumeStep;
        if (currentVolume <= 0) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          clearInterval(fadeIntervalRef.current);
        } else {
          audioRef.current.volume = currentVolume;
        }
      }, stepTime);
    }
  };

  useEffect(() => {
    // Set up the audio element
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = false;
    audioRef.current.volume = 0;

    // Determine if the scramble effect should be enabled (window width > 600)
    const updateShouldScramble = () => {
      setShouldScramble(window.innerWidth > 600);
    };
    updateShouldScramble();
    window.addEventListener("resize", updateShouldScramble);

    // Measure the width of the text span after font load (only needed for scramble mode)
    if (spanRef.current) {
      const timeoutId = setTimeout(() => {
        if (spanRef.current) {
          setWidth(spanRef.current.offsetWidth);
        }
      }, 50);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", updateShouldScramble);
      };
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener("resize", updateShouldScramble);
    };
  }, [audioSrc]);

  useEffect(() => {
    if (!spanRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Optionally trigger scramble on view
      },
      { threshold: 0.5 }
    );
    const currentSpan = spanRef.current;
    observer.observe(currentSpan);
    return () => {
      observer.unobserve(currentSpan);
    };
  }, []);

  const scramble = (playSound = true) => {
    if (!shouldScramble) return; // Only scramble on devices wider than 600px
    let iteration = 0;
    clearInterval(intervalRef.current);

    if (playSound) {
      fadeAudio(true);
    }

    intervalRef.current = setInterval(() => {
      if (!spanRef.current) {
        clearInterval(intervalRef.current);
        return;
      }
      setDisplayText(
        originalText
          .split("")
          .map((char, index) =>
            index < iteration ? originalText[index] : getRandomChar()
          )
          .join("")
      );
      iteration += 0.5;
      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current);
        setDisplayText(originalText);
      }
    }, 20);
  };

  const handleMouseEnter = () => {
    if (shouldScramble) {
      scramble(true);
    }
  };

  const handleMouseLeave = () => {
    if (shouldScramble) {
      clearInterval(intervalRef.current);
      if (spanRef.current) {
        setDisplayText(originalText);
      }
      fadeAudio(false);
    }
  };

  useEffect(() => {
    setDisplayText(originalText);
    if (spanRef.current) {
      requestAnimationFrame(() => {
        if (spanRef.current) {
          setWidth(spanRef.current.offsetWidth);
        }
      });
    }
  }, [text, originalText]);

  return (
    <span
      ref={spanRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: shouldScramble ? "pointer" : "default",
        // If scramble is enabled (device width > 600), maintain the fixed dimensions,
        // Otherwise allow normal text wrapping.
        display: shouldScramble ? "inline-block" : "block",
        whiteSpace: shouldScramble ? "nowrap" : "normal",
        overflow: shouldScramble ? "hidden" : "visible",
        width: shouldScramble && width ? `${width}px` : "auto",
        minWidth: shouldScramble && width ? `${width}px` : "auto",
        // height:
        //   shouldScramble && spanRef.current
        //     ? `${spanRef.current.offsetHeight}px`
        //     : "auto",
        verticalAlign: "bottom",
      }}
    >
      {displayText}
    </span>
  );
}
