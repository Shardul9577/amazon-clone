class ApiFeatures{
    constructor(query , queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex : this.queryStr.keyword ,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({...keyword})
        // console.log(this.query);

        return this ;
    }

    filter(){
        let copyQuery = {...this.queryStr}

        let removeFeild = ["keyword","page","limit"]

        removeFeild.forEach((key)=> delete copyQuery[key])

    // _______________________________________________________________________________

        let queryString = JSON.stringify(copyQuery)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g , (key)=> `$${key}`)

        this.query = this.query.find(JSON.parse(queryString))

        return this;

    }

    pagination(numOfPdt){
        let copyQuery = {...this.queryStr}

        let selectedPage = this.queryStr.page || 1

        let skipedPdt = numOfPdt * ( selectedPage - 1 )

        this.query = this.query.limit(numOfPdt).skip(skipedPdt)

        return this;
    }
}

module.exports = ApiFeatures