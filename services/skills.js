// Import Packages
const Users = require('../models/users')
const Storms = require('../models/storms')
// Import Services
const elo = require('../services/elo')

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

const getTopicScore = (topics, title) => {
    // Given an array of topics:[]
    // [{topic: 'BIO', score: 1600}, {topic: 'MED', score: 1200}]
    // returns the score of the topic
    foundTopic = topics.find(t => t.topic === title)
    if (foundTopic) {
        return foundTopic.score
    }
}

const updateStormCredibility = async (thunder) => {
    // recalculate credibility of storm topics
    // for each topic of the storm recalculate
    console.log('\nUpdating storm credibility:')
    thunder.storm.ratings.forEach((r, i) => {
        //look if the the thunder impacts this topic
        let score = getTopicScore(thunder.freezed_skills, r.topic)
        if (score){
            thunder_topic_score = score
            storm_topic_score = r.credibility
            points = elo.getStormWinPoints(thunder_topic_score, storm_topic_score)
            // weight point with thunder trust_rate and storm topic pertincence
            weighted_points = points*r.pertinence/100*thunder.trust_rate/3
            // update credibility
            r.credibility = r.credibility + weighted_points
            console.log('topic thunder/storm: ', r.topic)
            console.log('thunder topic score: ', thunder_topic_score)
            console.log('storm topic score (credibility): ', storm_topic_score)
            console.log('points: ', points)
            console.log('weighted points: ', weighted_points)
            console.log('new credibility: ', r.credibility)
        }
    })
    // update storm 
    let storm = await Storms.findByIdAndUpdate(thunder.storm._id, thunder.storm, {new: true})
    if (storm) {console.log('storm credibility updated')}
}

module.exports = { addNewSkillToUser, getTopicScore, updateStormCredibility }