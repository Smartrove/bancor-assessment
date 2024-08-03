import { useGetUserWalletQuery } from "../redux/slices/apiSlice";

const UserWallet = () => {
  const { data, isLoading } = useGetUserWalletQuery();
  return (
    <div className="pt-4 pb-4 border rounded-md max-w-[500px] mx-[2rem] flex flex-col items-center justify-center xl:mx-[auto] mt-[6rem]">
      <h1 className="text-[#15265E] xl:leading-[40px] leading-[35px] w-[100%] lg:text-center text-center xl:text-[30px] text-[25px] font-bold">
        Your Wallet
      </h1>
      <div className="  flex flex-col flex-start gap-[1rem] mt-[1rem]">
        <p className="text-[#7D90B8] text-xs">
          Wallet Number: <span>{!isLoading && data?.data?.walletNumber}</span>
        </p>
        <p className="text-[#7D90B8] text-xs">
          User ID: <span>{!isLoading && data?.data?.userID}</span>
        </p>
        <p className="text-[#7D90B8] text-xs">
          Wallet Balance: <span>{!isLoading && data?.data?.balance}</span>
        </p>
      </div>
    </div>
  );
};

export default UserWallet;
