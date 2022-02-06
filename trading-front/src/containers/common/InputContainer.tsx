import React, { useCallback, useState } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export interface InputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: () => void;
}
export const SearchIcons = styled(SearchIcon)`
  :hover {
    cursor: pointer;
  }
`;
export const CommonInputContainer: React.FC<InputProps> = ({ placeholder, onChange, onKeyPress }) => {
  const [click, setClick] = useState(false);
  const handleIconClick = useCallback(() => {
    setClick(!click);
  }, [click]);
  return (
    <>
      {click && (
        <div>
          <Input
            placeholder={placeholder}
            style={{ width: '8rem' }}
            inputProps={{ 'aria-label': 'description' }}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcons onClick={handleIconClick} />
              </InputAdornment>
            }
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        </div>
      )}
      {!click && (
        <>
          <SearchIcons onClick={handleIconClick} /> 검색
        </>
      )}
    </>
  );
};
