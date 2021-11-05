import styled from "styled-components"
import { useState } from 'react'
import { register } from '../../WebAPI'
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
  margin-top: 100px;
  padding: 50px 30px 60px 30px;
  border: 1px solid #e1e0e0;
  border-radius: 5px;
  background: white;
  width: 400px;

`

const FormTitle = styled.div`
  font-size: 30px;
`

const InputItem = styled.input`
  width: 300px;
  height: 30px;
  font-size: 24px;
  margin-top: 10px;
`

const SignUpButtonn = styled.button`
  margin-top: 20px;
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
  width: 300px;
`

export default function SignUpPage() {
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(null)
    register(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }
      successAlert("Sign up successfully!", "Please Sign in to explore more", "success")
      history.push("/signin")
    })
  }

  return (
    <Container>
      <FormSection onSubmit={handleSubmit}>
        <FormTitle>Welcome to sign up.</FormTitle>
        <InputItem 
          placeholder="Nickname" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
        />
        <InputItem 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <InputItem 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <div>
          <SignUpButtonn>註冊</SignUpButtonn>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormSection>
    </Container>
  )
}
