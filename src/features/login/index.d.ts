/**
 * This interface is for the initial state of the feature slice
 */
export interface Login {
  /** User's email or phone number */
  username: string | undefined;

  /** User's Json Web Token used to authenticate session */
  token: string | undefined;

  /** Login status */
  isLoggedIn: boolean;

  /** timestamp*/
  timestamp: number | undefined;
}

export interface TempSignInBody {
  /** Mobile number or email address */
  username: string;

  /** sha256 hashed password */
  password: string;
}
