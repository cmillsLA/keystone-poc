var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Screening Rooms Model
 * =============
 */

var Screening = new keystone.List('Screening');

Screening.add({
  name: { type: String },
	company: { type: String, required: true, initial: true },
	date: { type: Date, default: Date.now },
  createdBy: { type: Types.Admin, required: true, initial: true, default: 'placeholder' },
  groupId: { type: Types.Admin, required: true, initial: true, default: 'placeholder' },
});

Screening.defaultSort = '-createdAt';
Screening.defaultColumns = 'name, company, date, groupId';
Screening.register();
