/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";
var fs  = require('fs');
import Log from "../Util";
import * as jsz from 'jszip';

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
        return new Promise(function (fulfill, reject) {
            //var zip = jsz;

            // process the content (ie getting the info you want)
            // store it into data structure
            // save data structure to disk (using fs.writeFile)

            let listFiles:any[] = [];
            jsz.loadAsync(content, {'base64': true}).then(function(data){ // data is zipObject

                // for(let eachFile of data) {
                //     // fs.writeFile(eachFile);
                //     console.log(eachFile);
                // }
                data.forEach(function(r,f){
                    // console.log(f);
                    f.async("string").then(function(c){
                        console.log(c);


                         if(c['result'].length != 0) {
                             var newObj = {};
                             //newObj('course_id');
                             newObj['courses_dept'] = c["Title"];
                             newObj['course_id'] = c["Course"];
                             newObj[]

                         }

                        fulfill();
                    })
                    // fulfill();
                })
                //console.log(data);
            }).catch(function(e){
                reject(e);
            });
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: any): Promise <InsightResponse> {
        return null;
    }
}
