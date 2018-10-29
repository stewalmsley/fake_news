export const cropArticleBodies = articles => {
    return articles.map(article => {
        const body = article.body.split(' ').slice(0, 50).join(' ');
        return {...article, body};
    })
}

export const sortArticles = articles => {
    return articles.sort((article1, article2) => {
        return article2.commentCount - article1.commentCount
    })
}