import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
var fs = require("fs");
describe("Test", function() {
    var IF: InsightFacade = null;
    beforeEach(function () {
        IF = new InsightFacade();
    });


    it("testNullQuery", function(){
        return IF.performQuery(null).then(function (result: any){
            Log.test("query is null, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject Null input")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestEmptyQuery", function(){
        return IF.performQuery({})
            .then(function (result: any){
                Log.test("query is empty, shouldn't have fulfill")
                expect.fail()
            }).catch(function (err) {
                Log.test("successfully reject Null input")
                expect(err.code).to.deep.equal(400)
            })
    });

    it("syntaxTestMissingFiled1", function(){
        return IF.performQuery({
            "WHERE":{
                "GT":{
                    "courses_avg":97
                }
            }
        }).then(function (result: any){
            Log.test("OPTION is missing, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (missing options)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestMissingFiled2", function(){
        return IF.performQuery({
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("WHERE is missing, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (missing WHERE)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestExtraFiled", function(){
        return IF.performQuery({
            "WHERE":{
                "GT":{
                    "courses_avg":97
                }
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            },
            "EXTRA":{}
        }).then(function (result: any){
            Log.test("Extra field, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (extra field)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestNOTnonFilter", function(){
        return IF.performQuery({
            "WHERE": {
                "NOT": {
                    "WTF": {
                        "courses_avg": 97
                    }
                }
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("non-filter in NOT, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (non-filter in NOT)")
            expect(err.code).to.deep.equal(400)
        })
    });

    it("syntaxTestWrongKey(OPTIONS)", function(){
        return IF.performQuery({
            "WHERE":{
                "GT":{
                    "courses_avg":97
                }
            },
            "OPTION":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong key, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong key)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongKey(COLUMN)", function(){
        return IF.performQuery({
            "WHERE":{
                "GT":{
                    "courses_avg":97
                }
            },
            "OPTION":{
                "COLUMN":[
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong key, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong key)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongKey(ORDER)", function(){
        return IF.performQuery({
            "WHERE":{
                "GT":{
                    "courses_avg":97
                }
            },
            "OPTION":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDERS":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong key, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong key)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongAND", function(){
        return IF.performQuery({
            "WHERE":{
                "and": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong AND, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong AND)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongOR", function(){
        return IF.performQuery({
            "WHERE":{
                "or": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong OR, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong OR)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongGT", function(){
        return IF.performQuery({
            "WHERE":{
                "AND": [{"gt":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong GT, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong GT)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongLT", function(){
        return IF.performQuery({
            "WHERE":{
                "AND": [{"lt":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong LT, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong LT)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongEQ", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"eq":{"courses_pass":9}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong EQ, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong EQ)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestWrongIS", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_avg":90}},{"is":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("wrong IS, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (wrong IS)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestEmptyAND", function(){
        return IF.performQuery({
            "WHERE":{
                "AND": []
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("empty AND, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty AND)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestEmptyOR", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": []
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("empty OR, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty OR)")
            expect(err.code).to.deep.equal(400)
        })
    });


    it("syntaxTestEmptyCol", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("syntaxTestNoFilter", function(){
        return IF.performQuery({
            "WHERE":123,
            "OPTIONS":{
                "COLUMNS":[
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("no Filter, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (no Filter)")
            expect(err.code).to.deep.equal(400)
        })
    });

    it("semanticTestWrongkey1", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_ag":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":"330"}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("semanticTestWrongkey2", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_det":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("semanticTestWrongkey3", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_idd",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("semanticTestWrongType", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":330}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("semanticTestOrderNotInCol", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_pass"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });

    it ("SemanticTestWierdIs", function() {
        return IF.performQuery({
                "WHERE":{
                    "AND": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"*adhee"}},{"IS":{"courses_id":'330'}}]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            expect(result.body).to.deep.equal({
                result: []});
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail()
        })
    });


    it ("SemanticTestWierdIs2", function() {
        return IF.performQuery(   {
                "WHERE": {
                    "AND": [
                        {
                            "IS": {
                                "courses_dept": "bio*"
                            }
                        },
                        {
                            "GT": {
                                "courses_avg": 92
                            }
                        }

                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_avg"
                    ],
                    "ORDER": "courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            expect(result.body).to.deep.equal({
                result:
                    [
                        {courses_dept: 'biol', courses_avg: 92.1},
                        {courses_dept: 'biol', courses_avg: 92.1},
                        {courses_dept: 'biol', courses_avg: 92.19},
                        {courses_dept: 'biol', courses_avg: 92.19},
                        {courses_dept: 'biof', courses_avg: 92.33},
                        {courses_dept: 'biof', courses_avg: 92.33},
                        {courses_dept: 'biol', courses_avg: 92.36},
                        {courses_dept: 'biol', courses_avg: 92.36},
                        {courses_dept: 'biof', courses_avg: 93.45},
                        {courses_dept: 'biof', courses_avg: 93.45},
                        {courses_dept: 'biol', courses_avg: 94.33},
                        {courses_dept: 'biol', courses_avg: 94.33},
                    ]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail()
        })
    });
    it ("SemanticTestWierdIs3", function() {
        return IF.performQuery(   {
                "WHERE": {
                    "AND": [
                        {
                            "IS": {
                                "courses_dept": "*psc"
                            }
                        },
                        {
                            "IS": {
                                "courses_instructor": "*, g*"
                            }
                        },
                        {
                            "GT": {
                                "courses_avg": 92
                            }
                        }

                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_instructor",
                        "courses_dept",
                        "courses_avg"
                    ],
                    "ORDER": "courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");

            expect(result.body).to.deep.equal({
                result:
                    [
                        {courses_instructor: "tsiknis, georgios", courses_dept: "cpsc", courses_avg: 92.5},
                        {courses_instructor: "tsiknis, georgios", courses_dept: "cpsc", courses_avg: 93.38},
                        {courses_instructor: "carenini, giuseppe", courses_dept: "cpsc", courses_avg: 94.5}
                    ]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail()
        })
    });

    it ("SemanticTestWierdIs4", function() {
        return IF.performQuery(   {
                "WHERE": {
                    "AND": [
                        {
                            "IS": {
                                "courses_dept": "cpsc"
                            }
                        },
                        {
                            "IS": {
                                "courses_instructor": "**"
                            }
                        },
                        {
                            "GT": {
                                "courses_avg": 94
                            }
                        }

                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_instructor",
                        "courses_dept",
                        "courses_avg"
                    ],
                    "ORDER": "courses_avg"
                }
            }

        ).then(function (result: any) {
            Log.test("successful query!");

            expect(result.body).to.deep.equal({
                result:
                    [
                        {courses_instructor: "carenini, giuseppe", courses_dept: "cpsc", courses_avg: 94.5},
                        {courses_instructor: "", courses_dept: "cpsc", courses_avg: 94.5},
                        {courses_instructor: "", courses_dept: "cpsc", courses_avg: 95},
                        {courses_instructor: "", courses_dept: "cpsc", courses_avg: 95}
                    ]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail()
        })
    });








    it ("TestComplexAnd", function() {
        return IF.performQuery({
                "WHERE":{
                    "AND": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            expect(result.body).to.deep.equal({
                result:
                    [{ courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
                    ] });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("testComplexOr", function() {
        return IF.performQuery({
                "WHERE":{
                    "OR":[
                        {
                            "AND":[
                                {
                                    "GT":{
                                        "courses_avg":90
                                    }
                                },
                                {
                                    "IS":{
                                        "courses_dept":"adhe"
                                    }
                                }
                            ]
                        },
                        {
                            "EQ":{
                                "courses_avg":95
                            }
                        },
                        {
                            "GT": {
                                "courses_avg": 99
                            }
                        }
                    ]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            expect(result.body).to.deep.equal({result:
                [{ courses_dept: 'adhe', courses_avg: 90.02 },
                    { courses_dept: 'adhe', courses_avg: 90.16 },
                    { courses_dept: 'adhe', courses_avg: 90.17 },
                    { courses_dept: 'adhe', courses_avg: 90.18 },
                    { courses_dept: 'adhe', courses_avg: 90.5 },
                    { courses_dept: 'adhe', courses_avg: 90.72 },
                    { courses_dept: 'adhe', courses_avg: 90.82 },
                    { courses_dept: 'adhe', courses_avg: 90.85 },
                    { courses_dept: 'adhe', courses_avg: 91.29 },
                    { courses_dept: 'adhe', courses_avg: 91.33 },
                    { courses_dept: 'adhe', courses_avg: 91.33 },
                    { courses_dept: 'adhe', courses_avg: 91.48 },
                    { courses_dept: 'adhe', courses_avg: 92.54 },
                    { courses_dept: 'adhe', courses_avg: 93.33 },
                    { courses_dept: 'rhsc', courses_avg: 95 },
                    { courses_dept: 'bmeg', courses_avg: 95 },
                    { courses_dept: 'bmeg', courses_avg: 95 },
                    { courses_dept: 'cnps', courses_avg: 95 },
                    { courses_dept: 'cnps', courses_avg: 95 },
                    { courses_dept: 'psyc', courses_avg: 95 },
                    { courses_dept: 'cpsc', courses_avg: 95 },
                    { courses_dept: 'cpsc', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_avg: 95 },
                    { courses_dept: 'crwr', courses_avg: 95 },
                    { courses_dept: 'sowk', courses_avg: 95 },
                    { courses_dept: 'econ', courses_avg: 95 },
                    { courses_dept: 'edcp', courses_avg: 95 },
                    { courses_dept: 'edcp', courses_avg: 95 },
                    { courses_dept: 'epse', courses_avg: 95 },
                    { courses_dept: 'epse', courses_avg: 95 },
                    { courses_dept: 'epse', courses_avg: 95 },
                    { courses_dept: 'kin', courses_avg: 95 },
                    { courses_dept: 'kin', courses_avg: 95 },
                    { courses_dept: 'kin', courses_avg: 95 },
                    { courses_dept: 'psyc', courses_avg: 95 },
                    { courses_dept: 'obst', courses_avg: 95 },
                    { courses_dept: 'math', courses_avg: 95 },
                    { courses_dept: 'math', courses_avg: 95 },
                    { courses_dept: 'mtrl', courses_avg: 95 },
                    { courses_dept: 'mtrl', courses_avg: 95 },
                    { courses_dept: 'mtrl', courses_avg: 95 },
                    { courses_dept: 'musc', courses_avg: 95 },
                    { courses_dept: 'musc', courses_avg: 95 },
                    { courses_dept: 'musc', courses_avg: 95 },
                    { courses_dept: 'musc', courses_avg: 95 },
                    { courses_dept: 'musc', courses_avg: 95 },
                    { courses_dept: 'musc', courses_avg: 95 },
                    { courses_dept: 'nurs', courses_avg: 95 },
                    { courses_dept: 'nurs', courses_avg: 95 },
                    { courses_dept: 'econ', courses_avg: 95 },
                    { courses_dept: 'adhe', courses_avg: 96.11 },
                    { courses_dept: 'cnps', courses_avg: 99.19 },
                    { courses_dept: 'math', courses_avg: 99.78 },
                    { courses_dept: 'math', courses_avg: 99.78 } ]});
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("testNOT", function(){
        return IF.performQuery({
                "WHERE":
                    {
                        "NOT":
                            {"OR" :
                                [{"LT": {"courses_avg": 93.5}},
                                    {"GT": {"courses_avg":94}},
                                    {"NOT":{"IS": {"courses_id": "512"}}}]
                            }},
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            expect(result.body).to.deep.equal({
                result:
                    [ { courses_dept: 'epse', courses_id: '512', courses_avg: 93.71 },
                        { courses_dept: 'epse', courses_id: '512', courses_avg: 93.73 },
                        { courses_dept: 'epse', courses_id: '512', courses_avg: 93.74 },
                        { courses_dept: 'epse', courses_id: '512', courses_avg: 93.79 },
                        { courses_dept: 'epse', courses_id: '512', courses_avg: 93.83 },
                        { courses_dept: 'epse', courses_id: '512', courses_avg: 93.97 },
                    ] });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });



    it("test2", function() {
        return IF.performQuery({
                "WHERE":{
                    "OR":[
                        {
                            "AND":[
                                {
                                    "GT":{
                                        "courses_avg":90
                                    }
                                },
                                {
                                    "IS":{
                                        "courses_dept":"adhe"
                                    }
                                }
                            ]
                        },
                        {
                            "EQ":{
                                "courses_avg":95
                            }
                        }
                    ]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");

            expect(result.body).to.deep.equal({
                result:
                    [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
                        { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
                        { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
                        { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                        { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
                        { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
                        { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
                        { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
                        { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                        { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                        { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                        { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                        { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                        { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                        { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
                        { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                        { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                        { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                        { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
                        { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                        { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                        { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
                        { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                        { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                        { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                        { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                        { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                        { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                        { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
                        { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                        { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                        { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                        { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                        { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                        { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                        { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                        { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                        { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
                        { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                        { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                        { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                        { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("test1", function() {
        return IF.performQuery({
                "WHERE":{
                    "GT":{
                        "courses_avg":97
                    }
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            expect(result.body).to.deep.equal({
                result:
                    [ { courses_dept: 'epse', courses_avg: 97.09 },
                        { courses_dept: 'math', courses_avg: 97.09 },
                        { courses_dept: 'math', courses_avg: 97.09 },
                        { courses_dept: 'epse', courses_avg: 97.09 },
                        { courses_dept: 'math', courses_avg: 97.25 },
                        { courses_dept: 'math', courses_avg: 97.25 },
                        { courses_dept: 'epse', courses_avg: 97.29 },
                        { courses_dept: 'epse', courses_avg: 97.29 },
                        { courses_dept: 'nurs', courses_avg: 97.33 },
                        { courses_dept: 'nurs', courses_avg: 97.33 },
                        { courses_dept: 'epse', courses_avg: 97.41 },
                        { courses_dept: 'epse', courses_avg: 97.41 },
                        { courses_dept: 'cnps', courses_avg: 97.47 },
                        { courses_dept: 'cnps', courses_avg: 97.47 },
                        { courses_dept: 'math', courses_avg: 97.48 },
                        { courses_dept: 'math', courses_avg: 97.48 },
                        { courses_dept: 'educ', courses_avg: 97.5 },
                        { courses_dept: 'nurs', courses_avg: 97.53 },
                        { courses_dept: 'nurs', courses_avg: 97.53 },
                        { courses_dept: 'epse', courses_avg: 97.67 },
                        { courses_dept: 'epse', courses_avg: 97.69 },
                        { courses_dept: 'epse', courses_avg: 97.78 },
                        { courses_dept: 'crwr', courses_avg: 98 },
                        { courses_dept: 'crwr', courses_avg: 98 },
                        { courses_dept: 'epse', courses_avg: 98.08 },
                        { courses_dept: 'nurs', courses_avg: 98.21 },
                        { courses_dept: 'nurs', courses_avg: 98.21 },
                        { courses_dept: 'epse', courses_avg: 98.36 },
                        { courses_dept: 'epse', courses_avg: 98.45 },
                        { courses_dept: 'epse', courses_avg: 98.45 },
                        { courses_dept: 'nurs', courses_avg: 98.5 },
                        { courses_dept: 'nurs', courses_avg: 98.5 },
                        { courses_dept: 'epse', courses_avg: 98.58 },
                        { courses_dept: 'nurs', courses_avg: 98.58 },
                        { courses_dept: 'nurs', courses_avg: 98.58 },
                        { courses_dept: 'epse', courses_avg: 98.58 },
                        { courses_dept: 'epse', courses_avg: 98.7 },
                        { courses_dept: 'nurs', courses_avg: 98.71 },
                        { courses_dept: 'nurs', courses_avg: 98.71 },
                        { courses_dept: 'eece', courses_avg: 98.75 },
                        { courses_dept: 'eece', courses_avg: 98.75 },
                        { courses_dept: 'epse', courses_avg: 98.76 },
                        { courses_dept: 'epse', courses_avg: 98.76 },
                        { courses_dept: 'epse', courses_avg: 98.8 },
                        { courses_dept: 'spph', courses_avg: 98.98 },
                        { courses_dept: 'spph', courses_avg: 98.98 },
                        { courses_dept: 'cnps', courses_avg: 99.19 },
                        { courses_dept: 'math', courses_avg: 99.78 },
                        { courses_dept: 'math', courses_avg: 99.78 } ] });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    //.............................................................................. Test rooms


    it("RsemanticTestWrongkey1", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"rooms_lo":90}},{"IS":{"rooms_address":"adhe"}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "rooms_name",
                    "rooms_type"
                ],
                "ORDER":"rooms_name"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("RsemanticTestWrongkey2", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"rooms_lon":90}},{"IS":{"rooms_addres":"adhe"}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "rooms_name",
                    "rooms_type"
                ],
                "ORDER":"rooms_name"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });
    it("RsemanticTestWrongkey3", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"rooms_lon":90}},{"IS":{"rooms_address":"adhe"}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "rooms_nam",
                    "rooms_type"
                ],
                "ORDER":"rooms_name"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });

    it("RsemanticTestWrongType", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"LT":{"rooms_lon":"50"}},{"IS":{"rooms_address":"adhe"}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "rooms_name",
                    "rooms_type"
                ],
                "ORDER":"rooms_name"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });

    it("RsemanticTestOrderNotInCol", function(){
        return IF.performQuery({
            "WHERE":{
                "OR": [{"GT":{"rooms_lon":90}},{"IS":{"rooms_address":"adhe"}}]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "rooms_name",
                    "rooms_type"
                ],
                "ORDER":"rooms_seats"
            }
        }).then(function (result: any){
            Log.test("empty Col, shouldn't have fulfill")
            expect.fail()
        }).catch(function (err) {
            Log.test("successfully reject (empty Col)")
            expect(err.code).to.deep.equal(400)
        })
    });

    it("RtestNOT", function(){
        return IF.performQuery({
                "WHERE":{
                    "NOT": {
                        "OR": [{"GT":{"rooms_seats":10}},{"IS":{"rooms_name":"*C*"}}, {"IS": {"rooms_shortname": "*R*"}}]}
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "rooms_name",
                        "rooms_furniture",
                        "rooms_address"
                    ],
                    "ORDER":"rooms_name"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");

            expect(result.body).to.deep.equal({
                result:
                    [ {rooms_name: 'WOOD_G53', rooms_furniture: 'Classroom-Movable Tables & Chairs', rooms_address: '2194 Health Sciences Mall'},
                        {rooms_name: 'WOOD_G55', rooms_furniture: 'Classroom-Movable Tables & Chairs', rooms_address: '2194 Health Sciences Mall'},
                        {rooms_name: 'WOOD_G59', rooms_furniture: 'Classroom-Movable Tables & Chairs', rooms_address: '2194 Health Sciences Mall'}
                    ] });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });



    it("Rtest2", function() {
        return IF.performQuery(   {
                "WHERE": {
                    "IS": {
                        "rooms_name": "UCLL_*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name"
                    ],
                    "ORDER": "rooms_name"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");

            expect(result.body).to.deep.equal({
                result: [{
                    "rooms_name": "UCLL_101"
                }, {
                    "rooms_name": "UCLL_103"
                }, {
                    "rooms_name": "UCLL_107"
                }, {
                    "rooms_name": "UCLL_109"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });



    it("Rtest3", function() {
        return IF.performQuery(   {
                "WHERE": {
                    "OR":[{
                        "AND":[{"NOT": {"NOT":{
                            "NOT": {"OR": [{"GT":{
                                "courses_year":1900
                            }}, {"AND": [{"NOT": {"NOT": {"NOT": {"LT": {"courses_avg":0}}}}}]}]}}}}, {"OR":[{"IS":{
                            "courses_instructor": "*lis*"
                        }
                        },{
                            "IS":{
                                "courses_dept":"cpsc"
                            }
                        }

                        ]}
                        ]},{"EQ":{
                        "courses_avg":98

                    }}]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_instructor",
                        "courses_year",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                result: [{
                    "courses_instructor": "maillard, keith", "courses_year":2013, "courses_avg":98
                }, {
                    "courses_instructor": "grady, albert wayne", "courses_year":2013, "courses_avg":98
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });


        // remove

    it ("RTestComplexAnd", function() {
        return IF.performQuery({
                "WHERE":{
                    "AND": [{"LT":{"rooms_seats":100}},{"IS":{"rooms_name":"DMP_*"}}]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "rooms_name",
                        "rooms_type","rooms_seats"
                    ],
                    "ORDER":"rooms_name"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                result:
                    [{rooms_name: 'DMP_101', rooms_type: 'Small Group', rooms_seats: 40},
                        {rooms_name: 'DMP_201', rooms_type: 'Small Group', rooms_seats: 40},
                        {rooms_name: 'DMP_301', rooms_type: 'Tiered Large Group', rooms_seats: 80}
                    ] });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });


    it("RtestComplexOr", function() {
        return IF.performQuery({
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
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({result:
                [{rooms_name: 'ANGU_037', rooms_number: '037', rooms_address: '2053 Main Mall'},
                    {rooms_name: 'CEME_1202', rooms_number: '1202', rooms_address: '6250 Applied Science Lane'},
                    {rooms_name: 'GEOG_200', rooms_number: '200', rooms_address: '1984 West Mall'},
                    {rooms_name: 'IONA_301', rooms_number: '301', rooms_address: '6000 Iona Drive'}
                ]});
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });




    it("Rtest1", function() {
        return IF.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_address": "*Agrono*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_address", "rooms_name"
                    ]
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                result: [{
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4074"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4068"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4058"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4018"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4004"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3074"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3068"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3058"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3018"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3004"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_1001"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4072"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4062"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4052"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4016"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_4002"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3072"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3062"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3052"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3016"
                }, {
                    "rooms_address": "6363 Agronomy Road",
                    "rooms_name": "ORCH_3002"
                }, {
                    "rooms_address": "6245 Agronomy Road V6T 1Z4",
                    "rooms_name": "DMP_310"
                }, {
                    "rooms_address": "6245 Agronomy Road V6T 1Z4",
                    "rooms_name": "DMP_201"
                }, {
                    "rooms_address": "6245 Agronomy Road V6T 1Z4",
                    "rooms_name": "DMP_101"
                }, {
                    "rooms_address": "6245 Agronomy Road V6T 1Z4",
                    "rooms_name": "DMP_301"
                }, {
                    "rooms_address": "6245 Agronomy Road V6T 1Z4",
                    "rooms_name": "DMP_110"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });



    it("Rtest3", function() {
        return IF.performQuery(   {
                "WHERE": {
                    "OR":[{
                        "AND":[{"NOT": {"NOT":{
                            "NOT": {"OR": [{"GT":{
                                "courses_year":1900
                            }}, {"AND": [{"NOT": {"NOT": {"NOT": {"LT": {"courses_avg":0}}}}}]}]}}}}, {"OR":[{"IS":{
                            "courses_instructor": "*lis*"
                        }
                        },{
                            "IS":{
                                "courses_dept":"cpsc"
                            }
                        }

                        ]}
                        ]},{"EQ":{
                        "courses_avg":98

                    }}]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_instructor",
                        "courses_year",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg"
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                result: [{
                    "courses_instructor": "maillard, keith", "courses_year":2013, "courses_avg":98
                }, {
                    "courses_instructor": "grady, albert wayne", "courses_year":2013, "courses_avg":98
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("RtestForUCLL", function() {
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
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                result: [{
                    "rooms_name": "DMP_101"
                }, {
                    "rooms_name": "DMP_110"
                }, {
                    "rooms_name": "DMP_201"
                }, {
                    "rooms_name": "DMP_301"
                }, {
                    "rooms_name": "DMP_310"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

//
//
//     //********************************* D3
//
//     // **************************************new query!!
//

    it("D3testSample1", function() {
        return IF.performQuery(   {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "maxSeats"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["maxSeats"]  // or "keys": "maxSeats"
                    }
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [{
                        "maxSeats": {
                            "MAX": "rooms_seats"
                        }
                    }]
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                "result": [{
                    "rooms_shortname": "OSBO",
                    "maxSeats": 442
                }, {
                    "rooms_shortname": "HEBB",
                    "maxSeats": 375
                }, {
                    "rooms_shortname": "LSC",
                    "maxSeats": 350
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });


    it("D3testSample2", function() {
        return IF.performQuery(       {
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_furniture"
                    ],
                    "ORDER": "rooms_furniture"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_furniture"],
                    "APPLY": []
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                "result": [{
                    "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
                }, {
                    "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
                }, {
                    "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
                }, {
                    "rooms_furniture": "Classroom-Fixed Tablets"
                }, {
                    "rooms_furniture": "Classroom-Hybrid Furniture"
                }, {
                    "rooms_furniture": "Classroom-Learn Lab"
                }, {
                    "rooms_furniture": "Classroom-Movable Tables & Chairs"
                }, {
                    "rooms_furniture": "Classroom-Movable Tablets"
                }, {
                    "rooms_furniture": "Classroom-Moveable Tables & Chairs"
                }, {
                    "rooms_furniture": "Classroom-Moveable Tablets"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });



    it("D3testSort", function() {
        return IF.performQuery(       {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 300
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname"
                    ]
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                "result": [{
                    "rooms_shortname": "OSBO"
                }, {
                    "rooms_shortname": "LSC"
                }, {
                    "rooms_shortname": "LSC"
                }, {
                    "rooms_shortname": "HEBB"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });


    it("D3testSortOneKey", function() {
        return IF.performQuery(         {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 270
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname","rooms_number"
                    ],
                    "ORDER": {
                        "dir": "UP",
                        "keys": ["rooms_shortname", "rooms_number"]}
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                "result": [{
                    "rooms_shortname": "HEBB","rooms_number":"100"
                }, {
                    "rooms_shortname": "LSC","rooms_number":"1001"
                }, {
                    "rooms_shortname": "LSC","rooms_number":"1002"
                }, {
                    "rooms_shortname": "OSBO","rooms_number":"A"
                }, {
                    "rooms_shortname": "SRC","rooms_number":"220A"
                },{
                    "rooms_shortname": "SRC","rooms_number":"220B"
                },{
                    "rooms_shortname": "SRC","rooms_number":"220C"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });


    it("D3testSortTwoKeys", function() {
        return IF.performQuery(         {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_furniture": "*Tables*"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 270
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname","rooms_number"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["rooms_shortname","rooms_number"]}
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                "result": [{
                    "rooms_shortname": "SRC","rooms_number":"220C"
                }, {
                    "rooms_shortname": "SRC","rooms_number":"220B"
                }, {
                    "rooms_shortname": "SRC","rooms_number":"220A"
                }, {
                    "rooms_shortname": "OSBO","rooms_number":"A"
                }, {
                    "rooms_shortname": "LSC","rooms_number":"1002"
                },{
                    "rooms_shortname": "LSC","rooms_number":"1001"
                },{
                    "rooms_shortname": "HEBB","rooms_number":"100"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("D3testSortTwoKeys2", function() {
        return IF.performQuery(         {
                "WHERE": {
                    "AND": [{
                        "IS": {
                            "rooms_number": "*00"
                        }
                    }, {
                        "GT": {
                            "rooms_seats": 200
                        }
                    }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname","rooms_number"
                    ],
                    "ORDER": {
                        "dir": "UP",
                        "keys": ["rooms_number","rooms_shortname"]}
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                "result": [{
                    "rooms_shortname": "GEOG","rooms_number":"100"
                }, {
                    "rooms_shortname": "HEBB","rooms_number":"100"
                }, {
                    "rooms_shortname": "MATH","rooms_number":"100"
                }, {
                    "rooms_shortname": "SCRF","rooms_number":"100"
                }, {
                    "rooms_shortname": "WESB","rooms_number":"100"
                }, {
                    "rooms_shortname": "HENN","rooms_number":"200"
                }, {
                    "rooms_shortname": "LSK","rooms_number":"200"
                }, {
                    "rooms_shortname": "BIOL","rooms_number":"2000"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });
//
//     // **** test Group without Apply
//
    it( "D3testGroupNoApply", function() {
        return IF.performQuery(   {"WHERE": {
                "IS": {"rooms_shortname": "*K*"}
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname"


                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["rooms_shortname"]
                    }
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [
                    ]
                }
            }
        ).then(function (result: any) {
            Log.test("successful query!");
            console.log(result.body)
            expect(result.body).to.deep.equal({
                "result": [{
                    "rooms_shortname": "SOWK"
                }, {
                    "rooms_shortname": "LSK"
                }, {
                    "rooms_shortname": "BRKX"
                }]
            });
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//     //
//     // // remove
    it("test removeDataset", function () {

        IF.removeDataset("courses").then(function (data) {
            expect(fs.existsSync("courses")).eq(false);
            expect(data.code).eq(204);

        }).catch(function (err) {
            console.log(err);
        })
    });


    it("test removeDatasetwithWrongID", function () {
        IF.removeDataset("course").then(function (data) {
            expect.fail();
        }).catch(function (err) {
            expect(fs.existsSync("courses")).eq(false);
            expect(err.code).eq(404);
        });
    });

    it("test removeDatasetAgain", function () {
        IF.removeDataset("courses").then(function (data) {
            expect.fail();
        }).catch(function (err) {
            expect(fs.existsSync("courses")).eq(false);
            expect(err.code).eq(404);
        });
    });


    //remove rooms
    it("test removeDataset", function () {

        IF.removeDataset("rooms").then(function (data) {
            expect(fs.existsSync("rooms")).eq(false);
            expect(data.code).eq(204);

        }).catch(function (err) {
            console.log(err);
        })
    });


    it("test removeDatasetwithWrongID", function () {
        IF.removeDataset("room").then(function (data) {
            expect.fail();
        }).catch(function (err) {
            expect(fs.existsSync("rooms")).eq(false);
            expect(err.code).eq(404);
        });
    });

    it("test removeDatasetAgain", function () {
        IF.removeDataset("rooms").then(function (data) {
            expect.fail();
        }).catch(function (err) {
            expect(fs.existsSync("rooms")).eq(false);
            expect(err.code).eq(404);
        });
    });


    it("RtestComplexOr AfterRemove", function() {
        return IF.performQuery({
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
            }
        ).then(function (result: any) {
           expect.fail();
        }).catch(function (err) {
            expect(err.code).eq(424);
        })
    });

    //perform query after remove
    it("RtestComplexOr1111111 AfterRemove", function() {
        return IF.performQuery({
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
            }
        ).then(function (result: any) {
            expect.fail();
        }).catch(function (err) {
            expect(err.code).eq(424);
        })
    });
//
//
//
//
//
 })