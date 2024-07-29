import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);

  const SubmitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Đăng nhập thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error.response);
      toast({
        title: "Đăng nhập thất bại!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="login_email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Nhập Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="login_pwd" isRequired>
        <FormLabel>Mật khẩu</FormLabel>
        <InputGroup>
          <Input
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
          />
          <InputRightElement width="48px">
            <Button h="38px" onClick={handleClick}>
              {show ? <BiSolidHide /> : <BiSolidShow />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        mt={15}
        onClick={SubmitHandler}
        isLoading={loading}
      >
        Đăng nhập
      </Button>

      <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Đăng nhập với Khách
      </Button>
    </VStack>
  );
};

export default Login;
