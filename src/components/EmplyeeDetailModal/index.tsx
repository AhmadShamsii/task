import { Descriptions, DescriptionsProps, Divider, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { colors } from '../../utils/colors';
import { useQuery } from '@apollo/client';
import { GET_HRM_EMPLOYEE_BY_ID } from '../../graphql/queries';

const EmplyeeDetailsModal = ({
  employeeId,
  employeeDetailModal,
  setEmployeeDetailModal,
}: any) => {
  console.log(employeeId, 'empoyeeid');
  const { loading, error, data } = useQuery(GET_HRM_EMPLOYEE_BY_ID, {
    variables: { employeeId },
  });

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Designation',
      children: 'Zhou Maomao',
    },
    {
      key: '2',
      label: 'Contact',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Created At',
      children: 'Hangzhou, Zhejiang',
    },
    {
      key: '4',
      label: 'Department',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Bank Name',
      span: 2,
      children:
        'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
  ];

  return (
    <div>
      <Modal
        onCancel={() => setEmployeeDetailModal(false)}
        title="Employee Detail"
        open={employeeDetailModal}
        footer={null}
      >
        <Divider />
        <Title style={{ fontSize: '18px', fontWeight: '600', margin: '0' }}>
          John Doe
        </Title>
        <Text
          style={{
            fontSize: '12px',
            color: colors.lightgray,
          }}
        >
          Id: 1
        </Text>
        <Descriptions
          labelStyle={{ fontSize: '12px', fontWeight: '600' }}
          style={{ marginTop: '20px' }}
          layout="vertical"
          items={items}
        />
      </Modal>
    </div>
  );
};

export default EmplyeeDetailsModal;
