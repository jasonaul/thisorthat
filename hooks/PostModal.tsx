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
  const body = (
    <Form
      placeholder="Enter your post"
      value={postText}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={onSubmit} 
      title="Post" 
      body={body} 
      actionLabel="Submit"
    />
  );
};

export default PostModal;
