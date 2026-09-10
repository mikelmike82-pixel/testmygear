"use client";

import { motion } from "framer-motion";
import { ToolMeta } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function ToolsGrid({ tools }: { tools: ToolMeta[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tools.map((tool) => (
        <motion.div key={tool.slug} variants={itemVariants}>
          <ToolCard tool={tool} />
        </motion.div>
      ))}
    </motion.div>
  );
}
