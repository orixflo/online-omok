import styled from 'styled-components';
import WindowForm from '../common/WindowForm';
import Input from '../common/Input';
import Button from '../common/Button';
import SpacerHorizontal from '../common/SpacerHorizontal';

const RegisterFormWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 300px;
    height: 350px;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const InputArea = styled.div`
    width: 220px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonArea = styled.div`
    width: 210px;
    height: 40px;
    display: flex;
    margin: 10px;
    justify-content: center;
`;

const TextBox = styled.div`
`;

const RegisterForm = () => {
    return(
        <RegisterFormWrapper>
            <WindowForm title={"온라인 오목/회원가입"}>
                <Form>
                    <InputArea>
                        <TextBox>아이디</TextBox>
                        <Input width={'200px'} />
                        <TextBox>닉네임</TextBox>
                        <Input width={'200px'} />
                        <TextBox>비밀번호</TextBox>
                        <Input width={'200px'} type="password" />
                        <TextBox>비밀번호 확인</TextBox>
                        <Input width={'200px'} type="password" />
                    </InputArea>
                    {"에러 표시"}
                    <ButtonArea>
                        <Button width={'100px'}>회원가입</Button>
                        <SpacerHorizontal width={'10px'} />
                        <Button width={'100px'}>취소</Button>
                    </ButtonArea>
                </Form>              
            </WindowForm>
            
        </RegisterFormWrapper>
    )
}

export default RegisterForm;