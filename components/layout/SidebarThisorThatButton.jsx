import useLoginModal from "@/hooks/useLoginModal";
import usePostModal from "@/hooks/usePostModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentUser";
// import PostModal from "@/components/modals/PostModal";

const SidebarThisorThatButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const postModal = usePostModal();
  const currentUser = useCurrentUser();

  const onClick = useCallback(() => {
    if (currentUser) {
      postModal.openModal();
    } else {
      loginModal.onOpen();
    }
  }, [currentUser, postModal, loginModal]);

  return (
    <>
      <div onClick={onClick}>
        <div
          className="
            mt-6
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            bg-sky-500
            hover:bg-opacity-80
            transition
            cursor-pointer
          "
        >
          <BsQuestionCircle size={24} color="white" />
        </div>
        <div
          className="
            mt-6
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-sky-500
            hover:bg-opacity-90
            cursor-pointer
            transition
          "
        >
          <p
            className="
              hidden
              lg:block
              text-center
              font-semibold
              text-white
              text-[20px]
            "
          >
            This or That?
          </p>
        </div>
      </div>
      {/* <PostModal
        isOpen={postModal.isOpen}
        postText={postModal.postText}
        onClose={postModal.closeModal}
        onChange={postModal.handlePostTextChange}
        onSubmit={postModal.handleSubmit}
        onCancel={postModal.closeModal}
      /> */}
    </>
  );
};

export default SidebarThisorThatButton;
