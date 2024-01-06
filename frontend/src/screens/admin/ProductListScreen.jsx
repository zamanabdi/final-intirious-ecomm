import { LinkContainer } from "react-router-bootstrap"
import { Button, Col, Row, Table } from "react-bootstrap";
import {FaTrash,FaEdit } from "react-icons/fa";
import Message from "../../message/Message";
import {toast} from 'react-toastify';
import { useCreateProductMutation } from "../../slices/productsApiSlice";

import Loader from "../../components/Loader/Loader";
import { useGetProductsQuery,useDeleteProductMutation } from "../../slices/productsApiSlice";

const ProductListScreen = () => {
    const {data : products , isLoading, refetch,error} = useGetProductsQuery();

    const [createProduct, {isLoading : loadingCreate}] = useCreateProductMutation();

    const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation();

    

    const deleteHandler = async(id) => {
      if(window.confirm('Are you sure?')){
        try {

          await deleteProduct(id);
          refetch();
          
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }

    }

    const createProductHandler = async() => {
      if(window.confirm("Are you Sure ? you want to create a new product")){
        try {
          await createProduct();
          refetch();
          
        } catch (err) {
          toast.error(err?.data?.message || err?.error);
          
        }



      }

    }
  return (  <>
  <Row className="align-items-center">
    <Col>
    <h1>Products</h1>
    </Col>
   <Col className="text-end">
    <Button className="btn-sm m-3"
    onClick={createProductHandler}>
      <FaEdit/> Create Products

    </Button>
   </Col>

  </Row>
  {loadingCreate && <Loader/>}
  {loadingDelete && <Loader/>}
  { isLoading ? <Loader/> : error ? <Message variant='danger'>{error.data.message}</Message> : (
    <>
    <Table striped hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>BRAND</th>
          <th>PRICE</th>
          <th>CATEGORY</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
          <td>{product._id}</td>
          <td> {product.name} </td>
          <td>{product.brand}</td>
          <td> &#8377;{product.price}</td>
          <td>{product.category}</td>
          <td>
            <LinkContainer to={`/admin/product/${product._id}/edit`}>
              <Button variant="light" className="btn-sm mx-2"><FaEdit/></Button>
            </LinkContainer>
            <Button variant="danger" className="btn-sm mx-2 " onClick={() => deleteHandler(product._id)}><FaTrash style={{color : "white"}}/></Button>
          </td>

          </tr>

        ))}
        {/* {products.map((product) => (
  <tr key={product.id}>
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.category}</td>
    <td>{product.brand}</td>
    <td>
      <LinkContainer to={`/admin/product/${product._id}/edit`}>
        <Button variant="light" className="btn-sm mx-2">
          <FaEdit />
        </Button>
      </LinkContainer>
      <Button
        variant="danger"
        className="btn-sm mx-2"
        onClick={() => deleteHandler(product._id)}
      >
        <FaTrash style={{ color: "white" }} />
      </Button>
    </td>
  </tr>
))} */}

      </tbody>

    </Table>
    </>
  )}
    </>
  )
    
  
}

export default ProductListScreen