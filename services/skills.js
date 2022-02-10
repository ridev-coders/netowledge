// Import Packages
const Users = require('../models/users')

const addNewSkillToUser = async(id, skill) => {
    // attribute a new skill to a user givev his id
    // the skill object is like: {topic: 'bio', score: '10'}
    console.log('updating user skill')
        // find user by id
    let user = await Users.findById(id)
    console.log('user: ', user)
    console.log('skill: ', skill)

    newSkill = true
        // TODO: check if skill is new for user
    if (newSkill) {
        user.skills.push(skill)
        user.save()
    } else {
        console.log('user has already this skill')
    }
}
module.exports = { addNewSkillToUser }