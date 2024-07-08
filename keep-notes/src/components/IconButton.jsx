
import { auth } from "../Firebase";
function IconButton({
  Icon,
  avatar,
  text,
  hidden,
  setHidden,
  hideHandler,
  color = "text-slate-500",
}) {


  async function userLogOut() {
    await auth.signOut().then(() => console.log("User Logged Out!"));
    window.location.href = "/login";
  }
  return (
    <>
      <div
        className={
          "iconBtn flex p-2 rounded-full w-fit hover:bg-slate-300 text-slate-600"
        }
      >
        {/* when there is a functionality this is specifically for the left header menu show and unshow feature  */}
        {hideHandler && Icon && (
          <button type="button" onClick={() => setHidden(!hidden)}>
            <Icon className="text-slate-500" />
          </button>
        )}

        {/* normal icon no functionality button below */}
        {!hideHandler && Icon && <Icon className={color } />}

        {/* profile or any other image is given  */}
        {avatar && (
          <div className="group flex flex-col items-center">
            <img
              src={avatar}
              className="max-h-[40px] hover:animate-bounce sm:animate-none animate-bounce drop-shadow-xl ring-2 ring-slate-700 ring-offset-2 max-w-[36px] rounded-full object-contain bg-white"
            />

            <div className="sm:hidden group-hover:block absolute top-[80px] sm:top-[50px]">
              <button onClick={userLogOut} className="bg-slate-100 rounded-lg text-slate-600 p-2 ">
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
