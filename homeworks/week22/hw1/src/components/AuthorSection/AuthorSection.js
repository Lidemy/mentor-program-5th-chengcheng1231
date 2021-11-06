import styled from "styled-components";
import avatar from '../../components/trump.jpg';

const Author = styled.div`
  position: sticky;
  align-self: flex-start;
  top: 100px;
  max-width: 200px;
  padding: 30px;
  margin-top: 40px;
`

const AuthorAvatar = styled.div`
  width: 130px;
  height: 130px;
  position: relative;
`

const AuthorAvatarImage = styled.div`
  background-image: url(${avatar});
  width: 100%;
  height: 100%;
  background-size:cover;
  background-position: center center
`;

const AuthorName = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bolder;
  font-family: sans-serif;
`

const AuthorAbout = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: bolder;
  font-family: sans-serif;
  color: #737373;
`

const AuthorHr = styled.div`
  width: 200px;
  height: 1px;
  margin-top: 50px;
  background: rgb(228, 225, 225);
`


export default function AuthorSection()  {
  return(
    <Author>
      <AuthorAvatar>
          <AuthorAvatarImage/>
        </AuthorAvatar>
        <AuthorName>第五期學生</AuthorName>
        <AuthorAbout>Taiwan</AuthorAbout>
        <AuthorHr/>
    </Author>
  )
}