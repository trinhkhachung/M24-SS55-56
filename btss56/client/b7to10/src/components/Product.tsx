import ProductType from "../ProductType";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

interface Props {
  item: ProductType;
  index: number;
  getAllProduct: () => void;
  modal: boolean;
}
export default function Product(props: Props) {
  const { item, index, getAllProduct, modal } = props;
  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa")) {
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
    }
  };
  return (
    <>
      {modal ? <Modal modal={modal} /> : ""}
      <tr className="h-[40px] border-y-[1px]">
        <td className="pl-[10px]">{index + 1}</td>
        <td className="pl-[10px]">{item.name}</td>
        <td className="pl-[10px]">
          <img className="h-[100%] w-[40px]" src={item.image} />
        </td>
        <td className="pl-[10px]">{item.price}</td>
        <td className="pl-[10px]">{item.stock}</td>
        <td className="pl-[10px]">{item.create_at}</td>
        <td className="flex gap-[10px] items-center pt-[10px]">
          <button className="w-[40px] h-[20px] bg-orange-100 rounded-[5px] text-[14px] text-orange-500 border-[1px] border-orange-500 flex items-center justify-center">
            Sửa
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="w-[40px] h-[20px] bg-red-100 rounded-[5px] text-[14px] text-red-500 border-[1px] border-red-500 flex items-center justify-center"
          >
            Xóa
          </button>
        </td>
      </tr>
    </>
  );
}
