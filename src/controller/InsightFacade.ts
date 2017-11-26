/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";
var fs  = require('fs');
import Log from "../Util";
import keys = require("core-js/fn/array/keys");
var fs = require("fs");

var JSZip = require("jszip");

let jsz = require("jszip");
const parse5 = require('parse5');
import * as http from "http";
import {isUndefined} from "util";
const querystring = require('querystring');
let Decimal = require('decimal.js');


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

var dataset:any = {}
var TempInfo:any = {}
let count = 0;
let validBuildings:any = []
let groomsInfoList:any[] = [];
var gbulidings:any = {}



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

    htmlhelper(htmlobj:any):boolean{
        try{
            parse5.parse(htmlobj);
            return true;
        }catch(err){
            return false;
        }
    }


    htmlBuildInfoParse(html:any, hid:string):Promise<any>{

        return new Promise(function (fullfil,reject) {

        let retInsight:InsightResponse={
            code:null,
            body:{}
        };
        let that = this;
        var htmlResult = parse5.parse(html);

            let newObj: any = {};
            let flag = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1];
            if (!isUndefined(flag)) {
                newObj[hid + "_fullname"] = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3]  //section
                    .childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].value.trim();
                newObj[hid + "_address"] = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3]  //section
                    .childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value.trim();

//get the address in the rightformat
                var vaddress: string = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3]  //section
                    .childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value.trim();
            }else {
                newObj[hid + "_fullname"] = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[12].childNodes[1].childNodes[3]  //section
                    .childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].value.trim();
                newObj[hid + "_address"] = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[12].childNodes[1].childNodes[3]  //section
                    .childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value.trim();

