var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  company: { type: String, required: true, index: true, initial: true },
  phone: { type: String, required: true, index: true, initial: true },
	password: { type: Types.Password, initial: true, required: true },
  createdBy: { type: Types.Admin, required: true, initial: true },
  groupId: { type: Types.Admin, required: true, initial: true },
  createdAt: { type: Types.Hidden, default: Date.now }
}, 'Permissions', {
  level : { type: Types.Select, numeric: true, options: [{ value: 1, label: 'User' }, { value: 2, label: 'Group Administrator' }, { value: 3, label: 'System Administrator' }] }
},
  'Screening', {
    //isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
    rooms : { type: Types.Select, numeric: true, options: [{ value: 1, label: 'Screening room 1' }, { value: 2, label: 'Screening room 2' }, { value: 3, label: 'Screening room 3' }] }
  });

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	// Return true if admin
  if(this.level === 2 || this.level === 3) {
    return true;
  } else {
    return false;
  }
});

// Provide screening room access
User.schema.virtual('screening').get(function() {
  return this.rooms;
});

/**
 * Registration
 */

User.defaultColumns = 'name, email, company, phone, level, rooms';
User.register();
