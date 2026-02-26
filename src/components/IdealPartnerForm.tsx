"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const RELATIONSHIP_TYPES = ["Long-term", "Casual", "Open"];
const DISTANCE_OPTIONS = ["Nearby", "Global"];
const INTERESTS = [
  "Travel",
  "Music",
  "Art",
  "Tech",
  "Sports",
  "Reading",
  "Food",
  "Movies",
];

interface IdealPartnerFormProps {
  onSubmit: (data: IdealPartnerFormData) => void;
}

export interface IdealPartnerFormData {
  relationshipType: string;
  distance: string;
  interests: string[];
  values: string;
}

/**
 * 이상형 조건 입력 Mock 폼
 * - 5초 후 mock success로 전환
 */
export default function IdealPartnerForm({ onSubmit }: IdealPartnerFormProps) {
  const [relationshipType, setRelationshipType] = useState("");
  const [distance, setDistance] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [values, setValues] = useState("");

  const toggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      relationshipType,
      distance,
      interests,
      values,
    });
  };

  return (
    <section className="relative py-24 px-6 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto glass-card p-8"
      >
        <h2 className="text-2xl font-bold mb-2">Ideal Partner Setup</h2>
        <p className="text-purple-200/80 mb-8">
          원하는 관계 스타일과 관심사를 선택해주세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-purple-200/80 mb-2">
              Relationship Type
            </label>
            <div className="flex flex-wrap gap-2">
              {RELATIONSHIP_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setRelationshipType(t)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    relationshipType === t
                      ? "border-electricPurple bg-electricPurple/20"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-purple-200/80 mb-2">
              Distance
            </label>
            <div className="flex gap-2">
              {DISTANCE_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDistance(d)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    distance === d
                      ? "border-electricPurple bg-electricPurple/20"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-purple-200/80 mb-2">
              Interests (multi-select)
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleInterest(i)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    interests.includes(i)
                      ? "border-neonCyan bg-neonCyan/20"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-purple-200/80 mb-2">
              Values (optional)
            </label>
            <input
              type="text"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="Growth, Travel, Humor..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-electricPurple outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold bg-electricPurple hover:bg-purple-600 transition-colors"
          >
            Start Agent Negotiation
          </button>
        </form>
      </motion.div>
    </section>
  );
}
