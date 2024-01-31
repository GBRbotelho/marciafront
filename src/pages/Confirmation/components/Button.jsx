import React from "react";
import styles from "./Button.module.css";
import { usePost } from "../../../hooks/useRequest";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { useAuth } from "../../../contexts/AuthContext";

export default function Button({ text, state }) {
  const { user } = useAuth();
  const showMessage = useFlashMessage();

  const joinDigits = () => {
    return state.join("");
  };

  const handleSubmit = async () => {
    try {
      const codeString = joinDigits();
      const response = await usePost(`api/users/code/${user._id}`, {
        code: codeString,
      });
      if (response.success === true) {
        showMessage(response.message, "success");
      } else {
        showMessage(
          response.message || "Erro interno, tente novamente!",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={styles.button} onClick={handleSubmit}>
      {text}
    </button>
  );
}
