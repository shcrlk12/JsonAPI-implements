const Relationship = {
    articles : {
        oneToOne: {

        },
        oneToMany : {
            comments : 'comments'
        },
        manyToOne : {
            author : 'people'
        },
        relatedUrl: 'http://example.com/articles/1',
        relationshipsUrl : 'http://example.com/articles/relationship/1'
    },
    comments : {
        oneToOne: {

        },
        oneToMany : {
            
        },
        manyToOne : {
            articles : 'articles',
            author : 'people'
        },
        relatedUrl: 'http://example.com/articles/1/comments',
        relationshipsUrl : 'http://example.com/articles/1/relationship/comments'
    },
    author : {
        oneToOne: {

        },
        oneToMany : {
            articles : 'articles',
            comments : 'comments',
        },
        manyToOne : {
            
        },
        relatedUrl: 'http://example.com/articles/1/author',
        relationshipsUrl : 'http://example.com/articles/1/relationship/author'
    }
}

module.exports = Relationship;