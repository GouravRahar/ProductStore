import React ,{useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Store">
      <div className="row text-center">
        <h1 className="text-white">All of Products</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

//Line 3 here we are importing Local adress
// So here first in Line 12-17 we are calling all of the products from database and storing them
//...into the products variable and then mapping through it in Line 31 and using Card and
//...displaying all of the products itself ,and then calling this func in Line 22 
//Line 34 here we are having card and we are writing like this coz we are returning html code and
//...we are also passing product here coz we are expecting product in card func in the main file
//...
