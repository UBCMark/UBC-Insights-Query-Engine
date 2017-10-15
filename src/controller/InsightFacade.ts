/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";

import Log from "../Util";
var fs = require("fs");

var JSZip = require("jszip");

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
        return null
    }

    //
    //     let pArr:any[] = [];
    //     JSZip.loadAsync(content).then(function (zip: any) {
    //         console.log(zip)
    //         zip.forEach(function (r:any, f:any) {
    //             //console.log(f)
    //             console.log("aaaaaaaaaaa")
    //             pArr.push(f.async("string"));
    //             console.log("aaaaaaaaaaa")
    //         })
    //     }).catch(function (err:any) {
    //         console.log("WTF")
    //
    //     });
    //     Promise.all(pArr).then(function(result){
    //         console.log("Promise.all fulfilled!");
    //         console.log(pArr.length)
    //     }).catch(function(err) {
    //         console.log("Promise.all rejected from " + err);
    //     })
    //     return;
    //
    //
    // }
    //
    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }


    performQuery(query: any): Promise<InsightResponse> {
        let that = this;

        return new Promise(function (fulfill, reject) {
            try {
                that.checkValidity(query)
            } catch(exception) {
                reject({code: 400, body: {"error": "invalid query"}})
            }

            // try {
                let dataset: any = {};
                let id = "courses"
                let result: any[] = []
                try {
                    dataset[id] = JSON.parse(fs.readFileSync(id))
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
            return data[field]  == val
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
