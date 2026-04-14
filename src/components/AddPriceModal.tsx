import { motion } from "framer-motion";
import { X, MapPin, ChevronDown, Fuel, ShoppingCart, Utensils, Scissors } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { icon: Fuel, label: "Gas" },
  { icon: ShoppingCart, label: "Grocery" },
  { icon: Utensils, label: "Restaurant" },
  { icon: Scissors, label: "Service" },
];

const AddPriceModal = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState("Gas");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-md glass rounded-t-3xl p-6 pb-10 mobile-safe"
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-foreground/20 mx-auto mb-6" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-display text-foreground">Add Price Report</h3>
          <button onClick={onClose} className="p-2 rounded-xl bg-secondary">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Category selector */}
        <p className="text-xs text-muted-foreground font-body mb-2 uppercase tracking-wider">Category</p>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = selected === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelected(cat.label)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all ${
                  active ? "gradient-primary" : "bg-secondary"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span className={`text-[11px] font-display font-semibold ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Location */}
        <p className="text-xs text-muted-foreground font-body mb-2 uppercase tracking-wider">Location</p>
        <div className="flex items-center gap-3 bg-secondary rounded-2xl px-4 py-3 mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground font-body flex-1">Current location</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Price */}
        <p className="text-xs text-muted-foreground font-body mb-2 uppercase tracking-wider">Price</p>
        <div className="bg-secondary rounded-2xl px-4 py-3 mb-4">
          <input
            type="text"
            placeholder="$0.00"
            className="bg-transparent w-full text-2xl font-bold font-display text-foreground outline-none placeholder:text-muted-foreground/40"
          />
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground font-body mb-2 uppercase tracking-wider">Note (optional)</p>
        <div className="bg-secondary rounded-2xl px-4 py-3 mb-6">
          <input
            type="text"
            placeholder="e.g. Premium unleaded"
            className="bg-transparent w-full text-sm text-foreground font-body outline-none placeholder:text-muted-foreground/40"
          />
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-display font-bold text-base"
        >
          Submit Report
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AddPriceModal;
