import { Button, Card } from 'antd';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
export const StyledLoginCard = styled(Card)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  background-color: ${colors.blue};
  color: ${colors.lightergray};
  font-size: 16px;
  border-radius: 0;
`;
