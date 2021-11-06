import styled from "styled-components";
import {
    Link,
} from "react-router-dom";

const PostLayout = styled.div`
  min-width: 680px;
  padding: 0px 30px;
  font-family: sans-serif;
  margin-top: 24px;
  overflow-wrap: anywhere;
`

const PostTime = styled.div`
  font-size: 12px;
  margin-bottom: 14px;
  margin-top: 8px;
  color: #a8a8a8;
`
const PostTitle = styled.div`
  font-size: 24px;
  font-weight: bolder;
  font-family: sans-serif;
  text-decoration: none;
  color: black;
  margin-bottom: 10px;
`

const PostContent = styled.div`
  margin-top: 17px;
  white-space: pre-line;
  line-height: 1.5em;
  height: 70px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const PostReadMore = styled(Link)`
  display: inline-block;
  color: #198030;
  margin-top: 18px;
  text-decoration: none;
  font-size: 16px;
`

const PostHr = styled.div`
  max-width: 100%;
  height: 1px;
  margin-top: 40px;
  background: rgb(228, 225, 225);
`

export default function Post({
  postData,
})  {
  return(
    <PostLayout key={postData.id}>
      <PostTime>{new Date(postData.createdAt).toDateString()}</PostTime>
      <PostTitle>{postData.title}</PostTitle>
      <PostContent>{postData.body}</PostContent>
      <PostReadMore to={`/page/${postData.id}`}>Read more...</PostReadMore>
      <PostHr></PostHr>
    </PostLayout>
  )
}