import styled from 'styled-components';
import SpacerVertical from '../common/SpacerVertical';
import WindowForm from '../common/WindowForm';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginFormWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 400px;
    height: 200px;

    @media (max-width: 768px) {
        width: 300px;
        height: 300px;
    }
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
	    flex-direction: column;
    }
`;

const InputArea = styled.div`
    width: 220px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonArea = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    flex-direction: column;
    justify-content: center;

`;

const TextBox = styled.div`
`;

const LoginForm = () => {
    
    return(
        <LoginFormWrapper>
            <WindowForm title={"온라인 오목/로그인"}>
                <Form>
                    <InputArea>
                        <TextBox>아이디</TextBox>
                        <Input width={'200px'}/>
                        <TextBox>비밀번호</TextBox>
                        <Input width={'200px'} type="password" />
                    </InputArea>
                    <ButtonArea>
                        <Button width={'100px'}>로그인</Button>
                        <SpacerVertical height={'10px'} />
                        <Button width={'100px'}>회원가입</Button>
                        <SpacerVertical height={'10px'} />
                        <Button width={'100px'}>비회원</Button>
                    </ButtonArea>
                </Form>              
            </WindowForm>
            
        </LoginFormWrapper>
    )
}

export default LoginForm;