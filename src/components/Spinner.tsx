import { Bars } from 'react-loader-spinner';

export const Spinner = () => {
    return (
        <div>
            <Bars height={100} width={100} color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
    )
}