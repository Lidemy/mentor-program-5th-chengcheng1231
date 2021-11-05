import React from "react";
import styled from "styled-components";
import PaginatedSection from '../../components/PaginatedSection';
import AuthorSection from '../../components/AuthorSection';
import Post from '../../components/Post';
import { GetLimitPosts } from '../../WebAPI'
import { useState, useEffect } from "react"
import { Ring } from "react-awesome-spinners";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 1200px;
  min-width: 1235px;
  margin: 0 auto;
`

const LayoutSpace = styled.div`
  min-width: 200px;
  padding: 30px;
  margin-top: 50px;
`

const PostsSection = styled.div`
  min-width: 680px;
  padding: 0px 30px;
  font-family: sans-serif;
`

const LoadingSection = styled.div`
  width: 680px;
  padding: 350px;
`

const LoadingAnima = () => {
  const [loading] = useState(true)
  return (
    loading && <Ring />
  );
}

const perPageCount = 5

export default function HomePage() {
  const [postsData, setPostsData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // 打 API 並帶上參數，哪一頁和每頁幾筆資料
    const response = GetLimitPosts( currentPage+1, perPageCount)
    
    //取得總筆數
    response.then(function (count) {
      setTotalCount(count.headers.get('x-total-count'));
    })

    //取得資料
    response.then((res) => 
      res.json()
    ).then((data) => {
      setPostsData(data)
    })

    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });

  }, [currentPage]);
 
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <Container>
        <AuthorSection/>
          {postsData && 
            <PostsSection>
                {
                  postsData.map((postData) => (
                    <Post
                      key={postData.id}
                      postData={postData}
                    />
                  ))
                }
              <PaginatedSection perPageCount={perPageCount} handlePageClick={handlePageClick} totalCount={totalCount}/>
            </PostsSection>
          }
          {!postsData && 
            <LoadingSection>
              <LoadingAnima/>
            </LoadingSection>
          }
        <LayoutSpace></LayoutSpace>
    </Container>
  )
}

