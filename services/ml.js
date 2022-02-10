const getTerms = (text, n_topics = 1, n_terms = 5) => {
    // this functions extracts terms to identify topics,
    // for the moment we use the terms as topics,
    //  we will adjust it in the future
    console.log('text is: ', text)
    var lda = require('lda');

    // Extract sentences.
    var documents = text.match(/[^\.!\?]+[\.!\?]+/g);

    // Run LDA to get terms for n_topics (n_terms each).
    var result = lda(documents, n_topics, n_terms);

    // return the values
    console.log('result is: ', result)
    return result
}

const getTopics = (text) => {
    // returns array with labels and values
    let terms = getTerms(text)
    console.log('terms:', terms)
    let labels = terms[0].map(t => t.term)
    let values = terms[0].map(t => t.probability)
    return [labels, values]
}

module.exports = { getTerms, getTopics }