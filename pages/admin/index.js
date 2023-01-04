import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import Chart from '../../components/Chart';
import Featured from '../../components/Featured';
import Layout from '../../components/Layout'
import Widget from '../../components/Widget'
import { getError } from "../../utils/error";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, summary: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const AdminScreen = () => {
    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: true,
        summary: {},
        error: '',
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/summary`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchSummary();
    }, []);

    return (
        <Layout>
            {
                loading ? <div>Loading...</div> :
                    <>
                        <div className="flex flex-col lg:flex-row p-5 gap-5">
                            <Widget type="user" count={summary.usersCount} summary={summary.userData} />
                            <Widget type="order" count={summary.ordersCount} summary={summary.ordersData} />
                            <Widget type="product" count={summary.productsCount} />
                            <Widget type="earning" count={summary.ordersPrice} summary={summary.salesData} />
                        </div>
                        <div className="flex flex-col lg:flex-row p-5 gap-5">
                            <Featured salesData={summary.salesData} />
                            <Chart title="Last 10 Months (Revenue)" aspect={2 / 1} data={summary.salesData} />
                        </div>
                    </>
            }

        </Layout>
    )
}

export default AdminScreen

AdminScreen.auth = { adminOnly: true }
