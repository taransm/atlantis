import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { shineWidth, styles } from "./Glimmer.style";
import { sizeStyles } from "./Glimmer.size.style";
import { shapeStyles } from "./Glimmer.shape.style";
import { tokens } from "../utils/design";

export type GlimmerShapes = keyof typeof shapeStyles;
export type GlimmerSizes = keyof typeof sizeStyles;
export type GlimmerTimings = "base" | "fast";

interface GlimmerProps {
  /**
   * Sets the size of the glimmer.
   */
  readonly shape?: GlimmerShapes;

  /**
   * Sets the shape of the glimmer.
   *
   * If you need a specific width, use the `width` prop.
   */
  readonly size?: GlimmerSizes;

  /**
   * Control how fast the shine moves from left to right. This is useful when
   * the glimmer is used on smaller spaces.
   */
  readonly timing?: GlimmerTimings;

  /**
   * Adjust the width of the glimmer in px or % values.
   */
  readonly width?: number | `${number}%`;
}

export const GLIMMER_TEST_ID = "ATL-Glimmer";
export const GLIMMER_SHINE_TEST_ID = "ATL-Glimmer-Shine";

export function Glimmer({
  width,
  shape = "rectangle",
  size = "base",
  timing = "base",
}: GlimmerProps) {
  const leftPosition = useRef(new Animated.Value(-shineWidth)).current;
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const shine = Animated.loop(
      Animated.timing(leftPosition, {
        toValue: parentWidth + shineWidth,
        duration:
          timing === "base"
            ? tokens["timing-loading--extended"]
            : tokens["timing-loading"],
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    );

    shine.start();

    return shine.stop;
  }, [parentWidth]);

  return (
    <View
      style={[
        styles.container,
        sizeStyles[size],
        shapeStyles[shape],
        { width },
      ]}
      onLayout={getWidth}
      testID={GLIMMER_TEST_ID}
    >
      <Animated.View
        style={[styles.shine, { transform: [{ translateX: leftPosition }] }]}
        testID={GLIMMER_SHINE_TEST_ID}
      >
        <Svg>
          <Defs>
            <LinearGradient id="gradientShine" x1={0} y1={0.5} x2={1} y2={0.5}>
              <Stop
                offset="0%"
                stopColor={tokens["color-surface--background"]}
              />
              <Stop offset="50%" stopColor={tokens["color-surface"]} />
              <Stop
                offset="100%"
                stopColor={tokens["color-surface--background"]}
              />
            </LinearGradient>
          </Defs>
          <Rect fill="url(#gradientShine)" height="100%" width="100%" />
        </Svg>
      </Animated.View>
    </View>
  );

  function getWidth(event: LayoutChangeEvent) {
    setParentWidth(event.nativeEvent.layout.width);
  }
}
