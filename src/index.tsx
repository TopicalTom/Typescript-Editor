import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

// Components
import CellList from './components/CellList';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    );
};

ReactDom.render(<App />, document.querySelector('#root'));