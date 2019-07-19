const team = {
  members: [
    {
      id: 1,
      name: 'Tolulope',
      hasLed: false,
      hasQA: false
    },
    {
      id: 2,
      name: 'Odunayo',
      hasLed: false,
      hasQA: false
    },
    {
      id: 3,
      name: 'Victor',
      hasLed: false,
      hasQA: false
    },
    {
      id: 4,
      name: 'Samuel',
      hasLed: false,
      hasQA: false
    },
    {
      id: 5,
      name: 'Emeka',
      hasLed: false,
      hasQA: false
    },
    {
      id: 6,
      name: 'Pelumi',
      hasLed: false,
      hasQA: false
    },
    {
      id: 7,
      name: 'Tunji',
      hasLed: false,
      hasQA: false
    }
  ],
  weeks: []
};

const generateRandomUser = ({ members }) => {
  const randomIndex = Math.floor(Math.random() * members.length);
  const randomUser = members[randomIndex];
  return randomUser;
};

const leaderAndQA = team => {
  if (team.weeks.length >= team.members.length) {
    team.members.forEach(member => {
      member.hasLed = false;
      member.hasQA = false;
    });
  }
  const lastWeek = team.weeks.length > 0 ? team.weeks[team.weeks.length - 1].week : 0;
  let randomUser = generateRandomUser(team);
  let teamLead;
  let QA;
  if (!randomUser.hasLed) {
    teamLead = randomUser.name;
    const randomUser2 = generateRandomUser(team);
    if (randomUser.hasQA || randomUser.id === randomUser2.id) {
      return leaderAndQA(team);
    }
    QA = randomUser2.name;
    randomUser2.hasQA = true;
    randomUser.hasLed = true;
    team.weeks.push({ week: lastWeek + 1, teamLead, QA });
    return { teamLead, QA };
  }

  if (randomUser.hasLed && randomUser.hasQA) {
    return leaderAndQA(team);
  }
};

console.log(leaderAndQA(team));
console.table(team.members);
console.table(team.weeks);
