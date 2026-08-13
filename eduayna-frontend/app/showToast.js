import { toast } from "react-toastify";

const showToast=(showType,message,time) => {
 if(showType==="error")
{
 toast.error(message, {
 position: "bottom-left",
 autoClose: 5000,
 hideProgressBar: false,
 closeOnClick: true,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "dark",
 })}
else{
 toast.success(message, {
  position: "bottom-left",
  autoClose: time?time:5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  })
}

};

 export default showToast;