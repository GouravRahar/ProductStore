import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts =() => {
    const [products, setProducts] = useState([]);
 
    const {user, token} = isAuthenticated();

    const preload = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }else {
                setProducts(data)
            }
        });
    };

    useEffect(() => {
        preload();
        
    }, []);

    const deleteThisprouct = (productId) => {
      deleteProduct(productId, user._id, token).then(data => {
        if(data.error){
          console.log(data.error);
      }else {
          preload();
      }
      })
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 6 products</h2>

          {products.map((product, index) => {
              return (
              <div key ={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                  deleteThisprouct(product._id)
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
              );
          })}
        </div>
      </div>
    </Base>
    )
}

export default ManageProducts;

//Line 63 Here we are writing method in callback here and we couldnt write it just like before
//... like onclick(deleteThisproduct) becoz we are passing some variables in it ,if we would
//...not have been passing any variable then we could have called like that(comp in react)