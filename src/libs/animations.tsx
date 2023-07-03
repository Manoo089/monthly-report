import { AnimationScope } from "framer-motion";

export const pressedButtonAnimation = (animate: any, refElement: AnimationScope) => {
  animate(
    [
      [refElement.current, { scale: 0.95, boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.7)" }],
      [refElement.current, { scale: 1, boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)" }],
      [refElement.current, { scale: 0.95, boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" }]
    ],
    { duration: 0.3 }
  );
};
