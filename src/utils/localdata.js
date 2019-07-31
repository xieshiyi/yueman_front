const setLocalData = (str, value) => {
    let values = getLocalData(str)
    let obj = {
        ...values,
        ...value
    }
    localStorage.setItem(str, JSON.stringify(obj))
}

const getLocalData = (str) => {
    return JSON.parse(localStorage.getItem(str))
}

export default {
    setLocalData,
    getLocalData
}