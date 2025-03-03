"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * @typedef {Object} AnimateInProps
 * @property {React.ReactNode} children
 * @property {"fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right"} [animation]
 * @property {number} [delay]
 */

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {"fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right"} [props.animation]
 * @param {number} [props.delay]
 * @param {string} [props.className]
 */
export function AnimateIn({
  children,
  animation = "fade",
  delay = 0,
  className,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    "slide-up": {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    "slide-down": {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    "slide-left": {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    "slide-right": {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
  };

  const { initial, animate, exit } = animations[animation];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : initial}
      animate={shouldReduceMotion ? { opacity: 1 } : animate}
      exit={shouldReduceMotion ? { opacity: 1 } : exit}
      transition={{ duration: 0.3, delay }}
      className={(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
