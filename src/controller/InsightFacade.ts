/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";
var fs  = require('fs');
import Log from "../Util";
var fs = require("fs");

var JSZip = require("jszip");

let jsz = require("jszip");


interface MyObj{
    [key:string]: string | number;
    courses_dept: string;
    courses_id: string;
    courses_avg: number;
    courses_instructor: string;
    courses_title: string;
    courses_pass: number;
    courses_fail: number;
    courses_audit: number;
    courses_uuid: number;
}

interface retQuery{
    [key:string]: string | any;
    options: any;
}

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    helper(obj:any):boolean{
        try{
            JSON.parse(obj);
            return true;
        }catch(err){
            return false;}
    };

    addDataset(id: string, content: string): Promise<InsightResponse> {
        let that = this;
        return new Promise(function (fulfill, reject) {

            let insight: InsightResponse = {
                code: null,
                body: {}
            };

            if(id!=="courses"){
                insight.code = 400;
                insight.body = {"error": "not a course"};
                return reject(insight);
            }

            if(fs.existsSync(id)){
                insight.code = 201;
                insight.body = {"success": "exist"};

            }else{
                insight.code = 204;
                insight.body = {"success": "not exist"};

            }

            // process the content (ie getting the info you want)
            // store it into data structure
            // save data structure to disk (using fs.writeFile)

            jsz.loadAsync(content, {'base64': true}).then(function(data:any){ // data is zipObject

                let listPromiseFiles:any[] = [];

                data.forEach(function(r:any,f:any){

                    listPromiseFiles.push(f.async("string"));
                    });

                let listFiles:any[]=[];
                Promise.all(listPromiseFiles).then(function(filedata){
                    for(let eachIndex in filedata){
                        if (that.helper(filedata[eachIndex])) {

                            try {
                                var each = JSON.parse(filedata[eachIndex]);
                            } catch (err) {
                                each = filedata[eachIndex];
                            }

                            if (typeof each === 'object') {
                                for (let c of each['result']) {

                                    if (c.length != 0) {
                                        let newObj: any = {};

                                        newObj[id + "_dept"] = c["Subject"];
                                        newObj[id + "_id"] = c["Course"];
                                        newObj[id + "_avg"] = c["Avg"];
                                        newObj[id + "_instructor"] = c["Professor"];
                                        newObj[id + "_title"] = c["Title"];
                                        newObj[id + "_pass"] = c["Pass"];
                                        newObj[id + "_fail"] = c["Fail"];
                                        newObj[id + "_audit"] = c["Audit"];
                                        newObj[id + "_uuid"] = c["id"];

                                        listFiles.push(newObj);

                                    }
                                }
                            }
                        }
                    }

                    let xyz = JSON.stringify(listFiles);
                        fs.writeFile(id, xyz, (fileerr: any, filedata: any) => {

                            if (fileerr) {
                                insight.code = 400;
                                insight.body = {"error": "can't write the content to disk"};
                                return reject(insight);
                            }

                            fulfill(insight);
                        });
                }).catch(function(perr:any){
                    insight.code = 400;
                    insight.body = {"error": "can't write the content to disk"};
                    reject(insight);
                });

            }).catch(function(e:any){
                insight.code = 400;
                insight.body = {"error": "can't write the content to disk"};
                reject(insight);
            });
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {

        let retInsight:InsightResponse={
            code:null,
            body:{}
        };

        return new Promise(function (fulfill, reject) {

            if(id!=="courses"){
                retInsight.code = 404;
                return reject(retInsight);
            }
            if(fs.existsSync(id)) {
                fs.unlinkSync(id);
                retInsight.code = 204;
                fulfill(retInsight);
            }else{
                retInsight.code = 404;
                reject(retInsight);
            }
        })
    }

    performQuery(query: any): Promise<InsightResponse> {
        let that = this;

        return new Promise(function (fulfill, reject) {
            try {
                that.checkValidity(query)
            } catch(exception) {
                reject({code: 400, body: {"error": "invalid query"}});
            }

            // try {
                let dataset: any = {};
                let id = "courses~HEAD"
                let result: any[] = []
                try {
                    dataset[id] = JSON.parse(fs.readFileSync("cpsc310_team70/"+id))
                } catch (err) {
                    reject({code: 424, body: {"error": "missing dataset"}})
                }


                let where = query["WHERE"]
                let options = query["OPTIONS"]
                for (let data of dataset[id]) {
                    if (that.parser(where, data)) {
                        result.push(data)
                    }
                }
                let filtereds: any[] = []
                let keysForOpt = Object.keys(options)
                const allowed = options["COLUMNS"]

                for (let raw of result) {
                    const filtered = Object.keys(raw)
                        .filter(key => allowed.includes(key))
                        .reduce((obj, key) => {
                            (<any>obj)[key] = (<any>raw)[key];
                            return obj;
                        }, {});
                    filtereds.push(filtered)
                }

                if (keysForOpt.includes("ORDER")) {
                    let sortOn = options["ORDER"] // string
                    filtereds.sort(function (a, b) {
                        return a[sortOn] - b[sortOn]
                    });
                }

                fulfill({code: 200, body: {result: filtereds}})
            // } catch (err){
            //     console.log("shouldn't have been here")
            // }

        })
    }

    checkValidity(query: any): boolean {
        let that = this;

        if (query===null || query === {}) throw false;
        let keys = Object.keys(query)
        if (keys.length !== 2 ||(!keys.includes("WHERE"))||(!keys.includes("OPTIONS"))) throw false;


        let obj1 = query["WHERE"]
        let obj2 = query[keys[1]]
        let conds = Object.keys(obj2)
        if (!conds.includes("COLUMNS")) throw false
        if ((!conds.includes("ORDER")) && conds.length !== 1) throw false
        if ((conds.includes("ORDER")) && conds.length !== 2) throw false
        let colItems = obj2["COLUMNS"]

        if ((!Array.isArray(colItems)) || colItems.length === 0) throw false
        for (let i of colItems) {
            if (!that.isKey(i)) {
                throw false
            }
        }
        if (conds.includes("ORDER")) {
            let order = obj2["ORDER"]
            if (!that.isKey(order)) throw false
            if (!colItems.includes(order)) throw false
        }

        // now OPTIONS is all good
        if (!that.isValidFilter(obj1)) throw false;

        return true
    }

    isKey(item: any): boolean {
        let that = this;
        return that.ismKey(item) || that.issKey(item)
    }

    ismKey(k: any): boolean {
        if (typeof k !== 'string') return false
        return (k === 'courses_avg')||(k === 'courses_pass')||(k === 'courses_fail')||(k === 'courses_audit')
    }

    issKey(k: any): boolean {
        if (typeof k !== 'string') return false
        return (k === 'courses_dept')||(k === 'courses_id')||(k === 'courses_instructor')||(k === 'courses_title')||(k=== 'courses_uuid')
    }

    isValidFilter(obj:any):boolean {
        let that = this
            if (!(obj instanceof Object)) {
                return false;
            }
        if (Object.keys(obj).length != 1) return false
        let key = Object.keys(obj)[0]

        if (key === "AND" || key === "OR") {
            let objInside = obj[key]
            if ((!Array.isArray(objInside)) || objInside.length <2) return false
            for (let i of objInside) {
                if (!this.isValidFilter(i)) return false
            }
            return true
        }
        if (key === "GT" || key === "LT" || key === "EQ") {
            let objInside = obj[key]
                if (!(objInside instanceof Object))
                    return false
            let keys = Object.keys(objInside)
            if (keys.length !== 1) return false
            return that.ismKey(keys[0]) && (typeof objInside[keys[0]] == 'number')
        }
        if (key === "NOT") {
            return this.isValidFilter(obj[key])
        }
        if (key === "IS") {
            let objInside = obj[key]
            if (!(objInside instanceof Object)) return false
            let keys = Object.keys(objInside)
            if (keys.length!==1) return false
            return that.issKey(keys[0]) && (typeof objInside[keys[0]] == 'string')
        }
    }

    parser(filter: any, data: any) : boolean {
        let key = Object.keys(filter)[0]
        let obj = filter[key]   // may be object or array

        if (key == "GT") {
            let field = Object.keys(obj)[0]
            let val = obj[field]
            return data[field] > val
        }
        if (key == "LT") {
            let field = Object.keys(obj)[0]
            let val = obj[field]
            return data[field] < val
        }
        if (key == "EQ") {
            let field = Object.keys(obj)[0]
            let val = obj[field]
            return data[field] == val
        }
        if (key == "IS") {
            let field = Object.keys(obj)[0]
            let val = obj[field]
            if (val.length === 0) return false
            if (val.length === 1 && val[0] === "*") return false
            if (val.length === 2 && val[0] === "*" && val[1] === "*") return true

                if (val[0] === "*" && val[val.length - 1] === "*") {
                    let subString = val.substring(1,val.length-1)
                    return data[field].indexOf(subString) >= 0
                }
                if (val[0] === "*" && val[val.length - 1] !== "*") {
                    let subString = val.substring(1,val.length)
                    if (data[field].length < subString.length) return false
                    return data[field].indexOf(subString) === data[field].length - subString.length
                }
                if (val[0] !== "*" && val[val.length - 1] === "*") {
                    let subString = val.substring(0,val.length-1)
                    return data[field].indexOf(subString) === 0
            }
            return data[field]  === val
        }
        else {
            if (key == "NOT") {
                return !this.parser(obj, data)
            }
            if (key == "OR") {
                let result = this.parser(obj[0], data)
                for (let i = 1; i < obj.length; i++){
                    result = result || this.parser(obj[i], data)
                }
                return result
            }
            if (key == "AND") {
                let result = this.parser(obj[0], data)
                for (let i = 1; i < obj.length; i++){
                    result = result && this.parser(obj[i], data)
                }
                return result
            }
        }
    }
}
