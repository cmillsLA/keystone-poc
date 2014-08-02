var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Homepage Slide Model
 * =============
 */

var Slide = new keystone.List('Slide');

Slide.add({
  name: { type: String, required: false, initial: true },
	createdAt: { type: Date, default: Date.now },
  groupId: { type: Types.Admin, required: true, initial: true, default: 'placeholder' },
  image: { type: Types.CloudinaryImage },
  link: { type: Types.Url }
});

Slide.defaultSort = '-createdAt';
Slide.defaultColumns = 'name, createdAt, groupId';
Slide.register();
