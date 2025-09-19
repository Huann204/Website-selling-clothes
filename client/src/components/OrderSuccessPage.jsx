import { Link } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <AnnouncementBar />
      <div className="min-h-[80vh] flex flex-col justify-center items-center ">
        <h2 className="text-base lg:text-xl mb-5 font-semibold">
          Bạn đã đặt hàng thành công !
        </h2>
        <div className="text-[11px] lg:text-[13px] flex flex-col text-center italic mb-5">
          <p>
            Chúng tôi sẽ liên lạc với bạn qua số điện thoại để xác nhận lại đơn
            hàng.
          </p>
          <p>Xin chân thành cảm ơn quý khách!</p>
        </div>
        <Link to={"/"}>
          <div className="py-2 px-4 bg-black text-white text-[11px] lg:text-[13px] font-semibold  rounded-md">
            TIẾP TỤC MUA HÀNG
          </div>
        </Link>
      </div>
    </>
  );
}
