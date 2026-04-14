import { motion } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import Particles from "@/components/Particles";
import GradientBackground from "@/components/GradientBackground";

interface SplashScreenProps {
  onContinue: () => void;
}

const SplashScreen = ({ onContinue }: SplashScreenProps) => (
  <GradientBackground>
    <Particles count={25} />
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center">
          <MapPin className="w-12 h-12 text-primary-foreground" />
        </div>
      </motion.div>

      {/* App name */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-5xl font-bold font-display tracking-tight text-foreground mb-3"
      >
        PriceDrop
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-lg text-foreground/70 font-body max-w-xs"
      >
        Real prices. Real people.
      </motion.p>

      {/* Bottom swipe hint */}
      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 flex flex-col items-center gap-1 text-foreground/50"
      >
        <span className="text-sm font-body">Tap to continue</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  </GradientBackground>
);

export default SplashScreen;
