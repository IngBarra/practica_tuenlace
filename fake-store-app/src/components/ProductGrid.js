import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/customStyles.css';  

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (productId) => {
    fetch('http://localhost:5000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }) 
    })
    .then(response => {
      if (response.ok) {
        console.log('Búsqueda registrada');
      } else {
        console.error('Error al registrar búsqueda');
      }
    })
    .catch(error => console.error('Error al hacer la solicitud:', error));
  };

  const loadMoreProducts = () => {
    setLimit(prevLimit => prevLimit + 10);
  };

  return (
    <Container fluid>
      {/* Encabezado */}
      <header className="text-center mt-4 bg-dark text-white p-4 rounded">
        <h1 className="display-4">Fake Store</h1>
      </header>

      {/* Barra de Búsqueda */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </Form>

      {/* Botón para ver los más buscados */}
      <div className="text-center mt-4 mb-4">
        <Link to="/top-searched">
          <Button variant="primary" className="rounded-pill shadow-sm">
            Ver los más buscados
          </Button>
        </Link>
      </div>

      {/* Grilla de Productos */}
      <Row className="g-4">
        {filteredProducts.slice(0, limit).map(product => (
          <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card className="h-100 product-card shadow-sm" onClick={() => handleCardClick(product.id)}>
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

      {/* Botón Ver Más */}
      {limit < filteredProducts.length && (
        <Row className="mb-4">
          <Col className="text-center">
            <Button onClick={loadMoreProducts} variant="primary" className="rounded-pill">
              Ver Más
            </Button>
          </Col>
        </Row>
      )}

      {/* Pie de Página */}
      <footer className="text-center mt-4 bg-dark text-white p-4 rounded">
        <p>Fake Store 2024</p>
      </footer>
    </Container>
  );
};

export default ProductGrid;
