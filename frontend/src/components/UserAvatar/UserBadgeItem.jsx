import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="full"
      mb={3}
      mr={2}
      fontSize={"12px"}
      backgroundColor="teal"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} pb={1} />
    </Badge>
  );
};

export default UserBadgeItem;
