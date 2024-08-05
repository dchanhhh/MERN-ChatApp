import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picloading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [showcf, setShowcf] = useState(false);
  const handleClickcf = () => setShowcf(!showcf);

  const postDetails = async (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Vui lòng chọn 1 ảnh!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (
      pics.type === "image/jpg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpeg"
    ) {
      const data = new FormData();
      const api = "https://api.cloudinary.com/v1_1/dsbgq7vwh/image/upload";
      data.append("file", pics);
      data.append("upload_preset", "chat-app");

      try {
        const response = await fetch(api, {
          method: "POST",
          body: data,
        });

        const result = await response.json();
        setPic(result.url.toString());
      } catch (err) {
        console.log(err);
        toast({
          title: "Lỗi tải ảnh lên!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      } finally {
        setPicLoading(false);
      }
    } else {
      toast({
        title: "Vui lòng chọn 1 ảnh!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const SubmitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Mật khẩu không khớp! Vui lòng thử lại!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      console.log(data);
      toast({
        title: "Đăng ký thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="signup_name" isRequired>
        <FormLabel>Tên người dùng</FormLabel>
        <Input
          type="email"
          placeholder="Nhập Tên người dùng..."
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup_email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Nhập Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup_pwd" isRequired>
        <FormLabel>Mật khẩu</FormLabel>
        <InputGroup>
          <Input
            placeholder="Nhập mật khẩu..."
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

      <FormControl id="signup_cfpwd" isRequired>
        <FormLabel>Nhập lại mật khẩu</FormLabel>
        <InputGroup>
          <Input
            placeholder="Nhập lại mật khẩu..."
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showcf ? "text" : "password"}
          />
          <InputRightElement width="48px">
            <Button h="38px" onClick={handleClickcf}>
              {showcf ? <BiSolidHide /> : <BiSolidShow />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Avatar</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        mt={15}
        onClick={SubmitHandler}
        isLoading={picloading}
      >
        Đăng ký
      </Button>
    </VStack>
  );
};

export default SignUp;
