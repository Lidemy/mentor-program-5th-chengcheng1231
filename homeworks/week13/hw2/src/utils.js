export function appendStyle(cssTemplate) {
    const styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.appendChild(document.createTextNode(cssTemplate))
    document.head.appendChild(styleElement)
}

export function appendCommentToDOM(container, comment, isPrepend) {
    const html = `
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">${encodeHTML(comment.nickname)}</h5>
            <p class="card-text">${encodeHTML(comment.content)}</p>
            </div>
        </div>
    `
    if (isPrepend) {
        container.prepend(html)
    } else {
        container.append(html)
    }
}

function encodeHTML(s) { // js escape xss
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}