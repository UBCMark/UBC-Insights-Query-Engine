import {expect} from "chai";
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse} from "../src/controller/IInsightFacade";
import fs = require("fs");

describe("InsightFacadeSpec", function () {
    this.timeout(10000);

    let insightFacade: InsightFacade = null;

    let content: string = "";
    let content2: string = "";
    let contentEmpty: string = "";
    //let fileDirectory:string = __dirname.replace("test/","");
    //let fileDirectory = 'C:/A  UBC Study/a 2017/310/cpsc310_team70';

    fs.readFile("./courses.zip", {encoding: "base64"}, function (err: any, data: any) {
        if (err) {
            throw err;
        } else {
            content = data;
        }
    });

    fs.readFile("./rooms.zip", {encoding: "base64"}, function (err: any, data: any) {
        if (err) {
            throw err;
        } else {
            content2 = data;
        }
    });

    fs.readFile("./empty.zip", {encoding: "base64"}, function (err: any, data: any) {
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


    // it('Test for an empty courses.', function () {
    //
    //     return insightFacade.addDataset("courses", contentEmpty).then(function (response: InsightResponse) {
    //         expect.fail();
    //
    //     }).catch(function (response: InsightResponse) {
    //         expect(response.code).to.equal(400);
    //     });
    // });
    //
    // it('Test for an invalid ID.', function () {
    //     return insightFacade.addDataset("course", content).then(function (response: InsightResponse) {
    //         expect.fail();
    //     }).catch(function (response: InsightResponse) {
    //         expect(response.code).to.equal(400);
    //     });
    // });
    //
    // //****************
    // // add new test of mismatch id and dataset
    // it('Test for an misatach add data-course.', function () {
    //     return insightFacade.addDataset("courses", content2).then(function (response: InsightResponse) {
    //         expect.fail();
    //     }).catch(function (response: InsightResponse) {
    //         expect(response.code).to.equal(400);
    //     });
    // });



    it("test addDataset courses.zip", function () {
        return insightFacade.addDataset("courses", content).then(function (data) {
            expect(fs.existsSync("courses")).eq(true);
            expect(data.code).eq(204);
            console.log(data.code)
        }).catch(function (err) {
            console.log(err);

        });
    });

    // it("test addDataset204/201", function () {
    //
    //     return insightFacade.addDataset("courses", content).then(function (data) {
    //         expect(data.code).eq(201);
    //     }).catch(function (err) {
    //         console.log(err);
    //     });
    //
    // });
    //
    // it('Test for an invalid ID.', function () {
    //     return insightFacade.addDataset("room", content2).then(function (response: InsightResponse) {
    //         expect.fail();
    //     }).catch(function (response: InsightResponse) {
    //         expect(response.code).to.equal(400);
    //     });
    // });
    //
    // //****************
    // // add new test of mismatch id and dataset
    // it('Test for an misatach add data-course.', function () {
    //     return insightFacade.addDataset("rooms", content).then(function (response: InsightResponse) {
    //         expect.fail();
    //     }).catch(function (response: InsightResponse) {
    //         expect(response.code).to.equal(400);
    //     });
    // });


    it("test addDataset rooms.zip", function () {
        return insightFacade.addDataset("rooms", content2).then(function (data) {
            expect(fs.existsSync("rooms")).eq(true);
            expect(data.code).eq(204);
        }).catch(function (err) {
            console.log(err);

        });
    });


    // it("test addDataset204/201", function () {
    //
    //     return insightFacade.addDataset("rooms", content2).then(function (data) {
    //         expect(data.code).eq(201);
    //     }).catch(function (err) {
    //         console.log(err);
    //     });
    //
    // });


});