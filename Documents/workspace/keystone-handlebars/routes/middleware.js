/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone'),
  Screening = keystone.list('Screening');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
    { label: 'Screening Rooms',		key: 'screening',		href: '/screening-room' }
	];

	locals.user = req.user;

  keystone.list('Screening').model.find().exec(function(err, result) {
    res.locals.screeningRooms = result;
    next();
  });

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};

/**
 Builds dropdown nav based on screening room table
 */

exports.screeningRooms = function(req, res, next) {

    keystone.list('Screening').model.find().exec(function(err, result) {
      res.locals.screeningRooms = result;
    });
  //$('.dropdown-menu').append('<li><a href="/screening-room/' + result._id + '">result.name</a></li>');

    //$('.navbar-left').append('<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Screening Rooms <b class="caret"></b></a><ul class="dropdown-menu"></ul>');

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};
