/**
 * Created by rtholmes on 2016-10-31.
 */
import fs = require("fs");
import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import chai = require('chai');
import chaiHttp = require('chai-http');
import Response = ChaiHttp.Response;
import restify = require('restify');
let jsz = require("jszip");
const parse5 = require('parse5');



describe("EchoSpec", function () {
    this.timeout(10000);


    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    var IF: InsightFacade = null;
    beforeEach(function () {
         IF = new InsightFacade();

    });


    // before(function () {
    //     Log.test('Before: ' + (<any>this).test.parent.title);
    // });
    //
    // beforeEach(function () {
    //     Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    // });
    //
    // after(function () {
    //     Log.test('After: ' + (<any>this).test.parent.title);
    // });
    //
    // afterEach(function () {
    //     Log.test('AfterTest: ' + (<any>this).currentTest.title);
    // });

    let content: string = "";

    content = fs.readFileSync("./rooms.zip", {encoding: "base64"})
    console.log(content)

    it("Test", function () {
        return IF.addDataset("rooms", content).then(function (data) {
            let dataset: any = {};
            let id = "rooms"
            let id2 = "courses"
            dataset["rooms"] = 123;
            dataset[id2] = 321
            console.log(dataset)
            console.log('success')
        }).catch(function (err) {
            console.log('testfail')
        })
    });


    it("Test2", function () {
        return IF.performQuery({
            "WHERE": {
                "IS": {
                    "rooms_name": "DMP_*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name"
            }
        }).then(function (data) {
            console.log('query success')
        }).catch(function (err) {
            console.log('query testfail')
        })
    });

    //
    // it("Should be able to echo", function () {
    //     let out = Server.performEcho('echo');
    //     Log.test(JSON.stringify(out));
    //     sanityCheck(out);
    //     expect(out.code).to.equal(200);
    //     expect(out.body).to.deep.equal({message: 'echo...echo'});
    // });
    //
    // it("Should be able to echo silence", function () {
    //     let out = Server.performEcho('');
    //     Log.test(JSON.stringify(out));
    //     sanityCheck(out);
    //     expect(out.code).to.equal(200);
    //     expect(out.body).to.deep.equal({message: '...'});
    // });
    //
    // it("Should be able to handle a missing echo message sensibly", function () {
    //     let out = Server.performEcho(undefined);
    //     Log.test(JSON.stringify(out));
    //     sanityCheck(out);
    //     expect(out.code).to.equal(400);
    //     expect(out.body).to.deep.equal({error: 'Message not provided'});
    // });
    //
    // it("Should be able to handle a null echo message sensibly", function () {
    //     let out = Server.performEcho(null);
    //     Log.test(JSON.stringify(out));
    //     sanityCheck(out);
    //     expect(out.code).to.equal(400);
    //     expect(out.body).to.have.property('error');
    //     expect(out.body).to.deep.equal({error: 'Message not provided'});
    // });
    //
    // it("Test Server", function() {
    //
    //     // Init
    //     chai.use(chaiHttp);
    //     let server = new Server(4321);
    //     let URL = "http://127.0.0.1:4321";
    //
    //     // Test
    //     expect(server).to.not.equal(undefined);
    //     try{
    //         Server.echo((<restify.Request>{}), null, null);
    //         expect.fail()
    //     } catch(err) {
    //         expect(err.message).to.equal("Cannot read property 'json' of null");
    //     }
    //
    //     return server.start().then(function(success: boolean) {
    //         return chai.request(URL)
    //             .get("/")
    //     }).catch(function(err) {
    //         expect.fail()
    //     }).then(function(res: Response) {
    //         expect(res.status).to.be.equal(200);
    //         return chai.request(URL)
    //             .get("/echo/Hello")
    //     }).catch(function(err) {
    //         expect.fail()
    //     }).then(function(res: Response) {
    //         expect(res.status).to.be.equal(200);
    //         return server.start()
    //     }).then(function(success: boolean) {
    //         expect.fail();
    //     }).catch(function(err) {
    //         expect(err.code).to.equal('EADDRINUSE');
    //         return server.stop();
    //     }).catch(function(err) {
    //         expect.fail();
    //     });
    // });
});
