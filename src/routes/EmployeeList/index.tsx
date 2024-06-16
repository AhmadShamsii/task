import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Form, Input, Space, Table, TableColumnsType } from 'antd';
import { StyledButton, StyledEmplyeeListCard, StyledSkeleton } from './styles';
import Link from 'antd/es/typography/Link';
import { GET_EMPLOYEES_LIST } from '../../graphql/queries';
import EmplyeeDetailsModal from '../../components/EmplyeeDetailModal';
import { formatDate } from '../../utils/helpers';
import { recordsPerPage } from '../../utils/constants';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const EmplyeesList = () => {
  // State for filtering and pagination
  const [filters, setFilters] = useState<any>({
    first: recordsPerPage,
    last: null,
    after: null,
    before: null,
    where: null,
    order: [{ id: 'ASC' }],
  });

  const [employeeDetailModal, setEmployeeDetailModal] =
    useState<boolean>(false);

  const [employeeId, setEmployeeId] = useState<number | null>(null);

  // Query for employee list data
  const { loading, data } = useQuery(GET_EMPLOYEES_LIST, {
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
    if (!search) {
      setFilters({
        ...filters,
        first: 10,
        where: null,
      });
    } else {
      // Construct the where clause based on search
      const whereClause: any = {
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

      // Update filters state with the constructed whereClause
      setFilters({
        ...filters,
        first: 10, // Update first to 10 as per your example
        where: whereClause,
      });
    }
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
            width: '350px',
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

  const handlePrevious = () => {
    setFilters(() => {
      return {
        ...filters,
        first: null,
        last: recordsPerPage,
        before: data?.hRMEmployees?.pageInfo?.startCursor,
        after: null,
      };
    });
  };

  const handleNext = () => {
    setFilters(() => {
      return {
        ...filters,
        before: null,
        last: null,
        first: recordsPerPage,
        after: data?.hRMEmployees?.pageInfo?.endCursor,
      };
    });
  };

  return (
    <>
      <StyledEmplyeeListCard
        title={`Total ${datasource?.length}`}
        extra={search}
        bordered={false}
      >
        <Table
          pagination={false}
          // commented code for future use if antd pagination is required

          // pagination={{
          //   pageSize: filters.first,
          //   current: 1,
          //   total: data?.hRMEmployees?.totalCount,
          //   onChange: handlePaginationChange,
          //   showTotal: (total, currentSize) =>
          //     `${'Current Page'}: ${Math.ceil(
          //       currentSize[1] / filters.first
          //     )} ${'out of'} ${Math.ceil(total / filters.first)}`,
          // }}
          columns={columns}
          dataSource={datasource}
        />
        <Space
          style={{
            float: 'right',
            margin: '20px 0',
          }}
        >
          <Button
            disabled={!data?.hRMEmployees?.pageInfo?.hasPreviousPage}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!data?.hRMEmployees?.pageInfo?.hasNextPage}
          >
            Next
          </Button>
        </Space>
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