//get the address in the rightformat
                var vaddress: string = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[12].childNodes[1].childNodes[3]  //section
                    .childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value.trim();
            }

            var addAddress:string = querystring.escape(vaddress);

            //pass the result into URL
            // let that = this;
            http.get('http://skaha.cs.ubc.ca:11316/api/v1/team70/' + addAddress, (res) => {

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {

                    // try {
                    let parsedData = JSON.parse(rawData);
                    newObj[hid + "_lat"] = parsedData["lat"];
                    newObj[hid + "_lon"] = parsedData["lon"];
                    TempInfo = newObj;
                    if (validBuildings.includes(TempInfo.rooms_fullname)) {
                        let flag = []
                        var tBody = []
                        let result:any =[]
                        try {
                            if (TempInfo[hid + "_fullname"] !== "The Leon and Thea Koerner University Centre") {
                                flag = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3]  //section
                                    .childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes
                            } else {
                                flag = htmlResult.childNodes[6].childNodes[3].childNodes[31].childNodes[12].childNodes[1].childNodes[3]  //section
                                    .childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes
                            }
                            tBody = flag
                            for (let i =1; i < tBody.length; i+=2) {
                                // let p = new Promise(function (f,r) {
                                let newObj: any = {};
                                htmlResult = tBody[i]
                                newObj[hid + "_fullname"] = TempInfo[hid + "_fullname"].trim();
                                newObj[hid + "_shortname"] = gbulidings[newObj[hid + "_fullname"]][hid + "_shortname"].trim(); //where to find?

                                newObj[hid + "_number"] = htmlResult.childNodes[1].childNodes[1].childNodes[0].value.trim();
                                newObj[hid + "_address"] = TempInfo[hid + "_address"].trim();
                                newObj[hid + "_seats"] = parseInt(htmlResult.childNodes[3].childNodes[0].value)
                                newObj[hid + "_furniture"] = htmlResult.childNodes[5].childNodes[0].value.trim();
                                newObj[hid + "_type"] = htmlResult.childNodes[7].childNodes[0].value.trim();
                                newObj[hid + "_name"] = (newObj[hid + "_shortname"] + "_" + newObj[hid + "_number"]).trim();
                                newObj[hid + "_lat"] = TempInfo[hid + "_lat"]
                                newObj[hid + "_lon"] = TempInfo[hid + "_lon"]
                                newObj[hid + "_href"] = htmlResult.childNodes[9].childNodes[1].attrs[0].value.trim();
                                result.push(newObj)
                                //})
                            }
                            fullfil(result)
                        } catch  (err) {
                            fullfil([])
                        }
                    } else {
                        fullfil([])
                    }
                    // } catch (e) {
                    //     reject(e)
                    //     console.error(e.message);
                    //   }

                });
            });

        })
    }


    addDataset(id: string, content: string): Promise<InsightResponse> {
        let that = this;
        // return new Promise(function (fulfill, reject) {


        let insight: InsightResponse = {
            code: null,
            body: {}
        };


        if (id !== "courses" && id !== "rooms") {
            return new Promise(function (fullfill, reject){
                insight.code = 400;
                insight.body = {"error": "not a course or room"};
                return reject(insight);
            })

        }

        
        if (id === "rooms") {
            return new Promise(function (fulfill, reject) {

                jsz.loadAsync(content, {'base64': true}).then(function (data: any) {
                    let listPromiseFiles: any[] = [];

                    data.forEach(function (r: any, f: any) {

                        listPromiseFiles.push(f.async("string"));
                    });


                    let listFiles: any[] = [];
                    Promise.all(listPromiseFiles).then(function (htmldata) {

                        for (let i = 6; i < 82; i++) {
                            listFiles.push(htmldata[i])
                        }

                        let indexJS = htmldata[82];

                        const document = parse5.parse(indexJS);

                        //const document = parse5.parse(indexJS);
                        let tree = document.childNodes[6].childNodes[3].childNodes[31].childNodes[10]
                            .childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1]
                            .childNodes[3];

                        let lobuildings: any = [];
                        let buildings: any = {};
                        for (let i = 1; i < tree.childNodes.length; i += 2) {
                            let tr = tree.childNodes[i] as any;
                            let sname = tr.childNodes[3].childNodes[0].value.trim()
                            // console.log(sname)
                            let fname = tr.childNodes[5].childNodes[1].childNodes[0].value.trim()
                            //  console.log(fname)
                            let address = tr.childNodes[7].childNodes[0].value.trim()
                            //  console.log(address)
                            let link = tr.childNodes[9].childNodes[1].attrs[0].value.trim()
                            //  console.log(link)
                            let building = {
                                rooms_fullname: fname, rooms_shortname: sname,
                                rooms_address: address, link: link
                            }
                            //   console.log(building)
                            buildings[fname] = building;
                        }
                        gbulidings = buildings;
                        validBuildings = Object.keys(buildings);



                        let allBuildingsInfoList: any[] = [];
                        var pArr:any[] = [];
                        listFiles.forEach(function (eachI) {
                            if (that.htmlhelper(eachI)) {
                                try {
                                    pArr.push(that.htmlBuildInfoParse(eachI,id));   ////????
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        })

                        let roomsInfoList:any[] = []
                        Promise.all(pArr).then(function (data) {
                            //console.log(data)
                            for (let i in data) {
                                let sub:any = data[i]
                                if (sub.length>0) {
                                    for (let j in sub){
                                        roomsInfoList.push(sub[j])
                                    }
                                }

                            }

                            //add new check**************
                            if(roomsInfoList.length===0){
                                insight.code = 400;
                                insight.body = {"error": "no right content"};
                                reject(insight);
                                return;
                            }
                            if (fs.existsSync(id)) {
                                insight.code = 201;
                                insight.body = {"success": "exist"};

                            } else {
                                insight.code = 204;
                                insight.body = {"success": "not exist"};

                            }
                            let xyz = JSON.stringify(roomsInfoList);

                           // else {
                                fs.writeFile(id, xyz, (fileerr: any, filedata: any) => {

                                if (fileerr) {
                                    insight.code = 400;
                                    insight.body = {"error": "can't write the content to disk"};
                                    reject(insight);
                                    return;
                                }

                                fulfill(insight);
                                return;
                            });
                        //}
                        }).catch(function (e) {
                            insight.code = 400;
                            insight.body = {"error": "can't write the content to disk"};
                            reject(insight);
                            return;
                        })

                    }).catch(function (perr: any) {
                        insight.code = 400;
                        insight.body = {"error": "can't write the content to disk"};
                        reject(insight);
                        return;
                    });
                })
            })
        }

        if (id === "courses") {

            return new Promise(function (fulfill, reject) {


                //if (fs.existsSync(id)) {fulfill(insight)}
                jsz.loadAsync(content, {'base64': true}).then(function (data: any) { // data is zipObject

                    let listPromiseFiles: any[] = [];

                    data.forEach(function (r: any, f: any) {

                        listPromiseFiles.push(f.async("string"));
                    });

                    let listFiles: any[] = [];
                    Promise.all(listPromiseFiles).then(function (filedata) {
                        for (let eachIndex in filedata) {
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
                                            newObj[id + "_uuid"] = c["id"].toString();
                                            if (c["Section"] !== 'overall') {
                                                newObj[id + "_year"] = parseInt(c["Year"])
                                            } else {
                                                newObj[id + "_year"] = 1900
                                            }

                                            listFiles.push(newObj);

                                        }

                                    }
                                }
                            }
                        }

                        //add new check***************************
                        if(listFiles.length===0){
                            insight.code = 400;
                            insight.body = {"error": "not right content"};
                            reject(insight);
                            return;
                        }

                        if (fs.existsSync(id)) {
                            insight.code = 201;
                            insight.body = {"success": "exist"};

                        } else {
                            insight.code = 204;
                            insight.body = {"success": "not exist"};

                        }

                        let xyz = JSON.stringify(listFiles);

                        fs.writeFile(id, xyz, (fileerr: any, filedata: any) => {

                            if (fileerr) {
                                insight.code = 400;
                                insight.body = {"error": "can't write the content to disk"};
                                reject(insight);

                            }

                            fulfill(insight);
                            return;
                        });
                                }).catch(function (perr: any) {
                        insight.code = 400;
                        insight.body = {"error": "can't write the content to disk"};
                        reject(insight);
                        return;
                    });

                    }).catch(function (perr: any) {
                        insight.code = 400;
                        insight.body = {"error": "can't write the content to disk"};
                        reject(insight);
                        return;

            });
        })

    }

    }

    removeDataset(id: string): Promise<InsightResponse> {

        let retInsight:InsightResponse={
            code:null,
            body:{}
        };

        return new Promise(function (fulfill, reject) {

            if(!(id==="courses"||id==="rooms")){
                retInsight.code = 404;
                return reject(retInsight);
            }
            if(fs.existsSync(id)) {
                fs.unlinkSync(id);
                retInsight.code = 204;

                delete dataset[id]

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
                if (!that.checkValidity2(query) && !that.checkValidity1(query))  {
                    return reject({code: 400, body: {"error": "invalid query"}});
                }
            } catch(exception) {
                return reject({code: 400, body: {"error": "invalid query"}});
            }

            // Query OK, decide which dataset to perform query on

            // try {
            //let dataset: any = {};
            let id = that.getID(query)

            let result: any[] = []
            try {
                // if (!Object.keys(dataset).includes(id) || dataset[id].length === 0) {
                    dataset[id] = JSON.parse(fs.readFileSync(id))
               // }

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
            //
            let resultObj:any = {};
            if (Object.keys(query).includes("TRANSFORMATIONS")) {
                let group = query["TRANSFORMATIONS"]["GROUP"]  // Group Set (Array)
                let apply = query["TRANSFORMATIONS"]["APPLY"]  // Apply Set (Array)

                let applyTerms:any =[]  // ["rooms_seats"]
                let applyKeys:any = [] //  ["MAX"]
                let newKeys:any = [] // ["maxSeats"]
                for (let i in apply) {
                    console.log("foreach apply " + i);
                    newKeys.push(Object.keys(apply[i])[0])
                    let applyEach = apply[i][Object.keys(apply[i])[0]]  // {"MAX": "rooms_seats"}
                    applyKeys.push(Object.keys(applyEach)[0])
                    applyTerms.push(applyEach[Object.keys(applyEach)[0]])
                }

                let allCols = options["COLUMNS"]
                // let groupBy:any = []
                // for (let i in allCols) {
                //     if (that.isKey1(allCols[i]) || that.isKey2(allCols[i]) || ) {
                //         groupBy.push(allCols[i])
                //     }
                // }
                //let needPush:boolean = true
                let occurrences:any = []
                let AvgArrayObj:any = {}
                let SumArrayObj: any = {}
                let r = result.reduce(function (res, obj) {
                    let unique = that.concatenate(obj, group);
                    // AvgArrayObj[unique] = [];
                    // SumArrayObj[unique] = [];
                    if (res[unique] === undefined) {
                        if (apply.length > 0) {
                            console.log("Init new rowwwwwwww!!!!!!!!!!!!!!");
                            obj = that.transform(obj, apply,applyKeys,applyTerms, occurrences, AvgArrayObj[unique] = [], SumArrayObj[unique] = [])
                        }
                        res[unique] = obj;
                    } else {
                        if (apply.length > 0) {
                            res[unique] = that.updateRow(obj, res[unique], apply, applyKeys, applyTerms, occurrences, AvgArrayObj[unique], SumArrayObj[unique])
                        }
                    }
                    return res
                }, {})
                if (applyKeys.includes("AVG")) {
                    let i = applyKeys.indexOf("AVG")
                    let avgField = newKeys[i]
                    for (let unique in r) {
                        let avg: number = Number((AvgArrayObj[unique].map((val:any) => <any>new Decimal(val)).reduce((a:any,b:any) => a.plus(b)).toNumber() / AvgArrayObj[unique].length).toFixed(2));
                        r[unique][avgField] = avg
                    }
                }
                if (applyKeys.includes("SUM")) {
                    let i = applyKeys.indexOf("SUM")
                    let sumField = newKeys[i]
                    for (let unique in r) {
                        let sum = Number(SumArrayObj[unique].map((val:any) => new Decimal(val)).reduce((a:any,b:any) => a.plus(b)).toNumber().toFixed(2));
                        r[unique][sumField] = sum
                    }
                }

                resultObj = r
            }

            let filtereds: any[] = []
            const allowed = options["COLUMNS"]

            if (Object.keys(resultObj).length === 0) {
                for (let raw of result) {
                    let temp: any = {}
                    for (let field of allowed) {
                        temp[field] = raw[field]
                    }
                    filtereds.push(temp)
                }
            } else {
                for (let key in resultObj) {
                    let temp: any = {}
                    for (let field of allowed) {
                        temp[field] = resultObj[key][field]

                    }
                    filtereds.push(temp)}
            }


            let keysForOpt = Object.keys(options)


            let sortOn =''

            if (keysForOpt.includes("ORDER")) {
                let sortOn = options["ORDER"] // string
                if (typeof sortOn === "string") {
                    filtereds.sort(function (a, b) {
                        if (a[sortOn] < b[sortOn])
                            return -1
                        if (a[sortOn] > b[sortOn])
                            return 1
                        return 0
                    })
                } else {
                    let dir = sortOn["dir"]
                    let keysToSort = sortOn["keys"]
                    filtereds.sort(function (a, b) {
                        if (dir === 'UP') {
                            for (let i in keysToSort) {
                                if (a[keysToSort[i]] < b[keysToSort[i]])
                                    return -1
                                if (a[keysToSort[i]] > b[keysToSort[i]])
                                    return 1
                            }
                            return 0
                        }else if (dir === 'DOWN') {
                            for (let i in keysToSort) {
                                if (a[keysToSort[i]] > b[keysToSort[i]])
                                    return -1
                                if (a[keysToSort[i]] < b[keysToSort[i]])
                                    return 1
                            }
                            return 0
                        }
                    })

                }
            }

            fulfill({code: 200, body: {result: filtereds}})


        })

    }

    concatenate(obj:any, group:any):any {
        let result = '';
        for (let i of group) {
            result = result + obj[i];
        }
        return result;
    }

    transform(obj:any, apply: any, applyKeys:any, applyTerms:any, occurrences: any, AvgArray:any, SumArray:any): any {
        // if apply, change name and initialize
        let that = this
        for (let i in apply) {
            console.log("transform each apply" + i);
            let newName = Object.keys(apply[i])[0]
            let oldName = applyTerms[i]
            let token = applyKeys[i]
            if (token === "COUNT") {
                occurrences.push(obj[oldName])
            }

            obj[newName] = that.initializeValue(obj, oldName, token, AvgArray, SumArray)
            //delete obj[oldName]
        }
        return obj
    }

    initializeValue(obj: any, oldName:any, token:any, AvgArray:any, SumArray:any):any {
        switch (token) {
            case "MAX" :
                return obj[oldName];
            case "MIN" :
                return obj[oldName];
            case "AVG" :
                AvgArray.push(obj[oldName]);
                return obj[oldName];
            case "COUNT" :
                return 1;
            case "SUM" :
                SumArray.push(obj[oldName]);
                return obj[oldName];
        }
    }

    updateRow(obj:any, row:any, apply:any, applyKeys:any, applyTerms:any, occurrences:any, AvgArray:any, SumArray:any):any {
        // update the specified field
        let that = this
        for (let i in apply) {
            let newName = Object.keys(apply[i])[0]
            let oldName = applyTerms[i]
            let token = applyKeys[i]

            row[newName] = that.updateTerm(row[newName], obj[oldName], token, occurrences, AvgArray, SumArray)
        }
        return row
    }

    updateTerm(prev:any, cur:any, token:any, occurrences:any, AvgArray:any, SumArray:any):any {
        switch (token) {
            case "MAX" :
                if (prev < cur) {
                    return cur;
                } else {
                    return prev;
                }
            case "MIN" :
                if (prev > cur) {
                    return cur;
                } else {
                    return prev;
                }
            case "AVG" :
                AvgArray.push(cur);
                return prev + cur
            case "COUNT" :
                if (occurrences.includes(cur)) {
                    return prev;
                } else {
                    occurrences.push(cur)
                    return prev + 1
                }
            case "SUM" :
                SumArray.push(cur);
                return prev + cur;
        }
    }

    //
    // needPush(res:any, unqiue:any):any {
    //
    //     // let that = this
    //     // for (let i in res) {
    //     //     console.log("each res" + i);
    //     //     if (that.containAll(res[i], obj, groupBy)) {
    //     //         return i
    //     //     }
    //     // }
    //     // return -1; // need push
    // }
    //
    // containAll(row:any, obj:any,groupBy:any): boolean{
    //     for (let col in groupBy) {
    //         console.log("each groupby" + col);
    //         let keys = Object.keys(row)
    //         let values: any = []
    //         for (let i in keys) {
    //             values.push(row[keys[i]])
    //         }
    //         if (!values.includes(obj[groupBy[col]])) {
    //             return false
    //         }
    //     }
    //     return true
    // }


    getID(query: any): string {
        let that = this
        if (query["TRANSFORMATIONS"]!==undefined) {
            console.log("123");
           if( query["TRANSFORMATIONS"]["GROUP"][0].includes("courses")){
               return "courses";
           }
           if(query["TRANSFORMATIONS"]["GROUP"][0].includes("rooms")){
               return "rooms";
           }
        }else{
            if (that.isKey1(query["OPTIONS"]["COLUMNS"][0])) return "courses"
            if (that.isKey2(query["OPTIONS"]["COLUMNS"][0])) return "rooms"
        }

        return ""
    }


    checkValidity1(query: any): boolean {
        let that = this;
        if (query === null || query === {}) return false;
        let keys = Object.keys(query)
        if (keys.length < 2 || keys.length > 3) return false
        if (keys.length === 2) {
            if ((!keys.includes("WHERE")) || (!keys.includes("OPTIONS"))) return false;
        }
        if (keys.length === 3) {
            if ((!keys.includes("WHERE")) || (!keys.includes("OPTIONS")) || (!keys.includes("TRANSFORMATIONS"))) return false;
        }



        let obj1 = query["WHERE"]
        let obj2 = query[keys[1]]
        let conds = Object.keys(obj2)
        if (!conds.includes("COLUMNS")) return false
        if ((!conds.includes("ORDER")) && conds.length !== 1) return false
        if ((conds.includes("ORDER")) && conds.length !== 2) return false
        let colItems = obj2["COLUMNS"]

        if ((!Array.isArray(colItems)) || colItems.length === 0) return false


        let newKeys:any = [];
        if (!keys.includes("TRANSFORMATIONS")) {
            for (let i of colItems) {
                if (!that.isKey1(i)) {
                    return false
                }
            }
        } else {
            let group = query["TRANSFORMATIONS"]["GROUP"]  // Group Set (Array)
            let apply = query["TRANSFORMATIONS"]["APPLY"]  // Apply Set (Array)

            for (let i of group) {
                if (!that.isKey1(i)) {
                    return false
                }
            }
            // group terms valid

            let applyTerms:any =[]  // ["rooms_seats"]
            let applyKeys:any = [] //  ["MAX"]
             // ["maxSeats"]
            for (let i in apply) {
                newKeys.push(Object.keys(apply[i])[0])
                let applyEach = apply[i][Object.keys(apply[i])[0]]  // {"MAX": "rooms_seats"}
                applyKeys.push(Object.keys(applyEach)[0])
                applyTerms.push(applyEach[Object.keys(applyEach)[0]])
            }

            for (let i of applyKeys) {
                if (!that.isToken(i)) {
                    return false
                }
            }

            for (let i in applyTerms) {
                if (applyKeys[i] === "COUNT") {
                    if (!that.isKey1(applyTerms[i])) {
                        return false
                    }
                } else {
                    if (!that.ismKey1(applyTerms[i])) {
                        return false
                    }
                }
            }
            //group, apply are all valid keys

            // make sure colItems is from group or apply
            for (let i of colItems) {
                if (!group.includes(i) && !newKeys.includes(i)) {
                    return false
                }
            }
        }


        if (conds.includes("ORDER")) {
            let order = obj2["ORDER"]

            if (typeof order === "string") {
                if (!that.isKey1(order)) return false
                if (!colItems.includes(order)) return false
            } else { // multiple fields
                let orderKeys = Object.keys(order)
                if (orderKeys.length !== 2 || orderKeys[0] !== "dir" || (order["dir"] !== "UP" && order["dir"] !== "DOWN")
                    ||orderKeys[1] !== "keys") {
                    return false
                }
                let fields = order["keys"]
                for (let i in fields) {
                    if (!that.isKey1(fields[i]) && !newKeys.includes(fields[i])) return false
                    if (!colItems.includes(fields[i])) return false
                }
            }
        }
        // now OPTIONS is all OK
        if (!that.isValidFilter1(obj1)) return false;

        return true
    }


    isToken(t:any): boolean {
        if (typeof t !== 'string') return false
        return (t === 'MAX')||(t === 'MIN')||(t === 'AVG')||(t === 'SUM')||(t === 'COUNT')
    }

    isKey1(item: any): boolean {
        let that = this;
        return that.ismKey1(item) || that.issKey1(item)
    }

    ismKey1(k: any): boolean {
        if (typeof k !== 'string') return false
        return (k === 'courses_avg')||(k === 'courses_pass')||(k === 'courses_fail')||(k === 'courses_audit')||(k === 'courses_year')
    }

    issKey1(k: any): boolean {
        if (typeof k !== 'string') return false
        return (k === 'courses_dept')||(k === 'courses_id')||(k === 'courses_instructor')||(k === 'courses_title')||(k=== 'courses_uuid')
    }

    isValidFilter1(obj:any):boolean {
        let that = this
        if (!(obj instanceof Object)) {
            return false;
        }
        if (Object.keys(obj).length === 0) return true
        if (Object.keys(obj).length > 1) return false
        let key = Object.keys(obj)[0]

        if (key === "AND" || key === "OR") {
            let objInside = obj[key]

            if ((!Array.isArray(objInside)) || objInside.length ===0) return false

            for (let i of objInside) {
                if (!this.isValidFilter1(i)) return false
            }
            return true
        }
        if (key === "GT" || key === "LT" || key === "EQ") {
            let objInside = obj[key]
            if (!(objInside instanceof Object))
                return false
            let keys = Object.keys(objInside)
            if (keys.length !== 1) return false
            return that.ismKey1(keys[0]) && (typeof objInside[keys[0]] == 'number')
        }
        if (key === "NOT") {
            return this.isValidFilter1(obj[key])
        }
        if (key === "IS") {
            let objInside = obj[key]
            if (!(objInside instanceof Object)) return false
            let keys = Object.keys(objInside)
            if (keys.length!==1) return false
            return that.issKey1(keys[0]) && (typeof objInside[keys[0]] == 'string')
        }

    }

    parser(filter: any, data: any) : boolean {
        if (Object.keys(filter).length === 0) return true
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
            if (val.length === 1 && val[0] === "*") return false
            if (val.length === 2 && val[0] === "*" && val[1] === "*") return true

            if (val[0] === "*" && val[val.length - 1] === "*") {
                let subString = val.substring(1,val.length-1)
                return data[field].indexOf(subString) >= 0
            }
            if (val[0] === "*" && val[val.length - 1] !== "*") {
                let subString = val.substring(1,val.length)
                if (data[field].length < subString.length) return false
                return data[field].indexOf(subString, data[field].length - subString.length) !== -1;
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

    checkValidity2(query: any): boolean {
        let that = this;

        if (query === null || query === {}) return false;
        let keys = Object.keys(query)

        if (keys.length < 2 || keys.length > 3) return false
        if (keys.length === 2) {
            if ((!keys.includes("WHERE")) || (!keys.includes("OPTIONS"))) return false;
        }
        if (keys.length === 3) {
            if ((!keys.includes("WHERE")) || (!keys.includes("OPTIONS")) || (!keys.includes("TRANSFORMATIONS"))) return false;
        }



        let obj1 = query["WHERE"]
        let obj2 = query[keys[1]]
        let conds = Object.keys(obj2)
        if (!conds.includes("COLUMNS")) return false
        if ((!conds.includes("ORDER")) && conds.length !== 1) return false
        if ((conds.includes("ORDER")) && conds.length !== 2) return false
        let colItems = obj2["COLUMNS"]

        if ((!Array.isArray(colItems)) || colItems.length === 0) return false


        let newKeys:any = []

        if (!keys.includes("TRANSFORMATIONS")) {
            for (let i of colItems) {
                if (!that.isKey2(i)) {
                    return false
                }
            }
        } else {
            let group = query["TRANSFORMATIONS"]["GROUP"]  // Group Set (Array)
            let apply = query["TRANSFORMATIONS"]["APPLY"]  // Apply Set (Array)

            for (let i of group) {
                if (!that.isKey2(i)) {
                    return false
                }
            }
            // group terms valid

            let applyTerms:any =[]  // ["rooms_seats"]
            let applyKeys:any = [] //  ["MAX"]
            // let newKeys:any = [] // ["maxSeats"]
            for (let i in apply) {
                newKeys.push(Object.keys(apply[i])[0])
                let applyEach = apply[i][Object.keys(apply[i])[0]]  // {"MAX": "rooms_seats"}
                applyKeys.push(Object.keys(applyEach)[0])
                applyTerms.push(applyEach[Object.keys(applyEach)[0]])
            }

            for (let i of applyKeys) {
                if (!that.isToken(i)) {
                    return false
                }
            }

            for (let i in applyTerms) {
                if (applyKeys[i] === "COUNT") {
                    if (!that.isKey2(applyTerms[i])) {
                        return false
                    }
                } else {
                    if (!that.ismKey2(applyTerms[i])) {
                        return false
                    }
                }
            }
            //group, apply are all valid keys

            // make sure colItems is from group or apply
            for (let i of colItems) {
                if (!group.includes(i) && !newKeys.includes(i)) {
                    return false
                }
            }
        }


        if (conds.includes("ORDER")) {
            let order = obj2["ORDER"]
            if (typeof order === "string") {
                if (!that.isKey2(order) && !newKeys.includes(order)) return false
                if (!colItems.includes(order)) return false
            } else { // multiple fields
                let orderKeys = Object.keys(order)
                if (orderKeys.length !== 2 || orderKeys[0] !== "dir" || (order["dir"] !== "UP" && order["dir"] !== "DOWN")
                    ||orderKeys[1] !== "keys") {
                    return false
                }
                let fields = order["keys"]
                for (let i in fields) {
                    if (!that.isKey2(fields[i]) && !newKeys.includes(fields[i])) return false
                    if (!colItems.includes(fields[i])) return false
                }
            }

        }

        // now OPTIONS is all good
        if (!that.isValidFilter2(obj1)) return false;

        return true
    }

    isKey2(item: any): boolean {
        let that = this;
        return that.ismKey2(item) || that.issKey2(item)
    }

    ismKey2(k: any): boolean {
        if (typeof k !== 'string') return false
        return (k === 'rooms_lat')||(k === 'rooms_lon')||(k === 'rooms_seats')
    }

    issKey2(k: any): boolean {
        if (typeof k !== 'string') return false
        return (k === 'rooms_fullname')||(k === 'rooms_shortname')||(k === 'rooms_number')||(k === 'rooms_name')||(k=== 'rooms_address')
            ||(k=== 'rooms_type')||(k === 'rooms_furniture')||(k=== 'rooms_href')
    }

    isValidFilter2(obj:any):boolean {
        let that = this
        if (!(obj instanceof Object)) {
            return false;
        }

        if (Object.keys(obj).length === 0) return true
        if (Object.keys(obj).length > 1) return false

        let key = Object.keys(obj)[0]

        if (key === "AND" || key === "OR") {
            let objInside = obj[key]

            if ((!Array.isArray(objInside)) || objInside.length ===0) return false

            for (let i of objInside) {
                if (!this.isValidFilter2(i)) return false
            }
            return true
        }
        if (key === "NOT") {
            return this.isValidFilter2(obj[key])
        }

        if (key === "GT" || key === "LT" || key === "EQ") {
            let objInside = obj[key]
            if (!(objInside instanceof Object))
                return false
            let keys = Object.keys(objInside)
            if (keys.length !== 1) return false
            return that.ismKey2(keys[0]) && (typeof objInside[keys[0]] == 'number')
        }
        if (key === "IS") {
            let objInside = obj[key]
            if (!(objInside instanceof Object)) return false
            let keys = Object.keys(objInside)
            if (keys.length!==1) return false
            return that.issKey2(keys[0]) && (typeof objInside[keys[0]] == 'string')
        }
    }
}

