import Navbar from "../components/navbar";
import Signup from "../components/signup";

function SignUp() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          paddingBottom: "80px",
        }}
      >
        <Navbar buttonLink="/" buttonLabel="Home" button2Link="/login" button2Label="Login" />
        <Signup />
      </div>
    </>
  );
}
export default SignUp;
