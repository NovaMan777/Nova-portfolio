import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WelcomeScreen = ({ onWelcomeComplete }) => {
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    const complete = setTimeout(() => {
      setExitAnimation(true);
      setTimeout(onWelcomeComplete, 700);
    }, 2600);

    return () => clearTimeout(complete);
  }, [onWelcomeComplete]);

  const skip = () => {
    setExitAnimation(true);
    setTimeout(onWelcomeComplete, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <motion.button
        type="button"
        onClick={skip}
        className="h-full w-full flex items-center justify-center p-6 bg-background cursor-pointer"
        initial={{ opacity: 0 }}
        animate={exitAnimation ? { y: "-100%", opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Enter portfolio"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-brand/15 blur-[110px]" />
        </div>

        <div className="relative text-center max-w-xl">
          <motion.p
            className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Full-stack engineer
          </motion.p>
          <motion.h1
            className="font-serif text-5xl sm:text-7xl tracking-tight"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Tomas <span className="italic text-brand">Cooper</span>
          </motion.h1>
          <motion.div
            className="mx-auto mt-8 h-px w-24 bg-linear-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          />
          <motion.p
            className="mt-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Click anywhere to enter
          </motion.p>
        </div>
      </motion.button>
    </div>
  );
};

export default WelcomeScreen;
