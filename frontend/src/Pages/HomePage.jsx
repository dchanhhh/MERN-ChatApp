import {
  Container,
  Box,
  Text,
  Image,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const HomePage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={"3"}
        bg={"white"}
        w={"100%"}
        m={"20px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Flex align={"center"} justifyContent={"center"}>
          <Image borderRadius="full" boxSize="70px" src={logo} alt="Telegram" />
          <Text fontSize={"2xl"} fontWeight={"semibold"} ml={4}>
            Telegram
          </Text>
        </Flex>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={3}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"5px"}>
            <Tab width={"50%"}>Đăng nhập</Tab>
            <Tab width={"50%"}>Đăng ký</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
