class User {
    constructor(id, name, age, is_admin) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.is_admin = is_admin;
    }
  }

export function trigger(){
    console.log(viewProfile(12, new User(13, "Ron", 25, true)));
}
  
  function viewProfile(user_id, requestor) {
    if(requestor.is_admin || requestor.id == user_id){
      const profile = fetchProfileFromDatabase(user_id);
      
      if (profile) {
        return profile;
      } else {
        return "Profile not found.";
      }
    }else{
        return "Unauthorized Access";
    }
  }
  
  function fetchProfileFromDatabase(user_id) {
    return new User(user_id, 'John', 45, false);
  }
  
  
  