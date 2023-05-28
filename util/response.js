const response = (message,status_code,data=null) => {
   const  responseObj= {
        message: message,
        status_code: status_code,
    }

    if (data) {
        responseObj['payload']=data
    }
    return responseObj
}

export default response