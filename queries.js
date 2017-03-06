var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:Mr@R0b0t@localhost:5432/customer_tracking';
var db = pgp(connectionString);

// add query functions

function getAllTimePositions(req, res, next) {
  db.any('select * from time_positions')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Time Positions'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleTimePosition(req, res, next) {
  var timePositionID = parseInt(req.params.id);
  db.one('select * from time_positions where id = $1', timePositionID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Time Position'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createTimePosition(req, res, next) {
  var x = parseFloat(req.body.xCord);
  var y = parseFloat(req.body.yCord);
  db.none('insert into time_positions(timeLabel, macAddress, coordinates)' +
      'values(to_timestamp(${timeLabel},'YYYY-MM-DD HH24:MI:SS'), ${macAddress}::macaddr, POINT(x, y))',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Time Position'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
	getAllTimePositions: getAllTimePositions,
	getSingleTimePosition: getSingleTimePosition,
	createTimePosition: createTimePosition,
	//removeTimePosition: removeTimePosition,
	//getAllCurrentTimePositions: getAllCurrentTimePositions
};