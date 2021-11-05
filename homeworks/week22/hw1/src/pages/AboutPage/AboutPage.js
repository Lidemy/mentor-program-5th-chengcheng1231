import React from "react"; 
import styled from "styled-components";
import AuthorSection from '../../components/AuthorSection';

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

const AboutSection = styled.div`
  min-width: 680px;
  padding: 70px 30px 0px 30px;
  font-family: sans-serif;
`

const AboutTitle = styled.div`
  font-size: 24px;
  font-weight: bolder;
  font-family: sans-serif;
  text-decoration: none;
  color: black;
  margin-bottom: 10px;
`

const AuthorContent = styled.div`
  margin-top: 17px;
  white-space: pre-line;
  line-height: 1.5em;
  height: 70px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

export default function AboutPage() {
  return (
    <Container>
      <AuthorSection/>
      <AboutSection>
        <AboutTitle>About</AboutTitle>
        <AuthorContent>你好，這裡是程式導師第五期學生的共筆部落格</AuthorContent>
      </AboutSection>
      <LayoutSpace/>
    </Container>
  )
}
