import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../redux/slices/apiSlice";

const UserProfile = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const navigate = useNavigate();
  console.log(data);
  return (
    <div className="pt-4 pb-4 border rounded-md max-w-[500px] mx-[2rem] flex flex-col items-center justify-center xl:mx-[auto] mt-[6rem]">
      <h1 className="text-[#15265E] xl:leading-[40px] leading-[35px] w-[100%] lg:text-center text-center xl:text-[30px] text-[25px] font-bold">
        User Profile
      </h1>
      <div className="flex flex-col md:flex-row gap-[3.5rem]">
        <div>
          <div className="flex flex-row gap-[1rem]- mt-[2rem]">
            <div>
              <img src="/Male.svg" width={40} height={40} alt="icon" />
            </div>

            <div>
              <span className="pl-2 pr-2 text-[#7D90B8]">
                {!isLoading && data?.data?.profile?.firstname}
              </span>
              <span className="text-[#7D90B8]">
                {!isLoading && data?.data?.profile?.lastname}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[1rem] items-start mt-[1rem]">
            <div className="flex flex-row gap-[1rem]">
              <img src="/EnvelopeSimple.svg" width={20} height={20} alt="" />
              <span className="text-xs text-[#7D90B8]">
                {!isLoading && data?.data?.profile?.emailaddress}
              </span>
            </div>
            <div className="flex flex-row gap-[1rem]">
              <img src="/Phone.svg" width={20} height={20} alt="" />
              <span className="text-xs text-[#7D90B8]">
                {!isLoading && data?.data?.profile?.phonenumber}
              </span>
            </div>

            <div className="text-[#7D90B8] text-xs">
              Role: {!isLoading && data?.data?.profile?.roleDetails?.roleName}{" "}
              {""}
              {""}
              {""}
              <span>
                Role ID:{" "}
                {!isLoading && data?.data?.profile?.roleDetails?.roleID}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[2rem]">
          <p className="font-[700] text-[#15265E]">Your Profile Status</p>

          <p className="text-[#7D90B8] text-xs">
            Email Confirmed:{" "}
            {!isLoading ? data?.data?.profile?.isEmailConfirmed : "false"}
          </p>
          <p className="text-[#7D90B8] text-xs">
            Active: {!isLoading ? data?.data?.profile?.isactive : "false"}
          </p>

          <button
            className="text-xs border rounded-md bg-[#15265E] p-2 mt-2 text-white"
            onClick={() => navigate("/user-wallet")}
          >
            View Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
