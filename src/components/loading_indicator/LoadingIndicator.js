import {usePromiseTracker} from 'react-promise-tracker';
import '../../style/datacard.scss'
import '../../style/loader.scss'

const LoadingIndicator = (props) => {

    const {promiseInProgress} = usePromiseTracker();
    return (
        promiseInProgress &&
        <div className='data-card-deck'>
            <ul>
                <li className='data-card'>
                    <div className='loading-container'>
                        <img className='load-gif' src={require("../../imgs/box-animation.gif").default} alt="Loading Animation" />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default LoadingIndicator;