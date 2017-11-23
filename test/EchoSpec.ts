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

    let server: any;
    before(function () {
        Log.test('Before: ' + (<any>this).test.parent.title);

        chai.use(chaiHttp);
        server = new Server(4321);
        return server.start();
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
        return server.stop();
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    // let content: string = "";
    //
    // content = fs.readFileSync("./rooms.zip", {encoding: "base64"})
    // console.log(content)

    // it("Test", function () {
    //     return IF.addDataset("rooms", content).then(function (data) {
    //         let dataset: any = {};
    //         let id = "rooms"
    //         let id2 = "courses"
    //         dataset["rooms"] = 123;
    //         dataset[id2] = 321
    //         console.log(dataset)
    //         console.log('success')
    //     }).catch(function (err) {
    //         console.log('testfail')
    //     })
    // });


    // it("Test2", function () {
    //     return IF.performQuery({
    //         "WHERE": {
    //             "IS": {
    //                 "rooms_name": "DMP_*"
    //             }
    //         },
    //         "OPTIONS": {
    //             "COLUMNS": [
    //                 "rooms_name"
    //             ],
    //             "ORDER": "rooms_name"
    //         }
    //     }).then(function (data) {
    //         console.log('query success')
    //     }).catch(function (err) {
    //         console.log('query testfail')
    //     })
    // });

    //
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

    it("PUT new", function () {
        chai.use(chaiHttp);
        // let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";
        console.log(1);

        return chai.request(URL)
            .put('/dataset/rooms')
            .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
            .then(function (res: Response) {
                //Log.trace('then:');
                // some assertions
                expect(res.status).to.deep.equal(204);

            })
            .catch(function (err) {
                console.log(err);
                Log.trace('catch:');
                // some assertions
                expect.fail();
            });
    });

    it("PUT old", function () {
        chai.use(chaiHttp);
        // let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";
        console.log(1);
        return chai.request(URL)
            .put('/dataset/rooms')
            .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
            .then(function (res: Response) {
                //Log.trace('then:');
                // some assertions
                expect(res.status).to.deep.equal(201);

            })
            .catch(function (err) {
                Log.trace('catch:');
                // some assertions
                expect.fail();
            });
    });

    it("PUT error", function () {

        chai.use(chaiHttp);
        // let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";
        console.log(1);
        return chai.request(URL)
            .put('/dataset/room')
            .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
            .then(function (res: Response) {
                //Log.trace('then:');
                // some assertions
               // expect(res.status).to.deep.equal(201);
                expect.fail();

            })
            .catch(function (err) {
                Log.trace('catch:');
                // some assertions
                expect(err.status).to.deep.equal(400);
            });
    });


    it("POST success", function () {
        chai.use(chaiHttp);
        // let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";
        console.log(1);
        return chai.request(URL)
            .post('/query')
            .send({
                "WHERE":{
                    "OR": [{"EQ":{"rooms_seats":100}},{"IS":{"rooms_name":"ANGU_037"}}]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "rooms_name",
                        "rooms_number","rooms_address"
                    ],
                    "ORDER":"rooms_number"
                }
            })
            .then(function (res: Response) {
                //Log.trace('then:');
                //console.log(res.body.body.result);
                expect(res.body.body).to.deep.equal({result:
                    [{rooms_name: 'ANGU_037', rooms_number: '037', rooms_address: '2053 Main Mall'},
                        {rooms_name: 'CEME_1202', rooms_number: '1202', rooms_address: '6250 Applied Science Lane'},
                        {rooms_name: 'GEOG_200', rooms_number: '200', rooms_address: '1984 West Mall'},
                        {rooms_name: 'IONA_301', rooms_number: '301', rooms_address: '6000 Iona Drive'}
                    ]});
                Log.test("successful query!");
                expect(res.status).to.deep.equal(200);
                // some assertions
            })
            .catch(function (err) {
                Log.trace('catch:' );
                // some assertions
                expect.fail();
            });
    });

    it("POST syntaxTestMissingFiled1", function () {
        chai.use(chaiHttp);
        // let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";
        console.log(1);
        return chai.request(URL)
            .post('/query')
            .send({
                "WHERE":{
                    "GT":{
                        "courses_avg":97
                    }
                }
            })
            .then(function (res: Response) {
                Log.test("OPTION is missing, shouldn't have fulfill")
                expect.fail()
            })
            .catch(function (err) {
                Log.test("successfully reject (missing options)");
                expect(err.status).to.deep.equal(400);
            });
    });

    it("DELETE sucessful", function () {
        chai.use(chaiHttp);
        // let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";
        console.log(1);
        return chai.request(URL)
            .del('/dataset/rooms')
            .then(function (res: Response) {
                expect(fs.existsSync("rooms")).eq(false);
                expect(res.status).eq(204);
            })
            .catch(function (err) {
                Log.trace('catch:');
                // some assertions
                expect.fail();
            });
    });

    it("DELETE unsucessful", function () {
        chai.use(chaiHttp);
        // let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";
        console.log(1);
        return chai.request(URL)
            .del('/dataset/rooms')
            .then(function (res: Response) {
                expect.fail();

            })
            .catch(function (err) {
                Log.trace('catch:');
                // some assertions
                expect(err.status).eq(404);
            });
    });

});