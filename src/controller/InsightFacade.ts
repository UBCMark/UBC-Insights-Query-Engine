/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";

import Log from "../Util";
var JSZip = require("jszip");

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        let pArr:any[] = [];
        JSZip.loadAsync(content).then(function (zip: any) {
            console.log(zip)
            zip.forEach(function (r:any, f:any) {
                //console.log(f)
                console.log("aaaaaaaaaaa")
                pArr.push(f.async("string"));
                console.log("aaaaaaaaaaa")
            })
        }).catch(function (err:any) {
            console.log("WTF")

        });
        Promise.all(pArr).then(function(result){
            console.log("Promise.all fulfilled!");
            console.log(pArr.length)
        }).catch(function(err) {
            console.log("Promise.all rejected from " + err);
        })
        return;


    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: any): Promise <InsightResponse> {
        return null;
    }
}
