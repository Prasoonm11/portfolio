"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const githubStats = {
  contributions: 1234,
  stars: 156,
  commits: 892,
  prs: 145,
  repos: 42,
  streaks: 45,
};

const leetcodeStats = {
  rank: "1,234",
  solved: 456,
  easy: 180,
  medium: 220,
  hard: 56,
  rating: 2150,
  submissions: 1234,
  acceptance: "78%",
  percentile: "Top 15%",
};

const hackerRankStats = {
  badges: 12,
  stars: 5,
  points: 2450,
  rank: "Expert",
  certificates: ["Problem Solving", "Python", "JavaScript", "React"],
};

// Generate fake contribution data
const contributionData = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

export default function TechStatus() {
  return (
    <section id="status" className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <span className="eyebrow">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Tech Stats
          </span>
          <h2 className="section-title">
            Developer
            <span className="gradient-text"> Profile</span>
          </h2>
          <p className="section-subtitle">
            My coding journey and platform statistics
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* GitHub Stats */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#24292e] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">GitHub</h3>
                  <p className="text-xs text-text-muted">Contribution Activity</p>
                </div>
              </div>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Contributions", value: githubStats.contributions.toLocaleString() },
                { label: "Repositories", value: githubStats.repos },
                { label: "Stars", value: githubStats.stars },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Contribution Graph */}
            <div className="mb-4">
              <p className="text-xs text-text-muted mb-2">Last year activity</p>
              <div className="flex gap-0.5 overflow-x-auto hide-scrollbar">
                {contributionData.map((week, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    {week.map((day, j) => (
                      <motion.div
                        key={j}
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{
                          background: day === 0
                            ? '#161b22'
                            : day === 1
                            ? '#0e4429'
                            : day === 2
                            ? '#006d32'
                            : day === 3
                            ? '#26a641'
                            : '#39d353',
                        }}
                        whileHover={{ scale: 1.5 }}
                        title={`${day} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-text-secondary">
                  {githubStats.streaks} day streak
                </span>
              </div>
            </div>
          </motion.div>

          {/* LeetCode Stats */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffa116] flex items-center justify-center">
                  <svg className="w-6 h-6 text-background font-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3h-8V5h10v14z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">LeetCode</h3>
                  <p className="text-xs text-text-muted">Problem Solving</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-xs font-bold">
                Top {leetcodeStats.percentile}
              </span>
            </div>

            {/* Rank & Rating */}
            <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-surface-elevated">
              <div>
                <div className="text-xs text-text-muted">Global Rank</div>
                <div className="text-2xl font-black text-primary">#{leetcodeStats.rank}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-text-muted">Rating</div>
                <div className="text-2xl font-black gradient-text">{leetcodeStats.rating}</div>
              </div>
            </div>

            {/* Problem Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "Total", value: leetcodeStats.solved, color: "#f59e0b" },
                { label: "Easy", value: leetcodeStats.easy, color: "#10b981" },
                { label: "Medium", value: leetcodeStats.medium, color: "#f59e0b" },
                { label: "Hard", value: leetcodeStats.hard, color: "#ef4444" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="text-center p-2 rounded-lg"
                  style={{ background: item.color + "10" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-[10px] text-text-muted">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Acceptance Rate */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-muted">Acceptance Rate</span>
                <span className="text-sm font-bold text-text-secondary">{leetcodeStats.acceptance}</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: leetcodeStats.acceptance }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </motion.div>

          {/* HackerRank Stats */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2ec866] flex items-center justify-center">
                  <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0L1.5 7.5v9L12 24l10.5-7.5v-9L12 0zm0 2.25l8.25 5.25v6.75L12 20.5l-8.25-6.25V7.5L12 2.25z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">HackerRank</h3>
                  <p className="text-xs text-text-muted">Skills认证</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#2ec866]/20 text-[#2ec866] text-xs font-bold">
                {hackerRankStats.rank}
              </span>
            </div>

            {/* Badge Display */}
            <div className="flex gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-lg bg-[#2ec866]/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <svg className="w-5 h-5 text-[#2ec866]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L1.5 7.5v9L12 24l10.5-7.5v-9L12 2z"/>
                  </svg>
                </motion.div>
              ))}
              <div className="flex items-center justify-center text-xs text-text-muted">
                +{hackerRankStats.badges - 5}
              </div>
            </div>

            {/* Points & Stars */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-surface-elevated text-center">
                <div className="text-2xl font-black gradient-text">{hackerRankStats.points}</div>
                <div className="text-xs text-text-muted">Points</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated text-center">
                <div className="text-2xl font-black text-[#2ec866]">{hackerRankStats.stars}</div>
                <div className="text-xs text-text-muted">Badges</div>
              </div>
            </div>

            {/* Certificates */}
            <div>
              <p className="text-xs text-text-muted mb-2">Verified Skills</p>
              <div className="flex flex-wrap gap-2">
                {hackerRankStats.certificates.map((cert) => (
                  <motion.span
                    key={cert}
                    className="px-2 py-1 rounded text-[10px] font-medium bg-[#2ec866]/10 text-[#2ec866]"
                    whileHover={{ scale: 1.05 }}
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}