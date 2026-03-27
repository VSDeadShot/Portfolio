import { NextResponse } from 'next/server';
import axios from 'axios';

interface AcSubmission {
  difficulty: string;
  count: number;
}

interface StatsData {
  leetcode: {
    solved: number;
    ranking: number;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
  };
  codechef: {
    solved: number;
    rating: number;
    stars: string;
    globalRank: number;
  };
  hackerrank: {
    solved: number;
    badges: {
      gold: number;
      silver: number;
      bronze: number;
    };
    points: number;
    ranking: number;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leetcodeUsername = searchParams.get('leetcode');
  const codechefUsername = searchParams.get('codechef');
  const hackerrankUsername = searchParams.get('hackerrank');

  const stats: StatsData = {
    leetcode: { solved: 0, ranking: 0, totalSolved: 0, easy: 0, medium: 0, hard: 0 },
    codechef: { solved: 0, rating: 0, stars: 'Unrated', globalRank: 0 },
    hackerrank: { solved: 0, badges: { gold: 0, silver: 0, bronze: 0 }, points: 0, ranking: 0 },
  };

  // Fetch LeetCode Data
  if (leetcodeUsername) {
    try {
      const query = `
        query getUserProfile($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
            }
          }
        }
      `;

      const response = await axios.post('https://leetcode.com/graphql', {
        query,
        variables: { username: leetcodeUsername },
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com',
        }
      });

      const data = response.data.data;
      if (data && data.matchedUser) {
        const ac: AcSubmission[] = data.matchedUser.submitStats.acSubmissionNum;
        stats.leetcode.totalSolved = ac.find((i) => i.difficulty === 'All')?.count || 0;
        stats.leetcode.easy = ac.find((i) => i.difficulty === 'Easy')?.count || 0;
        stats.leetcode.medium = ac.find((i) => i.difficulty === 'Medium')?.count || 0;
        stats.leetcode.hard = ac.find((i) => i.difficulty === 'Hard')?.count || 0;
        stats.leetcode.ranking = data.matchedUser.profile?.ranking || 0;
        stats.leetcode.solved = stats.leetcode.totalSolved; // Alias
      }
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
    }
  }

  // Fetch CodeChef Data (Scraping)
  if (codechefUsername) {
    try {
      // Note: CodeChef is aggressive with blocking. This is a best-effort simple scrape.
      // In a production env, you might need a headless browser or a dedicated scraping API.
      const response = await axios.get(`https://www.codechef.com/users/${codechefUsername}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const html = response.data;
      
      // Regex to find rating
      const ratingMatch = html.match(/<div class="rating-number">(\d+)<\/div>/);
      if (ratingMatch && ratingMatch[1]) {
        stats.codechef.rating = parseInt(ratingMatch[1], 10);
      }

      // Regex to find stars (e.g., "3★")
      const starMatch = html.match(/<span class="rating">(.+?)<\/span>/);
      if (starMatch && starMatch[1]) {
        stats.codechef.stars = starMatch[1].trim();
      }
      
      // Regex for Global Rank
      const rankMatch = html.match(/<strong>Global Rank:<\/strong>\s*(\d+)/);
      if (rankMatch && rankMatch[1]) {
        stats.codechef.globalRank = parseInt(rankMatch[1], 10);
      }

      // Regex for Fully Solved Problems
      const solvedMatch = html.match(/<h5>Fully Solved \((\d+)\)<\/h5>/);
      if (solvedMatch && solvedMatch[1]) {
        stats.codechef.solved = parseInt(solvedMatch[1], 10);
      }

    } catch (error) {
      console.error('Error fetching CodeChef data:', error);
    }
  }

  // Fetch HackerRank Data
  if (hackerrankUsername) {
    try {
      // Using HackerRank's undocumented internal API
      const response = await axios.get(`https://www.hackerrank.com/rest/hackers/${hackerrankUsername}`, {
        headers: {
           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const model = response.data.model;
      if (model) {
        stats.hackerrank.solved = model.solved_problems_count || 0;
        stats.hackerrank.points = Math.round(model.total_points || 0);
        
        const badgesResponse = await axios.get(`https://www.hackerrank.com/rest/hackers/${hackerrankUsername}/badges`, {
           headers: {
             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
           }
        });

        const badges = badgesResponse.data.models;
        if (badges) {
            stats.hackerrank.badges.gold = badges.filter((b: any) => b.stars === 5 || b.level === 3).length; // Approximation
            stats.hackerrank.badges.silver = badges.filter((b: any) => b.stars >= 3 && b.stars < 5).length;
            stats.hackerrank.badges.bronze = badges.filter((b: any) => b.stars < 3).length;
            
            // Refined logic: HackerRank badges usually have a 'stars' count. 5 stars is Gold, etc.
            // Let's iterate and count specifically.
             let gold = 0, silver = 0, bronze = 0;
             badges.forEach((b: any) => {
                 // star_rating is usually 0-5 or 0-6.
                 // This logic varies, but generally:
                 if (b.stars === 5 || b.stars === 6) gold++;
                 else if (b.stars === 3 || b.stars === 4) silver++;
                 else if (b.stars > 0) bronze++;
             });
             stats.hackerrank.badges = { gold, silver, bronze };
        }
      }

    } catch (error) {
       console.error('Error fetching HackerRank data:', error);
    }
  }

  return NextResponse.json(stats);
}
