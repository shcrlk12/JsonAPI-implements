const Relationship = {
    articles : {
        oneToOne: {

        },
        oneToMany : {
            commnets : 'comments'
        },
        manyToOne : {
            author : 'people'
        },
        relatedUrl: 'http://example.com/articles/1',
        relationshipsUrl : 'http://example.com/articles/relationship/1'
    },
    commnets : {
        oneToOne: {

        },
        oneToMany : {
            
        },
        manyToOne : {
            articles : 'articles',
            author : 'people'
        },
        relatedUrl: 'http://example.com/articles/1/commnets',
        relationshipsUrl : 'http://example.com/articles/1/relationship/commnets'
    },
    author : {
        oneToOne: {

        },
        oneToMany : {
            articles : 'articles',
            commnets : 'commnets',
        },
        manyToOne : {
            
        },
        relatedUrl: 'http://example.com/articles/1/author',
        relationshipsUrl : 'http://example.com/articles/1/relationship/author'
    }
}

module.exports = Relationship;