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
    //
    // it("testNullQuery", function(){
    //     return IF.performQuery(null).then(function (result: any){
    //         Log.test("query is null, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject Null input")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestEmptyQuery", function(){
    //     return IF.performQuery({})
    //         .then(function (result: any){
    //             Log.test("query is empty, shouldn't have fulfill")
    //             expect.fail()
    //     }).catch(function (err) {
    //             Log.test("successfully reject Null input")
    //             expect(err.code).to.deep.equal(400)
    //     })
    // });
    //
    // it("syntaxTestMissingFiled1", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "GT":{
    //                 "courses_avg":97
    //             }
    //         }
    //     }).then(function (result: any){
    //             Log.test("OPTION is missing, shouldn't have fulfill")
    //             expect.fail()
    //         }).catch(function (err) {
    //             Log.test("successfully reject (missing options)")
    //             expect(err.code).to.deep.equal(400)
    //         })
    // });
    // it("syntaxTestMissingFiled2", function(){
    //     return IF.performQuery({
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("WHERE is missing, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (missing WHERE)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestExtraFiled", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "GT":{
    //                 "courses_avg":97
    //             }
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         },
    //         "EXTRA":{}
    //     }).then(function (result: any){
    //         Log.test("Extra field, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (extra field)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestNOTnonFilter", function(){
    //     return IF.performQuery({
    //         "WHERE": {
    //             "NOT": {
    //                 "WTF": {
    //                     "courses_avg": 97
    //                 }
    //             }
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("non-filter in NOT, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (non-filter in NOT)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    //
    // it("syntaxTestWrongKey(OPTIONS)", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "GT":{
    //                 "courses_avg":97
    //             }
    //         },
    //         "OPTION":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong key, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong key)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongKey(COLUMN)", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "GT":{
    //                 "courses_avg":97
    //             }
    //         },
    //         "OPTION":{
    //             "COLUMN":[
    //                 "courses_dept",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong key, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong key)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongKey(ORDER)", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "GT":{
    //                 "courses_avg":97
    //             }
    //         },
    //         "OPTION":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_avg"
    //             ],
    //             "ORDERS":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong key, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong key)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongAND", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "and": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong AND, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong AND)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongOR", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "or": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong OR, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong OR)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongGT", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "AND": [{"gt":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong GT, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong GT)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongLT", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "AND": [{"lt":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong LT, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong LT)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongEQ", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"eq":{"courses_pass":9}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong EQ, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong EQ)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestWrongIS", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_avg":90}},{"is":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("wrong IS, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (wrong IS)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestEmptyAND", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "AND": []
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty AND, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty AND)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestEmptyOR", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": []
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty OR, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty OR)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    //
    //
    // it("syntaxTestEmptyCol", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty Col, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty Col)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("syntaxTestNoFilter", function(){
    //     return IF.performQuery({
    //         "WHERE":123,
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("no Filter, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (no Filter)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    //
    // it("semanticTestWrongkey1", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_ag":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":"330"}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty Col, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty Col)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("semanticTestWrongkey2", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_det":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty Col, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty Col)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("semanticTestWrongkey3", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_idd",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty Col, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty Col)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("semanticTestWrongType", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":330}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty Col, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty Col)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    // it("semanticTestOrderNotInCol", function(){
    //     return IF.performQuery({
    //         "WHERE":{
    //             "OR": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_pass"
    //         }
    //     }).then(function (result: any){
    //         Log.test("empty Col, shouldn't have fulfill")
    //         expect.fail()
    //     }).catch(function (err) {
    //         Log.test("successfully reject (empty Col)")
    //         expect(err.code).to.deep.equal(400)
    //     })
    // });
    //
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
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // it ("TestComplexAnd", function() {
    //     return IF.performQuery({
    //         "WHERE":{
    //             "AND": [{"GT":{"courses_avg":90}},{"IS":{"courses_dept":"adhe"}},{"IS":{"courses_id":'330'}}]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg"
    //         }
    //     }
    // ).then(function (result: any) {
    //         Log.test("successful query!");
    //         expect(result.body).to.deep.equal({
    //             result:
    //                 [{ courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
    //                     { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
    //                     { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
    //                     { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
    //                     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
    //                     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
    //                     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
    //                     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
    //                      ] });
    //     }).catch(function (err) {
    //         Log.test('Error: ' + err);
    //         expect.fail();
    //     })
    // });
    //
    // it("testComplexOr", function() {
    //     return IF.performQuery({
    //             "WHERE":{
    //                 "OR":[
    //                     {
    //                         "AND":[
    //                             {
    //                                 "GT":{
    //                                     "courses_avg":90
    //                                 }
    //                             },
    //                             {
    //                                 "IS":{
    //                                     "courses_dept":"adhe"
    //                                 }
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "EQ":{
    //                             "courses_avg":95
    //                         }
    //                     },
    //                     {
    //                         "GT": {
    //                             "courses_avg": 99
    //                         }
    //                     }
    //                 ]
    //             },
    //             "OPTIONS":{
    //                 "COLUMNS":[
    //                     "courses_dept",
    //                     "courses_avg"
    //                 ],
    //                 "ORDER":"courses_avg"
    //             }
    //         }
    //     ).then(function (result: any) {
    //         Log.test("successful query!");
    //         expect(result.body).to.deep.equal({result:
    //                 [{ courses_dept: 'adhe', courses_avg: 90.02 },
    //                         { courses_dept: 'adhe', courses_avg: 90.16 },
    //                         { courses_dept: 'adhe', courses_avg: 90.17 },
    //                         { courses_dept: 'adhe', courses_avg: 90.18 },
    //                         { courses_dept: 'adhe', courses_avg: 90.5 },
    //                         { courses_dept: 'adhe', courses_avg: 90.72 },
    //                         { courses_dept: 'adhe', courses_avg: 90.82 },
    //                         { courses_dept: 'adhe', courses_avg: 90.85 },
    //                         { courses_dept: 'adhe', courses_avg: 91.29 },
    //                         { courses_dept: 'adhe', courses_avg: 91.33 },
    //                         { courses_dept: 'adhe', courses_avg: 91.33 },
    //                         { courses_dept: 'adhe', courses_avg: 91.48 },
    //                         { courses_dept: 'adhe', courses_avg: 92.54 },
    //                         { courses_dept: 'adhe', courses_avg: 93.33 },
    //                         { courses_dept: 'rhsc', courses_avg: 95 },
    //                         { courses_dept: 'bmeg', courses_avg: 95 },
    //                         { courses_dept: 'bmeg', courses_avg: 95 },
    //                         { courses_dept: 'cnps', courses_avg: 95 },
    //                         { courses_dept: 'cnps', courses_avg: 95 },
    //                         { courses_dept: 'psyc', courses_avg: 95 },
    //                         { courses_dept: 'cpsc', courses_avg: 95 },
    //                         { courses_dept: 'cpsc', courses_avg: 95 },
    //                         { courses_dept: 'crwr', courses_avg: 95 },
    //                         { courses_dept: 'crwr', courses_avg: 95 },
    //                         { courses_dept: 'crwr', courses_avg: 95 },
    //                         { courses_dept: 'crwr', courses_avg: 95 },
    //                         { courses_dept: 'crwr', courses_avg: 95 },
    //                         { courses_dept: 'crwr', courses_avg: 95 },
    //                         { courses_dept: 'crwr', courses_avg: 95 },
    //                         { courses_dept: 'sowk', courses_avg: 95 },
    //                         { courses_dept: 'econ', courses_avg: 95 },
    //                         { courses_dept: 'edcp', courses_avg: 95 },
    //                         { courses_dept: 'edcp', courses_avg: 95 },
    //                         { courses_dept: 'epse', courses_avg: 95 },
    //                         { courses_dept: 'epse', courses_avg: 95 },
    //                         { courses_dept: 'epse', courses_avg: 95 },
    //                         { courses_dept: 'kin', courses_avg: 95 },
    //                         { courses_dept: 'kin', courses_avg: 95 },
    //                         { courses_dept: 'kin', courses_avg: 95 },
    //                         { courses_dept: 'psyc', courses_avg: 95 },
    //                         { courses_dept: 'obst', courses_avg: 95 },
    //                         { courses_dept: 'math', courses_avg: 95 },
    //                         { courses_dept: 'math', courses_avg: 95 },
    //                         { courses_dept: 'mtrl', courses_avg: 95 },
    //                         { courses_dept: 'mtrl', courses_avg: 95 },
    //                         { courses_dept: 'mtrl', courses_avg: 95 },
    //                         { courses_dept: 'musc', courses_avg: 95 },
    //                         { courses_dept: 'musc', courses_avg: 95 },
    //                         { courses_dept: 'musc', courses_avg: 95 },
    //                         { courses_dept: 'musc', courses_avg: 95 },
    //                         { courses_dept: 'musc', courses_avg: 95 },
    //                         { courses_dept: 'musc', courses_avg: 95 },
    //                         { courses_dept: 'nurs', courses_avg: 95 },
    //                         { courses_dept: 'nurs', courses_avg: 95 },
    //                         { courses_dept: 'econ', courses_avg: 95 },
    //                         { courses_dept: 'adhe', courses_avg: 96.11 },
    //                         { courses_dept: 'cnps', courses_avg: 99.19 },
    //                         { courses_dept: 'math', courses_avg: 99.78 },
    //                         { courses_dept: 'math', courses_avg: 99.78 } ]});
    //     }).catch(function (err) {
    //         Log.test('Error: ' + err);
    //         expect.fail();
    //     })
    // });
    //
    // it("testNOT", function(){
    //     return IF.performQuery({
    //             "WHERE":
    //                 {
    //                     "NOT":
    //                         {"OR" :
    //                             [{"LT": {"courses_avg": 93.5}},
    //                              {"GT": {"courses_avg":94}},
    //                                 {"NOT":{"IS": {"courses_id": "512"}}}]
    //                         }},
    //             "OPTIONS":{
    //                 "COLUMNS":[
    //                     "courses_dept",
    //                     "courses_id",
    //                     "courses_avg"
    //                 ],
    //                 "ORDER":"courses_avg"
    //             }
    //         }
    //     ).then(function (result: any) {
    //         Log.test("successful query!");
    //         expect(result.body).to.deep.equal({
    //             result:
    //                 [ { courses_dept: 'epse', courses_id: '512', courses_avg: 93.71 },
    //                     { courses_dept: 'epse', courses_id: '512', courses_avg: 93.73 },
    //                     { courses_dept: 'epse', courses_id: '512', courses_avg: 93.74 },
    //                     { courses_dept: 'epse', courses_id: '512', courses_avg: 93.79 },
    //                     { courses_dept: 'epse', courses_id: '512', courses_avg: 93.83 },
    //                     { courses_dept: 'epse', courses_id: '512', courses_avg: 93.97 },
    //                     ] });
    //     }).catch(function (err) {
    //         Log.test('Error: ' + err);
    //         expect.fail();
    //     })
    // });
    //


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
            console.log(result.body)
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

    //
    // it("my test", function () {
    //     var bitmap = fs.readFileSync('C:/A  UBC Study/a 2017/310/cpsc310_team70/courses.zip');
    //     var content = new Buffer(bitmap).toString('base64');
    //     console.log(content)
    //     return IF.addDataset("courses", content).then(function (s:any){
    //         console.log("success")
    //     }).catch(function (err:any){
    //         console.log("err")
    //     })
    // });

})