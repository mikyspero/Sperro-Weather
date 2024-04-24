import fs from "fs"
import {request,Response,NextFunction} from "express"

const doesFileExist = async (filepath:string): Promise<boolean> =>{
    try {
        await fs.promises.access(filepath)
        return true
    } catch (error) {
        return false
    }
}

const writeOnFIle = async (filepath:string, data: string): Promise <void> =>{
    if(await doesFileExist(filepath)){
        await fs.promises.appendFile(filepath,data)
    } else {
        await fs.promises.writeFile(filepath,data)
    }
}

const logRequest = async (req: Request, res :Response, next: NextFunction): Promise <void> => {
    
    
}

const logError = async (error:Error, req: Request, res :Response, next: NextFunction): Promise <void>=>{

}



export {logRequest,logError}
