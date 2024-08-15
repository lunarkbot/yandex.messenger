export type SignInModel = {
  login: string;
  password: string;
}

export type SignUpModel = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

export type ProfileModel = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
}

export type PasswordModel = {
  oldPassword: string;
  newPassword: string;
}
