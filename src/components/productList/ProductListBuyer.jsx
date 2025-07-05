import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyerProductCard from "../productCard/BuyerProductCard.jsx";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FiShoppingBag, FiAlertCircle } from 'react-icons/fi';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.lg} 0;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.lightText};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.sizes.base};
  }
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const Loader = styled.div`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 4px solid ${theme.colors.primary};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

const ErrorContainer = styled.div`
  background-color: rgba(239, 68, 68, 0.1); /* Light version of error color */
  border: 1px solid ${theme.colors.error};
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const NoProductsContainer = styled.div`
  background-color: rgba(245, 158, 11, 0.1); /* Light yellow */
  border: 1px solid #F59E0B; /* Amber/Yellow */
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const HeaderSection = styled.div`
    text-align: center;
    margin-bottom: ${theme.spacing['2xl']};
    padding-top: ${theme.spacing.lg};
    
    @media (max-width: ${theme.breakpoints.sm}) {
        margin-bottom: ${theme.spacing.lg};
        padding-top: ${theme.spacing.md};
    }
`;

const ProductItem = styled(motion.div)`
    height: 100%;
    width: 100%;
`;

function ProductListBuyer() {
    const [prods, setProds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('Fetching products...');
            const res = await axios.get("http://localhost:5000/product/getProductUser");
            console.log('Product API Response:', res.data);

            if (res.data?.product && Array.isArray(res.data.product)) {
                // Filter out products with invalid data
                const validProducts = res.data.product.filter((product) =>
                    product &&
                    product.name &&
                    typeof product.price !== "undefined" &&
                    product.price !== null
                );

                console.log("Valid products:", validProducts);
                setProds(validProducts);
            } else {
                console.warn("No products found in response:", res.data);
                setProds([]);
            }
        } catch (err) {
            console.error("Error fetching products:", err.response || err);
            let errorMessage = "Failed to load products. Please try again later.";
            
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <Container>
                <ContentWrapper>
                    <div className="text-center">
                        <Loader />
                        <Title>Loading Products...</Title>
                        <Subtitle>Please wait while we fetch the latest products</Subtitle>
                    </div>
                    <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
                                <div className="mt-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ContentWrapper>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ContentWrapper>
                    <div className="text-center">
                        <ErrorContainer>
                            <h2 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h2>
                            <p className="text-red-600">{error}</p>
                        </ErrorContainer>
                        <button
                            onClick={fetchProducts}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </ContentWrapper>
            </Container>
        );
    }

    if (prods.length === 0) {
        return (
            <Container>
                <ContentWrapper>
                    <div className="text-center">
                        <NoProductsContainer>
                            <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Products Available</h2>
                            <p className="text-yellow-600">Check back later for new products!</p>
                        </NoProductsContainer>
                        <button
                            onClick={fetchProducts}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </ContentWrapper>
            </Container>
        );
    }

    return (
        <Container>
            <ContentWrapper>
                <HeaderSection>
                    <Title>Our Products</Title>
                    <Subtitle>Find the perfect items for your needs</Subtitle>
                </HeaderSection>

                <ProductGrid 
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {prods.map((product) => (
                        <ProductItem key={product._id} variants={item}>
                            <BuyerProductCard data={product} />
                        </ProductItem>
                    ))}
                </ProductGrid>
            </ContentWrapper>
        </Container>
    );
}

export default ProductListBuyer;