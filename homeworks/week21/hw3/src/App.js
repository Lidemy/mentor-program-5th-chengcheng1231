import styled from 'styled-components'
import "./App.css"
import { useState, useEffect, useRef } from "react";

const FormLayout = styled.form`
  width: 900px;
  background: white;
  border-top: solid 8px #fad312;
  margin: 10% auto;
  padding: 64px 32px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.div`
  font-family: MicrosoftJhengHei;
  font-size: 34px;
  font-weight: bold;
`

const FormInfo = styled.div`
  font-family: MicrosoftJhengHei;
  font-size: 20px;
  margin-top: 25px;
  line-height: 1.8em;
  white-space: pre-wrap;
` 

const Mark = styled.p `
  font-family: MicrosoftJhengHei;
  font-size: 20px;
  color: #e74149;
  margin-top: 22px;
`
const FormItem = styled.div`
  font-family: MicrosoftJhengHei;
  font-size: 24px;
  margin-top: 40px;
  ${props => props.requiredClass === "required" && `
  :after {
    content: " *";
    color: #e74149;
    font-family: MicrosoftJhengHei;
    font-size: 24px;
  }
  `
  }
  
}
`

const AnswerInput = styled.input`
  margin-top: 16px;
  font-size: 16px;
  border: solid 1px #d0d0d0;
  padding: 8px ;
  font-size: 20px;
`

const AnswerIsBlank = styled.div`
  color: #e74149;
  font-family: MicrosoftJhengHei;
  font-size: 20px;
  margin-top: 10px;
  ${props => props.showClass === "hide" && `
  visibility: hidden;
  `
  }
`

const OtherText = styled.div`
  font-size: 14px;
  margin-top: 5px;
`

const ChosedSection = styled.div`
  padding:16px 16px;
`

const ChosedText = styled.label`
  font-size: 20px;
`

const SubmitInput =styled.input`
  background: #fad312;
  padding: 13px 20px;
  border-radius: 6px;
  margin-top: 48px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;
  font-size:24px;
  :hover {
    background: #e29e38;
  }
`

const FooterTop = styled.div`
  background: #fad312;
  height: 3px;

`

const FooterBottom = styled.div`
  background: black;
  color: #999999;
  text-align: center;
  font-family: MicrosoftJhengHei;
  font-size: 13px;
  padding: 26px 0px 21px 0px;
`

function App() {
  // 設定資料 inputValue // warning:"hide" 代表需填寫的，"none" 則是可寫可不寫
  const [inputValue, setValue] = useState([
    { id:0, input:"", warning:"hide" }, //nickname
    { id:1, input:"", warning:"hide" }, //email
    { id:2, input:"", warning:"hide" }, //phone
    { id:3, input:"", warning:"hide" }, //type
    { id:4, input:"", warning:"hide" }, //howDoYouKnow
    { id:5, input:"", warning:"none" } //other
  ]);

  // 處理填寫資料並更新 inputValue
  const handleInputChange = (e) => {
    const {id} = e.target;
    checkStatus.current = true // 更新資料時不觸發 useEffect
    setValue(
      inputValue.map((value) => {
        if (value.id !== Number(id)) return value
        return {
          ...value,
          input: e.target.value,
        };
      })
    )
  };

  // 處理表單是否填寫完成
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(
      inputValue.map((value) => {
        if (value.input === "" && value.warning === "hide") {
          return {
            ...value,
            warning: "show",
          };
        } else if (value.input !== "" && value.warning === "show") {
          return {
            ...value,
            warning: "hide",
          };
        }
        return value
      })
    )
  }

  // 處理最後表單送出的判斷
  //用 useRef 來處理第一次的 useEffect 不作用
  var checkStatus = useRef(true);
  useEffect(
    () => {
      if (checkStatus.current) {
        checkStatus.current = false;
        return;
      }
      var checkWarning = []
      for (const value of inputValue) {
        checkWarning.push(value.warning)
      }
      if (!checkWarning.includes('show')) {
        alert(
          "感謝您的報名！"
        )
      }
    },[inputValue]
  )
  
  return (
    <div>
      <FormLayout>
        <FormTitle>新拖延運動報名表單</FormTitle>
        <FormInfo>
          活動日期：2020/12/10 ~ 2020/12/11{"\n"}{ /*"搭配 white-space: pre-wrap 做換行 "*/}
          活動地點：台北市大安區新生南路二段1號
        </FormInfo>
        <Mark>*必填</Mark>
        <div>
          <FormItem requiredClass={'required'}> 
            暱稱
          </FormItem>
          <AnswerInput type="text" id={0} onChange={handleInputChange}/>
          <AnswerIsBlank  showClass={inputValue[0].warning}>請輸入暱稱</AnswerIsBlank>
        </div>
        <div>
          <FormItem requiredClass={'required'}>
            電子郵件
          </FormItem>
          <AnswerInput type="email" id={1} onChange={handleInputChange} />
          <AnswerIsBlank showClass={inputValue[1].warning}>請輸入電子郵件</AnswerIsBlank>
        </div>
        <div>
          <FormItem requiredClass={'required'}>
            手機號碼
          </FormItem>
          <AnswerInput type="number" id={2} onChange={handleInputChange}/>
          <AnswerIsBlank showClass={inputValue[2].warning}>請輸入手機號碼</AnswerIsBlank>
        </div>
        <div>
          <FormItem requiredClass={'required'}>
            類型 
          </FormItem>
          <ChosedSection>
            <div>
              <input
                id={3}
                type="radio"
                value="躺在床上用想像力實作"
                checked={inputValue[3].input === "躺在床上用想像力實作"}
                onChange={handleInputChange}

              />
              <ChosedText>躺在床上用想像力實作</ChosedText>
            </div>
            <div>
              <input
                id={3}
                type="radio"
                value="趴在地上滑手機找現成的"
                checked={inputValue[3].input === "趴在地上滑手機找現成的"}
                onChange={handleInputChange}
              />
              <ChosedText>趴在地上滑手機找現成的</ChosedText>
            </div>
          </ChosedSection>
          <AnswerIsBlank showClass={inputValue[3].warning}>請選擇報名類型</AnswerIsBlank>
        </div>
        <div>
          <FormItem requiredClass={'required'}>
            怎麼知道這個活動的？
          </FormItem>
          <AnswerInput type="text" id={4} onChange={handleInputChange}/>
          <AnswerIsBlank showClass={inputValue[4].warning}>請輸入資料</AnswerIsBlank>
        </div>
        <div>
          <FormItem>
            其他
          </FormItem>
          <OtherText>
            對活動的一些建議
          </OtherText>
          <AnswerInput type="text" id={5} onChange={handleInputChange}/>
        </div>

        <SubmitInput type="submit" value="Submit" onClick={handleSubmit} />
        <OtherText>
          請勿透過表單送出您的密碼。
        </OtherText>
      </FormLayout>

      <FooterTop/>
      <FooterBottom>
        © 2020 © Copyright. All rights Reserved.
      </FooterBottom>
    </div>
  );
}

export default App;
