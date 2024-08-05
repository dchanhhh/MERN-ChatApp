import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg={"#E8E8E8"}
      _hover={{ background: "#38b2ac", color: "white" }}
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      color={"black"}
      px={"3"}
      py={"2"}
      mt={"2"}
      mb={"2"}
      borderRadius={"lg"}
    >
      <Avatar
        size="sm"
        name={user.name}
        src={user.pic}
        cursor={"pointer"}
        mr={"3"}
      />
      <Box>
        <Text fontWeight={"semibold"}>{user.name}</Text>
        <Text fontSize={"xs"}>Email: {user.email}</Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
