import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import ProductType from "../ProductType";
import Product from "./Product";
import Modal from "./Modal";

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  // Hàm lấy sản phẩm
  const getAllProduct = () => {
    fetch("http://localhost:3000/products")
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("Lỗi, không thể lấy sản phẩm");
        }
        return res.json();
      })
      .then((data: ProductType[]) => {
        return setProducts(data);
      })
      .catch((error) => {
        console.error("Lỗi, không thể lấy sản phẩm");
      });
  };

  const showModal = () => {
    setModal(true);
  }

  const hidemodal = () => {
    setModal(false)
  }

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
    {/* <Modal modal={modal} showModal={showModal} hideModal={hidemodal}/> */}
      <Button className="ml-[10px] my-[10px] w-[150px] h-[40px] bg-blue-500 text-[14px] rounded-[5px] text-white">Thêm mới sản phẩm</Button>
      <Table className="border-[1px] w-[100%]" striped bordered hover>
        <thead>
          <tr className="text-left border-y-[1px]">
            <th className="pl-[10px]">#</th>
            <th className="pl-[10px]">Tên sản phẩm</th>
            <th className="pl-[10px]">Hình ảnh</th>
            <th className="pl-[10px]">Giá</th>
            <th className="pl-[10px]">Số lượng</th>
            <th className="pl-[10px]">Ngày thêm</th>
            <th className="pl-[10px]">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item: ProductType, index: number) => {
            return (
              <Product
              modal={modal}
                // showModal={showModal}
                // hideModal={hidemodal}
                getAllProduct={getAllProduct}
                item={item}
                index={index}
              ></Product>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
