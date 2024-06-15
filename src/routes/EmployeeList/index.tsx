import { Button, Card, Input, Table, TableColumnsType } from 'antd';
import { StyledButton, StyledEmplyeeListCard } from './styles';
import { colors } from '../../utils/colors';

const EmplyeesList = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  // change 115 to dynamic

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
  return (
    <StyledEmplyeeListCard title="Total 115" extra={search} bordered={false}>
      <Table columns={columns} dataSource={data} />
    </StyledEmplyeeListCard>
  );
};

export default EmplyeesList;
