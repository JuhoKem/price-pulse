import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./SplashScreen";
import AuthScreen from "./AuthScreen";
import MapScreen from "./MapScreen";

type Screen = "splash" | "auth" | "map";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("splash");

  return (
    <div className="max-w-md mx-auto h-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
            <SplashScreen onContinue={() => setScreen("auth")} />
          </motion.div>
        )}
        {screen === "auth" && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
            <AuthScreen onLogin={() => setScreen("map")} />
          </motion.div>
        )}
        {screen === "map" && (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="h-full">
            <MapScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
