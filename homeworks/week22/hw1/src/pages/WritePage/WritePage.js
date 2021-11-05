import styled from "styled-components"
import { useState } from 'react'
import { publish } from '../../WebAPI'
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { successAlert } from "../../utils";
import {
  useHistory
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  margin: 0 auto;
`

const FormSection = styled.form`
  display: grid;
  justify-content: center;
  margin-top: 30px;
  padding: 30px 30px 60px 30px;
  border: 1px solid #999595;
  border-radius: 5px;
  background: white;
  width: 1100px;
`

const FormTitle = styled.div`
  font-size: 30px;
`

const InputItem = styled.input`
  width: 1000px;
  height: 30px;
  font-size: 24px;
  margin-top: 10px;
  border: 1px solid #999595;
  border-radius: 5px;
  font-family: MONOSPACE;
`

const InputTextArea = styled.textarea`
  width: 1000px;
  height: 400px;
  font-size: 24px;
  margin-top: 10px;
  border: 1px solid #999595;
  border-radius: 5px;
  font-family: MONOSPACE;
`

const PublishSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
`

const PublishButtonn = styled.button`
  width: 300px;
  background: green;
  border: none;
  padding: 10px 20px 10px 20px;
  color: white;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background: #00800059;
  }
`

const ErrorMessage = styled.div`
  color: red;
`

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errorMessage, setErrorMessage] = useState(' ')
  const { user } = useContext(AuthContext) // 接收 App.js 傳的 context
  const history = useHistory()

  if (user === null) {
    history.push("/")
  } // 檢查如果沒有登入就返回首頁

  const handleSubmit = (e) => {
    e.preventDefault()
    publish(title, body).then((data) => {
      console.log(data)
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }
      successAlert("Publish successfully!", "", "success")
      history.push("/")
    })
  }

  return (
    <Container>
      <FormSection onSubmit={handleSubmit}>
        <FormTitle>Write a story.</FormTitle>
        <InputItem
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputTextArea
          placeholder="Tell your story..." 
          value={body} 
          onChange={(e) => setBody(e.target.value)}
        />
      <PublishSection>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <PublishButtonn>發布</PublishButtonn>
      </PublishSection>
      </FormSection>
    </Container>
  )
}
