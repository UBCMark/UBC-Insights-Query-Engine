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

    // performQuery(query: any): Promise<InsightResponse> {
    //     let sample:any[]=[ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
    //         { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
    //         { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
    //         { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
    //         { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
    //         { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
    //         { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
    //         { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
    //         { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
    //         { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
    //         { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
    //         { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
    //         { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
    //         { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
    //         { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
    //         { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
    //         { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
    //         { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
    //         { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
    //         { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
    //         { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
    //         { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
    //         { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
    //         { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
    //         { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
    //         { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
    //         { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
    //         { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
    //         { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
    //         { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
    //         { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
    //         { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
    //         { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
    //         { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
    //         { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
    //         { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
    //         { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
    //         { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
    //         { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
    //         { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
    //         { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
    //         { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ];
    //     return new Promise(function (fulfill, reject) {
    //         //var result = {"result": Array<any>()};
    //         var r = <InsightResponse>{};
    //         r.code = 1123
    //         var object = {
    //             result: new Array(),
    //         }
    //         r.body = object
    //         object["result"].push(sample[2])
    //         object["result"].push(sample[10])
    //         const allowed = ['courses_id']
    //         var raw = {courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33};
    //
    //         const filtered = Object.keys(raw)
    //             .filter( key => allowed.includes(key))
    //             .reduce((obj, key) => {
    //                 (<any>obj)[key] = (<any>raw)[key];
    //                 return obj;
    //             }, {});
    //         console.log(filtered)
    //         console.log(r.body)
    //         if (2 > 1) {
    //             reject("rejected!");
    //         }
    //         fulfill(r)
    //     })
    // }

    performQuery(query: any): Promise<InsightResponse> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            let dataset: any = {};
            let id = "course"
            let result: any[] = []
            dataset[id] = JSON.parse(fs.readFileSync(id))


            let where = query["WHERE"]
            let options = query["OPTIONS"]
            for (let data of dataset[id]) {
                if (that.parser(where, data)){
                    result.push(data)
                }
            }
            let filtereds: any[] = []
            let keysForOpt = Object.keys(options)
            const allowed = options["COLUMNS"]
            let sortOn = options["ORDER"] // string

            for (let raw of result) {
                const filtered = Object.keys(raw)
                    .filter(key => allowed.includes(key))
                    .reduce((obj, key) => {
                        (<any>obj)[key] = (<any>raw)[key];
                        return obj;
                    }, {});
                filtereds.push(filtered)
            }

            filtereds.sort(function (a, b) {
                return a[sortOn] - b[sortOn];
            });

            // var r = <InsightResponse>{};
            // r.code = 200
            // var object = {
            //     result: filtereds
            // }
            // r.body = object
            fulfill({code:200, body:{result: filtereds}})

        })
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
