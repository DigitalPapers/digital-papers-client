import { Box } from '@mui/material';
import React from 'react';
import EnhancedTable from '../components/table/Table';
import { ClientsService } from '../services/clients.service';

function Customers() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'RFC',
        accessor: 'rfc',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    [],
  );

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [error, setError] = React.useState(null);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    setLoading(true);
    ClientsService()
      .list({ pageIndex, pageSize })
      .then((response) => {
        setPageCount(response.totalPages);
        setTotalCount(response.totalCount);
        setData(response.users);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error(error.message);
        setData([]);
        setLoading(false);
        setError(error.message);
      });
  }, []);

  return (
    <Box>
      <EnhancedTable
        columns={columns}
        data={data}
        loading={loading}
        fetchData={fetchData}
        setData={setData}
        pageCount={pageCount}
        totalCount={totalCount}
        error={error}
        link={{
          isLink: true,
          goToLink: ':id/files',
          identifier: 'id',
        }}
      />
    </Box>
  );
}

export default Customers;
