import dotenv from "dotenv";
import path from "path";
console.log(path.resolve(process.cwd(), ".env"));
 
console.log(" process.env.NODE_ENV : ",process.env.NODE_ENV)
if(process.env.NODE_ENV == "development"){
    //dotenv.config({ path: path.resolve(process.cwd(), ".env_dev") });
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}else{
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

