var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);

  locals.data = {
    videos: [],
    slides: []
  };

  // Load all videos for corresponding user
  view.on('init', function(next) {
    keystone.list('Video').model.find().exec(function(err, result) {
      locals.data.videos = result;
      next(err);
    });
  });

  // Load all slides for corresponding user
  view.on('init', function(next) {
    keystone.list('Slide').model.find().exec(function(err, result) {
      locals.data.slides = result;
      next(err);
    });
  });
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// Render the view
	view.render('index');
	
};