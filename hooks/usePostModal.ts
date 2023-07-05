import { useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";

const usePostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const openModal = () => {
    if (currentUser) {
      setIsOpen(true);
    } else {
      loginModal.onOpen();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setPostText("");
  };

  const handlePostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  return {
    openModal,
    closeModal,
    handlePostTextChange,
    postText,
  };
};

export default usePostModal;
