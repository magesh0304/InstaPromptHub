"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload, ImagePlus, X, Tag, Sparkles, Eye, Save, Send,
  ChevronDown, Info, DollarSign
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPromptSchema } from "@/lib/validations/schemas";
import { cn } from "@/lib/utils";
import { AI_MODEL_LABELS, CATEGORY_LABELS } from "@/types";
import type { z } from "zod";

type FormData = z.infer<typeof createPromptSchema>;

export default function UploadPage() {
  const [previewMode, setPreviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(createPromptSchema),
    defaultValues: { isPremium: false, aiModel: "CHATGPT", category: "BUSINESS" },
  });

  const isPremium = watch("isPremium");
  const title = watch("title");
  const content = watch("content");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const onSaveDraft = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  const onPublish = async (data: FormData) => {
    setPublishing(true);
    console.log("Publishing:", { ...data, tags });
    await new Promise((r) => setTimeout(r, 1500));
    setPublishing(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Upload className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Share Your Prompt</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Upload Prompt</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
                previewMode
                  ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                  : "border-white/10 text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Eye className="w-4 h-4" />
              {previewMode ? "Edit" : "Preview"}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onPublish)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div className="glass-card rounded-2xl p-5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">
                  Prompt Title *
                </label>
                <input
                  {...register("title")}
                  placeholder="Give your prompt a catchy, descriptive title..."
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-white/25 text-base outline-none focus:border-purple-500/40 transition-all"
                />
                {errors.title && <p className="text-xs text-red-400 mt-1.5">{errors.title.message}</p>}
                <p className="text-xs text-white/30 mt-1.5">{title?.length || 0}/120 characters</p>
              </div>

              {/* Description */}
              <div className="glass-card rounded-2xl p-5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  placeholder="Describe what this prompt does and when to use it..."
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/40 resize-none transition-all"
                />
              </div>

              {/* Prompt Content */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Prompt Content *
                  </label>
                  <span className="text-xs text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Markdown supported
                  </span>
                </div>
                <textarea
                  {...register("content")}
                  rows={12}
                  placeholder="Enter your full prompt here. Use [PLACEHOLDERS] for variables the user needs to fill in...

Example:
You are a professional [ROLE] with expertise in [FIELD]. Your task is to [SPECIFIC TASK].

Requirements:
- [REQUIREMENT 1]
- [REQUIREMENT 2]

Output format: [DESCRIBE OUTPUT FORMAT]"
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-purple-500/40 resize-none font-mono leading-relaxed transition-all"
                />
                {errors.content && <p className="text-xs text-red-400 mt-1.5">{errors.content.message}</p>}
                <p className="text-xs text-white/30 mt-1.5">{content?.length || 0}/10,000 characters</p>
              </div>

              {/* Tags */}
              <div className="glass-card rounded-2xl p-5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">
                  Tags <span className="text-white/25 font-normal normal-case">(up to 10)</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-300 text-sm">
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3 hover:text-red-400 transition-colors" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); addTag(); }
                      }}
                      placeholder="Add a tag..."
                      className="w-full bg-white/3 border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/40 transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-sm transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Preview Image */}
              <div className="glass-card rounded-2xl p-5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">
                  Preview Image
                </label>
                {imagePreview ? (
                  <div className="relative">
                    <Image src={imagePreview} alt="Preview" width={300} height={200} className="w-full rounded-xl object-cover" />
                    <button type="button" onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center hover:bg-red-500/60 transition-all">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-36 rounded-xl border-2 border-dashed border-white/10 hover:border-purple-500/30 transition-all cursor-pointer group">
                    <ImagePlus className="w-8 h-8 text-white/20 group-hover:text-purple-400 transition-colors mb-2" />
                    <span className="text-sm text-white/30 group-hover:text-white/50 transition-colors">Upload image</span>
                    <span className="text-xs text-white/20 mt-0.5">PNG, JPG, WebP up to 10MB</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setImagePreview(URL.createObjectURL(file));
                    }} />
                  </label>
                )}
              </div>

              {/* AI Model */}
              <div className="glass-card rounded-2xl p-5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">
                  AI Model *
                </label>
                <div className="relative">
                  <select
                    {...register("aiModel")}
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500/40 transition-all appearance-none"
                  >
                    {Object.entries(AI_MODEL_LABELS).map(([key, label]) => (
                      <option key={key} value={key} className="bg-gray-900">{label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                </div>
              </div>

              {/* Category */}
              <div className="glass-card rounded-2xl p-5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">
                  Category *
                </label>
                <div className="relative">
                  <select
                    {...register("category")}
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500/40 transition-all appearance-none"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key} className="bg-gray-900">{label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                </div>
              </div>

              {/* Premium Toggle */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-white text-sm">Premium Prompt</p>
                    <p className="text-xs text-white/40 mt-0.5">Charge users to access this prompt</p>
                  </div>
                  <Controller
                    name="isPremium"
                    control={control}
                    render={({ field }) => (
                      <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-all",
                          field.value ? "bg-purple-600" : "bg-white/15"
                        )}
                      >
                        <span className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                          field.value ? "translate-x-6" : "translate-x-1"
                        )} />
                      </button>
                    )}
                  />
                </div>

                {isPremium && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-white/5 pt-4"
                  >
                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">
                      Price (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        {...register("price", { valueAsNumber: true })}
                        type="number"
                        min="0.99"
                        max="999"
                        step="0.01"
                        placeholder="4.99"
                        className="w-full bg-white/3 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/40 transition-all"
                      />
                    </div>
                    <p className="text-xs text-white/30 mt-1.5 flex items-center gap-1">
                      <Info className="w-3 h-3" /> You earn 80% — platform keeps 20%
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onSaveDraft}
                  disabled={saving}
                  className="w-full py-3.5 rounded-xl border border-white/15 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? "Saving..." : "Save Draft"}
                </button>
                <motion.button
                  type="submit"
                  disabled={publishing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-500/25"
                >
                  {publishing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {publishing ? "Publishing..." : "Publish Prompt"}
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
