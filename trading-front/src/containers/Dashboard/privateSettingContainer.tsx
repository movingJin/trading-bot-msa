import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/reducers';
import {
  clearActions,
  keyCreateActions,
  updateusersActions,
  validateKeyActions,
} from '@redux/reducers/authReducer';

const InputWrapper = styled.div`
  display: flex;
  margin: 0rem 0rem 2rem 0rem;
  .lable {
    display: flex;
    flex: 1;
    align-items: center;
    margin: 0rem 3rem 0rem 0rem;
    border: '1px solid';
  }
  .value {
    display: flex;
    flex: 2;
  }
`;
const TextFields = styled(TextField)`
  .MuiOutlinedInput-input {
    padding: 0.5rem;
  }
  input[disabled] {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
const Buttons = styled(Button)`
  color: #ffffff;
  background-color: #3072eb;
  width: 5rem;
`;
const ConfirmButton = styled(Button)`
  display: flex;
  background-color: #170f8b;
  color: #ffffff;
  width: 8rem;
  margin: 0.5rem 0rem 0rem 0rem;
`;
const CancleButton = styled(Button)`
  display: flex;
  border: 1px solid #c1c6ce;
  color: #000000;
  width: 8rem;
  margin: 0.5rem 0rem 0rem 0.5rem;
