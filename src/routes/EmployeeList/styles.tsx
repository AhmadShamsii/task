import { Button, Card, Skeleton } from 'antd';
import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const StyledEmplyeeListCard = styled(Card)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 50px;
  padding-top: 20px;
`;
export const StyledButton = styled(Button)`
  padding: 18px 40px;
  background-color: ${colors.blue};
  color: ${colors.lightergray};
  font-size: 16px;
  border-radius: 0;
`;
export const StyledSkeleton = styled(Skeleton)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 50px;
`;
