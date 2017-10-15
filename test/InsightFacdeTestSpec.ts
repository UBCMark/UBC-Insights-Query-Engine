import {expect} from "chai";
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse} from "../src/controller/IInsightFacade";
import fs = require("fs");

describe("InsightFacadeSpec", function () {
    this.timeout(10000);

    let insightFacade: InsightFacade = null;

    let content: string = "";
    let contentEmpty: string = "";
    //let fileDirectory:string = __dirname.replace("test/","");
    let fileDirectory = '/Users/wyuntian/cpsc310_team70';

    fs.readFile(fileDirectory + "/courses.zip", {encoding: "base64"}, function (err: any, data: any) {
        if (err) {
            throw err;
        } else {
            content = data;
        }
    });

    fs.readFile(fileDirectory + "/empty.zip", {encoding: "base64"}, function (err: any, data: any) {
        if (err) {
            throw err;
        } else {
            contentEmpty = data;
        }
    });



    beforeEach(function () {
        insightFacade = new InsightFacade();
    });

    afterEach(function () {
        insightFacade = null;
    });

    it('Test for an empty courses.', function () {
        return insightFacade.addDataset("courses", contentEmpty).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("test addDataset courses.zip", function () {
        return insightFacade.addDataset("courses", content).then(function (data) {
            expect(fs.existsSync("courses")).eq(true);
            expect(data.code).eq(204);
        }).catch(function (err) {
            console.log(err);

        });
    });

    it("test addDataset204/201", function () {

        return insightFacade.addDataset("courses", content).then(function (data) {
            expect(data.code).eq(201);
        }).catch(function (err) {
            console.log(err);
        });

    });

    it("test removeDataset", function () {

        insightFacade.removeDataset("courses").then(function (data) {
            expect(fs.existsSync("courses")).eq(false);
            expect(data.code).eq(204);

        }).catch(function (err) {
            console.log(err);
        })
    });


    it("test removeDatasetwithWrongID", function () {
        insightFacade.removeDataset("course").then(function (data) {
            expect.fail();
        }).catch(function (err) {
            expect(fs.existsSync("courses")).eq(false);
            expect(err.code).eq(404);
        });
    });

    it("test removeDatasetAgain", function () {
        insightFacade.removeDataset("courses").then(function (data) {
            expect.fail();
        }).catch(function (err) {
            expect(fs.existsSync("courses")).eq(false);
            expect(err.code).eq(404);
        });
    });

  /*  it('Titanium'
        , function () {
            return insightFacade.performQuery( <any>
                {
                    "WHERE": {
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "courses_dept",
                            "courses_id",
                            "courses_uuid"

                        ],
                        "ORDER": {
                            "dir": "DOWN",
                            "keys": ["courses_uuid"]
                        },
                        "FORM": "TABLE"
                    },
                    "TRANSFORMATIONS": {
                        "GROUP": [ "courses_dept",
                            "courses_id",
                            "courses_uuid"],
                        "APPLY": []
                    }
                }
            ).then(function (response: InsightResponse) {
                expect(response.code).to.equal(200);
            }).catch(function (response: InsightResponse) {
                expect.fail();
            });
        });*/
});