`;
interface ISettingProps {
  handleClose: () => void;
}
interface IButtonProps {
  [k: string]: boolean;
}
const buttonMap = [
  {
    title: 'Password setting',
    key: 'pws',
  },
  {
    title: 'API setting',
    key: 'api',
  },
  {
    title: 'Back',
    key: 'back',
  },
];
const PrivateSetting = ({ handleClose }: ISettingProps): JSX.Element => {
  const [button, setButton] = useState<IButtonProps>({
    pws: false,
    api: false,
    back: false,
  });
  const [states, setStates] = useState({
    email: '',
    password: '',
    pwConfirm: '',
    exchange: 'bitsum',
    apiKey: '',
    secretKey: '',
    localMsg: '',
  });
  const dispatch = useDispatch();
  const authInfo = useSelector((state: RootState) => state.auth);
  const { pws, api, back } = button;
  const { password, pwConfirm, localMsg, email } = states;
  const [validate, setValidate] = useState('');
  useEffect(() => {
    return () => {
      dispatch(clearActions.request());
    };
  }, []);
  useEffect(() => {
    setStates({
      ...states,
      email: authInfo.email,
    });
  }, [button]);
  useEffect(() => {
    if (!pwConfirm || password === pwConfirm) {
      setStates({
        ...states,
        localMsg: '',
      });
    } else if (password !== pwConfirm) {
      setStates({
        ...states,
        localMsg: '비밀번호가 일치하지 않습니다',
      });
    }
  }, [pwConfirm]);
  useEffect(() => {
    if (authInfo.responseMsg === 'success') {
      alert('개인 설정이 저장되었습니다.');
      handleClose();
    }
  }, [authInfo.apiKey]);
  useEffect(() => {
    if (authInfo.errorMsg === 'true') {
      setValidate('validate');
    } else if (authInfo.errorMsg === 'false') {
      setValidate('notValidate');
    } else {
      setValidate('');
    }
  }, [authInfo.errorMsg]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (api) {
      if (validate === 'notValidate') {
        alert('유효한 API key가 아닙니다.');
      } else {
        dispatch(keyCreateActions.request(states));
      }
    } else {
      const obj = {
        email: authInfo.email,
        name: authInfo.name,
        password,
      };
      dispatch(updateusersActions.request(obj));
    }
  };
  const handleValidate = () => {
    dispatch(validateKeyActions.request(states));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setStates({
      ...states,
      [id]: value,
    });
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    setStates({
      ...states,
      exchange: e.target.value,
    });
  };
  const handleButtonClick = () => {
    Object.entries(button).forEach((btn) => {
      if (btn[1]) {
        setButton({
          ...button,
          [btn[0]]: false,
        });
      }
    });
  };
  const handleSelectBtn = (key: string, value: boolean) => {
    if (key === 'back') {
      handleClose();
    } else {
      setButton({
        ...button,
        [key]: !value,
      });
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DialogTitle
        sx={{
          color: '#170F8B',
          textAlign: 'center',
        }}
      >
        Privatekey Setting
      </DialogTitle>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <DialogContent
          sx={{
            width: '20rem',
            height: '20rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid #C1C6CE',
            borderTop: '1px solid #C1C6CE',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {!pws &&
              !api &&
              !back &&
              buttonMap.map((btn) => {
                return (
                  <Button
                    key={btn.key}
                    onClick={() =>
                      handleSelectBtn(`${btn.key}`, button[`${btn.key}`])
                    }
                    style={
                      btn.key !== 'pws'
                        ? {
                            background: '#adb6c4',
                            width: '10rem',
                            margin: '1rem 0rem 0rem 0rem',
                          }
                        : {
                            background: '#adb6c4',
                            width: '10rem',
                            margin: '0rem 0rem 0rem 0rem',
                          }
                    }
                  >
                    {btn.title}
                  </Button>
                );
              })}
            {pws && (
              <>
                <InputWrapper>
                  <span className="lable">email</span>
                  <TextFields
                    id="email"
                    variant="outlined"
                    // onChange={onTextChange}
                    value={email}
                    disabled
                    className="value"
                  />
                </InputWrapper>
                <InputWrapper>
                  <span className="lable">Password</span>
                  <TextFields
                    id="password"
                    variant="outlined"
                    onChange={handleChange}
                    className="value"
                    type="password"
                  />
                </InputWrapper>
                <InputWrapper>
                  <span className="lable">PW Confirm</span>
                  <TextFields
                    id="pwConfirm"
                    variant="outlined"
                    onChange={handleChange}
                    className="value"
                    type="password"
                  />
                </InputWrapper>
                {localMsg ? <Alert severity="warning">{localMsg}</Alert> : null}
              </>
            )}
            {api && (
              <div>
                <InputWrapper>
                  <span className="lable">거래소</span>
                  <Select
                    id="exchange"
                    style={{
                      width: '6rem',
                      height: '2rem',
                      margin: '0rem 0rem 0rem 0rem',
                    }}
                    className="value"
                    defaultValue="bitsum"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="bitsum">빗썸</MenuItem>
                    <MenuItem value="upbit">업비트</MenuItem>
                    <MenuItem value="binance">바이넨스</MenuItem>
                  </Select>
                </InputWrapper>
                <InputWrapper>
                  <span className="lable">API key</span>
                  <TextFields
                    id="apiKey"
                    variant="outlined"
                    onChange={handleChange}
                    className="value"
                  />
                </InputWrapper>
                <InputWrapper>
                  <span className="lable">Secret Key</span>
                  <TextFields
                    id="secretKey"
                    variant="outlined"
                    onChange={handleChange}
                    className="value"
                    type="password"
                  />
                </InputWrapper>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '12px',
                  }}
                >
                  <Buttons onClick={handleValidate}>validate</Buttons>
                  {validate === 'validate' && (
                    <>
                      <CheckIcon style={{ color: 'green' }} />
                      <span style={{ margin: '0.5rem 0rem 0rem 0.2rem' }}>
                        유효한 API Key 입니다.
                      </span>
                    </>
                  )}
                  {validate === 'notValidate' && (
                    <>
                      <CheckIcon style={{ color: 'red' }} />
                      <span style={{ margin: '0.5rem 0rem 0rem 0.2rem' }}>
                        유효하지 않은 API Key 입니다.
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </Box>
        </DialogContent>
        {(pws || api) && (
          <DialogActions
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              margin: '0rem 0rem  0rem 0rem',
            }}
          >
            <ConfirmButton type="submit">save</ConfirmButton>
            <CancleButton onClick={handleButtonClick}>cancel</CancleButton>
          </DialogActions>
        )}
      </Box>
    </div>
  );
};
export default PrivateSetting;
export {};
