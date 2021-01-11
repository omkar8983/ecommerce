import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { bulklistOrders } from '../actions/bulkOrderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [orderData, setOrderData] = useState([]);
  const [apiResponce, setapiResponce] = useState('');
  const [loading, setLoading] = useState(false);
  const orderList = useSelector((state) => state.orderList)
  // const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      setLoading(true);
      const orders_data = bulklistOrders(userInfo);
      orders_data.then(result => {
          setLoading(false);
          if(result.result){
            setOrderData(result.data)
          }else{
            setapiResponce(result.message)
          }
      })

      // setOrderData()
    } else {
      history.push('/login')
    }
  }, [])

  return (
    <>
      <h1>Bulk Orders</h1>
      {loading ? (
        <Loader />
      ) : apiResponce ? (
        <Message variant='danger'>{apiResponce}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>COMPANY NAME</th>
              <th>CITY</th>
              <th>MOBILE NUMBER</th>
              <th>PRODUCT NAME</th>
              <th>PRODUCT PRICE</th>
              <th>QTY</th>
              <th>VERIFIED</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order._id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.company_name}</td>
                <td>{order.city}</td>
                <td>{order.mobile}</td>
                <td>{order.product_name}</td>
                <td>{order.product_price}</td>
                <td>{order.qty}</td>
                <td>
                  {order.verified ? (
                    <i className="fa fa-check" aria-hidden="true" style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
