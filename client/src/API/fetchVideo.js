export function newVideo(formState, successF, errorF) {
    fetch("/api/videos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formState }),
    }).then((res) => (res.ok ? successF() : errorF(res)));
}

export function getGenre(successF, errorF) {
    fetch("/api/genre", {
        method: "GET"
    }).then((res) => (res.ok ? res.json().then(successF) : errorF(res)));
}

export function getLanguage(successF, errorF) {
    fetch("/api/language", {
        method: "GET"
    }).then((res) => (res.ok ? res.json().then(successF) : errorF(res)));
}

export function editVideo(videoData, successF, errorF) {
    fetch("/api/videos", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...videoData }),
    }).then((res) => (res.ok ? successF() : errorF(res)));
}

export function removeVideo(id, successF, errorF) {
    fetch("/api/videos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }).then((res) => (res.ok ? successF() : errorF(res)));
}