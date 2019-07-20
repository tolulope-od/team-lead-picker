/* eslint-disable no-param-reassign */
export const generateRandomUser = members => {
  const randomIndex = Math.floor(Math.random() * members.length);
  const randomUser = members[randomIndex];
  return randomUser;
};

export const leaderAndQA = async (members, weeks, MembersTable, WeeksTable) => {
  try {
    if (weeks.length >= members.length) {
      members.forEach(async member => {
        await MembersTable.update(
          [`"hasBeenTL"=${false}, "hasBeenQA"=${false}`],
          [`"email"='${member.email}'`]
        );
        member.hasLed = false;
        member.hasQA = false;
      });
    }
    const randomUser = generateRandomUser(members);
    let teamLead;
    let QA;
    const randomUser2 = generateRandomUser(members);
    if (!randomUser.hasLed) {
      teamLead = randomUser;
      members.splice(members.indexOf(randomUser.id), 1);
    }
    if (!randomUser2.hasQA) {
      QA = randomUser2;
      members.splice(members.indexOf(randomUser2.id), 1);
    }

    if (randomUser.id === randomUser2.id) {
      return leaderAndQA(members, weeks, MembersTable, WeeksTable);
    }

    if (randomUser.hasLed && randomUser.hasQA) {
      members.splice(members.indexOf(randomUser.id), 1);
      return leaderAndQA(members, weeks, MembersTable, WeeksTable);
    }
    await MembersTable.update([`"hasBeenQA"=${true}`], [`"email"='${QA.email}'`]);
    await MembersTable.update([`"hasBeenTL"=${true}`], [`"email"='${teamLead.email}'`]);
    randomUser2.hasQA = true;
    randomUser.hasLed = true;
    const newLeaders = await WeeksTable.create(
      ['"tL"', '"qA"', '"teamLead"', '"qualityAssurance"'],
      [`${teamLead.id}, ${QA.id}, '${teamLead.name}', '${QA.name}'`]
    );
    return newLeaders;
  } catch (err) {
    return err;
  }
};
