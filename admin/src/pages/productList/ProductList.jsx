import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { deleteMovie, getMovies } from '../../context/movieContext/apiCalls';
import { CircularProgress } from '@material-ui/core';
import ResponsiveDialog from '../../components/responsiveDailog/ResponsiveDialog';

export default function ProductList() {
    const { movies, dispatch, isFetching } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteMovie(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'movie',
            headerName: 'Movie',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img
                            className="productListImg"
                            src={params.row.img}
                            alt=""
                        />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: 'genre', headerName: 'Genre', width: 120 },
        { field: 'year', headerName: 'year', width: 120 },
        { field: 'limit', headerName: 'limit', width: 120 },
        { field: 'isSeries', headerName: 'isSeries', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={{
                                pathname: '/product/' + params.row._id,
                                state: params.row,
                            }}
                        >
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <ResponsiveDialog
                            handleDelete={() => handleDelete(params.row._id)}
                            type={'movie'}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <Link to="/newproduct">
                <button className="productAddButton">Add Movie</button>
            </Link>
            {!isFetching ? (
                <DataGrid
                    rows={movies}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    getRowId={(r) => r._id}
                />
            ) : (
                <CircularProgress
                    style={{
                        width: '40px',
                        height: '40px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />
            )}
        </div>
    );
}
