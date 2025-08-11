import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-1 bg-muted relative overflow-hidden">
      <motion.div
        className="h-full bg-gradient-brand absolute top-0 left-0"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.div
        className="h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent absolute top-0"
        initial={{ x: -80 }}
        animate={{ x: `calc(${progress}% - 40px)` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};