import { motion, type MotionProps } from "framer-motion";
import * as React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & MotionProps & {
  delay?: number;
};

export default function MotionFade({ delay = 0, children, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
