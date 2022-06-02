import './listList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ListContext } from '../../context/listContext/ListContext';
import { getLists } from '../../context/listContext/apiCalls';
import { deleteList } from '../../context/listContext/apiCalls';

export default function ListList() {
    const { lists, dispatch, isFetching } = useContext(ListContext);

    console.log(isFetching);

    useEffect(() => {
        getLists(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteList(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'title', headerName: 'title', width: 250 },
        { field: 'genre', headerName: 'Genre', width: 150 },
        { field: 'type', headerName: 'type', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={{
                                pathname: '/list/' + params.row._id,
                                state: params.row,
                            }}
                        >
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        !isFetching && (
            <div className="productList">
                <Link to="/newList">
                    <button className="productAddButton">Create List</button>
                </Link>
                <DataGrid
                    rows={lists}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    getRowId={(r) => r._id}
                />
            </div>
        )
    );
}
