var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Videos Model
 * =============
 */

var Video = new keystone.List('Video');

Video.add({
  name: { type: String, required: true, initial: true },
  title: { type: String, required: true, initial: true },
  types: { type: String, required: true, initial: true },
  duration: { type: Types.Number, required: true, initial: true },
  room: { type: Types.Relationship, required: true, initial: true, ref: 'Screening', addNew: 'false' },
  group: { type: Types.Relationship, required: true, initial: true, ref: 'Group', addNew: 'true' },
	videoLink: { type: Types.Url, required: true, initial: true },
	createdAt: { type: Date, default: Date.now },
  createdBy: { type: Types.Admin, required: true, initial: true, default: 'placeholder' },
  groupId: { type: Types.Admin, required: true, initial: true, default: 'placeholder' }
});

Video.defaultSort = '-createdAt';
Video.defaultColumns = 'name, title, room, duration, createdAt';
Video.register();
