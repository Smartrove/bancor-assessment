export interface UserProfileType {
  data: {
    profile: {
      id: number;
      firstname: string;
      lastname: string;
      middlename: null;
      emailaddress: string;
      phonenumber: string;
      role: number;
      isactive: boolean;
      isEmailConfirmed: boolean;
      datecreated: string;
      dateupdated: null;
      roleDetails: {
        roleID: number;
        roleName: string;
      };
    };
  };
}

export interface UserWalletType {
  data: {
    walletNumber: string;
    userID: number;
    balance: number;
    createdDate: string;
    updateDated: null;
    user: null;
  };
}
