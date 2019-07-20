import { Members, Weeks } from '../database';
import { generateRandomUser } from '../utils/index';

export default class Team {
  static async createWeekLeaders(req, res, next) {
    try {
      const weekCount = await Weeks.selectCount(['"week"']);
      const membersCount = await Members.selectCount(['"id"']);

      if (parseInt(weekCount[0].count, 10) % parseInt(membersCount[0].count, 10) === 0) {
        await Members.updateAllRows([`"hasBeenTL"=${false}, "hasBeenQA"=${false}`]);
      }
      const membersNotLed = await Members.select(['*'], [`"hasBeenTL"=${false}`]);
      const membersNotQA = await Members.select(['*'], [`"hasBeenQA"=${false}`]);
      const teamLead = generateRandomUser(membersNotLed);
      if (membersNotQA.some(member => member.id === teamLead.id)) {
        const index = membersNotQA.map(member => member.id).indexOf(teamLead.id);
        membersNotQA.splice(index, 1);
      }
      const teamQA = generateRandomUser(membersNotQA);
      await Members.update([`"hasBeenTL"=${true}`], [`"email"='${teamLead.email}'`]);
      await Members.update([`"hasBeenQA"=${true}`], [`"email"='${teamQA.email}'`]);
      const result = await Weeks.create(
        ['"tL"', '"qA"', '"teamLead"', '"qualityAssurance"'],
        [`${teamLead.id}, ${teamQA.id}, '${teamLead.name}', '${teamQA.name}'`]
      );
      return res.status(201).json({ status: 'success', data: result });
    } catch (err) {
      return next(err);
    }
  }

  static async selectAllWeekLeaders(req, res, next) {
    try {
      const allLeaders = await Weeks.selectAll(['*']);
      return res.status(200).json({ status: 'success', data: allLeaders });
    } catch (err) {
      return next(err);
    }
  }
}
