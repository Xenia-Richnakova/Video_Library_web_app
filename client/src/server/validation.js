
function validPostVideo(req) {
    const allowed = ["name", "genre", "link", "language"]
    const { name, genre, link, language } = req.body
    const keys = Object.keys(req.body)
    for (let i = 0; i < keys.length; i++) {
        if (!allowed.includes(keys[i])) {
            return false
        }
    }
    if (name === undefined || name === null || name === "" ||
        genre === undefined || genre === null || genre === "" ||
        link === undefined || link === null || link === "" ||
        language === undefined || language === null || language === "") {
        return false
    }
    return true
}

function validPatchVideo(req) {
    const allowed = ["name", "genre", "link", "language", "id"]
    const keys = Object.keys(req.body)
    for (let i = 0; i < keys.length; i++) {
        if (!allowed.includes(keys[i])) {
            return false
        }
    }
    const { name, genre, link, language } = req.body
    if (name === "" ||
        genre === "" ||
        link === "" ||
        language === "") {
        return false
    }
    return true
}

module.exports.validPostVideo = validPostVideo
module.exports.validPatchVideo = validPatchVideo