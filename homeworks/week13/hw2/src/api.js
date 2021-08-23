import $ from 'jquery'

export function showCommentAPI(apiUrl, site_key, id , limit_item, cb) {
    $.ajax({
        url: `${apiUrl}/api_comments.php?site_key=` + site_key + "&id=" + id + "&limit_item=" + limit_item + "",
    }).done(function(data) {
        if(!data.ok) {
            alert(data.message)
            return
        }
        cb(data)
    })       
}

export function addComments(apiUrl, site_key, data, cb) {
    $.ajax({
        type: 'POST',
        url: `${apiUrl}/api_add_comments.php`,
        data
    }).done(function(data) {
        cb(data)
    })
}