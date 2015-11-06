'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    question: String,
    choices: Array
});

module.exports = mongoose.model('Poll', Poll);