'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    username: String,
    question: String,
    choices: Schema.Types.Mixed
});

module.exports = mongoose.model('Poll', Poll);