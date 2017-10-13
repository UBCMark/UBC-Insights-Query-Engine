/**
 * Created by rtholmes on 2016-10-31.
 */

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
            //expect(true).eq((true));


        }).catch(function (err) {
            console.log(err);

        });
        //expect(true).eq((true));

    });

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

        }).catch(function (err) {
            console.log(err);

        });
        //expect(true).eq((true));

    });

});