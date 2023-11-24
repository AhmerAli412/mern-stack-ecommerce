// import React, { useState } from "react";
// import styled from "styled-components";
// import { login } from "../redux/apiCalls";
// import { mobile } from "../responsive";
// import { useDispatch, useSelector } from "react-redux";
// import { loginSuccess, loginFailure } from "../redux/userRedux";
// import { useHistory } from "react-router-dom";

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: linear-gradient(
//       rgba(255, 255, 255, 0.5),
//       rgba(255, 255, 255, 0.5)
//     ),
//     url("https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-5b054.appspot.com/o/login.jpeg?alt=media&token=dd456f8a-e737-4e1f-8a0b-bb658d9242b9")
//       center;
//   background-size: cover;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Wrapper = styled.div`
//   width: 25%;
//   padding: 20px;
//   background-color: white;
//   ${mobile({ width: "75%" })}
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 300;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
//   &:disabled {
//     color: green;
//     cursor: not-allowed;
//   }
// `;

// const Error = styled.span`
//   color: red;
// `;

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { isFetching, error } = useSelector((state) => state.user);

//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await login(dispatch, { username, password });
      
//       // Check if the data object and user property exist
//       if (data && data.user) {
//         dispatch(loginSuccess(data.user));
  
//         // Redirect to the home page after successful login
//         history.push("/");
//       } else {
//         // Handle login failure
//         dispatch(loginFailure("Incorrect username or password"));
//       }
//     } catch (error) {
//       // Handle login failure
//       dispatch(loginFailure("Incorrect username or password"));
//     }
//   };
  
  
  

//   return (
//     <Container>
//       <Wrapper>
//         <Title>SIGN IN</Title>
//         <Form>
//           <Input
//             placeholder="username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <Input
//             placeholder="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button onClick={handleClick} disabled={isFetching}>
//             LOGIN
//           </Button>
//           {error && <Error>{error}</Error>}
//         </Form>
//       </Wrapper>
//     </Container>
//   );
// };

// export default Login;




// Login.js

import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/userRedux";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-5b054.appspot.com/o/login.jpeg?alt=media&token=dd456f8a-e737-4e1f-8a0b-bb658d9242b9")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, error } = useSelector((state) => state.user);

 // Login.js
const handleClick = async (e) => {
  e.preventDefault();
  try {
    const data = await login(dispatch, { username, password });
    
    if (data && data.user) {
      dispatch(loginSuccess(data.user));
      history.push("/");
    } else {
      dispatch(loginFailure("Incorrect username or password"));
    }
  } catch (error) {
    dispatch(loginFailure("Incorrect username or password"));
  }
};

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>{error}</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;