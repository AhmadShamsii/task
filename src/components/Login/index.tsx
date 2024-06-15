import { StyledButton, StyledLoginCard } from './styles';
import { Checkbox, Form, Input, Typography, FormProps, message } from 'antd';
import { colors } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';

const { Text, Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const onCompleted = (data: any) => {
    navigate('/emplyees-list');
    message.success('Loged in successfully!');
  };

  const [mutateFunction, { loading, error }] = useMutation(LOGIN, {
    onCompleted,
  });

  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async ({
    username,
    password,
  }) => {
    try {
      await mutateFunction({ variables: { username, password } });
    } catch (err) {
      message.error('Invalid Login Credentials!');
    }
  };

  // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
  //   errorInfo
  // ) => {
  //   messageApi.open({
  //     type: 'error',
  //     content: 'Invalid Login Credentials!',
  //   });
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <StyledLoginCard style={{ width: 400 }}>
      <Title style={{ fontSize: '30px', color: colors.black }}>Login</Title>
      <Text style={{ color: colors.lightgray }}>
        Enter Credentials to get access
      </Text>

      <Form
        style={{ margin: '60px 30px 20px 30px' }}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          rules={[{ required: true, message: 'Please input your email!' }]}
          label="Email"
          name="username"
        >
          <Input
            style={{ borderRadius: '0', backgroundColor: colors.lightergray }}
            size="large"
            placeholder="Enter mail"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          name="password"
        >
          <Input.Password
            style={{ borderRadius: '0', backgroundColor: colors.lightergray }}
            size="large"
            placeholder="********"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          style={{ textAlign: 'start' }}
          valuePropName="checked"
        >
          <Checkbox style={{ color: colors.lightgray }}>
            Save credentials
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Login
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledLoginCard>
  );
};

export default Login;
