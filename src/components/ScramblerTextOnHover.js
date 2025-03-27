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
    // Prevent division by zero or negative steps if fadeDuration is too small
    const volumeStep = steps > 0 ? targetVolume / steps : targetVolume;

    let currentVolume = audioRef.current.volume;

    if (fadeIn) {
      if (audioRef.current.paused) {
        // Only reset time and play if it's actually paused
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0;
        audioRef.current.play().catch((error) => {
          // Don't log error if it's an abort error (common on quick interactions)
          if (error.name !== "AbortError") {
            console.error("Audio play failed:", error);
          }
        });
      }
      // Start fading in from current volume (might be 0 or might be mid-fade-out)
      currentVolume = audioRef.current.volume;

      fadeIntervalRef.current = setInterval(() => {
        currentVolume += volumeStep;
        if (currentVolume >= targetVolume) {
          audioRef.current.volume = targetVolume;
          clearInterval(fadeIntervalRef.current);
        } else {
          // Ensure volume doesn't exceed target (can happen with float precision)
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
          // Reset time only after pausing and fully faded out
          audioRef.current.currentTime = 0;
          clearInterval(fadeIntervalRef.current);
        } else {
          audioRef.current.volume = currentVolume;
        }
      }, stepTime);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = false; // Set loop to false
    audioRef.current.volume = 0;

    if (spanRef.current) {
      // Delay width measurement slightly to ensure font is loaded
      const timeoutId = setTimeout(() => {
        if (spanRef.current) {
          setWidth(spanRef.current.offsetWidth);
        }
      }, 50); // 50ms delay, adjust if needed
      return () => clearTimeout(timeoutId); // Clear timeout on cleanup
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (!spanRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Optionally trigger scramble on view (no sound by default here)
        // if (entry.isIntersecting) { scramble(false); } // Pass flag to avoid sound
      },
      { threshold: 0.5 }
    );
    const currentSpan = spanRef.current;
    observer.observe(currentSpan);

    return () => {
      observer.unobserve(currentSpan);
    };
  }, []); // Re-added spanRef.current check inside effect

  // Modified scramble to accept an optional flag to play sound
  const scramble = (playSound = true) => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    if (playSound) {
      fadeAudio(true);
    }

    intervalRef.current = setInterval(() => {
      if (!spanRef.current) {
        // Check if ref is still valid
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
        // Don't fade out here, only onMouseLeave or if sound finishes naturally
      }
    }, 20);
  };

  const handleMouseEnter = () => {
    scramble(true); // Explicitly play sound on hover
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    // Check if ref exists before resetting text, avoids errors on unmount
    if (spanRef.current) {
      setDisplayText(originalText);
    }
    fadeAudio(false);
  };

  // Recalculate width if text content changes externally
  useEffect(() => {
    setDisplayText(originalText); // Update display text if prop changes
    if (spanRef.current) {
      // Use requestAnimationFrame to wait for DOM update
      requestAnimationFrame(() => {
        if (spanRef.current) {
          setWidth(spanRef.current.offsetWidth);
        }
      });
    }
  }, [text, originalText]); // Add text/originalText dependency

  return (
    <span
      ref={spanRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: "pointer",
        display: "inline-block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: width ? `${width}px` : "auto",
        minWidth: width ? `${width}px` : "auto",
        // Height might still cause minor shifts, consider setting line-height
        // or a fixed height if necessary for perfect stability.
        height: spanRef.current ? `${spanRef.current.offsetHeight}px` : "auto",
        verticalAlign: "bottom", // Helps align text consistently
      }}
    >
      {displayText}
    </span>
  );
}
