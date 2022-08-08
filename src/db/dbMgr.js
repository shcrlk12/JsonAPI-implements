
class DbMgr{
    constructor(id, type){
        this.id = id;
        this.type = type;
        this.knex = require('./config/Dbconfig.js')('mysql');
    }

    select(){ // getAttribute(title)
        //1. select all 로 가져와서 attribute 파싱
        this.knex.select('*').from(this.type).then((row)=>{
            console.log(row)

            
        })
    }

    getResourceOjbectIdPair(table, type){
        let data = [];
        let idPair = {};

        if(type.match('manyToOne')){
            return this.knex.select(`${table}Id`).from(this.type)
            .then((rows)=>{
                idPair.type = table;

                for(const row of rows){
                    idPair.id = row[`${table}Id`];
                    data.push({...idPair});
                }

                return data;
            })
        } else if(type.match('oneToMany')){
            return this.knex.select('id').from(table)
            .where(`${this.type}Id`, this.id)
            .then((rows)=>{
                idPair.type = table;

                for(const row of rows){
                    idPair.id = row.id;
                    data.push({...idPair});
                }

                return data;
            })
        }
    }

    getAttributes(){
        return this.knex.select('*').from(this.type).then((row)=>{
            let attributes = {};

            for (const property in row[0]) {
                if(!(property.match('id') || property.endsWith('Id') || property.match('time')))
                attributes[property] = row[0][property];
              }
              return attributes;
        })
    }

    async getRelationships(){
        let relationship = require('../db/config/relationship');
        let relationships = {};
        let NtoM = ['manyToOne', 'oneToMany'];

        for(const value of NtoM){
            for(const property in relationship[this.type][value]){
                relationships[property] = {};
                relationships[property]['links'] = {};
                //1. set links
                relationships[property]['links']['self'] = relationship[property].relationshipsUrl;
                relationships[property]['links']['related'] = relationship[property].relatedUrl;

                //2. set data
                relationships[property].data = await this.getResourceOjbectIdPair(relationship[this.type][value][property], value);
            }
        }
        return relationships;

    }

    
}


module.exports = (id, type) => (new DbMgr(id, type))