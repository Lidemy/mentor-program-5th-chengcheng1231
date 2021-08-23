import {showCommentAPI, addComments} from './api'
import $ from 'jquery'
import { appendStyle, appendCommentToDOM} from './utils'
import { cssTemplate, addBasicTemplate} from './template'

export function init(options) {
    // 初始化資料
    let site_key = ''
    let apiUrl = ''
    let containerElement = null
    let commentDOM = null
    window.lastSelect = false // 檢查資料庫是否還有資料， false 代表資料庫還有資料，true 代表後面沒資料了
    var limit_item = null
    let loadMoreClassName
    let commentsClassName
    let commentsSelector
    let formClassName
    let formSeletor
    window.id = {} //為了做 cursor based pagination 以及同時區別不同的留言板，用物件來各別存放最後一筆資料的 id ，才不會不同留言板共用同個 id
    
    // 將資料傳入
    site_key = options.site_key
    apiUrl = options.apiUrl
    containerElement = $(options.containerSelector)
    limit_item = options.limit_item
    
    // 設定一開始載入網頁的資料 id 都為 start，從 api 拿回資料後賦予 id 為 api 最後一筆資料的 id 
    id[site_key] = 'start'
    
    //將專屬的 class name 做命名
    loadMoreClassName = `${site_key}-load-more`
    commentsClassName = `${site_key}-comments`
    formClassName = `${site_key}-add-comment-forms`
    commentsSelector = '.'+ commentsClassName
    formSeletor = '.'+ formClassName

    // 加入基本版面並且將專屬的 class name 一並帶入
    containerElement.append(addBasicTemplate(formClassName, commentsClassName, loadMoreClassName ))
    // 加入 css
    appendStyle(cssTemplate) 

    // 載入頁面第一次call api 拿資料並呈現
    showCommentToDOM()
    
    // 點擊載入更多去 call api 拿資料並呈現
    $('.'+loadMoreClassName).click(e => {
        showCommentToDOM()
    })

    // 新增資料去 call api 並呈現
    $(formSeletor).submit(e => {
        e.preventDefault();
        const nicknameDOM = $(`${formSeletor} input[name=nickname]`)
        const contentDOM = $(`${formSeletor} textarea[name=content]`)
        const newCommentData = {
            site_key: site_key,
            nickname: nicknameDOM.val(),
            content: contentDOM.val()
        }

        addComments(apiUrl, site_key, newCommentData, data => {
            if (!data.ok) {
                alert(data.message)
                return
            }
            nicknameDOM.val('')
            contentDOM.val('')
            const commentDOM = $(commentsSelector)
            appendCommentToDOM(commentDOM, newCommentData, true)
        })
    })

    function showCommentToDOM() {
        // 拿資料並呈現要帶入
        // 1. 網址 2. site_key 3. 目前最後一筆資料的 id，一開始載入頁面的 id 預設為 'start' 4. limit_item 載入資料的筆數
        showCommentAPI(apiUrl, site_key, id[site_key] , limit_item, data => {
            if(!data.ok) {
                alert(data.message)
                return
            }
            const commentDOM = $(commentsSelector)
            const comments = data.discussions
            window.lastSelect = data.lastSelect
            
            for (let comment of comments) {
                appendCommentToDOM(commentDOM, comment)
                id[site_key] = comment.id
            }

            if (lastSelect === true) {
                $('.'+ loadMoreClassName).hide()
            }
        })
    }
}
