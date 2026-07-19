import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, hoverEffect = false, className = "", onClick }: CardProps) => {
  const containerClasses = `bg-bg-primary rounded-2xl border border-border-primary p-8 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.03)] transition-shadow duration-300 ${
    onClick ? "cursor-pointer" : ""
  } ${className}`;

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 12px 24px -4px rgba(0,0,0,0.04), 0 4px 12px -2px rgba(0,0,0,0.02)" }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        className={containerClasses}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={containerClasses}>
      {children}
    </div>
  );
};

export default Card;