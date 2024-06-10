export default function Modal({modal} : {modal: boolean}) {
    const handleAccept = () => {
        
    }
    const handleCancel = () => {
        
    }
  return (
    <>
      {modal ? (
        <div className="absolute rounded-[5px] top-[30%] w-[400px] h-[200px] left-[550px] border-[1px]">
          <h2 className="w-[100%] text-center text-[20px] mb-[60px] my-[10px]">
            Bạn có chắc muốn xóa?
          </h2>
          <div className="flex gap-[10px] px-[10px] justify-around">
            <button onClick={handleAccept} className="w-[120px] h-[40px] border-[1px] rounded-[5px] text-white bg-red-500">
              Có
            </button>
            <button onClick={handleCancel} className="w-[120px] h-[40px] border-[1px] rounded-[5px] bg-white">
              Không
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
