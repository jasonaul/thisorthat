import Modal from "@/components/Modal";
import Form from "@/components/Form";

interface PostModalProps {
  isOpen: boolean;
  postText: string;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  postText,
  onClose,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form
        placeholder="Enter your post"
        value={postText}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default PostModal;
