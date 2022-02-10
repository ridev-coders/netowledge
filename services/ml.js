const getTopics = (text, n_topics = 1, n_terms = 5) => {
    // this functions extracts terms to identify topics,
    // for the moment we use the terms as topics,
    //  we will adjust it in the future
    console.log('text is: ', text)
    var lda = require('lda');

    // Extract sentences.
    var documents = text.match(/[^\.!\?]+[\.!\?]+/g) ? text.match(/[^\.!\?]+[\.!\?]+/g) : [text]
    console.log(documents)

    // Run LDA to get terms for n_topics (n_terms each).
    var result = lda(documents, n_topics, n_terms);

    // use differents labels and using % prob
    result[0].map(t => {
        t['topic'] = t['term']
        t['pertinence'] = t['probability']
        delete t['term']
        delete t['probability']
        t.pertinence = Math.ceil(t.pertinence * 100)
            // t.pertinence *= Math.ceil(t.pertinence * 100)
    })

    // return the values
    console.log('result is: ', result)
    return result
}

const getTopicsTitles = (topics) => {
    // returns array with labels and values
    console.log('extractin labels from: ', topics)
    let titles = topics.map(t => t.topic)
        // let values = terms[0].map(t => t.probability)
    console.log('titles: ', titles)
    return titles
}

module.exports = { getTopics, getTopicsTitles }