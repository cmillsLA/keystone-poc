var keystone = require('keystone'),
  Screening = keystone.list('Video');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);

  locals.data = {
    videos: [],
    currentVideo: []
  };

  locals.filters = {
    id: req.params.id
  };

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'video';

  // Load all videos and set current video.
  view.on('init', function(next) {
    keystone.list('Video').model.find().exec(function(err, result) {
      locals.data.videos = result;
      for(i in result) {
        if(result[i]._id == locals.filters.id) {
          console.log('match');
          locals.data.currentVideo = result[i];
        }
      }
      next(err);
    });
  });
	
	// Render the view
	view.render('video');
	
};
