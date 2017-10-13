/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";
var fs  = require('fs');
import Log from "../Util";

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

            if(fs.existsSync("courses")){
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

                            //console.log(filedata[eachIndex]);
                            try {
                                var each = JSON.parse(filedata[eachIndex]);
                            } catch (err) {
                                each = filedata[eachIndex];
                            }

                            if (typeof each === 'object') {
                                for (let c of each['result']) {
                                    //  console.log(c);

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

                                        //console.log(newObj);
                                    }
                                }
                                //console.log( listFiles[0]);
                            }
                        }
                            //console.log(oneJSON);
                    }

                    let xyz = JSON.stringify(listFiles);
                        fs.writeFile("courses.json", xyz, (fileerr: any, filedata: any) => {


                            if (fileerr) {

                                insight.code = 400;
                                insight.body = {"error": "can't write the content to disk"};
                                return reject(insight);
                            }


                            fulfill(insight);
                            //console.log("the file is written");
                            //console.log("addData finished=======");
                        });
                }).catch(function(perr:any){
                    insight.code = 400;
                    insight.body = {"error": "can't write the content to disk"};
                    reject(insight);
                });

               // fulfill(insight);
            }).catch(function(e:any){
                insight.code = 400;
                insight.body = {"error": "can't write the content to disk"};
                reject(insight);
            });
        });
    }

    /*
    function helper(obj){
        try{
            let x = JON.pare(obj);
            return truel
        catch{
        return false

     */

    removeDataset(id: string): Promise<InsightResponse> {

        return new Promise(function (fulfill, reject) {
            let retInsight:InsightResponse={
                code:null,
                body:{}
            };

            if(id!=="courses"){
                retInsight.code = 404;
                retInsight.body = {"error": "not valid courses"};
                return reject(retInsight);
            }

            try {
                fs.unlinkSync(id);
            }catch (err){
                retInsight.code = 404;
                retInsight.body = {"error": "delete was for a resource that was not previously added"};
                return reject(retInsight);
            }

            retInsight.code = 204;
            retInsight.body = {"successful": "the operation was successful"};

            fulfill(retInsight);
        });
        //return null;
    }


    performQuery(query: any): Promise <InsightResponse> {

        /*

        query one  = new query();

        query.where = query["where"];

        query["where"]["GT"]

        let filterType = Object.keys(one.where); //GT

query["where"][filterType][]

            return new Promise(function (fulfill,reject) {
                query["WHERE"][]
            })

            */

        return null;


    }
}
