
import axios from "axios"

export const commonApi=async(method,url,body)=>{

  let config={
    method,
    url,
   data:body
  
  }

return await axios(config).then(result=>{return result}).catch(result=>{return result})
}