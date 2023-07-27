import { useDispatch, useSelector } from 'react-redux';
import GuestLoginForm from '../../components/auth/GuestLoginForm';
import { useEffect, useState } from 'react';
import { changeField, guestLogin } from '../../modules/auth';
import { changeScreen } from '../../modules/screen';

const GuestLoginContainer = () => {
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.guest,
        auth: auth.auth,
        authError: auth.authError,
    }));
    const [error, setError] = useState('');
    const [animationtype, setAnimationtype] = useState('open');

    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(changeField({ form: 'guest', key: name, value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { nickname } = form;
        dispatch(guestLogin({ nickname }));
    };

    useEffect(() => {
        if (authError) {
            if (authError.response.status === 400) {
                setError('3~15자리 영문/한글/숫자를 입력해주세요.');
                setAnimationtype('error');
                setTimeout(() => {
                    setAnimationtype('');
                }, 300);
                return;
            } else {
                setError('게임에 접속할 수 없습니다.');
                setAnimationtype('error');
                setTimeout(() => {
                    setAnimationtype('');
                }, 300);
                return;
            }
        }
        if (auth) {
            setAnimationtype('close');
            setTimeout(() => {
                dispatch(changeScreen('lobby'));
            }, 200);
        }
    }, [auth, authError, dispatch]);

    return <GuestLoginForm onSubmit={onSubmit} onChange={onChange} form={form} error={error} animationtype={animationtype} />;
};

export default GuestLoginContainer;
