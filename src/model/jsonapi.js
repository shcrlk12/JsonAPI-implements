class JsonApi{
    constructor(){
    }

    set setData(value){
        this.data = value
    }

    set setErrors(value){
        this.errors = value
    }

    set setMeta(value){
        this.meta = value
    }

    set setJsonApi(value){
        this.jsonapi = value
    }

    set setLinks(value){
        this.links = value
    }

    set setIncluded(value){
        this.included = value
    }

    async ok(id, type){
        let DbMgr = require('../db/dbMgr.js')(id, type)
       
        //1. data
        let data = [];
        let element = new ResourceObject(id, type);

        //1-1. set attributes
        element.setAttributes = await DbMgr.getAttributes();
        
        //1-2. set links
        element.setlinks = this.getLink(false, type);

        //1-3. set relationships
        element.setRelationships = await DbMgr.getRelationships();

        data.push({...element})
        console.log("----------data----------")
        console.log(data)

        //1-4. set data
        this.setData = data;

        //2. included
        let included = [];

        for(const property in element.relationships){
            const data = element.relationships[property].data;
            for(const elem of data){
                const type = property;
                const tableName = elem.type;
                const id = elem.id;

                DbMgr = require('../db/dbMgr.js')(id, tableName);

                console.log("type : " + type + " id : " + id + ' table : ' + tableName);
                element = new ResourceObject(id, type);

                element.setAttributes =  await DbMgr.getAttributes();

                element.setlinks = this.getLink(false, type);

                element.setRelationships = await DbMgr.getRelationships();
               
                included.push({...element})
            }
        }
        
        this.setIncluded = included;
        console.log("----------included----------")
        console.log(included)
    }

    getLink(isRelationship, type){
        let relationship = require('../db/config/relationship')
        let links = {};

        if(isRelationship == true){
            links.self = relationship[type].relationshipsUrl;
            links.related = relationship[type].relatedUrl;
        }
        else{
            links.self = relationship[type].relatedUrl;
        } 
        return links;
    }
    
}

class RelationshipsObject{
    constructor(id, type){
        this.id = id;
        this.type = type;
    }
}

class ResourceObject extends RelationshipsObject{
    constructor(id, type){
        super(id, type)
    }
    set setAttributes(value){
        this.attributes = value;
    }

    set setlinks(value){
        this.links = value;
    }

    set setRelationships(value){
        this.relationships = value;
    }
}

class Attributes{

}

class Links{
    constructor(self, related){
        this.self = self;
        this.related = related;
    }
}


module.exports = new JsonApi();

