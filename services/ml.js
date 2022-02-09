const getTopics = (text, n_topics = 1, n_terms = 5) => {
    // this functions extracts terms to identify topics,
    // for the moment we use the terms as topics,
    //  we will adjust it in the future
    var lda = require('lda');

    // Extract sentences.
    var documents = text.match(/[^\.!\?]+[\.!\?]+/g);

    // Run LDA to get terms for n_topics (n_terms each).
    var result = lda(documents, n_topics, n_terms);

    console.log(result)
}

// module.exports = { funct1, funct2 }
module.exports = { getTopics }