import Service from '@ember/service';

export default class LeaderboardService extends Service {
  async getLeaderboards(user) {
    let groups = await user.groups;
    // groups = groups.slice(); // Removed to match user preference
    let groupInfo = groups.map((group) => ({ id: group.id, name: group.name }));

    let promises = groupInfo.map(async ({ id, name }) => {
      try {
        let response = await fetch(`/groups/${id}/leaderboard`);
        if (!response.ok) {
          console.error(`Leaderboard fetch failed for group ${id}: ${response.status} ${response.statusText}`);
          return null;
        }

        let json = await response.json();
        let data = json.data;

        if (!data || !Array.isArray(data)) {
          console.error(`Invalid leaderboard data for group ${id}`, data);
          return null;
        }

        let ranking = "No ranking available";
        let fullList = [];
        const userId = user.id;
        const userName = user.name;
        const userAccountName = user.accountName;

        fullList = data.map((entry) => {
          const attr = entry.attributes;
          let isMe = false;

          if (userId && userId !== 'me' && attr.userUri) {
            isMe = attr.userUri.includes(userId);
          }

          if (!isMe && attr.userName) {
            isMe =
              attr.userName === userName || attr.userName === userAccountName;
          }

          if (isMe) {
            ranking = attr.rank;
          }

          return {
            id: entry.id,
            name: attr.userName,
            rank: attr.rank,
            score: attr.count,
            isMe: isMe,
          };
        });

        return {
          groupId: id,
          groupName: name,
          ranking: ranking,
          fullList: fullList,
          topThree: fullList.slice(0, 3),
        };
      } catch (error) {
        console.error(`Error loading leaderboard for group ${id}`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter(item => item !== null);
  }
}
