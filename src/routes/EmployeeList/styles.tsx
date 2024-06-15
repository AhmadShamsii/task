import { Button, Card } from 'antd';
import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const StyledEmplyeeListCard = styled(Card)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 50px;
  font-weight: 600;
`;
export const StyledButton = styled(Button)`
  width: 40%;
  padding: 20px 0;
  background-color: ${colors.blue};
  color: ${colors.lightergray};
  font-size: 16px;
  border-radius: 0;
`;
