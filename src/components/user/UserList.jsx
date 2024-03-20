import React, { useEffect, useState } from 'react'
import axios from '../../Axios/axiosInstance';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../Redux/features/user/userSlice';
const UserList = () => {
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 7,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            headerName: 'Action',
            width: 110,
            renderCell: (params) => {
                const deleteUser = async () => {
                    try {
                        const deleteResponse = await axios.delete(`/api/user/${params.row.id}`);
                        if (deleteResponse.status === 204) {
                            alert("Deleted Successfully");
                            getUserData();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                const editUser = () => {
                    navigate(`/edit-user/${params.row.id}`)
                }
                return (
                    <>
                        <IconButton aria-label="delete">
                            <EditIcon onClick={editUser} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={deleteUser} />
                        </IconButton>
                    </>
                )
            }
        },
    ];
    const getUserData = async () => {
        debugger
        setLoading(true);
        try {
            const userData = await axios.get(`/api/user?pageNumber=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`);
            console.log(userData.data)
            setRows(userData.data);
            setTotalRows(JSON.parse(userData.headers.get('X-Pagination')).TotalItemCount);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(clearUser());
        navigate("/")
    }
    const handlePageChange = (value) => {
        debugger
        setPaginationModel({ page: value.page, pageSize: value.pageSize });
        // getUserData();
    }
    useEffect(() => {
        getUserData();
    }, [paginationModel.page, paginationModel.pageSize])
    return (
        <>
            <Card sx={{ m: 1, textAlign: 'left' }} >
                <Grid container>
                    <Grid xs={6}>
                        <Button variant='contained' onClick={() => navigate("/register")}>Add User</Button>
                    </Grid>
                    <Grid xs={6} textAlign='right'>
                        {user.currentUser.name}
                        <IconButton aria-label="delete" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ m: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalRows}
                    loading={loading}
                    pageSizeOptions={[5]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={handlePageChange}
                />
            </Card>
        </>
    )
}

export default UserList