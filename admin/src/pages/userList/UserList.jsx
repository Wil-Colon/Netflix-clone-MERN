import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { useContext } from 'react';
import { getUsers, deleteUser } from '../../context/userContext/apiCalls';

export default function UserList() {
    const { users, isFetching, dispatch } = useContext(UserContext);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const defaultPic =
        'https://e7.pngegg.com/pngimages/103/590/png-clipart-computer-icons-user-profile-avatar-heroes-monochrome.png';

    const handleDelete = (id) => {
        deleteUser(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        {
            field: 'user',
            headerName: 'User',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img
                            className="userListImg"
                            src={
                                params.row.profilePic
                                    ? params.row.profilePic
                                    : defaultPic
                            }
                            alt=""
                        />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={{
                                pathname: '/user/' + params.row._id,
                                state: params.row,
                            }}
                        >
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            {!isFetching && (
                <DataGrid
                    rows={users}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    getRowId={(r) => r._id}
                />
            )}
        </div>
    );
}
