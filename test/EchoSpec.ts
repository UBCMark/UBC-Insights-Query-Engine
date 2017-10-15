/**
 * Created by rtholmes on 2016-10-31.
 */
var fs = require("fs");
import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

describe("EchoSpec", function () {


    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    var IF: InsightFacade = null;
    beforeEach(function () {
         IF = new InsightFacade();
    });


    before(function () {
        Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    it("Should be able to echo", function () {
        let out = Server.performEcho('echo');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: 'echo...echo'});
    });

    it("Should be able to echo silence", function () {
        let out = Server.performEcho('');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: '...'});
    });

    it("Should be able to handle a missing echo message sensibly", function () {
        let out = Server.performEcho(undefined);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });

    it("Should be able to handle a null echo message sensibly", function () {
        let out = Server.performEcho(null);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.have.property('error');
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });



/*
    it("test addDataset", function () {
       // var zip = new JSZip();
        var fs = require('fs');
       // var files:any[]=[];

        var insight = new InsightFacade();
        var fileName = '/Users/wyuntian/cpsc310_team70/courses.zip';

        console.log('start file');
        var content = fs.readFileSync(fileName);
        content = content.toString("base64");

        console.log(content);

        insight.addDataset("courses", content).then(function (data) {
            console.log(data);
            expect(fs.existsSync("courses")).eq(true);
            expect(data.code).eq(204);


        }).catch(function (err) {
            console.log(err);

        });
        //expect(true).eq((true));

    });*/

   /* it("test addDataset204/201", function () {
        // var zip = new JSZip();
        var fs = require('fs');
        // var files:any[]=[];

        var insight = new InsightFacade();
        var fileName = '/Users/wyuntian/cpsc310_team70/courses.zip';

        console.log('start file');
        var content = fs.readFileSync(fileName);
        content = content.toString("base64");

        console.log(content);

        //expect(true).eq((true));

        insight.addDataset("courses", content).then(function (data) {
            //console.log(data);
            expect(data.code).eq(201);
            //expect(true).eq((true));
        }).catch(function (err) {
            //console.log(err);
        });

    });*/

    it("test removeDataset", function () {
        // var zip = new JSZip();
        var fs = require('fs');
        // var files:any[]=[];

        var insight = new InsightFacade();
        var fileName = '/Users/wyuntian/cpsc310_team70/courses.zip';

        console.log('start file');
        var content = fs.readFileSync(fileName);
        content = content.toString("base64");

        console.log(content);


        insight.removeDataset("courses").then(function (data) {
            console.log(data);
            expect(fs.existsSync("courses")).eq(false);
            expect(data.code).eq(204);

        }).catch(function (err) {
            console.log(err);

        })
    });


        it("test removeDatasetAgain", function () {
            // var zip = new JSZip();
            var fs = require('fs');
            // var files:any[]=[];

            var insight = new InsightFacade();
            var fileName = '/Users/wyuntian/cpsc310_team70/courses.zip';

            console.log('start file');
            var content = fs.readFileSync(fileName);
            content = content.toString("base64");

            console.log(content);

            insight.removeDataset("courses").then(function (data) {
                console.log(data);
                expect(fs.existsSync("courses")).eq(false);
                expect(data.code).eq(404);

            }).catch(function (err) {
                console.log(err);

            });

    });

    // it("my test", function () {
    //     var bitmap = fs.readFileSync('C:/A  UBC Study/a 2017/310/cpsc310_team70/courses.zip');
    //     // convert binary data to base64 encoded string
    //     var content = new Buffer(bitmap).toString('base64');
    //     console.log(content)
    //
    //     return IF.addDataset("courses", content).then(function (s:any){
    //         console.log("success")
    //     }).catch(function (err:any){
    //         console.log("err")
    //     })
    // });
    //
    // it("wtf test", function () {
    //     var bitmap = fs.readFile('courses.zip', function(err:any, data:any) {
    //         return IF.addDataset("courses", data).then(function (s: any) {
    //             console.log("success")
    //         }).catch(function (err: any) {
    //             console.log("err")
    //         })
    //     });
    // });

});
