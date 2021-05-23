import React, { Component } from 'react'
import Category from "./Category";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {

  state = { currentCategory: "", products: [] }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName })
    this.getProducts(category.id);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    let title2 = "Product";
    let CategoryInfo = { title: "Category" }
    return (
      <div>
        <Container>
          <Row>
            <Navi />
          </Row>
          <Row>
            <Col xs="3">
              <Category currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={CategoryInfo} />
            </Col>
            <Col xs="9">
              <ProductList products={this.state.products} currentCategory={this.state.currentCategory} title={title2} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


