export const cropArticleOrCommentBodies = (arr, words) => {
    return arr.map(text => {
        const body = text.body.split(' ').slice(0, words).join(' ');
        return {...text, body};
    })
}

export const sortArticlesOrComments = (arr, sortOn) => {
    return arr.sort((text1, text2) => {
        return text2[sortOn] - text1[sortOn]
    })
}

export const addKeysToArticles = (articles => {
    return articles.map(article => {
        const topic = createTopicKey(article);
        const croppedBody = addCroppedBody(article.body, 40);
        return {...article, topic, croppedBody}
    })
})

export const addKeysToComments = (comments => {
    return comments.map(comment => {
        const croppedBody = addCroppedBody(comment.body, 20)
        return {...comment, croppedBody}
    })
})

const addCroppedBody = ((str, n) => {
    let croppedBody = str.split(' ').slice(0, n).join(' ');
    if (croppedBody.length < str.length) croppedBody += '...'
    return croppedBody
})

export const createTopicKey = (article => {
    return article.belongs_to[0].toUpperCase() + article.belongs_to.substring(1);
})
