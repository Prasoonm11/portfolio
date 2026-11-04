"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

interface GithubData {
  username: string;
  profileUrl: string;
  repos: number;
  followers: number;
  stars: number;
  contributions: number;
  streak: number;
  contributionWeeks: { date: string; count: number; level: number }[][];
}

interface LeetCodeData {
  username: string;
  profileUrl: string;
  rank: string;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  rating: string | number;
  percentile: string;
  acceptance: string;
}

const initialGithubStats: GithubData = {
  username: "Prasoonm11",
  profileUrl: "https://github.com/Prasoonm11",
  contributions: 115,
  stars: 0,
  repos: 16,
  followers: 0,
  streak: 5,
  contributionWeeks: [],
};

const initialLeetcodeStats: LeetCodeData = {
  username: "prasoon11",
  profileUrl: "https://leetcode.com/u/prasoon11/",
  rank: "5.0M+",
  solved: 10,
  easy: 2,
  medium: 7,
  hard: 1,
  rating: "N/A",
  acceptance: "100%",
  percentile: "Active",
};

// 13 weeks (~3 months) placeholder grid
const empty3MonthsGrid = Array.from({ length: 13 }, () =>
  Array.from({ length: 7 }, () => ({ date: "", count: 0, level: 0 }))
);

export default function TechStatus() {
  const [github, setGithub] = useState<GithubData>(initialGithubStats);
  const [leetcode, setLeetcode] = useState<LeetCodeData>(initialLeetcodeStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [ghRes, lcRes] = await Promise.allSettled([
          fetch("/api/github"),
          fetch("/api/leetcode"),
        ]);

        if (ghRes.status === "fulfilled" && ghRes.value.ok) {
          const ghData = await ghRes.value.json();
          if (!ghData.error) {
            setGithub((prev) => ({ ...prev, ...ghData }));
          }
        }

        if (lcRes.status === "fulfilled" && lcRes.value.ok) {
          const lcData = await lcRes.value.json();
          if (!lcData.error) {
            setLeetcode((prev) => ({ ...prev, ...lcData }));
          }
        }
      } catch (err) {
        console.error("Failed to load tech stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Display only the last 13 weeks (last 3 months)
  const last3MonthsWeeks = useMemo(() => {
    if (github.contributionWeeks && github.contributionWeeks.length > 0) {
      return github.contributionWeeks.slice(-13);
    }
    return empty3MonthsGrid;
  }, [github.contributionWeeks]);

  return (
    <section id="status" className="section-container py-12 md:py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 max-w-5xl mx-auto"
        >
          <div>
            <span className="eyebrow mb-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Live Profiles
            </span>
            <h2 className="section-title text-2xl md:text-3xl font-black">
              Developer <span className="gradient-text">Stats</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] text-text-muted self-start sm:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isLoading ? "Syncing stats..." : "Live APIs Connected"}</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {/* GitHub Stats Card */}
          <motion.div variants={itemVariants} className="card flex flex-col justify-between p-5 sm:p-6">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#24292e] flex items-center justify-center shadow-sm flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">GitHub</h3>
                    <p className="text-[11px] text-text-muted">@{github.username}</p>
                  </div>
                </div>
                <motion.a
                  href={github.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors px-2.5 py-1 rounded-md bg-surface-elevated hover:bg-surface border border-border"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  title="View GitHub Profile"
                >
                  <span>Profile</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 mb-3.5">
                {[
                  { label: "Contributions", value: github.contributions.toLocaleString() },
                  { label: "Repositories", value: github.repos },
                  { label: "Stars Earned", value: github.stars },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2 rounded-lg bg-surface-elevated border border-border/40">
                    <div className="text-xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-[10px] text-text-muted mt-0.5 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Contribution Graph - Last 3 Months */}
              <div className="mb-3.5 p-3 rounded-lg bg-surface-elevated border border-border/40">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-text-primary">Activity Heatmap</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface text-text-muted border border-border">
                      3 Months
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-text-muted">
                    <span>Less</span>
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#161b22]" />
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#0e4429]" />
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#006d32]" />
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#26a641]" />
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#39d353]" />
                    <span>More</span>
                  </div>
                </div>

                <div className="flex gap-1 justify-between overflow-x-auto pb-0.5 hide-scrollbar">
                  {last3MonthsWeeks.map((week, i) => (
                    <div key={i} className="flex flex-col gap-1 flex-1">
                      {week.map((day, j) => {
                        const levelColors = [
                          "#161b22", // 0
                          "#0e4429", // 1
                          "#006d32", // 2
                          "#26a641", // 3
                          "#39d353", // 4
                        ];
                        const bg = levelColors[day.level] || levelColors[0];
                        return (
                          <motion.div
                            key={j}
                            className="aspect-square w-full min-w-[8px] max-w-[14px] rounded-xs transition-colors cursor-pointer"
                            style={{ background: bg }}
                            whileHover={{ scale: 1.35 }}
                            title={
                              day.date
                                ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                                : `${day.count} contributions`
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Activity Info */}
            <div className="border-t border-border pt-3 mt-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs font-medium text-text-secondary">
                    {github.streak > 0 ? `${github.streak} day streak` : "Active contributor"}
                  </span>
                </div>
                <span className="text-[11px] text-text-muted">{github.followers} followers</span>
              </div>
            </div>
          </motion.div>

          {/* LeetCode Stats Card */}
          <motion.div variants={itemVariants} className="card flex flex-col justify-between p-5 sm:p-6">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ffa116] flex items-center justify-center shadow-sm flex-shrink-0">
                    <svg className="w-5 h-5 text-black font-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3h-8V5h10v14z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">LeetCode</h3>
                    <p className="text-[11px] text-text-muted">@{leetcode.username}</p>
                  </div>
                </div>
                <motion.a
                  href={leetcode.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-text-muted hover:text-[#ffa116] transition-colors px-2.5 py-1 rounded-md bg-surface-elevated hover:bg-surface border border-border"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  title="View LeetCode Profile"
                >
                  <span>Profile</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              </div>

              {/* Rank & Status Banner */}
              <div className="flex items-center justify-between mb-3.5 p-2.5 px-3.5 rounded-lg bg-surface-elevated border border-border/40">
                <div>
                  <div className="text-[10px] text-text-muted font-medium">Global Rank</div>
                  <div className="text-xl font-bold text-primary">#{leetcode.rank}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-text-muted font-medium">Activity Status</div>
                  <div className="text-sm font-bold gradient-text mt-0.5">{leetcode.percentile}</div>
                </div>
              </div>

              {/* Problem Stats Grid */}
              <div className="grid grid-cols-4 gap-2 mb-3.5">
                {[
                  { label: "Total", value: leetcode.solved, color: "#f59e0b" },
                  { label: "Easy", value: leetcode.easy, color: "#10b981" },
                  { label: "Medium", value: leetcode.medium, color: "#f59e0b" },
                  { label: "Hard", value: leetcode.hard, color: "#ef4444" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="text-center p-2 rounded-lg border"
                    style={{
                      background: item.color + "10",
                      borderColor: item.color + "25",
                    }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="text-lg font-bold" style={{ color: item.color }}>
                      {item.value}
                    </div>
                    <div className="text-[9px] text-text-muted mt-0.5 font-medium">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Acceptance Rate Progress */}
            <div className="border-t border-border pt-3 mt-auto">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-text-muted">Acceptance Rate</span>
                <span className="text-xs font-bold text-text-primary">{leetcode.acceptance}</span>
              </div>
              <div className="progress-bar h-1.5">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: leetcode.acceptance }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}