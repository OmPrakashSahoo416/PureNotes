
import { auth } from "../Firebase";
function IconButton({
  Icon,
  avatar,
  text,
  hidden,
  setHidden,
  hideHandler,
  color = "text-amber-100",
}) {


  async function userLogOut() {
    await auth.signOut().then(() => console.log("User Logged Out!"));
    window.location.href = "/login";
  }
  return (
    <>
      <div
        className={
          "iconBtn flex p-3 rounded-full w-fit hover:bg-slate-300 text-slate-600"
        }
      >
        {/* when there is a functionality this is specifically for the left header menu show and unshow feature  */}
        {hideHandler && Icon && (
          <button type="button" onClick={() => setHidden(!hidden)}>
            <Icon className="text-slate-500" />
          </button>
        )}

        {/* normal icon no functionality button below */}
        {!hideHandler && Icon && <Icon className={color} />}

        {/* profile or any other image is given  */}
        {avatar && (
          <div className="group flex flex-col items-center">
            <img
              src={avatar}
              className="max-h-[36px] hover:animate-bounce drop-shadow-xl border-2 max-w-[36px] rounded-full object-contain bg-white"
            />

            <div className="hidden group-hover:block absolute top-[85px]">
              <button onClick={userLogOut} className="bg-black rounded-lg text-white p-2 ">
                LogOut
              </button>
            </div>
          </div>
        )}
        {/* {!collapsed} */}

        {text && !hidden && <p className="ml-5 w-[150px]">{text}</p>}
        {/* {hidden} */}
      </div>
    </>
  );
}

export default IconButton;
