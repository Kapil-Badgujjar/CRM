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
import { getPrograms, getSalesLeaders } from './functions';


interface ProgramInterface {
  id: string;
  programName: string;
  assignedToId: string | null;
  assignedTo: string | null;
}

interface SalesLeadersInterface {
  id: string;
  userId: string;
  password: string;
  tole: string;
  managerId: string | null;
}

export default function Datagrid ( {salesLeaders, salesLeadersStates}:{salesLeaders: SalesLeadersInterface[], salesLeadersStates: string[]}){
const { setIsOpen } = useModal();
const [ programsData, setProgramsData] = useState<ProgramInterface[]>([]);
const fetchData = async () => {
  const data1 = await getPrograms();
  const finalProgramData = data1.map( (d:ProgramInterface) =>({...d, assignedTo: 'Unassigned'}));
  setProgramsData(finalProgramData);
}
useEffect(()=>{
  fetchData();
},[]);


const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(program: ProgramInterface) {
  return {
    programname: !validateRequired(program.programName)
      ? 'username is Required'
      : '',
    id: !validateRequired(program.id) ? 'passowrd is Required' : ''
  };
}


  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, ProgramInterface>>({});

  const columns = useMemo<MRT_ColumnDef<ProgramInterface>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 120,
      },
      {
        accessorKey: 'programName',
        header: 'Program Name',
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
      // {
      //   accessorKey: 'assignedTo',
      //   header: 'Assigned To',
      //   enableEditing: false,
      //   muiEditTextFieldProps: ({ cell, row }) => ({
      //     type: 'text',
      //     required: true,
      //     error: !!validationErrors?.[cell.id],
      //     helperText: validationErrors?.[cell.id],
      //     //store edited user in state to be saved later
      //     onBlur: (event) => {
      //       const validationError = !validateRequired(event.currentTarget.value)
      //         ? 'Required'
      //         : undefined;
      //       setValidationErrors({
      //         ...validationErrors,
      //         [cell.id]: validationError,
      //       });
      //       setEditedUsers({ ...editedUsers, [row.id]: row.original });
      //     },
      //   }),
      // },
      {
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        editVariant: 'select',
        editSelectOptions: salesLeadersStates,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>{
            console.log(row.id, event.currentTarget.value);
            // setEditedUsers({
            //   ...editedUsers,
            //   [row.id]: { ...row.original, state: event.target.value },
            // }),
          }
        }),
      },
    ],
    [editedUsers, validationErrors],
  );

  //call CREATE hook
  const handleCreateUser: MRT_TableOptions<ProgramInterface>['onCreatingRowSave'] = async ({
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
    data: programsData, // --->>  Put here actual data

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