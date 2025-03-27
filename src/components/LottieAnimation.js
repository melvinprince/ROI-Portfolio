// LottieAnimation.js
"use client";

import React, { forwardRef, useImperativeHandle } from "react"; // Import necessary hooks
import { useLottie } from "lottie-react";

// Wrap component with forwardRef to receive the ref from the parent
const LottieAnimation = forwardRef(
  ({ animationData, autoPlay = false, loop = true }, ref) => {
    const options = {
      animationData: animationData,
      loop: loop,
      autoplay: autoPlay, // Use the prop, default to false
      style: { height: "100%", width: "100%" },
    };

    const { View, animationControl } = useLottie(options);

    // Expose specific methods (play, pause) to the parent component via the ref
    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          animationControl?.play();
        },
        pause: () => {
          animationControl?.pause();
        },
        // You can expose other methods from animationControl if needed
        // stop: () => {
        //   animationControl?.stop();
        // }
      }),
      [animationControl]
    ); // Dependency array includes animationControl

    // Render only the View. Remove hover handlers from here.
    return <div style={{ width: "100%", height: "100%" }}>{View}</div>;
  }
);

// Add display name for better debugging
LottieAnimation.displayName = "LottieAnimation";

export default LottieAnimation;
