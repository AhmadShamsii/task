import { Form, Input, Table, TableColumnsType } from 'antd';
import { StyledButton, StyledEmplyeeListCard, StyledSkeleton } from './styles';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES_LIST } from '../../graphql/queries';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';
import EmplyeeDetailsModal from '../../components/EmplyeeDetailModal';
import { formatDate } from '../../utils/helpers';

type FilterCondition = {
  contains?: string;
  eq?: number;
};
type WhereType = {
  or?: Array<
    | { nameEnglish?: FilterCondition }
    | { description?: FilterCondition }
    | { id?: FilterCondition }
  >;
};

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const EmplyeesList = () => {
  // State for filtering and pagination
  const [filters, setFilters] = useState({
    first: 7,
    last: null,
    after: null,
    before: null,
    where: null,
    order: [{ id: 'DESC' }],
  });

  const [employeeDetailModal, setEmployeeDetailModal] =
    useState<boolean>(false);

  const [employeeId, setEmployeeId] = useState<number | null>(null);

  // Query for employee list data
  const { loading, data, refetch } = useQuery(GET_EMPLOYEES_LIST, {
    variables: filters,
    fetchPolicy: 'no-cache',
  });

  const datasource = data?.hRMEmployees?.nodes;

  const columns: TableColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      render: (record) => (
        <Link
          onClick={() => {
            setEmployeeId(record?.id);
            setEmployeeDetailModal(true);
          }}
        >
          {record.nameEnglish}
        </Link>
      ),
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

  // Handling search
  const handleSearch = ({ search }: string | any) => {
    // Constructing the where clause based on search
    let whereClause: any = null;
    if (search?.trim() !== '') {
      // Construct the where clause based on search?
      whereClause = {
        or: [
          {
            nameEnglish: {
              contains: search,
            },
          },
          {
            contact: {
              contains: search,
            },
          },
          {
            designation: {
              title: {
                contains: search,
              },
            },
          },
        ],
      };
    }

    // Update the filters state with new values
    setFilters({
      ...filters,
      first: 10, // Update first to 10 as per your example
      where: whereClause, // Update where clause with the constructed whereClause or null
    });
  };

  const search = (
    <Form
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
      name="basic"
      onFinish={handleSearch}
    >
      <Form.Item name="search">
        <Input
          style={{
            width: '500px',
            borderRadius: '0',
            boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          }}
          size="large"
          placeholder="Type here ..."
        />
      </Form.Item>

      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Search
        </StyledButton>
      </Form.Item>
    </Form>
  );

  if (loading) return <StyledSkeleton active />;

  return (
    <>
      <StyledEmplyeeListCard
        title={`Total ${datasource?.length}`}
        extra={search}
        bordered={false}
      >
        <Table columns={columns} dataSource={datasource} />
      </StyledEmplyeeListCard>
      <EmplyeeDetailsModal
        employeeId={employeeId}
        employeeDetailModal={employeeDetailModal}
        setEmployeeDetailModal={setEmployeeDetailModal}
      />
    </>
  );
};

export default EmplyeesList;
