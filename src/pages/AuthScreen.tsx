import { motion } from "framer-motion";
import { MapPin, Apple, Mail } from "lucide-react";
import GradientBackground from "@/components/GradientBackground";
import Particles from "@/components/Particles";

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => (
  <GradientBackground>
    <Particles count={12} />
    <div className="flex flex-col items-center min-h-screen px-8 pt-20 pb-10">
      {/* Logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-4"
      >
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
          <MapPin className="w-8 h-8 text-primary-foreground" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold font-display text-foreground mb-1"
      >
        PriceDrop
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-foreground/60 font-body mb-16"
      >
        Join the community
      </motion.p>

      {/* Auth buttons */}
      <div className="w-full max-w-sm space-y-4">
        {/* Apple */}
        <motion.button
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-foreground text-background font-display font-semibold text-base transition-transform active:scale-[0.97]"
        >
          <Apple className="w-5 h-5" />
          Sign in with Apple
        </motion.button>

        {/* Google */}
        <motion.button
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-foreground/95 text-background font-display font-semibold text-base transition-transform active:scale-[0.97]"
        >
          {/* Google "G" icon inline */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </motion.button>

        {/* Email */}
        <motion.button
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl border-2 border-foreground/20 text-foreground font-display font-semibold text-base gradient-primary transition-transform active:scale-[0.97]"
          style={{ backgroundClip: "padding-box" }}
        >
          <Mail className="w-5 h-5" />
          Sign in with Email
        </motion.button>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto pt-10 text-xs text-foreground/40 text-center font-body leading-relaxed max-w-xs"
      >
        By continuing you agree to our{" "}
        <span className="underline">Terms of Service</span> &{" "}
        <span className="underline">Privacy Policy</span>
      </motion.p>
    </div>
  </GradientBackground>
);

export default AuthScreen;
