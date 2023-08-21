import Navbar from "../components/navbar";
import Signup from "../components/signup";

function SignUp() {
  return (
    <>
      <Navbar
        buttonLink="/"
        buttonLabel="Home"
        button2Link="/login"
        button2Label="Login"
      />
      <Signup />
    </>
  );
}
export default SignUp;
