// Import Packages
const Users = require('../models/users')

const addNewSkillToUser = async(user, skill) => {
    // attribute a new skill to a user givev his id
    // the skill object is like: {topic: 'bio', score: '10'}
    console.log('\nUpdating user skill')
    console.log('user: ', user.name)
    console.log('skill: ', skill)


    let matchSkill = user.skills.find(s => s.topic == skill.topic)
    console.log('matchSkill: ', matchSkill)
    if (!matchSkill) {
        console.log('\nskill is new, adding to user')
        user.skills.push(skill)
        await Users.findByIdAndUpdate(user._id, user, { new: true })
    } else {
        console.log('user has already this skill')
    }
}
module.exports = { addNewSkillToUser }