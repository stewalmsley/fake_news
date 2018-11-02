import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const cropArticleOrCommentBodies = (arr, words) => {
    return arr.map(text => {
        const body = text.body.split(' ').slice(0, words).join(' ');
        return {...text, body};
    })
}

export const sortArticlesOrComments = (arr, sortOn) => {
    if (sortOn === "created_at") { 
        return [...arr].sort((text1, text2) => {
            const diff = dayjs(text1.created_at).diff(dayjs(text2.created_at), 'days')
            console.log(diff)
            return diff > 0 ? -1 : 1
        })
    }
    return [...arr].sort((text1, text2) => {
        return text2[sortOn] - text1[sortOn]
    })
}

export const addKeysToArticles = (articles => {
    return articles.map(article => {
        const topic = createTopicKey(article);
        const dayjsDate = convertTime(article)
        const croppedBody = addCroppedBody(article.body, 40);
        return {...article, topic, croppedBody, dayjsDate}
    })
})

export const addKeysToComments = (comments => {
    return comments.map(comment => {
        const dayjsDate = convertTime(comment)
        const croppedBody = addCroppedBody(comment.body, 20)
        return {...comment, croppedBody, dayjsDate}
    })
})

export const addCroppedBody = ((str, n) => {
    let croppedBody = str.split(' ').slice(0, n).join(' ');
    if (croppedBody.length < str.length) croppedBody += '...'
    return croppedBody
})

export const createTopicKey = (article => {
    return article.belongs_to[0].toUpperCase() + article.belongs_to.substring(1);
})

export const convertTime = (articleOrComment => {
    return dayjs(articleOrComment.created_at).fromNow()
})

export const trendingAuthors = (authors) => {
    return authors.sort((author1, author2) => author2.receivedCommentCount - 
    author1.receivedCommentCount).slice(0, 3)
}
