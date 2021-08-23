export const cssTemplate = '.card { margin-top: 10px;} .comments {margin-bottom: 16px;} .loadMore-btn {margin-bottom: 16px;}'

export function addBasicTemplate (className, commentsClassName, loadMoreClassName) {
    return  `
    <div>
        <form class="add-comment-form ${className}">
            <div class="mb-3">
                <label>暱稱</label>
                <input name="nickname" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label>留言內容</label>
                <textarea name="content" class="form-control" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">送出</button>
        </form>
        <div class="${commentsClassName}">
        </div>
        <button type="button" class="${loadMoreClassName} btn btn-secondary btn-lg">Load More...</button>
    </div>
    `
}