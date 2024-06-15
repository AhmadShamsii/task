import {
  Descriptions,
  DescriptionsProps,
  Divider,
  Modal,
  Skeleton,
} from 'antd';
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
  const { loading, error, data } = useQuery(GET_HRM_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
    skip: !employeeId,
  });

  const datasource = data?.hRMEmployeeById;

  console.log(data);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Designation',
      children: (
        <span style={{ color: colors.darkgray, fontWeight: '600' }}>
          {datasource?.designation?.title || '-'}
        </span>
      ),
    },
    {
      key: '2',
      label: 'Contact',
      children: (
        <span style={{ color: colors.darkgray, fontWeight: '600' }}>
          {datasource?.contact || '-'}
        </span>
      ),
    },
    {
      key: '3',
      label: 'Created At',
      children: (
        <span style={{ color: colors.darkgray, fontWeight: '600' }}>
          {datasource?.createdAt || '-'}
        </span>
      ),
    },
    {
      key: '4',
      label: 'Department',
      children: (
        <span style={{ color: colors.darkgray, fontWeight: '600' }}>
          {datasource?.department?.nameEnglish || '-'}
        </span>
      ),
    },
    {
      key: '5',
      label: 'Bank Name',
      span: 2,
      children: (
        <span style={{ color: colors.darkgray, fontWeight: '600' }}>
          {datasource?.bankName || '-'}
        </span>
      ),
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
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <Title style={{ fontSize: '18px', fontWeight: '600', margin: '0' }}>
              {datasource?.nameEnglish || '-'}
            </Title>
            <Text
              style={{
                fontSize: '12px',
                color: colors.lightgray,
              }}
            >
              Id: {datasource?.id || '-'}
            </Text>
            <Descriptions
              labelStyle={{
                fontSize: '12px',
                fontWeight: '600',
                paddingBottom: '0px',
              }}
              style={{ marginTop: '20px' }}
              layout="vertical"
              items={items}
              column={2}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default EmplyeeDetailsModal;
