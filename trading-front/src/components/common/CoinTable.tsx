import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

export interface Data {
  name: string;
  currentPrice: string;
  rateOfChange: string;
  money: string;
  id: string;
  color?: string;
  changeCell?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  label: string;
  disablePadding: boolean;
  numeric: boolean;
  id: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '암호화폐명',
  },
  {
    id: 'currentPrice',
    numeric: false,
    disablePadding: true,
    label: '현재가',
  },
  {
    id: 'rateOfChange',
    numeric: false,
    disablePadding: true,
    label: '변동률',
  },
  {
    id: 'money',
    numeric: true,
    disablePadding: true,
    label: '거래금액',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              background: '#f8f8f8',
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({ coindata }: any): JSX.Element {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('rateOfChange');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [rows, setRows] = React.useState([
    {
      name: '',
      currentPrice: '',
      rateOfChange: '',
      money: '',
      id: '',
      color: '',
      changeCell: '',
    },
  ]);
  React.useEffect(() => {
    setRows(coindata);
  }, []);
  React.useEffect(() => {
    setRows(coindata);
    setTimeout(() => {
      const newDataColor = coindata.map((data: any) => {
        return {
          ...data,
          color: 'false',
        };
      });
      setRows(newDataColor);
    }, 500);
  }, [coindata]);

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [selected, orderBy, order],
  );
  const handleSelectAllClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    [selected],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      setSelected(newSelected);
    },
    [selected],
  );

  const isSelected = React.useCallback(
    (name: string) => {
      return selected.indexOf(name) !== -1;
    },
    [selected],
  );
  return (
    <div
      style={{
        width: '90%',
        height: '95%',
        overflow: 'auto',
        fontFamily: 'sleig',
      }}
    >
      <Table aria-labelledby="tableTitle" size="medium">
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
            const isItemSelected = isSelected(row.name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.name)}
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
                selected={isItemSelected}
              >
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  // padding="none"
                  align="left"
                >
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  <div
                    style={
                      row.color === 'true' && row.changeCell === 'currentPrice'
                        ? {
                            borderBottom: '2px solid #f31616',
                            width: '6rem',
                          }
                        : { border: '0px solid ' }
                    }
                  >
                    {row.currentPrice}
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  style={
                    parseFloat(row.rateOfChange) > 0
                      ? { color: '#f31616' }
                      : { color: '#0c60df' }
                  }
                >
                  {row.rateOfChange}
                </TableCell>
                <TableCell align="left">
                  <div
                    style={
                      row.color === 'true' && row.changeCell === 'money'
                        ? {
                            borderBottom: '2px solid #f31616',
                            width: '7rem',
                          }
                        : { border: '0px solid ' }
                    }
                  >
                    {row.money}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
