const generateError = (status = 500, msg) => {
    const err = new Error(msg)
    err.httpStatus = status
    return err
}

export default generateError
