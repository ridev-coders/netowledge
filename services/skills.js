// Import Packages
const Users = require('../models/users')
const Storms = require('../models/storms')
// Import Services
const elo = require('../services/elo')

const addNewSkillToUser = async(user, skill) => {
    // attribute a new skill to a given user
    // the skill object is like: {topic: 'bio', score: '10'}
    console.log('\nCreating new user skill')
    console.log('user: ', user.email)
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

const updateUserSkillScore = (user, topic, score_variation) => {
    // attribute a new skill to a given user
    // the skill object is like: {topic: 'bio', score: '10'}
    console.log('\nUpdating user skill')
    console.log('user: ', user.email)
    console.log('skill: ', topic)
    console.log('score variation:', score_variation)
    // find the skill
    let matchSkill = user.skills.find(s => s.topic == topic)
    let topic_index = getTopicIndex(user.skills, topic)
    console.log('index: ', topic_index)
    if (topic_index) {
        console.log('\nskill found, now update')
        // variate user skill score
        user.topics = variateTopicsScore(user.skills, topic, score_variation)
        // return user
    } else {
        console.log('user doesn not have this skill')
    }
    return user
}
const updateTopicsScore = (topics, title, score) => {
    // Given an array of topics:[]
    // [{topic: 'BIO', score: 1600}, {topic: 'MED', score: 1200}]
    // the title of the topic and the new score 
    // it updtates the score returning the array of topics
    index = getTopicIndex(topics, title)
    topics[index].score = score
    return topics
}

const variateTopicsScore = (topics, title, score_variation) => {
    // Given an array of topics:[]
    // [{topic: 'BIO', score: 1600}, {topic: 'MED', score: 1200}]
    // the title of the topic and the new score 
    // it updtates the score returning the array of topics
    index = getTopicIndex(topics, title)
    console.log('%s -> %s', topics[index].score, topics[index].score + score_variation)
    topics[index].score += score_variation
    return topics
}

const getTopicIndex = (topics, title) => {
    // Given an array of topics:[]
    // [{topic: 'BIO', score: 1600}, {topic: 'MED', score: 1200}]
    // returns the index of the title 
    let i = 0
    let j
    while (typeof j === 'undefined') {
        if (topics[i].topic == title) {j = i}
        i++
    }
    return j
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

const updateStormCredibilityAndUserSkillsScore = async (thunder) => {
    console.log('\nUpdating storm credibility:')
    let storm_author = await Users.findById(thunder.storm.author._id).lean()
    console.log('storm author: ', storm_author.email)
    // recalculate credibility of storm topics
    // for each topic of the storm recalculate
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
            // update storm author skill score
            storm_author = updateUserSkillScore(storm_author, r.topic, weighted_points)
        }
    })
    // update storm in db (topics credibility)
    let storm = await Storms.findByIdAndUpdate(thunder.storm._id, thunder.storm, {new: true})
    if (storm) {console.log('storm topics credibility updated')}
    // update user in db (skills score)
    let updated_storm_author = await Users.findByIdAndUpdate(storm_author._id, storm_author, {new: true} )
    if (updated_storm_author) {console.log('user skills score updated')}
    
}


module.exports = { addNewSkillToUser, getTopicScore, updateStormCredibilityAndUserSkillsScore, updateUserSkillScore }