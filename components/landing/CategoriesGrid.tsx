"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CATEGORY_LABELS, type PromptCategory } from "@/types";
import { getCategoryEmoji } from "@/lib/utils";

const categories = Object.entries(CATEGORY_LABELS) as [PromptCategory, string][];

const categoryColors = [
  "from-purple-500/20 to-violet-600/20 border-purple-500/20 hover:border-purple-500/40",
  "from-pink-500/20 to-rose-600/20 border-pink-500/20 hover:border-pink-500/40",
  "from-cyan-500/20 to-sky-600/20 border-cyan-500/20 hover:border-cyan-500/40",
  "from-amber-500/20 to-orange-600/20 border-amber-500/20 hover:border-amber-500/40",
  "from-green-500/20 to-teal-600/20 border-green-500/20 hover:border-green-500/40",
  "from-indigo-500/20 to-blue-600/20 border-indigo-500/20 hover:border-indigo-500/40",
];

export function CategoriesGrid() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-white mb-3">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-white/50">Find exactly what you need across 18 creative categories</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map(([key, label], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link
                href={`/explore?category=${key}`}
                className={`
                  flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center
                  bg-gradient-to-br border transition-all duration-300
                  hover:scale-105 hover:shadow-lg group
                  ${categoryColors[i % categoryColors.length]}
                `}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  {getCategoryEmoji(key)}
                </span>
                <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors leading-tight">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
