import { useEffect, useState } from "react";
import { Product } from "./Type";

export default function B3({ id }: { id: number }) {
  // State lưu trữ sản phẩm
  const [product, setProduct] = useState<Product>({
    id: 0,
    product_name: "",
    image: "",
    price: 0,
    quantity: 0,
    create_at: new Date("24/07/2023"),
  });

  // Hàm xem sản phẩm theo id
  // Hàm xem chi tiết sản phẩm theo id
  const getProductById = (id: number) => {
    if (id !== 0) {
      fetch(`http://localhost:3000/products/${id}`)
        .then((res: Response) => {
          if (!res.ok) {
            throw new Error("404 Not Found");
          }
          return res.json();
        })
        .then((data: Product) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //   Re-render
  useEffect(() => {
    getProductById(id);
  }, [id]);

  useEffect(() => {
    getProductById(id);
  }, []);
  return (
    <div>
      {id === 0 ? (
        <p>Chưa có dữ liệu</p>
      ) : (
        <>
          <p>id: {product.id}</p>
          <p>id: {product.product_name}</p>
          <p>id: {product.image}</p>
          <p>id: {product.price}</p>
          <p>id: {product.quantity}</p>
          <p>id: {product.create_at.toString()}</p>
        </>
      )}
    </div>
  );
}
