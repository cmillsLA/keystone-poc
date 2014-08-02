var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Video Collection Model
 * =============
 */

var Group = new keystone.List('Group');

Group.add({
  name: { type: String, required: true, initial: true },
	createdAt: { type: Date, default: Date.now },
  groupId: { type: Types.Admin, required: true, initial: true, default: 'placeholder' }
});

//Group.defaultColumns = 'name';
Group.register();
