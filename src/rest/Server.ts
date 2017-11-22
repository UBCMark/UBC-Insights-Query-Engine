/**
 * This is the REST entry point for the project.
 * Restify is configured here.
 */

import restify = require('restify');

import Log from "../Util";
import {InsightResponse} from "../controller/IInsightFacade";
import InsightFacade from "../controller/InsightFacade";

/**
 * This configures the REST endpoints for the server.
 */
export default class Server {

    private port: number;
    private rest: restify.Server;
    private static iFacade = new InsightFacade();

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
    }

    /**
     * Stops the server. Again returns a promise so we know when the connections have
     * actually been fully closed and the port has been released.
     *
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        Log.info('Server::close()');
        let that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    }

    private putDataset(req:restify.Request, res:restify.Response, next:restify.Next){
        //Get the dataset data coming from the request
        let dataStr = new Buffer(req.params.body).toString('base64');

        //let iFacade = new InsightFacade();
        let datasetName = req.params.id;

        let value = Server.iFacade.addDataset(datasetName,dataStr);

        value.then(function (values:any) {
            //Write to response object the code the code you're returning
            res.status(values.code);

            //Write to response object the json data you're returning
            res.json(values);

            //return this
            return next();
        }).catch(function (err:any) {
            res.send(err.code);
            return next();

        })
    }

    private removeDataset(req:restify.Request, res:restify.Response, next:restify.Next){
        //Get the dataset data coming from the request
        //let dataStr = new Buffer(req.params.body).toString('base64');

       // let iFacade = new InsightFacade();
        let datasetName = req.params.id;


        let value = Server.iFacade.removeDataset(datasetName);

        value.then(function (values:any) {
            //Write to response object the code the code you're returning
            res.status(values.code);

            //Write to response object the json data you're returning
            res.json(values);

            //return this
            return next();
        }).catch(function (err:any) {
            res.send(err.code);
            return next();
        })
    }

    private performQuery(req:restify.Request, res:restify.Response, next:restify.Next){
        //Get the dataset data coming from the request
        //let dataStr = new Buffer(req.params.body).toString('base64');

      //  let iFacade = new InsightFacade();
        //let datasetName = req.params.id;
        let queryParameter = req.body;


        let value = Server.iFacade.performQuery(queryParameter);

        value.then(function (values:any) {
            //Write to response object the code the code you're returning
            res.status(values.code);

            //Write to response object the json data you're returning
            res.json(values);

            //return this
            return next();
        }).catch(function (err:any) {
            res.send(err.code);
            return next;
        })
    }


    /**
     * Starts the server. Returns a promise with a boolean value. Promises are used
     * here because starting the server takes some time and we want to know when it
     * is done (and if it worked).
     *
     * @returns {Promise<boolean>}
     */
    public start(): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Log.info('Server::start() - start');

                that.rest = restify.createServer({
                    name: 'insightUBC'
                });
                that.rest.use(restify.bodyParser({mapParams: true, mapFiles: true}));

                // support CORS
                that.rest.use(function crossOrigin(req, res, next) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    return next();
                });

                that.rest.get('/', function (req: restify.Request, res: restify.Response, next: restify.Next) {
                    res.send(200);
                    return next();
                });

                // provides the echo service
                // curl -is  http://localhost:4321/echo/myMessage
                that.rest.get('/echo/:msg', Server.echo);

                // Other endpoints will go here

                that.rest.put('/dataset/:id',that.putDataset);
                that.rest.post('/query',that.performQuery);
                that.rest.del('/dataset/:id',that.removeDataset);

                that.rest.listen(that.port, function () {
                    Log.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });

                that.rest.on('error', function (err: string) {
                    // catches errors in restify start; unusual syntax due to internal node not using normal exceptions here
                    Log.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            } catch (err) {
                Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }

    // The next two methods handle the echo service.
    // These are almost certainly not the best place to put these, but are here for your reference.
    // By updating the Server.echo function pointer above, these methods can be easily moved.

    public static echo(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('Server::echo(..) - params: ' + JSON.stringify(req.params));
        try {
            let result = Server.performEcho(req.params.msg);
            Log.info('Server::echo(..) - responding ' + result.code);
            res.json(result.code, result.body);
        } catch (err) {
            Log.error('Server::echo(..) - responding 400');
            res.json(400, {error: err.message});
        }
        return next();
    }

    public static performEcho(msg: string): InsightResponse {
        if (typeof msg !== 'undefined' && msg !== null) {
            return {code: 200, body: {message: msg + '...' + msg}};
        } else {
            return {code: 400, body: {error: 'Message not provided'}};
        }
    }

}
