import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/cart/orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Container>
      <h1>Order History</h1>
      <OrdersGrid>
        {orders.map(order => (
          <OrderCard key={order._id}>
            <OrderHeader>
              <OrderId>Order #{order._id.slice(-6)}</OrderId>
              <OrderStatus status={order.status}>{order.status}</OrderStatus>
            </OrderHeader>
            <OrderDetails>
              <ProductsList>
                {order.products.map(item => (
                  <ProductItem key={item.product._id}>
                    <span>{item.product.name}</span>
                    <span>x{item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </ProductItem>
                ))}
              </ProductsList>
              <OrderInfo>
                <InfoItem>
                  <span>Order Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </InfoItem>
                <InfoItem>
                  <span>Total Amount:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </InfoItem>
                <InfoItem>
                  <span>Payment Method:</span>
                  <span>{order.paymentMethod}</span>
                </InfoItem>
                <ShippingAddress>
                  <h4>Shipping Address</h4>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </ShippingAddress>
              </OrderInfo>
            </OrderDetails>
          </OrderCard>
        ))}
      </OrdersGrid>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    color: #2d3748;
    margin-bottom: 2rem;
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
`;

const OrderId = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const OrderStatus = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;

  ${props => {
    switch (props.status) {
      case 'pending':
        return 'background-color: #fff3cd; color: #856404;';
      case 'approved':
        return 'background-color: #d4edda; color: #155724;';
      case 'processing':
        return 'background-color: #cce5ff; color: #004085;';
      case 'shipped':
        return 'background-color: #e2e3e5; color: #383d41;';
      case 'delivered':
        return 'background-color: #d1e7dd; color: #0f5132;';
      case 'rejected':
        return 'background-color: #f8d7da; color: #721c24;';
      default:
        return 'background-color: #f8f9fa; color: #343a40;';
    }
  }}
`;

const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 1rem;
`;

const ProductsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderInfo = styled.div`
  border-left: 1px solid #e2e8f0;
  padding-left: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  span:first-child {
    color: #718096;
  }

  span:last-child {
    font-weight: 500;
  }
`;

const ShippingAddress = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;

  h4 {
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.25rem 0;
    color: #718096;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #2d3748;
`;

export default OrderHistory;
