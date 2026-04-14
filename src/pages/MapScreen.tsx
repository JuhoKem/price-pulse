import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  Trophy,
  User,
  Plus,
  Fuel,
  ShoppingCart,
  Utensils,
  Scissors,
  X,
  MapPin,
  ChevronDown,
} from "lucide-react";
import AddPriceModal from "@/components/AddPriceModal";

/* Placeholder map pins */
const PINS = [
  { id: 1, x: "25%", y: "35%", icon: Fuel, label: "$3.45", color: "hsl(220, 90%, 56%)" },
  { id: 2, x: "60%", y: "28%", icon: ShoppingCart, label: "$2.99", color: "hsl(160, 70%, 45%)" },
  { id: 3, x: "45%", y: "55%", icon: Utensils, label: "$12.50", color: "hsl(320, 80%, 58%)" },
  { id: 4, x: "75%", y: "60%", icon: Scissors, label: "$25", color: "hsl(40, 90%, 55%)" },
  { id: 5, x: "35%", y: "72%", icon: Fuel, label: "$3.29", color: "hsl(220, 90%, 56%)" },
];

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: null, label: "Add" }, // placeholder for FAB gap
  { icon: Trophy, label: "Board" },
  { icon: User, label: "Profile" },
];

const MapScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Fake map background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(circle at 30% 40%, hsl(230 20% 14%) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, hsl(240 15% 11%) 0%, transparent 50%),
          hsl(230 25% 9%)
        `,
      }}>
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
        {/* "Roads" */}
        <div className="absolute top-0 left-[30%] w-px h-full bg-foreground/[0.06]" />
        <div className="absolute top-0 left-[65%] w-px h-full bg-foreground/[0.06]" />
        <div className="absolute top-[40%] left-0 w-full h-px bg-foreground/[0.06]" />
        <div className="absolute top-[70%] left-0 w-full h-px bg-foreground/[0.06]" />
      </div>

      {/* Top search bar */}
      <div className="relative z-10 px-5 pt-14">
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-body">Search locations or prices…</span>
        </div>
      </div>

      {/* Map pins */}
      {PINS.map((pin) => {
        const Icon = pin.icon;
        return (
          <motion.div
            key={pin.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: pin.id * 0.1 }}
            className="absolute z-10 flex flex-col items-center"
            style={{ left: pin.x, top: pin.y }}
          >
            <div
              className="rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg"
              style={{ background: pin.color }}
            >
              <Icon className="w-3.5 h-3.5 text-primary-foreground" />
              <span className="text-xs font-bold font-display text-primary-foreground">{pin.label}</span>
            </div>
            <div className="w-2 h-2 rotate-45 -mt-1" style={{ background: pin.color }} />
          </motion.div>
        );
      })}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 mobile-safe">
        <div className="glass rounded-t-3xl px-4 pt-2 pb-3 flex items-end justify-around relative">
          {NAV_ITEMS.map((item, i) => {
            if (!item.icon) {
              // Spacer for FAB
              return <div key={i} className="w-16" />;
            }
            const Icon = item.icon;
            const active = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className="flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 transition-colors"
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-[10px] font-body transition-colors ${
                    active ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-dot"
                    className="w-1 h-1 rounded-full gradient-primary"
                  />
                )}
              </button>
            );
          })}

          {/* Floating Action Button — hero element */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
            {/* Pulsing rings */}
            {[0, 1, 2].map((ring) => (
              <div
                key={ring}
                className="absolute w-16 h-16 rounded-full gradient-primary opacity-0"
                style={{
                  animation: `pulse-ring 2s ${ring * 0.6}s ease-out infinite`,
                }}
              />
            ))}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowModal(true)}
              className="relative w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-lg"
              style={{ boxShadow: "0 4px 24px hsla(255, 85%, 63%, 0.5)" }}
            >
              <Plus className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Add Price Modal */}
      <AnimatePresence>
        {showModal && <AddPriceModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default MapScreen;
