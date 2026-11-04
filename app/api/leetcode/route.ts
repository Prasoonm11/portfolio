import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const username = process.env.LEETCODE_USERNAME || "prasoon11";

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
          totalSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        topPercentage
        globalRanking
        attendedContestsCount
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Portfolio-LeetCode-Stats",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      throw new Error(`LeetCode request failed with status ${res.status}`);
    }

    const json = await res.json();
    const matchedUser = json?.data?.matchedUser;
    const contest = json?.data?.userContestRanking;

    if (!matchedUser) {
      return NextResponse.json(
        { error: `LeetCode user '${username}' not found` },
        { status: 404 }
      );
    }

    const acStats: { difficulty: string; count: number }[] =
      matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const totalStats: { difficulty: string; count: number }[] =
      matchedUser.submitStatsGlobal?.totalSubmissionNum || [];

    const solvedTotal = acStats.find((s) => s.difficulty === "All")?.count || 0;
    const solvedEasy = acStats.find((s) => s.difficulty === "Easy")?.count || 0;
    const solvedMedium = acStats.find((s) => s.difficulty === "Medium")?.count || 0;
    const solvedHard = acStats.find((s) => s.difficulty === "Hard")?.count || 0;

    const totalSubmissions =
      totalStats.find((s) => s.difficulty === "All")?.count || solvedTotal || 1;
    const acceptanceRate =
      totalSubmissions > 0
        ? `${Math.round((solvedTotal / totalSubmissions) * 100)}%`
        : "100%";

    const ranking = matchedUser.profile?.ranking;
    const formattedRank = ranking
      ? ranking > 1000000
        ? `${(ranking / 1000000).toFixed(1)}M+`
        : ranking.toLocaleString()
      : "N/A";

    const rating = contest?.rating ? Math.round(contest.rating) : "N/A";
    const percentile = contest?.topPercentage
      ? `Top ${contest.topPercentage.toFixed(1)}%`
      : "Active";

    return NextResponse.json({
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      rank: formattedRank,
      solved: solvedTotal,
      easy: solvedEasy,
      medium: solvedMedium,
      hard: solvedHard,
      rating,
      percentile,
      acceptance: acceptanceRate,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch LeetCode stats" },
      { status: 500 }
    );
  }
}
