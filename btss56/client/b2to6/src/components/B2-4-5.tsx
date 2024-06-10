import { useEffect, useState } from "react";
import { Product } from "./Type";
import B3 from "./B3";

export default function B2() {
  // State lưu trữ sản phẩm
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: 0,
    product_name: "",
    image: "",
    price: 0,
    quantity: 0,
    create_at: new Date("2023-07-24"),
  });
  const [id, setId] = useState<number>(0);

  const resetProduct = () => {
    setProduct({
      id: 0,
      product_name: "",
      image: "",
      price: 0,
      quantity: 0,
      create_at: new Date("2023-07-24"),
    });
  };

  // Hàm xóa
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("404 not found");
        }
        return res.json();
      })
      .then(() => {
        console.log("Đã xóa");
        getAllProduct();
      })
      .catch(() => {
        console.error("Lỗi, không thể xóa");
      });
  };

  // Hàm thêm/sửa sản phẩm
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      product.product_name === "" ||
      product.image === "" ||
      product.price === 0 ||
      product.quantity === 0
    ) {
      console.log(product);
      return alert("Không được để trống ô input");
    }
    const method = product.id ? "PUT" : "POST";
    const url = product.id
      ? `http://localhost:3000/products/${product.id}`
      : "http://localhost:3000/products";
    fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error(`Lỗi, không thể ${product.id ? "cập nhật" : "thêm mới"}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(`Đã ${product.id ? "cập nhật" : "thêm"} dữ liệu`);
        getAllProduct();
      })
      .catch((error) => {
        console.error(`Lỗi, không thể ${product.id ? "cập nhật" : "thêm mới"}`);
      });
    resetProduct();
  };

  // Hàm lấy giá trị từ input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      id: prevProduct.id || Math.floor(Math.random() * 100000000000),
      [name]: name === "price" || name === "quantity" ? +value : value,
    }));
  };

  // Hàm lấy API
  const getAllProduct = () => {
    fetch("http://localhost:3000/products")
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("Can't get products from API");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error: Error) => {
        console.error("Lỗi, không thể lấy sản phẩm");
      });
  };

  // Xem chi tiết sản phẩm
  const showProductDetail = (id: number) => {
    setId(id);
  };

  // Hàm lấy chi tiết sản phẩm để chỉnh sửa
  const handleEdit = (id: number) => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("Can't get product details from API");
        }
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
      })
      .catch((error: Error) => {
        console.error("Lỗi, không thể lấy chi tiết sản phẩm");
      });
  };

  // Hàm render lần đầu
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} action="">
        <input
          onChange={handleChange}
          name="product_name"
          placeholder="Nhập tên sản phẩm"
          value={product.product_name}
        />
        <input
          onChange={handleChange}
          name="image"
          placeholder="Nhập link ảnh sản phẩm"
          type="text"
          value={product.image}
        />
        <input
          onChange={handleChange}
          name="price"
          placeholder="Nhập giá sản phẩm"
          type="number"
          value={product.price}
        />
        <input
          onChange={handleChange}
          name="quantity"
          placeholder="Nhập số lượng sản phẩm"
          type="number"
          value={product.quantity}
        />
        <input
          onChange={handleChange}
          name="create_at"
          placeholder="Nhập ngày thêm"
          type="date"
          value={product.create_at.toISOString().split("T")[0]}
        />
        <button type="submit">{product.id ? "Cập nhật" : "Thêm mới"}</button>
      </form>
      <table border={1}>
        <thead>
          <tr>
            <td>STT</td>
            <td>Tên sản phẩm</td>
            <td>Ảnh</td>
            <td>Giá</td>
            <td>Số lượng</td>
            <td>Tạo khi</td>
            <td colSpan={3}>Chức năng</td>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.product_name}</td>
              <td>
                <img style={{ width: "100%" }} src={item.image} alt="" />
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.create_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => showProductDetail(item.id)}>
                  Xem chi tiết
                </button>
                <button onClick={() => handleDelete(item.id)}>Xóa</button>
                <button onClick={() => handleEdit(item.id)}>Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <B3 id={id} />
    </>
  );
}
