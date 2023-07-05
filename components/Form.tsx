import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment
        ? `/api/comments?postId=${postId}`
        : '/api/posts';

      const body = `Option 1: ${question1}\n Option 2: ${question2}`;

      await axios.post(url, { body });

      toast.success('Post Created');
      setQuestion1('');
      setQuestion2('');
      mutatePosts();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [question1, question2, mutatePosts, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <div>
              <label className="text-white">Option 1:</label>
              <textarea
                disabled={isLoading}
                onChange={(e) => setQuestion1(e.target.value)}
                value={question1}
                className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px]
                  placeholder-neutral-500 text-white"
                placeholder={placeholder}
              ></textarea>
            </div>
            <div>
              <label className="text-white">Option 2:</label>
              <textarea
                disabled={isLoading}
                onChange={(e) => setQuestion2(e.target.value)}
                value={question2}
                className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px]
                  placeholder-neutral-500 text-white"
                placeholder={placeholder}
              ></textarea>
            </div>
            <hr
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
              "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                label="Submit"
                disabled={isLoading || !question1 || !question2}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
        <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to &apos;This or That!&apos;</h1>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button label="Login" onClick={loginModal.onOpen} />
          <Button label="Register"  onClick={registerModal.onOpen} secondary />
        </div>
      </div>
    )}
  </div>
)}

export default Form;