import { Input, Skeleton, Table, TableColumnsType } from 'antd';
import { StyledButton, StyledEmplyeeListCard, StyledSkeleton } from './styles';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES_LIST } from '../../graphql/queries';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const EmplyeesList = () => {
  const { loading, data } = useQuery(GET_EMPLOYEES_LIST, {
    variables: { first: 10, order: [{ id: 'ASC' }] },
  });

  const datasource = data?.hRMEmployees?.nodes;
  console.log(datasource);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'nameEnglish',
    },
    {
      title: 'Designation',
      render: (record) => record.designation.title,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
    },
    {
      title: 'Department',
      render: (record) => record.department.nameEnglish,
    },
    {
      title: 'Created at',
      render: (record) => formatDate(record.createdAt),
    },
  ];

  const search = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Input
        style={{
          width: '500px',
          borderRadius: '0',
          boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        }}
        size="large"
        placeholder="Type here ..."
      />
      <StyledButton>Search</StyledButton>
    </div>
  );

  if (loading) return <StyledSkeleton active />;

  return (
    <StyledEmplyeeListCard
      title={`Total ${datasource?.length}`}
      extra={search}
      bordered={false}
    >
      <Table columns={columns} dataSource={datasource} />
    </StyledEmplyeeListCard>
  );
};

export default EmplyeesList;
