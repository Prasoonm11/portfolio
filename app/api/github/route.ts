import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "Prasoonm11";
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    "User-Agent": "Portfolio-Stats-Fetcher",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    // 1. Fetch user profile and repositories with 6s timeout
    const fetchOptions = {
      headers,
      signal: AbortSignal.timeout(6000),
    };

    const [userRes, reposRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, fetchOptions),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, fetchOptions),
    ]);

    const userData =
      userRes.status === "fulfilled" && userRes.value.ok
        ? await userRes.value.json().catch(() => ({}))
        : {};

    const reposData =
      reposRes.status === "fulfilled" && reposRes.value.ok
        ? await reposRes.value.json().catch(() => [])
        : [];

    const totalStars = Array.isArray(reposData)
      ? reposData.reduce(
          (acc: number, repo: { stargazers_count?: number }) =>
            acc + (repo.stargazers_count || 0),
          0
        )
      : 0;

    // 2. Fetch contribution graph data with 6s timeout
    let totalContributions = 0;
    let contributionWeeks: { date: string; count: number; level: number }[][] = [];
    let currentStreak = 0;

    try {
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { signal: AbortSignal.timeout(6000) }
      );

      if (contribRes.ok) {
        const contribData = await contribRes.json().catch(() => ({}));
        totalContributions = contribData.total?.lastYear ?? contribData.total?.all ?? 0;
        const days: { date: string; count: number; level: number }[] =
          Array.isArray(contribData.contributions) ? contribData.contributions : [];

        // Calculate current active streak
        if (days.length > 0) {
          let streak = 0;
          let todayPassed = false;
          for (let i = days.length - 1; i >= 0; i--) {
            if (days[i].count > 0) {
              streak++;
              todayPassed = true;
            } else if (todayPassed) {
              break;
            }
          }
          currentStreak = streak;
        }

        // Format into 52 weeks x 7 days
        const weeks: { date: string; count: number; level: number }[][] = [];
        for (let i = 0; i < days.length; i += 7) {
          weeks.push(days.slice(i, i + 7));
        }
        contributionWeeks = weeks.slice(-52);
      }
    } catch {
      // Fallback if contribution API encounters error or timeouts
    }

    return NextResponse.json({
      username,
      profileUrl: `https://github.com/${username}`,
      repos: userData.public_repos ?? (Array.isArray(reposData) ? reposData.length : 16),
      followers: userData.followers ?? 0,
      stars: totalStars,
      contributions: totalContributions,
      streak: currentStreak,
      contributionWeeks,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
