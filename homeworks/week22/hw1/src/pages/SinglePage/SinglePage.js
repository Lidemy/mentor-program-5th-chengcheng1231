import React from "react"; // import React from 'react' //useRef 是 hook
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Ring } from "react-awesome-spinners";
import {
  useParams
} from "react-router-dom";
import { GetSinglePost } from '../../WebAPI'

const Root = styled.div`
  max-width: 700px;
  margin: 40px auto;
`

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  align-items: flex-end;
  justify-content: space-between;
`

const PostTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  color:#afadad;
  margin: 20px 0px 20px 0px;
`

const PostContent = styled.div`
  margin-top: 28px;
  font-size:24px;

`

const LoadingSection = styled.div`
  width: 680px;
  padding: 200px 300px;
`

const LoadingAnima = () => {
  const [loading] = useState(true)
  return (
    loading && <Ring />
  );
}

export default function SinglePage() {
  const [singlePosts, setSinglePosts] = useState("")
  const { slug } = useParams();
  
  useEffect(() => {
    GetSinglePost(slug).then(posts => setSinglePosts(posts))
  }, [slug])

  return (
    <Root>
      { singlePosts && 
        <PostContainer>
          <PostTitle>{singlePosts[0].title}</PostTitle>
          <PostDate>{new Date(singlePosts[0].createdAt).toDateString()}</PostDate>
        </PostContainer>
      }
      { singlePosts &&
        <PostContent>
          {singlePosts[0].body}
        </PostContent>
      }
      { !singlePosts &&
        <LoadingSection>
          <LoadingAnima/>
        </LoadingSection>
      }
    </Root>
  )
}
