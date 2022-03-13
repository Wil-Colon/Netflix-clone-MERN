import './App.scss';
import Featured from '../../components/featured/Featured';
import NavBar from '../../components/navbar/Navbar';
import ListItem from '../../components/listItem/ListItem';

function App() {
    return (
        <div className="home">
            <NavBar />
            <Featured />
            <ListItem />
        </div>
    );
}

export default App;
