import fs from 'fs';


export function trigger(){

    try{ 

    const serializedData = fs.readFileSync('data.txt', 'utf8');
    const deserializedObject = secureDeserialization(serializedData);
    console.log(deserializedObject);

    }catch(error){
        console.error('Deserialization failed:', error);
    }
}

function secureDeserialization(data){
  if(isValid(data)){
    return JSON.parse(data);
  }else{
    throw new Error('Invalid data');
  }
  
}

function isValid(data){
  //if its containing the required keys
  //if it do not contain any non required keys
  return true;
}

function insecureDeserialize(data) {
    const obj = eval('(' + data + ')') // Insecure deserialization using eval()
    return obj; 
  }

  
