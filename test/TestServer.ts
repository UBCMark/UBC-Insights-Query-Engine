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

        // chai.use(chaiHttp);
        // server = new Server(4321);
        // return server.start();
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
        //return server.stop();
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


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
it("Test Server", function() {

    // Init
    chai.use(chaiHttp);
    let server = new Server(4321);
    let URL = "http://127.0.0.1:4321";

    // Test
    expect(server).to.not.equal(undefined);
    try{
        Server.echo((<restify.Request>{}), null, null);
        expect.fail()
    } catch(err) {
        expect(err.message).to.equal("Cannot read property 'json' of null");
    }

    return server.start().then(function(success: boolean) {
        return chai.request(URL)
            .get("/")
    }).catch(function(err) {
        expect.fail()
    }).then(function(res: Response) {
        expect(res.status).to.be.equal(200);
        return chai.request(URL)
            .get("/echo/Hello")
    }).catch(function(err) {
        expect.fail()
    }).then(function(res: Response) {
        expect(res.status).to.be.equal(200);
        return server.start()
    }).then(function(success: boolean) {
        expect.fail();
    }).catch(function(err) {
        expect(err.code).to.equal('EADDRINUSE');
        return server.stop();
    }).catch(function(err) {
        expect.fail();
    });
});
});
