const assert = require('assert');
const supertest = require('supertest');
const app = require("../app");

describe('/solar_farms', function() {
    it('GET /api/v1/solar_farms/from_file returns features', function(done) {
        supertest(app)
            .get("/api/v1/solar_farms/from_file")
            .expect((res) => {
                assert(res.body.features);
            })           
            .end(function(err, res) {
                if(err) done(err);
                done();
            })
    });
})