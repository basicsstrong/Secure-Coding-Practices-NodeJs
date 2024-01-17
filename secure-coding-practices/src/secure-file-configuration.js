import { error } from 'console';
import fs from 'fs';
import os from 'os';

export function trigger() {
    const username = "meenalbhansali";
    console.log(readSensitiveFile("src/secure-file-configuration.js", username));
  }

function readSensitiveFile(filePath, username) {
    if(hasPermission(filePath, username)){
      try {
        return fs.readFileSync(filePath, 'utf8');
      } catch (error) {
        return "Error reading the file.";
      }
  }else{
    throw new Error("Illegal access to sensitive file");
  }}

function hasPermission(path, username){

    const fileStats = fs.statSync(path);
    const fileOwnerUid = fileStats.uid;
    const userInfo = os.userInfo(fileOwnerUid);
    const fileOwner = userInfo.username;
    return fileOwner === username;

}
