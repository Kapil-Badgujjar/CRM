'use client'
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { type User, fakeData } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useModal } from '@/context/ModalContext';
import { getSalesTeam } from './functions';


interface TeamInterface {
  id: string;
  managerId: string;
  password: string;
  role: string;
  userId: string;
}

export default function Datagrid (){
const { setIsOpen } = useModal();
const [ teamData, setTeamData] = useState<TeamInterface[]>([]);
const fetchTeamData = async () => {
  const data = await getSalesTeam();
  setTeamData(data);
}
useEffect(()=>{
  fetchTeamData();
},[]);

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user: TeamInterface) {
  return {
    username: !validateRequired(user.userId)
      ? 'username is Required'
      : '',
    password: !validateRequired(user.password) ? 'passowrd is Required' : ''
  };
}


  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, TeamInterface>>({});

  const columns = useMemo<MRT_ColumnDef<TeamInterface>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 120,
      },
      {
        accessorKey: 'managerId',
        header: 'Manager Id',
        enableEditing: false,
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'text',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'userId',
        header: 'Username',
        enableEditing: false,
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'text',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'password',
        header: 'Password',
        enableEditing: true,
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'text',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        enableEditing: true,
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'text',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
    ],
    [editedUsers, validationErrors],
  );

  //call CREATE hook
  const handleCreateUser: MRT_TableOptions<TeamInterface>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // fakeData.push(values); // Simulate a create action
    // table.setCreatingRow(null); //exit creating mode
  };

  // //UPDATE action
  // const handleSaveUsers = async () => {
  //   if (Object.values(validationErrors).some((error) => !!error)) return;
  //   Object.entries(editedUsers).forEach(([id, updatedUser]) => {
  //     const userIndex = fakeData.findIndex((user) => user.id === id);
  //     if (userIndex > -1) fakeData[userIndex] = updatedUser; // Simulate an update action
  //   });
  //   setEditedUsers({});
  // };

  // //DELETE action
  // const openDeleteConfirmModal = (row: MRT_Row<User>) => {
  //   if (window.confirm('Are you sure you want to delete this user?')) {
  //     const userIndex = fakeData.findIndex((user) => user.id === row.original.id);
  //     if (userIndex > -1) fakeData.splice(userIndex, 1); // Simulate a delete action
  //   }
  // };

  const table = useMaterialReactTable({
    columns,     
    data: teamData, // --->>  Put here actual data

    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also available)
    enableEditing: true,
    enableRowActions: false,
    enableTopToolbar: true,
    enableBottomToolbar: true,
    positionActionsColumn: 'last',
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    // renderRowActions: ({ row }) => (
    //   <Box sx={{ display: 'flex', gap: '1rem' }}>
    //     <Tooltip title="Delete">
    //       <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Tooltip>
    //   </Box>
    // ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {/* <Button
          color="success"
          variant="contained"
          onClick={handleSaveUsers}
          disabled={
            Object.keys(editedUsers).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          Save
        </Button> */}
        {/* {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )} */}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          setIsOpen(true);
          // table.setCreatingRow(true); //simplest way to open the create row modal with no default values
        }}
      >
        Create New User
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
}