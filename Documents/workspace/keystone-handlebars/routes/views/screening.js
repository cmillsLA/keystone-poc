var keystone = require('keystone'),
  Screening = keystone.list('Screening'),
  Video = keystone.list('Video'),
  Group = keystone.list('Group');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'screening';
	locals.filters = {
    id: req.params.id
  };

  locals.data = {
    room: [],
    videos: [],
    groups: [],
    grouped: []
  };

  if (req.params.id) {

    // Load the current screening room data.
    view.on('init', function(next) {
        keystone.list('Screening').model.findOne({ _id: locals.filters.id }).exec(function(err, result) {
          locals.data.room = result;
          next(err);
        });
    });

    // Load groups.
    view.on('init', function(next) {
      keystone.list('Group').model.find().exec(function(err, result) {
        locals.data.groups = result;
        next(err);
      });
    });

    // Load corresponding videos.
    view.on('init', function(next) {
      keystone.list('Video').model.find({room: locals.filters.id}).exec(function(err, result) {
        locals.data.videos = result;
        next(err);
      });
    });

    // Load and group videos, TODO: restructure videos/groups/screening room mapping
    view.on('init', function(next) {
      for(j in locals.data.groups) {
        var videos = [];
        for(i in locals.data.videos) {
          if(locals.data.groups[j]._id.toString() == locals.data.videos[i].group.toString()) {
            videos.push(locals.data.videos[i]);
          }
        }
        var grouped = {
          id: locals.data.groups[j]._id,
          name: locals.data.groups[j].name,
          videos: videos
        };
        locals.data.grouped.push(grouped);
      }
      next();
    });

  } else {
    // No or invalid screening room selected, redirect home.
    window.location.href = "/";
  }

	// Render the view
	view.render('screening');
	
};
