import styled from "styled-components"
import { useState, useContext } from 'react'
import { login, getMe } from '../../WebAPI'
import { setAuthToken, successAlert } from "../../utils"
import { AuthContext } from "../../contexts";
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
  margin-top: 100px;
  padding: 50px 30px 60px 30px;
  border: 1px solid #e1e0e0;
  border-radius: 5px;
  background: white;
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

const SignInButtonn = styled.button`
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
`

export default function SignInPage() {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(null)
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }

      setAuthToken(data.token)

      getMe().then(response => {
        if (response.ok !==1 ){
          setAuthToken(null)
          return setErrorMessage(response.toString())
        }
        setUser(response.data)
        successAlert("Log in successfully!", "Welcome back!", "success")
        history.push("/")
      })
    })
  }
  return (
    <Container>
      <FormSection onSubmit={handleSubmit}>
        <FormTitle>Welcome back.</FormTitle>
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
          <SignInButtonn>登入</SignInButtonn>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormSection>
    </Container>
  )
}
