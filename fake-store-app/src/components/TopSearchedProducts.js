import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/customStyles.css';  

const TopSearchedProducts = () => {
  const [topSearchedProducts, setTopSearchedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchTopSearches();
  }, []);

  const fetchTopSearches = () => {
    fetch('http://localhost:5000/api/searches')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {
        const productIds = data.map(item => item.productId);
        const searchCounts = data.reduce((acc, item) => {
          acc[item.productId] = (acc[item.productId] || 0) + 1;
          return acc;
        }, {});

        fetchProducts(productIds, searchCounts);
      })
      .catch(error => console.error('Error al obtener los productos más buscados:', error));
  };

  const fetchProducts = (productIds, searchCounts) => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(products => {
        const filteredProducts = products.filter(product => productIds.map(Number).includes(product.id));
        console.log( filteredProducts);

        // Ordenar productos por el número de búsquedas de forma decreciente
        const sortedProducts = filteredProducts.sort((a, b) => {
          const countA = searchCounts[a.id] || 0;
          const countB = searchCounts[b.id] || 0;
          return countB - countA; // Ordenar de mayor a menor
        });

        setTopSearchedProducts(sortedProducts);
      })
      .catch(error => console.error('Error al obtener productos:', error));
  };

  return (
    <Container fluid>
      {/* Encabezado */}
      <header className="text-center mt-4 bg-dark text-white p-4 rounded">
        <h1 className="display-4">Fake Store</h1>
      </header>

      {/* Botón para ver todos los productos */}
      <div className="text-center mt-4 mb-4">
        <Link to="/">
          <Button variant="primary" className="rounded-pill shadow-sm">
            Ver todos los productos
          </Button>
        </Link>
      </div>

      {/* Grilla de Productos */}
      <Row className="g-4">
        {topSearchedProducts
          .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, limit)
          .map(product => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="h-100 product-card shadow-sm">
                <Card.Img variant="top" src={product.image} alt={product.title} className="product-image" />
                <Card.Body>
                  <Card.Title className="text-truncate">{product.title}</Card.Title>
                  <Card.Text className="font-weight-bold">${product.price}</Card.Text>
                  <Card.Text className="product-description text-muted">
                    {product.description.substring(0, 100)}...
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Pie de Página */}
      <footer className="text-center mt-4 bg-dark text-white p-4 rounded">
        <p>Fake Store 2024</p>
      </footer>
    </Container>
  );
};

export default TopSearchedProducts;
