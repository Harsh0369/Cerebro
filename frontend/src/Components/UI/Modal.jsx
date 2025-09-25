import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            initial={{ y: -40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                       border border-slate-700 rounded-3xl
                       shadow-2xl p-6 w-full max-w-md
                       text-gray-100 relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg md:text-xl font-bold text-indigo-400">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-500 transition-colors text-xl md:text-2xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="text-gray-300 space-y-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
